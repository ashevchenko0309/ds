import MockAdapter from "axios-mock-adapter";
import { apiInstance } from "../api/axiosInstance.ts";
import { Cell } from "../stores/GridLayoutStore.ts";
import { Connection, ConnectionStatus } from "../models/connections.ts";

const cells: Cell[] = [
  { id: "0", type: "chart", x: 0, y: 0, w: 8, h: 3 },
  { id: "1", type: "chart", x: 8, y: 0, w: 4, h: 3 },
  { id: "2", type: "chart", x: 0, y: 3, w: 12, h: 3 },
  { id: "3", type: "chart", x: 0, y: 6, w: 6, h: 3 },
  { id: "4", type: "chart", x: 6, y: 6, w: 6, h: 3 },
];

const connections: Connection[] = [
  {
    id: "0",
    name: "Connection 1",
    type: "s3",
    status: ConnectionStatus.ACTIVE,
  },
  {
    id: "1",
    name: "Connection 2",
    type: "postgres",
    status: ConnectionStatus.ACTIVE,
  },
  {
    id: "3",
    name: "Connection 3",
    type: "Snowflake",
    status: ConnectionStatus.ACTIVE,
  },
];

const mockServer = () => {
  const mock = new MockAdapter(apiInstance, { delayResponse: 300 });

  mock.onGet(/\/dashboards\/:\w\d:$/).reply(200, { cells });
  mock.onGet('/connections').reply(200, { items: connections, total: 3 });
  // mock.onGet(/\/connections\/:\w\d:$/).reply(200, { cells });

  mock.onAny().passThrough();
};

export default mockServer;
