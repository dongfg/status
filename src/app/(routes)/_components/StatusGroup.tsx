import type { Endpoint } from "@/service";
import StatusItem from "./StatusItem";

export interface StatusGroupProps {
  name: string;
  endpoints: Endpoint[];
}

/**
 * 状态分组
 */
export default function StatusGroup(props: StatusGroupProps) {
  const { name, endpoints } = props;
  return (
    <div className="card bg-base-100 shadow-md w-3/5">
      <div className="card-body">
        <h2 className="card-title flex justify-between ">{name}</h2>
        <div className="divider my-1"></div>
        {endpoints.map((e) => (
          <StatusItem {...e} key={e.key} endpoint={e.key} />
        ))}
      </div>
    </div>
  );
}
