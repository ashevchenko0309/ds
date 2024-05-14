import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/uiKit/utils"
import { Check } from "lucide-react";
import ExclamationMark from "~/components/icons/ExclamationMark";

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "h-3.5 w-3.5 text-[#D9D9D9] bg-[#F0F0F0]",
        destructive:
          "h-3.5 w-3.5 text-white bg-gradient-to-r from-error-100 to-error-900",
        success:
          "bg-gradient-to-r from-success-100 to-success-900",
      },
      size: {
        default: "h-5 w-5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const icons = {
  default: <Check className="h-3.5 w-3.5" color="#D9D9D9" />,
  success: <Check className="h-3.5 w-3.5" color="white" />,
  destructive: <ExclamationMark />,
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant && icons[variant]}
    </div>
  )
}

export { Badge, badgeVariants }
