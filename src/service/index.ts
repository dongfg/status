export type Status = "nodata" | "success" | "failure" | "partial";
export type Endpoint = {
  key: string;
  name: string;
  url?: string;
  desc?: string;
  sla: number;
  status: Status;
};

export type Result = {
  day: string;
  sla: number;
  status: Status;
  logs: ConditionLog[];
};

export type ConditionLog = {
  time: string;
  conditions: ConditionResult[];
};

type ConditionResult = {
  condition: string;
  success: boolean;
};
