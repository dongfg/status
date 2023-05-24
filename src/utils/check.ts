import { MonitorStatus, Config, Status } from "@/typings";
import { saveStatus } from "./store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import icmp from "icmp";
import { JSONPath } from "jsonpath-plus";
import tls from "tls";

const build = (config: Config): Status => {
  return {
    ...config,
    status: MonitorStatus.Unknown,
    children:
      config.children?.map<Status>((child) => {
        const { children: _, ...rest } = child;
        return { ...rest, status: MonitorStatus.Unknown };
      }) || null,
  };
};

const determine = (history: Status[], status: Status) => {
  let success = false;
  let failed = false;
  history.forEach((c) => {
    if (c.status === MonitorStatus.Success) {
      success = true;
    } else if (c.status === MonitorStatus.Failed) {
      failed = true;
    }
  });

  if (success && !failed) {
    // 全部成功 =>成功
    status.status = MonitorStatus.Success;
  } else if (!success && failed) {
    // 全部失败 => 失败
    status.status = MonitorStatus.Failed;
  } else {
    // 有成功有失败 => 警告
    status.status = MonitorStatus.Warning;
  }
};

const save = (config: Config, status: Status) => {
  const history = saveStatus(config.id, status);
  determine(history, status);
  status.time = new Date().toISOString();
};

/**
 * Template
 */
const check = async (
  config: Config,
  callback: (status: Status) => Promise<void>
): Promise<Status> => {
  const status = build(config);
  await callback(status);
  save(config, status);
  return status;
};

/**
 * TEXT
 */
export const textCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    try {
      status.result = config.params?.text || "";
      status.status = MonitorStatus.Success;
    } catch (err) {
      status.status = MonitorStatus.Failed;
    }
  });
};

/**
 * PING
 */
export const pingCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    const start = new Date().getMilliseconds();
    try {
      await icmp.ping(config.params!.host);
      const delay = new Date().getMilliseconds() - start;
      status.result = `${delay} ms`;
      status.status = MonitorStatus.Success;
    } catch (err) {
      status.status = MonitorStatus.Failed;
    }
  });
};

/**
 * HTTP 状态码
 */
export const httpStatusCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    try {
      const res = await fetch(config.params!.url);
      status.result = `${res.status} ${res.statusText}`;
      if (res.status >= 200 && res.status < 400) {
        status.status = MonitorStatus.Success;
      } else {
        status.status = MonitorStatus.Failed;
      }
    } catch (err) {
      status.status = MonitorStatus.Failed;
    }
  });
};

/**
 * HTTP 原始返回
 */
export const httpRawCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    try {
      const res = await fetch(config.params!.url);
      status.result = await res.text();
      if (config.params!.regex) {
        status.result = status.result.match(
          new RegExp(config.params!.regex)
        ) as any;
      }
      if (res.status >= 200 && res.status < 400) {
        status.status = MonitorStatus.Success;
      } else {
        status.status = MonitorStatus.Failed;
      }
    } catch (err) {
      status.status = MonitorStatus.Failed;
    }
  });
};

/**
 * HTTP JSON返回解析
 * jsonpath-plus
 * https://jsonpath-plus.github.io/JSONPath/demo/
 */
export const httpJsonCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    try {
      const res = await fetch(config.params!.url);
      const json = await res.json();
      status.result = JSONPath({ path: config.params!.path, json });
      if (res.status >= 200 && res.status < 400) {
        status.status = MonitorStatus.Success;
      } else {
        status.status = MonitorStatus.Failed;
      }
    } catch (err) {
      status.status = MonitorStatus.Failed;
    }
  });
};

/**
 * SSL 证书过期时间
 */
export const sslCertCheck = (config: Config): Promise<Status> => {
  return check(config, async (status) => {
    try {
      const res = await new Promise<string>(function (resolve, reject) {
        const client = tls.connect(
          {
            host: config.params!.host,
            port: config.params!.port || 443,
          },
          () => {
            const cert = client.getPeerCertificate(true);
            if (cert) {
              resolve(dayjs(cert.valid_to).fromNow());
            }
          }
        );
        client.on("error", (sc: any) => {
          reject(sc.code);
        });
      });
      status.result = res;
      status.status = MonitorStatus.Success;
    } catch (err) {
      if (err === "CERT_HAS_EXPIRED") {
        status.result = "EXPIRED";
        status.status = MonitorStatus.Failed;
      } else {
        status.result = "UNKNOWN";
        status.status = MonitorStatus.Warning;
      }
    }
  });
};
