import { useEffect } from "react";

export default function useAutoDismiss(
  message,
  clearMessage,
  delay = 4000
) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      clearMessage();
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [message, clearMessage, delay]);
}