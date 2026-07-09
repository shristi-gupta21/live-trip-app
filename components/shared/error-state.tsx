import React from "react";

import { Button } from "../ui/button";

const ErrorState = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="flex gap-3 items-center">
      {message && <span>{message}</span>}
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
};

export default ErrorState;
