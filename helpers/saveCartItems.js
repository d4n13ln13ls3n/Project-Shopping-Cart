const saveCartItems = (arrayToStore) => {
  localStorage.setItem('cartItems', JSON.stringify(arrayToStore));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
