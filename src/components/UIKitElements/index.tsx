import { Button } from "~/components/ui/button";

const UIKitElements = () => {
  return (
    <>
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
      </div>
    </>
  );
}

export default UIKitElements
