import clsx from "clsx";
import React, { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "small" | "normal" | "large" | "full";
}

export function Container(props: ContainerProps) {
  const { children, size = "normal" } = props;

  const classes = clsx("mx-auto px-4 sm:px-6 lg:px-8", {
    "max-w-5xl": size === "small",
    "max-w-7xl": size === "normal",
    "max-w-9xl": size === "large",
    "w-full": size === "full",
  });

  return <div className={classes}>{children}</div>;
}
