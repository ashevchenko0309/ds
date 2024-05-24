import EditChartContent from "./EditChartContent";

const EditChartModal = ({ setIsOpened }: { setIsOpened: (bool: boolean) => void }) => {
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

				<EditChartContent setIsOpened={setIsOpened} />
			</div>
		</div >
	);
}

export default EditChartModal;