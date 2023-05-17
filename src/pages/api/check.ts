import { Config } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, loadConfig } from "@/utils/store";
import {
  pingCheck,
  httpCheck,
  httpRawCheck,
  httpJsonCheck,
} from "@/utils/check";

const check = async (config: Config) => {
  switch (config.type) {
    case "GROUP":
      break;
    case "TEXT":
      break;
    case "PING":
      return pingCheck(config);
    case "HTTP":
      return httpCheck(config);
    case "HTTP-RAW":
      return httpRawCheck(config);
    case "HTTP-JSON":
      return httpJsonCheck(config);
    case "CODING":
      break;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 加载全部配置
  let config = getConfig();
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
