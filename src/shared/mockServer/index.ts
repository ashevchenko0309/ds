import MockAdapter from "axios-mock-adapter";
import { apiInstance } from "../api/axiosInstance.ts";
import { Cell } from "../stores/GridLayoutStore.ts";

const cells: Cell[] = [
  { id: 10, type: 'chart', x: 0, y: 0, w: 8, h: 3 },
  { id: 2, type: 'chart', x: 8, y: 0, w: 4, h: 3 },
  { id: 3, type: 'chart', x: 0, y: 3, w: 12, h: 3 },
  { id: 4, type: 'chart', x: 0, y: 6, w: 6, h: 3 },
  { id: 5, type: 'chart', x: 6, y: 6, w: 6, h: 3 },
];

const mockServer = () => {
  const mock = new MockAdapter(apiInstance, { delayResponse: 300 });

  mock.onGet(/\/dashboards\/:\w\d:$/).reply(200, { cells });

  mock.onAny().passThrough();
};

export default mockServer;
