import { useEffect, useState } from "react";

export function usePersistentCollection(storageKey, initialValue) {
  const [items, setItems] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(storageKey);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Ignore persistence failures and keep runtime state active.
    }
  }, [items, storageKey]);

  return [items, setItems];
}
