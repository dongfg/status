"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
            router.refresh();
            return REFRESH_INTERVAL;
          }
          return tt;
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {
    if (searchParams.get("refresh")) {
      setCountdown(true);
    }
  }, [searchParams]);

  return (
    <div className="absolute top-12 right-12 card bg-base-100 shadow-md w-72 hidden md:block">
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <span>Actions</span>
          <Link href="/admin">
            <Image
              src="/coding.gif"
              alt="coding gif"
              className="dark:invert cursor-pointer"
              height={24}
              width={40}
              priority
            />
          </Link>
        </h2>
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
