import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

const COLLAPSIBLE_CONTENT_CLASS =
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200";

const GRID_CLASS =
  "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4";

export interface CollapsibleFilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  gridClassName?: string;
}

/**
 * Reusable collapsible filter panel with responsive grid layout.
 * Use as a wrapper; pass filter fields as children (each child is one grid cell).
 * Example: <CollapsibleFilterPanel open={open} onOpenChange={setOpen}>{filterFields}</CollapsibleFilterPanel>
 */
export function CollapsibleFilterPanel({
  open,
  onOpenChange,
  children,
  className,
  gridClassName,
}: CollapsibleFilterPanelProps) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleContent className={COLLAPSIBLE_CONTENT_CLASS}>
        <div
          className={cn(
            "rounded-md border border-border/50 bg-muted/30 px-3 py-3 sm:px-4",
            className
          )}
        >
          <div className={cn(GRID_CLASS, gridClassName)}>{children}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
