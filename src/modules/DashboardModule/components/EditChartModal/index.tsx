import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/uiKit/ui/tabs.tsx";
import { Input } from "~/components/uiKit/ui/input.tsx";
import { Button } from "~/components/uiKit/ui/button.tsx";
import { Brush } from "lucide-react";
import FormSelect from "~/components/FormSelect/index.tsx";
import FormContainer from "~/components/FormContainer/index.tsx";
import SubmitButton from "~/components/SubmitButton/index.tsx";
import * as yup from "yup";
import CreateChartTable from "../CreateChartTable";
import SQLTextArea from "../SQLTextarea";
import ChartRadioGroup from "../ChartRadioGroup";
import { useState } from "react";

const EditChartModal = ({ setIsOpened }: { setIsOpened: (bool: boolean) => void }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [code, setCode] = useState("");
	const [selectedChart, setSelectedChart] = useState("pie");

	return (
		<div className="flex">
			<div className="flex-[0_0_30%]">
				<div className="w-full h-full flex items-center justify-center font-semibold text-xl text-center">
					Add required control<br /> values to preview chart
				</div>
			</div>
			<div className="flex-[0_0_70%] bg-white p-8">
				<div className="text-xl mb-8">
					<span className="italic text-black">
						Edit</span> <span className="font-semibold text-primary-900">Chart Name
					</span>
				</div>
				<Tabs defaultValue="sql" className="w-full">
					<TabsList>
						<TabsTrigger value="sql">SQL</TabsTrigger>
						<TabsTrigger value="easy-builder">Easy Builder</TabsTrigger>
					</TabsList>
					<TabsContent value="sql">
						<FormContainer
							defaultValues={{ databaseName: "" }}
							schema={yup.object({
								databaseName: yup.string().min(1, "Database name must be at least 1 character."),
							})}
						>
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
									<Input placeholder="Chart name" />
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
									<ChartRadioGroup
										setSelected={setSelectedChart}
										selected={selectedChart}
									/>
								</div>

								<div className="flex-[1_1_50%] border border-primary-200 rounded-md flex items-center justify-between px-3">
									<div className="text-md text-black/40 flex items-center gap-2">
										Colors:
										{/* colors */}
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
									onSubmit={() => setIsOpened(false)}
									className="h-10 flex-[1_1_50%]"
								>
									Save changes
								</SubmitButton>
							</div>
						</FormContainer>
					</TabsContent>
					<TabsContent value="easy-builder">Builder here.</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default EditChartModal;