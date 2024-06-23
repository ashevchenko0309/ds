import { FC, useCallback } from "react";
import CodeMirror, { EditorView, lineNumbers } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { Button } from "~/components/uiKit/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/uiKit/utils";

type AreaProps = {
	value: string;
	setValue: (val: string) => void;
	onToggle: () => void;
	isExpanded: boolean;
}

const myTheme = EditorView.theme({
	// theme: 'dark',
	"&.cm-focused .cm-cursor": {
		borderLeftColor: 'rgb(var(--color-primary-0))',
	},
	".cm-scroller": {
		padding: "16px",
		background: "black",
		borderRadius: "6px",
		"&::-webkit-scrollbar": {
			width: "6px"
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "6px",
			border: "1px solid white	",
		}
	},
	".cm-content": { background: "black", color: 'rgb(var(--color-primary-0))', },
	".cm-gutters": { background: "black", borderColor: "black" },
	".cm-activeLineGutter": { background: "transparent" },
	".cm-editor": { padding: "16px", background: "black", lineHeight: "50px" },
	".cm-gutterElement": { fontSize: "14px" },
	".cm-line": { height: "34px" }
});

const SQLTextArea: FC<AreaProps> = ({ value, setValue, onToggle, isExpanded }) => {
	const height = isExpanded ? "460px" : "128px";
	const onChange = useCallback((val: string) => {
		console.log('val:', val);
		setValue(val);
	}, []);

	return (
		<div className="relative">
			<CodeMirror
				value={value}
				height={height}
				extensions={[
					sql({}),
					lineNumbers({ formatNumber: (number) => number < 10 ? `0${number}` : String(number) }),
				]}
				onChange={onChange}
				theme={myTheme}
			/>

			<Button
				onClick={onToggle}
				variant="ghost"
				className={cn(
					"text-white/50 text-sm absolute bottom-0 hover:bg-transparent hover:text-white",
					isExpanded ? "right-0" : "right-0"
				)}
			>
				{isExpanded ? "Minimize" : "Expand"} sql area
				<ChevronDown className={cn("color-white", isExpanded ? "rotate-180" : "")} />
			</Button>
		</div>
	)
}

export default SQLTextArea;