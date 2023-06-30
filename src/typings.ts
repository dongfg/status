type MonitorType =
  | "GROUP"
  | "TEXT"
  | "PING"
  | "HTTP-STATUS"
  | "HTTP-RAW"
  | "HTTP-JSON"
  | "SSL-CERT"
  | "CODING";

export enum MonitorStatus {
  Unknown = "unknown",
  Success = "success",
  Warning = "warning",
  Failed = "failed",
}

export type Config = {
  id: string;
  type: MonitorType;
  title: string;
  icon?: string;
  params?: Record<string, any>;
  children?: Config[];
  rowSpan?: number;
  colSpan?: number;
};

export type Status = {
  id: string;
  type: MonitorType;
  status: MonitorStatus;
  title: string;
  info?: string;
  icon?: string;
  result?: string;
  message?: string;
  children?: Status[] | null;
  time?: string;
  rowSpan?: number;
  colSpan?: number;
};
