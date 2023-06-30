import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, loadConfig } from "@/utils/store";
import { check } from "@/utils/check";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 加载全部配置
  let config = await getConfig();
  if (!config) {
    config = await loadConfig();
  }
  const { id } = req.query;
  // 执行检查
  const block = config.find((c) => c.id == id);
  if (!block) {
    res.status(200).json({});
    return;
  }
  const status = await check(block);
  res.status(200).json(status);
};

export default handler;
