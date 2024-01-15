"use client";
import { useState, useEffect, useRef } from "react";
import { revalidate } from "./server-actions";

// 刷新时间: 秒
const REFRESH_INTERVAL = 60;

/**
 * 状态分组
 */
export default function Actions() {
  const [timeLeft, setTimeLeft] = useState(REFRESH_INTERVAL);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 1) {
      revalidate("/");
    }
  }, [timeLeft]);

  const toggleRefresh = (on: boolean) => {
    if (!on && intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
      return;
    }
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          const tt = t - 1;
          if (tt <= 0) {
            return REFRESH_INTERVAL;
          }
          return tt;
        });
      }, 1000);
    }
  };

  return (
    <div className="absolute top-12 right-12 card bg-base-100 shadow-md w-72 hidden md:block">
      <div className="card-body">
        <progress
          className="progress progress-success w-full"
          value={timeLeft}
          max={REFRESH_INTERVAL}
        ></progress>
        <div>
          <div className="flex justify-between">
            <span>自动刷新 {timeLeft}</span>
            <label className="swap">
              <input
                id="autoRefresh"
                type="checkbox"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  toggleRefresh(e.target.checked);
                }}
              />
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
