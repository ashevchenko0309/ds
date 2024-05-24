import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/uiKit/ui/tabs.tsx";
import { Button } from "~/components/uiKit/ui/button.tsx";
import { Brush } from "lucide-react";
import FormSelect from "~/components/FormSelect/index.tsx";
import SubmitButton from "~/components/SubmitButton/index.tsx";
import CreateChartTable from "../../CreateChartTable";
import SQLTextArea from "../../SQLTextarea";
import ChartRadioGroup from "../../ChartRadioGroup";
import FormInput from "~/components/FormInput";
import { useFormContext } from "react-hook-form";

const EditChartContent = ({ setIsOpened }: { setIsOpened: (bool: boolean) => void }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [code, setCode] = useState("");

	const { getValues } = useFormContext();

	return (
		<Tabs defaultValue="sql" className="w-full">
			<TabsList>
				<TabsTrigger value="sql">SQL</TabsTrigger>
				<TabsTrigger value="easy-builder">Easy Builder</TabsTrigger>
			</TabsList>
			<TabsContent value="sql">
				<div className="flex gap-4 mb-8">
					<div className="flex-[1_1_50%]">
						<FormSelect
							name="connection"
							placeholder="Selected Connection"
							options={[
								{ value: "1", label: "1" },
								{ value: "2", label: "2" },
								{ value: "3", label: "3" }
							]}
						/>
					</div>

					<div className="flex-[1_1_50%]">
						<FormInput name="chartName" placeholder="Chart name" />
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
						value={code}
						setValue={setCode}
						isExpanded={isExpanded}
						onToggle={() => setIsExpanded(prev => !prev)}
					/>
				</div>

				<div className="mb-8">
					<Button className="w-32">
						Test query
					</Button>
				</div>

				<div className="flex gap-4 mb-4">
					<div className="flex-[1_1_50%]">
						<ChartRadioGroup name="chartType" value={getValues("chartType")} />
					</div>

					<div className="flex-[1_1_50%] border border-primary-200 rounded-md flex items-center justify-between px-3">
						<div className="text-md text-black/40 flex items-center gap-2">
							Colors:
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
						<FormSelect
							name="period"
							placeholder="Period"
							options={[
								{ value: "1-7", label: "Jan / Jul" },
								{ value: "2-8", label: "Feb / Aug" },
								{ value: "3-9", label: "Mar / Sep" }
							]}
						/>
					</div>
					<div className="flex-[1_1_50%]">
						<FormSelect
							name="capacity"
							placeholder="Capacity"
							options={[
								{ value: "-100to100", label: "-100 to 100" },
								{ value: "-50to50", label: "-50 to 50" }
							]}
						/>
					</div>
				</div>

				<div className="flex w-full gap-4">
					<Button
						className="h-10 flex-[1_1_50%]"
						variant="outline"
						onClick={() => setIsOpened(false)}
					>
						Discard changes
					</Button>
					<SubmitButton
						onSubmit={() => {
							setIsOpened(false);
							alert(JSON.stringify(getValues()))
						}}
						className="h-10 flex-[1_1_50%]"
					>
						Save changes
					</SubmitButton>
				</div>
			</TabsContent>
			<TabsContent value="easy-builder">Builder here.</TabsContent>
		</Tabs>
	)
}

export default EditChartContent;
