import { FC, useCallback, useEffect, useId, useState } from "react";
import { observer } from "mobx-react";
import { Cell as CellModel, useGridLayoutStore } from "../../shared/stores/GridLayoutStore.ts";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "../../shared/api/axiosInstance.ts";
import { DASHBOARDS_ENDPOINTS } from "../../shared/api/endpoints/dashboard.ts";
import { AxiosError, AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import Grid from "./components/Grid.tsx";
import useMount from "../../shared/hooks/useMount.ts";
import { GridStack } from "gridstack";
import { GridStackElement } from "gridstack/dist/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/uiKit/ui/tabs.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/uiKit/ui/select.tsx";
import { Input } from "~/components/uiKit/ui/input.tsx";
import { Button } from "~/components/uiKit/ui/button.tsx";
import BaseTable from "~/components/Tables/BaseTable/index.tsx";
import CreateChartTable from "./components/CreateChartTable/index.tsx";
import { AreaChart, BarChart, BarChartBig, ChevronDown, Grid3X3, LineChart, Brush, PieChart } from "lucide-react";
import { cn } from "~/lib/uiKit/utils.ts";
import SQLTextArea from "./components/SQLTextarea/index.tsx";
import ChartRadioGroup from "./components/ChartRadioGroup/index.tsx";

interface CellContentProps {
  id: string;
  onClone: () => void;
  onDelete: () => void;
  onInit: () => void;
}

const CellContent: FC<CellContentProps> = ({ onClone, onDelete, onInit, id }) => {
  useMount(onInit);

  return (
    <div className="p-4 h-full">
      <div className="bg-gray-200 h-full">
        CellContent
        <div>
          <button onClick={onClone}>Clone me</button>
        </div>
        <div>
          <button onClick={onDelete}>Delete me</button>
        </div>
        <b>Cell id is: {id}</b>
      </div>
    </div>
  );
};

interface CellProps {
  isInitialized: boolean;
  cell: CellModel;
  grid: GridStack | null;
}

// TODO: it should not be null
const Cell: FC<CellProps> = observer(({ cell, grid, isInitialized }) => {
  const { clone, onUpdateCells } = useGridLayoutStore();

  const onClone = useCallback(() => {
    clone(cell.id);
  }, [cell.id]);

  const onInitCell = useCallback(() => {
    if (cell._isCloned) {
      const clonedElement = document.querySelector('[data-cloned="true"]');
      if (!clonedElement) {
        return null;
      }
      clonedElement.setAttribute("data-cloned", "false");

      grid?.makeWidget(clonedElement as GridStackElement);
      grid?.compact("list", false);
      onUpdateCells(grid?.save(false) as CellModel[]);
    }
  }, [cell.id, cell._isCloned, grid]);

  const onDeleteCell = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    const elementToRemove = document.querySelector(`[gs-id='${cell.id}']`);
    if (!elementToRemove) {
      return;
    }

    grid?.removeWidget(elementToRemove as GridStackElement, false);
    onUpdateCells(grid?.save(false) as CellModel[]);
  }, [cell.id, grid, isInitialized]);

  return (
    <div
      className="grid-stack-item p-4"
      data-cloned={cell._isCloned}
      gs-id={cell.id}
      gs-w={cell.w}
      gs-h={cell.h}
      gs-x={cell.x}
      gs-y={cell.y}
    >
      <CellContent onClone={onClone} onInit={onInitCell} onDelete={onDeleteCell} id={cell.id} />
    </div>
  );
});

const DashboardModule = observer(() => {
  const dashboardId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState("pie");
  const { cells, initCells, onInitGrid } = useGridLayoutStore();
  const { data, isLoading, dataUpdatedAt } = useQuery<
    AxiosResponse<{ cells: CellModel[] }>,
    AxiosError,
    {
      cells: CellModel[];
    }
  >({
    queryKey: [DASHBOARDS_ENDPOINTS.get(dashboardId), dashboardId],
    queryFn: ({ signal }) => apiInstance.get(DASHBOARDS_ENDPOINTS.get(dashboardId), { signal }),
    select: (response) => response.data,
  });

  useEffect(() => {
    if (dataUpdatedAt && !isEmpty(data)) {
      initCells(data.cells);
    }
  }, [dataUpdatedAt, data, initCells]);

  const onChange = useCallback(() => { }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && !cells.length) {
    return <p>There is empty dashboard</p>;
  }

  return (
    <div>
      <div className="flex">
        <div className="flex-[0_0_30%]">
          <div className="w-full h-full flex items-center justify-center font-semibold text-xl text-center">
            Add required control<br /> values to preview chart
          </div>
        </div>
        <div className="flex-[0_0_70%] bg-white p-8">
          <div className="text-xl mb-8">
            <span className="italic text-black">
              Edit</span> <span className="font-semibold text-primary-900">Chart Name
            </span>
          </div>
          <Tabs defaultValue="sql" className="w-full">
            <TabsList>
              <TabsTrigger value="sql">SQL</TabsTrigger>
              <TabsTrigger value="easy-builder">Easy Builder</TabsTrigger>
            </TabsList>
            <TabsContent value="sql">
              <div className="flex gap-4 mb-8">
                <div className="flex-[1_1_50%]">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selected Connection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-[1_1_50%]">
                  <Input />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black">
                  Code editing area
                </h3>

                <Button
                  className=""
                  variant="neutral"
                >
                  Apply filter
                </Button>
              </div>

              <CreateChartTable />

              <div className="mb-3">
                <SQLTextArea
                  isExpanded={isExpanded}
                  onToggle={() => setIsExpanded(prev => !prev)}
                />
              </div>

              <div className="mb-8">
                <Button>
                  Test query
                </Button>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-[1_1_50%]">
                  <ChartRadioGroup
                    setSelected={setSelectedChart}
                    selected={selectedChart}
                  />
                </div>

                <div className="flex-[1_1_50%] border border-primary-200 rounded-md flex items-center justify-between px-3">
                  <div className="text-md text-black/40 flex items-center gap-2">
                    Colors:
                    {/* colors */}
                    <div className="flex gap-1">
                      {["darkblue", "purple", "cyan"].map(el => (
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: el }}
                        >
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="flex gap-1 p-0"
                  >
                    <Brush size={20} />
                    <span>
                      Pick color
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mb-12">
                <div className="flex-[1_1_50%]">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1-7">Jan / Jul</SelectItem>
                        <SelectItem value="2-8">Feb / Aug</SelectItem>
                        <SelectItem value="3-9">Mar / Sep</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-[1_1_50%]">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="-100to100">-100 to 100</SelectItem>
                        <SelectItem value="-50to50">-50 to 50</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex w-full gap-4">
                <Button
                  className="h-10 flex-[1_1_50%]"
                  variant="outline"
                >
                  Discard changes
                </Button>
                <Button className="h-10 flex-[1_1_50%]">
                  Save changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="easy-builder">Builder here.</TabsContent>
          </Tabs>
        </div>
      </div>
      {/* <Grid cells={cells} onInit={onInitGrid} onChange={onChange} cell={Cell} /> */}
    </div>
  );
});

export default DashboardModule;
