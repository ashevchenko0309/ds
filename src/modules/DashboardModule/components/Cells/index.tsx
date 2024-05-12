import { FC } from "react";
import { Cell } from "../../../../shared/stores/GridLayoutStore.ts";
import ChartCell from "./ChartCell";

interface DashboardCellProps {
  cell: Cell;
}

const DashboardCell: FC<DashboardCellProps> = ({ cell }) => {
  if (cell.type === "chart") {
    return <ChartCell cell={cell} />;
  }

  return <div>unknown type: {cell.type}</div>;
};

interface DashboardCellContainerProps extends DashboardCellProps {
  onClone?: () => void;
}

const DashboardCellContainer: FC<DashboardCellContainerProps> = (props) => {
  return (
    <div className="bg-gray-200 shadow-2xl size-full">
      <DashboardCell {...props} />
      <button onClick={props.onClone}>Clone me</button>
    </div>
  );
};

export default DashboardCellContainer;
