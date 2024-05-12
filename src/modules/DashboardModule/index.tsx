import { FC, useCallback, useEffect, useId } from "react";
import { observer } from "mobx-react";
import { Cell as CellModel, useGridLayoutStore } from "../../shared/stores/GridLayoutStore.ts";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "../../shared/api/axiosInstance.ts";
import { DASHBOARD_ENDPOINTS } from "../../shared/api/endpoints/dashboard.ts";
import { AxiosError, AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import Grid from "./components/Grid.tsx";
import useMount from "../../shared/hooks/useMount.ts";
import { GridStack } from "gridstack";

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

// TODO: it should not be null
const Cell: FC<{ isInitialized: boolean; cell: CellModel; grid: GridStack | null }> = observer(({ cell, grid, isInitialized }) => {
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

      grid?.makeWidget(clonedElement);
      grid?.compact("list", false);
      onUpdateCells(grid?.save(false) as CellModel[]);
    }
  }, [cell.id, cell._isCloned, grid]);

  const onDeleteCell = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    grid?.removeWidget(document.querySelector(`[gs-id='${cell.id}']`), false)
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
  const { cells, initCells, onInitGrid, onUpdateCells } = useGridLayoutStore();
  const { data, isLoading, dataUpdatedAt } = useQuery<
    AxiosResponse<{ cells: CellModel[] }>,
    AxiosError,
    {
      cells: CellModel[];
    }
  >({
    queryKey: [DASHBOARD_ENDPOINTS.get(dashboardId), dashboardId],
    queryFn: ({ signal }) => apiInstance.get(DASHBOARD_ENDPOINTS.get(dashboardId), { signal }),
    select: (response) => response.data,
  });

  useEffect(() => {
    if (dataUpdatedAt && !isEmpty(data)) {
      initCells(data.cells);
    }
  }, [dataUpdatedAt, data, initCells]);

  /**/ // const onGridChange = useMemo(
  /**/ //   () =>
  /**/ //     throttle(
  /**/ //       (cells: Cell[]) => {
  /**/ //         console.log("throttled cb: ", cells);
  /**/ //       },
  /**/ //       2500,
  /**/ //       { leading: false, trailing: true }
  /**/ //     ),
  /**/ //   []
  /**/ // );

  /**/ // useEffect(() => {
  /**/ //   if (haveCellsReady) {
  /**/ //     gridRef.current =  GridStack.init({
  /**/ //       column: 12,
  /**/ //       alwaysShowResizeHandle: false,
  /**/ //       // cellHeight: 100,
  /**/ //       auto: true,
  /**/ //       columnOpts: {
  /**/ //         breakpointForWindow: true,
  /**/ //         breakpoints: [
  /**/ //           {
  /**/ //             w: 1024,
  /**/ //             c: 1,
  /**/ //           },
  /**/ //         ],
  /**/ //       },
  /**/ //       margin: 8,
  /**/ //     }, ".controlled");
  /**/ //
  /**/ //     gridRef.current?.on("change", () => {
  /**/ //       const cells = gridRef.current?.save(false) as Cell[];
  /**/ //       onUpdateCells(cells);
  /**/ //       onGridChange(cells);
  /**/ //     });
  /**/ //   }
  /**/ //
  /**/ //   return () => {
  /**/ //     gridRef.current?.offAll();
  /**/ //   };
  /**/ // }, [init, onGridChange, haveCellsReady, onUpdateCells]);

  /*  useEffect(() => {
      if (!gridRef.current) {
        return;
      }

      gridRef.current?.enableResize(isDesktopSize);
    }, [isDesktopSize]);*/

  const onChange = useCallback(() => {

  }, [])

  const onRemove = useCallback((cells: CellModel[]) => {
    onUpdateCells(cells)
    // deleteCell(cell.id)
  }, [])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && !cells.length) {
    return <p>There is empty dashboard</p>;
  }

  // if (Object.keys(refs.current).length !== cells.length) {
  //   cells.forEach(({ id }) => {
  //     refs.current[id] = refs.current[id] || createRef();
  //   });
  // }

  console.log(cells);

 
  return (
    <div>
      <Grid cells={cells} onInit={onInitGrid} onChange={onChange} cell={Cell} onRemove={onRemove} />
      {/*<div className="size-full">*/}
      {/*  <div className="grid-stack controlled">*/}
      {/*    {cells?.map((cell, index) => (*/}
      {/*      <div*/}
      {/*        key={cell.id}*/}
      {/*        className="grid-stack-item"*/}
      {/*        gs-id={cell.id}*/}
      {/*        gs-w={cell.w}*/}
      {/*        gs-h={cell.h}*/}
      {/*        gs-x={cell.x}*/}
      {/*        gs-y={cell.y}*/}
      {/*        data-index={index}*/}
      {/*      >*/}
      {/*        <div className="grid-stack-item-content">*/}
      {/*          /!* Render fn *!/*/}
      {/*          <DashboardCell cell={cell} onClone={onClone(cell.id)} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
});

export default DashboardModule;
