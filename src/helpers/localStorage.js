function sendToStorage(state) {
  const jsonString = JSON.stringify(state);
  const existingArr = JSON.parse(localStorage.getItem('myArray') || []);

  existingArr.push(jsonString);
}

export function getFromStorage(state) {
    
}

export default sendToStorage;
