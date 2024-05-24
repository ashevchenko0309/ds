import { LucideIcon } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import { Button } from "../uiKit/ui/button";
import { createPortal } from "react-dom";
import FormContainer from "../FormContainer";
import * as yup from "yup";

type ModalProps = PropsWithChildren & {
	icon?: LucideIcon;
	isOpened: boolean;
	setIsOpened: (bool: boolean) => void;
	text: string;
	defaultValues: Record<string, unknown>;
	schema: yup.AnyObjectSchema
};

const Modal: FC<ModalProps> = ({
	isOpened,
	setIsOpened,
	text,
	icon,
	defaultValues,
	schema,
	children
}) => {
	const Icon = icon;

	return (
		<FormContainer
			defaultValues={defaultValues}
			schema={schema}
		>
			{isOpened
				? (
					<>
						{isOpened && createPortal(
							<div className="absolute top-20 bottom-0 left-0 right-0 bg-white z-50">
								{children}
							</div>,
							document.body
						)}
					</>
				)
				: (
					<Button
						className="flex gap-1.5"
						onClick={() => setIsOpened(true)}
					>
						{Icon ? <Icon size={16} /> : <></>}
						{text}
					</Button>
				)}
		</FormContainer>
	)
}

export default Modal;