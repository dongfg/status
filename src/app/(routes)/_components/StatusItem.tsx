import { Suspense } from "react";
import type { Endpoint, Result } from "@/service";
import DayStatus from "./DayStatus";

export interface StatusItemProps extends Omit<Endpoint, "key"> {
  endpoint: string;
  results: Result[];
}

export default async function StatusItem(props: StatusItemProps) {
  const { name, url, desc, sla, results } = props;
  return (
    <div className="card card-bordered min-h-full rounded">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="flex flex-row justify-between items-center">
          {url ? (
            <a
              href={url || "#"}
              target="_blank"
              className="pointer-events-none md:pointer-events-auto"
            >
              {desc || url}
            </a>
          ) : (
            <span>{desc}</span>
          )}
          <div className="hidden md:block">{sla}% in the last 30 days</div>
        </div>
        <div className="grid grid-cols-10 gap-2 md:grid-cols-[repeat(30,_minmax(0,_1fr))] md:gap-2">
          {results.map(({ key: _, ...r }, idx) => (
            <Suspense
              key={r.day}
              fallback={<div className={`rounded-lg h-6 w-6 bg-base-200`} />}
            >
              <DayStatus key={idx} {...r} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}
