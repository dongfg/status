import { Config } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, loadConfig } from "@/utils/store";
import {
  pingCheck,
  httpStatusCheck,
  httpRawCheck,
  httpJsonCheck,
  sslCertCheck,
} from "@/utils/check";

const check = async (config: Config) => {
  switch (config.type) {
    case "GROUP":
      break;
    case "TEXT":
      break;
    case "PING":
      return pingCheck(config);
    case "HTTP-STATUS":
      return httpStatusCheck(config);
    case "HTTP-RAW":
      return httpRawCheck(config);
    case "HTTP-JSON":
      return httpJsonCheck(config);
    case "SSL-CERT":
      return sslCertCheck(config);
    case "CODING":
      break;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 加载全部配置
  let config = await getConfig();
  if (!config) {
    config = await loadConfig();
  }
  const { id: idStr } = req.query;
  const id = parseInt(idStr as any);
  // 执行检查
  const status = await check(config.find((c) => c.id === id)!);
  res.status(200).json(status);
};

export default handler;
