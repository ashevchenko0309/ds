import { FieldValues, Path, useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../uiKit/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../uiKit/ui/select";

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: Array<{ value: string; label: string }>
  description?: string;
  placeholder?: string;
  label?: string;
  error?: string;
};

const FormSelect = <T extends FieldValues>({
  name,
  placeholder,
  description,
  label,
  options,
  error = ""
}: FormSelectProps<T>) => {
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
          <Select
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger
                className="w-full"
                error={formState.errors?.[name]?.message as string ?? error}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map(({ value, label }) => (
                  <SelectItem value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelect;
