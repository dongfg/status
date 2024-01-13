"use client";
import { useState } from "react";
import type { Result } from "@/service";
import { colors } from "@/service/query";

export interface DayStatusProps extends Result {}

/**
 * 每日状态
 */
export default function DayStatus(props: DayStatusProps) {
  const { day, status, logs } = props;
  const [logIdx, setLogIdx] = useState(0);
  const [logTime, setLogTime] = useState("");

  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className={`rounded-lg h-6 w-6 ${colors[status]}`}
      ></div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact min-w-64 w-fit p-2 m-2 shadow-md bg-base-100"
      >
        <div className="card-body">
          <span className="card-title whitespace-nowrap text-sm	">
            {day} {logTime}
          </span>
          <div className="divider my-1 h-px"></div>
          {/* 当日最近N次请求 */}
          <form className="flex flex-row space-x-2">
            {logs.map((l, idx) => (
              <input
                key={idx}
                type="radio"
                name="logs"
                checked={idx === logIdx}
                onChange={() => {
                  setLogIdx(idx);
                  setLogTime(l.time);
                }}
                className="radio radio-success radio-sm"
              />
            ))}
          </form>
          {logs && logs.length ? (
            (logs[logIdx].conditions || []).map((r, idx) => (
              <pre key={idx} className="whitespace-nowrap">
                {`${r.success ? "✓" : "x"} ~ ${r.condition}`}
              </pre>
            ))
          ) : (
            <pre>NO DATA</pre>
          )}
        </div>
      </div>
    </div>
  );
}
