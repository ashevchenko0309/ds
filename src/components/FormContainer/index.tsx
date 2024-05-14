import { DefaultValues, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../uiKit/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

export interface BaseFormContainerProps<FormFields extends FieldValues> {
  onSubmit: SubmitHandler<FormFields>;
  schema: z.Schema;
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
  onSubmit,
  defaultValues,
  className = "",
}: FormContainerProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form
          className={className}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </Form>
    </>
  )
}

export default FormContainer;
