import { FC } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/uiKit/ui/button";
import { cn } from "~/lib/uiKit/utils";

type AreaProps = {
	onToggle: () => void;
	isExpanded: boolean;
}

const SQLTextArea: FC<AreaProps> = ({ onToggle, isExpanded }) => {
	const height = isExpanded ? "h-expanded-textarea" : "h-32";

	return (
		<div className={cn("relative", height)}>
			<textarea
				className={cn("bg-primary-800 text-white/50 text-md rounded-md p-4 w-full", height)}
				name=""
				id=""
			/>
			<Button
				onClick={onToggle}
				// () => setIsExpanded(prev => !prev)}
				variant="ghost"
				className="text-white/50 text-sm absolute bottom-0 right-0 hover:bg-transparent hover:text-white"
			>
				{isExpanded ? "Minimize" : "Expand"} sql area
				<ChevronDown className={isExpanded ? "rotate-180" : ""} />
			</Button>
		</div>
	)
}

export default SQLTextArea;