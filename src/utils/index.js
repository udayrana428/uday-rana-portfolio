// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    if (typeof window === "undefined") return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (typeof window === "undefined") return;
    localStorage.clear();
  }
}
