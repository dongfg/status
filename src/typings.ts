type MonitorType =
  | "GROUP"
  | "TEXT"
  | "PING"
  | "HTTP"
  | "HTTP-RAW"
  | "HTTP-JSON"
  | "CODING";

export enum MonitorStatus {
  Unknown = "unknown",
  Success = "success",
  Warning = "warning",
  Failed = "failed",
}

export type Config = {
  id: number;
  type: MonitorType;
  title: string;
  icon?: string;
  params?: Record<string, any>;
  children?: Config[];
  rowSpan?: number;
  colSpan?: number;
};

export type Status = {
  id: number;
  type: MonitorType;
  status: MonitorStatus;
  title: string;
  info?: string;
  icon?: string;
  result?: string;
  message?: string;
  children?: Status[] | null;
  rowSpan?: number;
  colSpan?: number;
};
