type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

export function store<T extends JSONValue>(key: string, fallback: T) {
  const subscribers = new Set<(value: T) => void>();

  let current: T;

  function set(value: T) {
    current = value;
    localStorage.setItem(key, JSON.stringify(current));
    for (const subscriber of subscribers) {
      subscriber(current);
    }
  }

  {
    const raw = localStorage.getItem(key);
    set(raw !== null ? JSON.parse(raw) : fallback);
  }

  function subscribe(fn: (value: T) => void) {
    subscribers.add(fn);
    fn(current);

    return () => {
      subscribers.delete(fn);
    };
  }

  function update(fn: (value: T) => T) {
    set(fn(current));
  }

  window.addEventListener("storage", (e) => {
    if (e.newValue !== null) {
      set(JSON.parse(e.newValue));
    }
  });

  return {
    set,
    update,
    subscribe,
  };
}
