import React from "react";

import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

const LoadingState = ({
  message,
  variant,
  element = "cards",
}: {
  message?: string;
  variant: "spinner" | "skeleton";
  element?: "cards" | "text";
}) => {
  if (variant === "skeleton") {
    return element === "cards" ? (
      <div className="flex gap-5 flex-col w-full">
        <div className="flex gap-5 w-full">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
        <div className="flex gap-5 w-full">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    ) : (
      <div className="flex gap-5 flex-col w-full">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-center">
      <Spinner />
      <span>{message}</span>
    </div>
  );
};

export default LoadingState;
