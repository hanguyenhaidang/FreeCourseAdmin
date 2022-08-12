import { SESSION_STORAGE } from "../constants/storage-constants";

export const storeItem = (storeType, key, value) => {
  let data = value;
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  switch (storeType) {
    case SESSION_STORAGE:
      sessionStorage.setItem(key, data);
      break;
    default:
      localStorage.setItem(key, data);
  }
};

export const clearItem = (storeType, key) => {
  switch (storeType) {
    case SESSION_STORAGE:
      sessionStorage.removeItem(key);
      break;
    default:
      localStorage.removeItem(key);
  }
};

export const getItem = (storeType, key) => {
  let result;
  switch (storeType) {
    case SESSION_STORAGE:
      result = sessionStorage.getItem(key);
      break;
    default:
      result = localStorage.getItem(key);
  }
  try {
    return JSON.parse(result);
  } catch (error) {
    return result;
  }
};
