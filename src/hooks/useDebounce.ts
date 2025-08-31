// Debounce hook - demonstrates advanced React patterns and performance optimization
import { useState, useEffect } from 'react';

/**
 * Custom debounce hook for performance optimization
 * Demonstrates setTimeout with cleanup and the event loop
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    /**
     * This setTimeout demonstrates the event loop:
     * 1. setTimeout schedules a callback to run after 'delay' milliseconds
     * 2. The callback is placed in the Timer Queue
     * 3. When the timer expires, it moves to the Task Queue
     * 4. The Event Loop processes it when the Call Stack is empty
     */
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /**
     * Cleanup function - demonstrates proper cleanup to prevent memory leaks
     * This runs when the component unmounts or when dependencies change
     */
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Dependencies array - effect runs when these change

  return debouncedValue;
};