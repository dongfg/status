"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidate } from "./server-actions";

// 刷新时间: 秒
const REFRESH_INTERVAL = 60;

/**
 * 状态分组
 */
export default function Actions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(REFRESH_INTERVAL);
  const [countdown, setCountdown] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown) {
        setTimeLeft((t) => {
          const tt = t - 1;
          if (tt <= 1) {
            revalidate("/");
            router.refresh();
            return REFRESH_INTERVAL;
          }
          return tt;
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown, router]);

  useEffect(() => {
    if (searchParams.get("refresh")) {
      setCountdown(true);
    }
  }, [searchParams]);

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
                  setCountdown(e.target.checked);
                  if (e.target.checked) {
                    router.push("/?refresh=true", { scroll: false });
                  } else {
                    router.push("/", { scroll: false });
                  }
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
