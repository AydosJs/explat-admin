import { cn } from "@/lib/utils";

export interface TableStatusLegendItem {
  /** Tailwind class for the dot (e.g. "bg-emerald-500/50") */
  dotClassName: string;
  /** Label shown next to the dot (e.g. translated status name) */
  label: React.ReactNode;
}

interface TableStatusLegendProps {
  items: TableStatusLegendItem[];
  /** Optional aria-label for the legend (e.g. translated "Status legend") */
  ariaLabel?: string;
  /** Optional className (e.g. border-t-0 when inside a combined bar) */
  className?: string;
}

/**
 * Renders a compact status legend (color dot + label per item) for tables
 * that use a left-side status bar. Place below the table inside the same card.
 */
export function TableStatusLegend({ items, ariaLabel, className }: TableStatusLegendProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/50 px-4 py-2 text-sm text-muted-foreground",
        className
      )}
      aria-label={ariaLabel}
      role="list"
    >
      {items.map(({ dotClassName, label }, index) => (
        <span
          key={index}
          className="flex items-center gap-1.5"
          role="listitem"
        >
          <span
            className={`inline-block h-2 w-1 shrink-0 rounded-full ${dotClassName}`}
            aria-hidden
          />
          {label}
        </span>
      ))}
    </div>
  );
}
