import type { Endpoint } from "@/service";
import { queryResults } from "@/service/query";
import DayStatus from "./DayStatus";

export interface StatusItemProps extends Endpoint {
  endpoint: string;
}

export default async function StatusItem(props: StatusItemProps) {
  const { endpoint, name, url, desc, sla } = props;
  const results = await queryResults(endpoint);
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
          {results.map((r, idx) => (
            <DayStatus {...r} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
