"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SegmentGroupOption {
  value: string;
  label: string;
}

interface SegmentGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SegmentGroupOption[];
  className?: string;
  ariaLabel?: string;
  size?: "default" | "sm";
}

const SegmentGroup = React.forwardRef<HTMLDivElement, SegmentGroupProps>(
  function SegmentGroup(
    { value, onValueChange, options, className, ariaLabel, size = "default" },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "inline-flex w-full min-w-0 rounded-sm bg-muted p-0.5",
          size === "sm" && "p-px",
          className
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={option.label}
              onClick={() => onValueChange(option.value)}
              className={cn(
                "flex-1 shrink-0 whitespace-nowrap text-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                size === "default" && "rounded-sm px-2.5 py-1.5 text-sm",
                size === "sm" && "rounded-sm px-2 py-1 text-xs",
                isSelected
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentGroup.displayName = "SegmentGroup";

export { SegmentGroup };
