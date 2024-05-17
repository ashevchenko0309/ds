import { Button } from "~/components/uiKit/ui/button.tsx";
import { Checkbox } from "../uiKit/ui/checkbox";
import { Badge } from "../uiKit/ui/badge";
import { Input } from "../uiKit/ui/input";
import { Eye } from "lucide-react";
import FormInput from "../FormInput";
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../uiKit/ui/select";
import FormContainer from "../FormContainer";
import SubmitButton from "../SubmitButton";

const schema = z.object({
  databaseName: z.string().min(1, {
    message: "Database name must be at least 1 character.",
  }),
})

const UIKitElements = () => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col gap-5 bg-white p-10 w-[550px]">
          <Input placeholder="Database name" />
          <Input
            placeholder="Database name"
            endIcon={
              <Button
                size="icon"
                variant="ghost"
                onClick={() => alert("AS")}>
                <Eye size={12} />
              </Button>
            }
          />
          <FormContainer
            defaultValues={{ databaseName: "" }}
            schema={schema}
          >
            <FormInput
              name="databaseName"
              placeholder="Database name"
            />
            <SubmitButton onSubmit={() => alert("OK!")}>
              OK
            </SubmitButton>
          </FormContainer>

        </div>

        <div className="flex flex-col gap-5 bg-white p-10 w-[550px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Connection" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="duplicate">Duplicate</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="delete2">Delete2</SelectItem>
                <SelectItem value="delete3">Delete3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-[110px] m-5">
        <div className="flex flex-col gap-1">
          <Button>Add chart</Button>
          <Button disabled>Add chart</Button>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="outline">Add chart</Button>
          <Button variant="outline" disabled>Add chart</Button>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="destructive">Failed</Button>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="success">Success</Button>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="neutral">Test query</Button>
        </div>

        <div className="flex gap-3">
          <Checkbox />
          <Checkbox checked />
          <Checkbox disabled />
          <Checkbox disabled checked />
        </div>

        <div className="flex gap-3">
          <Badge />
          <Badge variant="success" />
          <Badge variant="destructive" />
        </div>
      </div>
    </>
  );
}

export default UIKitElements
