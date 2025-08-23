export const loadFromStorage = (storageKey, listItems) => {
  try {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      listItems.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }

  return listItems.value;
}