import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary-dark dark:text-primary-light",
        className
      )}
      {...props}
    />
  );
}
