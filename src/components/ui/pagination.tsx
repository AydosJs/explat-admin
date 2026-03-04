import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = React.ComponentProps<"button"> & {
  isActive?: boolean;
};

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "outline" : "ghost"}
    size="icon-sm"
    className={cn(
      "size-8 min-w-8",
      isActive && "pointer-events-none border-primary",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

type PaginationPrevNextProps = Omit<React.ComponentProps<"button">, "size">;

const PaginationPrevious = ({
  className,
  ...props
}: PaginationPrevNextProps) => (
  <Button
    type="button"
    variant="outline"
    size="icon-sm"
    aria-label="Go to previous page"
    className={cn(className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
  </Button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: PaginationPrevNextProps) => (
  <Button
    type="button"
    variant="outline"
    size="icon-sm"
    aria-label="Go to next page"
    className={cn(className)}
    {...props}
  >
    <ChevronRight className="size-4" />
  </Button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center", className)}
    {...props}
  >
    <span className="size-2 rounded-full bg-current opacity-50" />
    <span className="ml-0.5 size-2 rounded-full bg-current opacity-50" />
    <span className="ml-0.5 size-2 rounded-full bg-current opacity-50" />
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
