import MockAdapter from "axios-mock-adapter";
import { apiInstance } from "../api/axiosInstance.ts";
import { Cell } from "../stores/GridLayoutStore.ts";
import { groupBy } from "lodash";

const cells: Cell[] = [
  { id: '0', type: 'chart', x: 0, y: 0, w: 8, h: 3 },
  { id: '1', type: 'chart', x: 8, y: 0, w: 4, h: 3 },
  { id: '2', type: 'chart', x: 0, y: 3, w: 12, h: 3 },
  { id: '3', type: 'chart', x: 0, y: 6, w: 6, h: 3 },
  { id: '4', type: 'chart', x: 6, y: 6, w: 6, h: 3 },
];
// configuration
const config = { xAxis: 'date', yAxis: 'count', groupBy: 'biom' }

// Response from server
const dataset = [{ biom: 'Forest', count: 320, date: '2012' }, { biom: 'Steppe', count: 220, date: '2013' }, { biom: 'Forest', count: 332, date: '2014' }]

groupBy(dataset, config.groupBy)

// Final result
// [
//   {
//     name: 'Forest',
//     type: 'bar',
//     barGap: 0,
//     label: labelOption,
//     emphasis: {
//       focus: 'series'
//     },
//     data: [320, 332, 301, 334, 390]
//   },
//   {
//     name: 'Steppe',
//     type: 'bar',
//     label: labelOption,
//     emphasis: {
//       focus: 'series'
//     },
//     data: [220, 182, 191, 234, 290]
//   },
//   {
//     name: 'Desert',
//     type: 'bar',
//     label: labelOption,
//     emphasis: {
//       focus: 'series'
//     },
//     data: [150, 232, 201, 154, 190]
//   },
//   {
//     name: 'Wetland',
//     type: 'bar',
//     label: labelOption,
//     emphasis: {
//       focus: 'series'
//     },
//     data: [98, 77, 101, 99, 40]
//   }
// ]

// const settings = [{
//   xAxis: 'date',
//   yAxis: 'salary', // yAxis: 'subscriptionCount'
// }]
//
// const data = [
//   {
//     date: 'Mon',
//     value: 820,
//   },
//   {
//     date: 'Mon',
//     value: 820,
//   }
// ]

const mockServer = () => {
  const mock = new MockAdapter(apiInstance, { delayResponse: 300 });

  mock.onGet(/\/dashboards\/:\w\d:$/).reply(200, { cells });

  mock.onAny().passThrough();
};

export default mockServer;
