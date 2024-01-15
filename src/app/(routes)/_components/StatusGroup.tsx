import type { Endpoint } from "@/service";
import { queryAllResults } from "@/service/query";
import StatusItem from "./StatusItem";

export interface StatusGroupProps {
  name: string;
  endpoints: Endpoint[];
}

/**
 * 状态分组
 */
export default async function StatusGroup(props: StatusGroupProps) {
  const { name, endpoints } = props;
  const allResults = await queryAllResults();
  return (
    <div className="card bg-base-100 md:shadow-md w-full md:w-3/5">
      <div className="card-body">
        <h2 className="card-title flex justify-between ">{name}</h2>
        <div className="divider my-1"></div>
        {endpoints.map((e) => (
          <StatusItem
            {...e}
            key={e.key}
            endpoint={e.key}
            results={allResults[e.key]}
          />
        ))}
      </div>
    </div>
  );
}
