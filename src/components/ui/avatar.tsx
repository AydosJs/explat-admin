import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage(
  props: React.ComponentProps<typeof AvatarPrimitive.Image>
) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className="aspect-square size-full"
      {...props}
    />
  )
}

function AvatarFallback(
  props: React.ComponentProps<typeof AvatarPrimitive.Fallback>
) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm font-medium group-data-[size=sm]/avatar:text-xs"
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
