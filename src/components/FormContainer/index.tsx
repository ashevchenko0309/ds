import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { Form } from "../uiKit/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup"

export interface BaseFormContainerProps<FormFields extends FieldValues> {
  // onSubmit: SubmitHandler<FormFields>;
  schema: yup.AnyObjectSchema;
  defaultValues: DefaultValues<FormFields>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
}

export interface FormContainerProps<T extends FieldValues> extends BaseFormContainerProps<T> {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const FormContainer = <T extends FieldValues>({
  children,
  schema,
  defaultValues,
  className = "",
}: FormContainerProps<T>) => {
  const form = useForm<T>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form className={className}>
          {children}
        </form>
      </Form>
    </>
  )
}

export default FormContainer;
