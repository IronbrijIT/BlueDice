import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function PlaceholderCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-4">
      <div className="mt-0.5 rounded-xl bg-background p-2 text-muted-foreground ring-1 ring-border">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Soon
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
