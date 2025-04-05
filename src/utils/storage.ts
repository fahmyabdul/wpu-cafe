const storage = typeof window === "undefined" ? null : localStorage;

const getLocalStorage = (key: string) => JSON.parse(storage?.getItem(key) || "{}");

export { getLocalStorage };