import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value in the range 0-100 */
  value: number;
  /** Optional className for the outer container */
  className?: string;
}

export function Progress({ value, className, ...props }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "h-2 w-full rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        className="h-2 w-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
