import { Button } from "~/components/uiKit/ui/button.tsx";
import { useEffect, useMemo, useState } from "react";
import { sample } from "lodash";
import { Check, Loader2, X } from "lucide-react";

const TestConnectionCell = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<"outline" | "destructive" | "success">("outline");

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setVariant(sample(["destructive", "success"]));

      setTimeout(() => {
        setVariant("outline");
      }, 1000);
    }, 1500);
  }, [isLoading]);

  const testText = useMemo(() => {
    switch (variant) {
      case "success":
        return "Success";
      case "destructive":
        return "Failed";
      default:
        return "Test connection";
    }
  }, [variant]);

  return (
    <div className="flex justify-end">
      <Button className="items-center gap-2" variant={variant} onClick={() => setIsLoading(true)} disabled={isLoading}>
        {isLoading && <Loader2 size='sm' className="animate-spin" />}
        {variant === "success" && <Check size='sm' />}
        {variant === "destructive" && <X size='sm' />}
        {testText}
      </Button>
    </div>
  );
};

export default TestConnectionCell;
