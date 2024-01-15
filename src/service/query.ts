import { endpoints, results } from "./database";
import type { Endpoint, Result, Status } from "./index";

const MAX_DAYS = 30;

/**
 * 获取所有配置
 */
export const queryEndpoints = async (): Promise<Endpoint[]> => {
  const rows = await endpoints();
  return rows.sort((a, b) => a.id - b.id);
};

/**
 * 获取监控详情
 */
export const queryResults = async (key: string): Promise<Result[]> => {
  const all = await results(key);
  const dayResultMap = all.reduce<{ [key: string]: Result }>((prev, curr) => {
    prev[curr.day] = curr;
    return prev;
  }, {});
  const days = getDatesForLastNDays(MAX_DAYS);
  const rs: Result[] = [];
  for (const day of days) {
    const r = dayResultMap[formatDate(day)];
    if (r) {
      rs.push({ ...r, day: day.toDateString() });
    } else {
      rs.push({
        day: day.toDateString(),
        sla: 0,
        status: "nodata",
        logs: [],
      });
    }
  }
  return rs;
};

export const colors: { [key in Status]: string } = {
  success: "bg-success",
  partial: "bg-warning",
  failure: "bg-error",
  nodata: "bg-base-200",
};

/**
 * 获取最近N天
 */
const getDatesForLastNDays = (max: number) => {
  const now = new Date();
  const dates: Date[] = [];
  for (let i = 0; i < max; i++) {
    let currentDate = new Date(now);
    currentDate.setDate(now.getDate() - i);
    dates.push(new Date(currentDate));
  }
  return dates;
};

/**
 * 日期格式化
 * @returns yyyy-mm-dd 格式日期
 */
const formatDate = (d: Date): string => {
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
