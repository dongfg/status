"use client";
import { usePullToRefresh } from "use-pull-to-refresh";
import { revalidate } from "./server-actions";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;

export default function PullToRefresh() {
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: () => revalidate("/"),
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  return (
    <div
      style={{
        top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
        opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
      }}
      className="bg-base-100 fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
    >
      <div
        className={`h-full w-full ${isRefreshing ? "animate-spin" : ""}`}
        style={!isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}}
      ></div>
    </div>
  );
}
