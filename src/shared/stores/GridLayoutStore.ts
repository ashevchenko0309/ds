import { action, computed, makeObservable, observable, toJS } from "mobx";
import { GridStack } from "gridstack";
import { GridStackElement, GridStackOptions } from "gridstack/dist/types";
import { createContext, useContext } from "react";
import { maxBy } from "lodash";
import Cells from "../../modules/DashboardModule/components/Cells";

type CellType = "chart" | "title";

export interface CellPosition {
  x?: number;
  y?: number;
}

export interface CellSize {
  w?: number;
  h?: number;
}

export interface Cell extends CellPosition, CellSize {
  id: string;
  type: CellType;
}

interface CellSizeChangeOptions extends CellPosition, CellSize {
  index: number;
}

interface GridLayoutStoreConstructor extends GridStackOptions {
  element: GridStackElement;
}

export class GridLayoutStore {
  private _grid: GridStack | null = null;
  @observable private _cells: Cell[] = [];
  @observable lastUpdated: number | null = null;

  @observable haveCellsReady: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  initCells(cells: Cell[]) {
    this._cells = observable.array(cells);
    this.lastUpdated = Date.now();
    this.haveCellsReady = true
  }

  @action.bound
  onUpdateCells(cells: Cell[]) {
    this._cells = observable.array(cells);
  }

  @action.bound
  init({ element, ...options }: GridLayoutStoreConstructor) {
    this._grid = GridStack.init(
      {
        ...options,
        column: 12,
        alwaysShowResizeHandle: false,
        // cellHeight: 100,
        auto: true,
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
      element
    );

    this._grid.cellHeight(200);

    return this._grid;
  }

  @action.bound
  clone(fromId: string): Cell[] {
    if(!this._grid) {
      throw new Error('GridStack should be initialized before!')
    }
    const fromCell = this._cells.find((c) => c.id === fromId) as Cell;
    const currentLastId = Number(maxBy(this._cells, "id")?.id  ?? 0);
    const offset = (fromCell?.x ?? 0) + (fromCell?.w ?? 0);
    const newCell: Cell = {
      id: String(currentLastId + 1),
      type: fromCell.type,
    };

    if(typeof fromCell.y !== "number" || typeof fromCell.x !== "number") {
      this._cells.push({
        w: fromCell.w,
        h: fromCell.h,
        type: fromCell.type,
        id: String(currentLastId + 1),
      });


      this.lastUpdated = Date.now();
      return this._cells;
    }

    let y = fromCell.y;
    if(12 / 2 < offset) {
      newCell.y = y = y + 3
    } else {
      newCell.y = y;
    }

    if(y > (fromCell?.y ?? 0)) {
      newCell.x = 0;
    } else {
      newCell.x = fromCell.x;
    }

    this._cells.push({
      x: newCell.x,
      y: newCell.y,
      w: fromCell.w,
      h: fromCell.h,
      type: fromCell.type,
      id: String(currentLastId + 1),
    });


    this.lastUpdated = Date.now();
    return this._cells;
  }

  @action.bound
  updateCellSize({ index, ...options }: CellSizeChangeOptions) {
    const { type, id } = this._cells[index];
    this._cells[index] = {
      id,
      type,
      ...options,
    };

    this.lastUpdated = Date.now();
    console.log(this.lastUpdated);
    return this._cells;
  }

  @computed
  get cells() {
    return this._cells;
  }

  @computed
  get jsCells() {
    return toJS(this._cells);
  }

  get grid() {
    return this._grid;
  }
}

export const GridLayoutStoreContext = createContext<GridLayoutStore>(new GridLayoutStore());
export const useGridLayoutStore = () => useContext(GridLayoutStoreContext);
