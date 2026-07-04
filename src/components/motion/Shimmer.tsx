import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton block with a gentle shimmer sweep. Purely CSS via
 * background-position; no JS per-frame work.
 */
export function Shimmer({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-secondary/70",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        "before:animate-[shimmer_1.6s_infinite]",
        className,
      )}
      {...rest}
    />
  );
}