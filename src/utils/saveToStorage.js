export const saveToStorage = (storageKey, listItems) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(listItems.value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}