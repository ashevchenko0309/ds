import { AreaChart, BarChartBig, Grid3X3, LineChart, PieChart } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/uiKit/ui/button";
import { FormField } from "~/components/uiKit/ui/form";
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
	name: string;
	value: string,
}

const ChartRadioGroup: FC<ChartRadioGroupProps> = ({ name }) => {
	const { control, setValue } = useFormContext();

	return (
		<div className="flex gap-1">
			{types.map(({ label, icon }) => {
				return (
					<FormField
						control={control}
						name={name}
						render={({ field }) => (
							<Button
								variant="outline"
								className={cn(
									"w-full h-10 hover:bg-primary-200 hover:border-transparent",
									label === field.value ? "bg-primary-100 border-transparent" : "bg-transparent border-primary-200"
								)}
								onClick={() => setValue(name, label)}
							>
								{icon}
							</Button>
						)}
					>
					</FormField>
				)
			})}
		</div>
	)
}

export default ChartRadioGroup;