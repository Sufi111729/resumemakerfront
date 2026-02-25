import { useRef } from "react";

export default function useDebouncedCallback(fn, delay = 800) {
  const timer = useRef();
  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  };
}
