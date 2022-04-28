const getSavedCartItems = () => { // this function retrieves the data from the array that was stringified in the function saveCartItems
  const savedItems = localStorage.getItem('cartItems');
  try {
    if (!savedItems) {
      return [];
    }
    return JSON.parse(savedItems);
  } catch (error) {
    return [];
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
