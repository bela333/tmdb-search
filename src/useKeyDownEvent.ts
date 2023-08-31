import { useCallback, useEffect } from "react";

/**
 * Hook for detecting keyboard button presses
 * @param onKey - Callback called, when the specified key is pressed
 * @param key - Key press to detect, as used in `KeyboardEvent.key`
 */
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
