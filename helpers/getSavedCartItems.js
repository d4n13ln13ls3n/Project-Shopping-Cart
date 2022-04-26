const getSavedCartItems = () => {
  const savedItems = localStorage.getItem('cartItems');
  try {
    return JSON.parse(savedItems);
  }
  catch {
    return [];
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
