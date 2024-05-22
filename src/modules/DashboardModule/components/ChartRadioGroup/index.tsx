import { AreaChart, BarChartBig, Grid3X3, LineChart, PieChart } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/uiKit/ui/button";
import { cn } from "~/lib/uiKit/utils";

const types = [
	{
		label: "line",
		icon: <LineChart className="stroke-1" />
	},
	{
		label: "bars",
		icon: <BarChartBig className="stroke-1" />
	},
	{
		label: "pie",
		icon: <PieChart className="stroke-1" />
	},
	{
		label: "area",
		icon: <AreaChart className="stroke-1" />
	},
	{
		label: "grid",
		icon: <Grid3X3 className="stroke-1" />
	},
];

type ChartRadioGroupProps = {
	selected: string,
	setSelected: (sel: string) => void;
}

const ChartRadioGroup: FC<ChartRadioGroupProps> = ({ selected, setSelected }) => {
	return (
		<div className="flex gap-1">
			{types.map(({ label, icon }) => {
				return (
					<Button
						variant="outline"
						className={cn(
							"w-full h-10 hover:bg-primary-200 hover:border-transparent",
							label === selected ? "bg-primary-100 border-transparent" : "bg-transparent border-primary-200"
						)}
						onClick={() => setSelected(label)}
					>
						{icon}
					</Button>
				)
			})}
		</div>
	)
}

export default ChartRadioGroup;