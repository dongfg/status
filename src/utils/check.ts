import { MonitorStatus, Config, Status } from "@/typings";
import { saveStatus } from "./store";
import icmp from "icmp";
import { JSONPath } from "jsonpath-plus";

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
export const httpCheck = (config: Config): Promise<Status> => {
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
