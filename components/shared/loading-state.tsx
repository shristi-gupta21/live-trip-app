import React from "react";

import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

const LoadingState = ({
  message,
  variant,
}: {
  message?: string;
  variant: "spinner" | "skeleton";
}) => {
  if (variant === "skeleton") {
    return <Skeleton />;
  }
  return (
    <div className="flex gap-3 items-center">
      <Spinner />
      <span>{message}</span>
    </div>
  );
};

export default LoadingState;
