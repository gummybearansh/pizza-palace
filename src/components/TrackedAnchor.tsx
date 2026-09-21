"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  event: string;
  eventProps?: Record<string, unknown>;
};

export function TrackedAnchor({ event, eventProps, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
