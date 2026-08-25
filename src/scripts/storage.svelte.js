export function localStorageState(key, initial, { serialize = String, deserialize = (v) => v } = {}) {
  const stored = localStorage.getItem(key);
  let value = $state(stored !== null ? deserialize(stored) : initial);

  $effect(() => {
    localStorage.setItem(key, serialize(value));
  });

  return {
    get value() { return value; },
    set value(v) { value = v; }
  };
}