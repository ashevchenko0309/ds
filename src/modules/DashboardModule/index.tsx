import { FC, useCallback, useEffect, useId } from "react";
import { observer } from "mobx-react";
import { Cell as CellModel, useGridLayoutStore } from "../../shared/stores/GridLayoutStore.ts";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "../../shared/api/axiosInstance.ts";
import { DASHBOARDS_ENDPOINTS } from "../../shared/api/endpoints/dashboard.ts";
import { AxiosError, AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import useMount from "../../shared/hooks/useMount.ts";
import { GridStack } from "gridstack";
import { GridStackElement } from "gridstack/dist/types";
import Grid from "./components/Grid.tsx";
// import Modal from "~/components/Modal/index.tsx";
// import EditChartModal from "./components/EditChartModal/index.tsx";
// import { Plus } from "lucide-react";
// import * as yup from "yup";

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
  // const [isOpened, setIsOpened] = useState(false);
  const dashboardId = useId();
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
      {/* <div className="w-full mt-32 flex flex-col items-center justify-center">
        <span className="font-semibold text-2xl text-center max-w-[576px] mb-8">
          It looks like you don't have any charts yet, let's create one together!
        </span>

        <Modal
          defaultValues={{ chartName: "", capacity: "", period: "", chartType: "pie" }}
          schema={yup.object({
            chartName: yup.string().min(1, "Chart name must be at least 1 character."),
          })}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          icon={Plus}
          text="Add chart"
        >
          <EditChartModal setIsOpened={setIsOpened} />
        </Modal>
      </div> */}

      <Grid cells={cells} onInit={onInitGrid} onChange={onChange} cell={Cell} />
    </div>
  );
});


export default DashboardModule;
