import { FC } from "react";
import { Button, ButtonProps } from "../uiKit/ui/button";
import { useFormContext } from "react-hook-form";

type Props = ButtonProps & {
  onSubmit: () => void;
}

const SubmitButton: FC<Props> = ({ onSubmit, ...props }) => {
  const { handleSubmit } = useFormContext();

  return (
    <Button onClick={handleSubmit(onSubmit)} {...props} />
  )
}

export default SubmitButton;
