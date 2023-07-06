import { useEffect, useState } from 'react';

export function useFetch<T>(url: string): T[] {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [url]);

  return items;
}
