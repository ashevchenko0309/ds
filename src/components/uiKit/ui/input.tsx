import * as React from "react"

import { cn } from "~/lib/uiKit/utils"
import { Badge } from "./badge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, error, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
    return (
      <div className="relative">
        {StartIcon && (
          <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5">
            {StartIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2.5 text-md file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:placeholder:text-gray-400",
            error ? "border-error-100" : "border-primary-200 focus:border-primary-900/40",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5">
          {error
            ? <Badge variant="destructive" />
            : EndIcon ?? <></>
          }
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
