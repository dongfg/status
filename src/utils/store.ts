import { Config, Status } from "@/typings";
import NodeCache from "node-cache";
import { promises as fs } from "fs";
import path from "path";

const HISTORY_SIZE = 5;
const store = new NodeCache();

const hashCode = (input: string) => {
  let hash = 0,
    i,
    chr;
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const loadConfig = async () => {
  const data = await fs.readFile(
    path.resolve("./public") + "/config.json",
    "utf8"
  );
  const config = JSON.parse(data) as Config[];
  store.set("config", config);
  const stats = await fs.stat(path.resolve("./public") + "/config.json");
  store.set("mtimeMs", stats.mtimeMs);
  return config;
};

export const getConfig = async () => {
  const stats = await fs.stat(path.resolve("./public") + "/config.json");
  if (store.has("mtimeMs") && store.get<number>("mtimeMs") !== stats.mtimeMs) {
    // 数据修改后不返回缓存数据
    return undefined;
  }
  return store.get<Config[]>("config");
};

export const saveStatus = (id: number, status: Status) => {
  const key = `id_${id}`;
  let values: Status[];
  if (store.has(key)) {
    values = store.get<Status[]>(key)!;
  } else {
    values = [];
  }
  values.push(status);
  if (values.length > HISTORY_SIZE) {
    values.slice(-HISTORY_SIZE);
  }
  store.set(key, values);
  return values;
};

export default store;
