export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Parsing error:', e);
    return null;
  }
}

export function sendToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Sending error: ', e);
  }
}

// localStorage.clear()
