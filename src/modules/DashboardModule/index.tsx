import { createRef, LegacyRef, useEffect, useId, useMemo, useRef } from "react";
import { observer } from "mobx-react";
import { Cell, useGridLayoutStore } from "../../shared/stores/GridLayoutStore.ts";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "../../shared/api/axiosInstance.ts";
import { DASHBOARD_ENDPOINTS } from "../../shared/api/endpoints/dashboard.ts";
import { AxiosError, AxiosResponse } from "axios";
import DashboardCell from "./components/Cells";
import { useMediaQuery } from "usehooks-ts";
import { GridStack } from "gridstack";
import throttle from "lodash/throttle";

const DashboardModule = observer(() => {
  const dashboardId = useId();
  const { init, cells, jsCells, clone, initCells, onUpdateCells, haveCellsReady, lastUpdated } = useGridLayoutStore();
  const isDesktopSize = useMediaQuery("(min-width: 1366px)");
  const isMobileSize = useMediaQuery("(min-width: 0px)");
  const gridRef = useRef<GridStack | null>(null);
  const refs = useRef<Record<string, LegacyRef<HTMLDivElement>>>({})
  const { data, isFetched, isLoading } = useQuery<AxiosResponse<{ cells: Cell[] }>, AxiosError, { cells: Cell[] }>({
    queryKey: [DASHBOARD_ENDPOINTS.get(dashboardId), dashboardId],
    queryFn: ({ signal }) => apiInstance.get(DASHBOARD_ENDPOINTS.get(dashboardId), { signal }),
    select: (response) => response.data,
  });

  useEffect(() => {
    if(gridRef.current) {
      if(isDesktopSize) {
        gridRef.current?.cellHeight('auto')
      } else {
        gridRef.current?.cellHeight(300)
      }
    }

  }, [isMobileSize, isDesktopSize]);

  // useEffect(() => {
  //   if(!gridRef.current) {
  //     return;
  //   }
  //
  //   gridRef.current.batchUpdate()
  //   gridRef.current.removeAll(false)
  //   cells.forEach(({ id }) => {
  //     console.log(refs.current[id]);
  //     gridRef.current!.makeWidget(refs.current[id].current)
  //   })
  //   gridRef.current?.compact('compact')
  //   gridRef.current.batchUpdate(false)
  //   debugger
  //   // onUpdateCells(gridRef.current?.save(false) as Cell[])
  // }, [cells, lastUpdated]);

  useEffect(() => {
    if (isFetched && data) {
      initCells(data.cells);
    }
  }, [isFetched, data, initCells]);

  const onGridChange = useMemo(
    () =>
      throttle((cells: Cell[]) => {
        console.log("throttled cb: ", cells);
      }, 2500, { leading: false, trailing: true }),
    []
  );

  useEffect(() => {
    if (haveCellsReady) {
      gridRef.current = init({
        element: ".controlled",
      });

      gridRef.current?.on('added')
      gridRef.current?.on('change', () => {
        const cells = gridRef.current?.save(false) as Cell[];
        onUpdateCells(cells)
        onGridChange(cells)
      })
    }

    return () => {
      gridRef.current?.offAll();
    };
  }, [init, onGridChange, haveCellsReady, onUpdateCells]);

  useEffect(() => {
    if (!gridRef.current) {
      return;
    }

    gridRef.current?.enableResize(isDesktopSize);
  }, [isDesktopSize]);

  const onClone = (cellId: string) => () => {
    clone(cellId)
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if(!isLoading && !jsCells.length) {
    return <p>There is empty dashboard</p>
  }

  if (Object.keys(refs.current).length !== cells.length) {
    cells.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  return (
    <div>
      <div className="size-full">
        <div className="grid-stack controlled">
          {cells?.map((cell, index) => (
            <div ref={refs.current[cell.id]} key={cell.id} className="grid-stack-item" data-cloned={cell.cloned} gs-id={cell.id} gs-w={cell.w} gs-h={cell.h} gs-x={cell.x} gs-y={cell.y} data-index={index}>
              <div className="grid-stack-item-content">
                <DashboardCell cell={cell} onClone={onClone(cell.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default DashboardModule;
