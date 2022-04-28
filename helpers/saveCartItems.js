// line 1
const saveCartItems = (newArrayToSave) => {
  localStorage.setItem('cartItems', JSON.stringify(newArrayToSave));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
