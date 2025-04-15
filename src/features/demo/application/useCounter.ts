import { Logger } from "@/lib/logger";
import { useState, useCallback } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    Logger.info("Debugging useCounter hook", { value: count });
    setCount((x) => x + 1);
  }, [count]);

  return { count, increment };
};

export { useCounter };
