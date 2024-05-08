import { FC, useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import { useMediaQuery } from "usehooks-ts";
import { Cell } from "../../../shared/stores/GridLayoutStore.ts";

interface GridProps {
  cells: Cell[];
  onChange?: (cells: Cell[]) => void;
  cell: FC<{ cell: Cell; grid: GridStack | null; isInitialized: boolean }>;
  onInit?: (grid: GridStack | null) => void;
}

const Grid: FC<GridProps> = ({ cells, onChange, cell: CellRenderer, onInit }) => {
  const gridRef = useRef<GridStack | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isDesktopSize = useMediaQuery("(min-width: 1366px)");
  const isMobileSize = useMediaQuery("(min-width: 0px)");

  useEffect(() => {
    gridRef.current = GridStack.init(
      {
        column: 12,
        alwaysShowResizeHandle: true,
        columnOpts: {
          breakpointForWindow: true,
          breakpoints: [
            {
              w: 1024,
              c: 1,
            },
          ],
        },
        margin: 8,
      },
      ".controlled"
    );
    setIsInitialized(true);
    onInit?.(gridRef.current);

    if (!gridRef.current) {
      throw new Error("Cannot initialize grid");
    }

    gridRef.current.on("change", () => {
      const cells = gridRef.current?.save(false) as Cell[];
      onChange?.(cells);
    });

    return () => {
      gridRef.current?.offAll();
    };
  }, [onChange, onInit]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current?.enableResize(isDesktopSize);

      if (isDesktopSize) {
        gridRef.current?.cellHeight("auto");
      } else {
        gridRef.current?.cellHeight(300);
      }
    }
  }, [isMobileSize, isDesktopSize]);

  return (
    <div className="size-full">
      <div className="grid-stack controlled">
        {cells?.map((cell) => (
          <CellRenderer grid={gridRef.current} cell={cell} key={cell.id} isInitialized={isInitialized} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
