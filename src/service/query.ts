import { cache } from "react";
import { endpoints, results } from "./database";
import type { Endpoint, Result, Status } from "./index";
import StopWatch from "@/utils/stopwatch";

const MAX_DAYS = 30;

/**
 * 获取所有配置
 */
export const queryEndpoints = cache(async (): Promise<Endpoint[]> => {
  const stopWatch = new StopWatch();
  stopWatch.start("DbQuery-endpoints");
  const rows = await endpoints();
  stopWatch.stop();
  stopWatch.start("SortById-endpoints");
  const rs = rows.sort((a, b) => a.id - b.id);
  stopWatch.stop();
  stopWatch.prettyPrint();
  return rs;
});

/**
 * 获取监控详情
 */
export const queryResults = cache(async (key: string): Promise<Result[]> => {
  const stopWatch = new StopWatch();
  stopWatch.start("DbQuery-results");
  const all = await results(key);
  stopWatch.stop();
  stopWatch.start("GroupByDay-results");
  const dayResultMap = all.reduce<{ [key: string]: Result }>((prev, curr) => {
    prev[curr.day] = curr;
    return prev;
  }, {});
  stopWatch.stop();
  stopWatch.start("FillNDays-results");
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
  stopWatch.stop();
  stopWatch.prettyPrint();
  return rs;
});

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
