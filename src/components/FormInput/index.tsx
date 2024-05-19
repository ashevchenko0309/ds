import { FieldValues, Path, useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../uiKit/ui/form"
import { Input, InputProps } from "../uiKit/ui/input"

type FormInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  description?: string;
  label?: string;
};

const FormInput = <T extends FieldValues>({
  name,
  placeholder,
  description,
  label,
  startIcon,
  endIcon,
  error = ""
}: FormInputProps<T>) => {
  const { control } = useFormContext();
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              error={formState.errors?.[name]?.message as string ?? error}
              placeholder={placeholder}
              startIcon={startIcon}
              endIcon={endIcon}
              {...field}
            />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput;
