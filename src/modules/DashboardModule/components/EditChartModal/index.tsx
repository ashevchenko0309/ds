import { Button } from "~/components/uiKit/ui/button";
import EditChartContent from "./EditChartContent";
import { XIcon } from "lucide-react";

const EditChartModal = ({ setIsOpened }: { setIsOpened: (bool: boolean) => void }) => {
	return (
		<div className="flex">
			<div className="relative flex-[0_0_30%]">
				<div className="">
					<Button
						onClick={() => setIsOpened(false)}
						className="flex gap-1 text-black from-white to-white hover:text-white mt-4 ml-3 mb-16"
					>
						<XIcon
							size={16}
						/>
						<span>
							Close chart
						</span>
					</Button>
				</div>
				<div className="bg-[url('/src/images/chart-placeholder.svg')] h-[490px]">
					<div className="w-full h-full flex items-center justify-center font-semibold text-xl text-center">
						Add required control<br /> values to preview chart
					</div>
				</div>
			</div>
			<div className="flex-[0_0_70%] bg-white p-8">
				<div className="text-xl mb-8">
					<span className="italic text-black">
						Edit</span> <span className="font-semibold text-primary-900">Chart Name
					</span>
				</div>

				<EditChartContent setIsOpened={setIsOpened} />
			</div>
		</div >
	);
}

export default EditChartModal;