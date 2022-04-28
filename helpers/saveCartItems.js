// line 1
const saveCartItems = (newItemToSave) => {
  console.log('testing');
  const savedItems = getSavedCartItems();
  localStorage.setItem('cartItems', JSON.stringify([...savedItems, newItemToSave]));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
