import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark",
        className
      )}
      {...props}
    />
  );
}
