"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Marquee({ children, className, ...props }: MarqueeProps) {
  return (
    <div
      className={cn("text-muted-foreground relative flex overflow-hidden", className)}
      {...props}
    >
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap pr-10 text-lg">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="animate-[marquee_20s_linear_infinite] whitespace-nowrap pr-10 text-lg"
      >
        {children}
      </div>
    </div>
  );
}
