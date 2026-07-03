import { useEffect, useState } from "react";

export const debounce = <T>(value: T, delay = 300): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
};
