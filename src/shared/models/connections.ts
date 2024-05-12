export enum ConnectionStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export interface Connection {
  id: string;
  name: string;
  type: "s3" | "postgres" | "Snowflake";
  status: ConnectionStatus;
}

export interface ConnectionsResponse {
  items: Connection[];
  total: number;
}
