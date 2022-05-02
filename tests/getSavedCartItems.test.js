const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('1 - Verifica se ao executar getSavedCartItems o método localStorage.getItem é chamado', () => {
    const savedItems = localStorage.getItem('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('2 - Verifica se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    const savedItems = localStorage.getItem('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
