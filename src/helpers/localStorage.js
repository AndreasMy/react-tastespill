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

/* export function updateScoreList(userId, newScoreList) {
  setUsers((prevUsers) => {
    const updatedUsers = prevUsers.map((user) =>
      user.id === userId ? { ...user, scroreList: newScoreList } : user
    );
    sendToStorage('users', updatedUsers);
    return updatedUsers;
  });
} */

// localStorage.clear()
