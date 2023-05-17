import { Config, Status } from "@/typings";
import NodeCache from "node-cache";
import { promises as fs } from "fs";

const HISTORY_SIZE = 5;
const store = new NodeCache();

export default store;

export const loadConfig = async () => {
  const data = await fs.readFile(process.cwd() + "/config.json", "utf8");
  const config = JSON.parse(data) as Config[];
  store.set("config", config);
  return config;
};

export const getConfig = () => {
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
