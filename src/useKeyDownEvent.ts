import { useCallback, useEffect } from "react";

const useKeyDownEvent = (onKey: (ev: KeyboardEvent) => void, key: string) => {
  const listener = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === key) {
        onKey(ev);
      }
    },
    [onKey, key],
  );

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [listener]);
};

export default useKeyDownEvent;
