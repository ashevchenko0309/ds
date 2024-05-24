import { LucideIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "../uiKit/ui/button";
import { createPortal } from "react-dom";

const Modal = ({ isOpened, setIsOpened, text, icon, children }: PropsWithChildren & {
	icon?: LucideIcon;
	isOpened: boolean;
	setIsOpened: (bool: boolean) => void;
	text: string
}) => {
	const Icon = icon;

	return (
		<>
			{isOpened ? <></> : (
				<Button
					className="flex gap-1.5"
					onClick={() => setIsOpened(true)}
				>
					{Icon ? <Icon size={16} /> : <></>}
					{text}
				</Button>
			)}
			{isOpened && createPortal(
				<div className="absolute top-20 bottom-0 left-0 right-0 bg-white z-50">{children}</div>,
				document.body
			)}
		</>
	)
}

export default Modal;