import { Cell } from "../../../../../shared/stores/GridLayoutStore.ts";
import { FC } from "react";

interface ChartCellProps {
  cell: Cell
}

const ChartCell: FC<ChartCellProps> = ({ cell }) => {
  return <div>Hello! Im a chart cell: {cell.id}</div>;
}

export default ChartCell
