const getSavedCartItems = () => {
  const savedItems = localStorage.getItem('cartItems');
  try {
    return JSON.parse(savedItems);
  } catch (error) {
    return [];
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
