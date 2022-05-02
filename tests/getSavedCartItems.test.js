const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('1 - Verifica se ao executar getSavedCartItems o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('2 - Verifica se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
  test('3 - Verifica se getSavedCartItems é uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  test('4 - Verifica se getSavedCartItems retorna o array de itens salvo no localStorage', () => {
    // replace the expected array here
    const expected = [{id: 'MLB2131342947', site_id: 'MLB', title: 'Notebook Multilaser Legacy Cloud Pc134 Cinza 14.1 …Ssd, Intel Hd Graphics 1366x768px Windows 10 Home'}];
    // simula o cenário de quando não há nada salvo no localStorage
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(expected));
    const savedItems = getSavedCartItems();
    expect(savedItems).toEqual(expected);
  });
  test('5 - Verifica se getSavedCartItems retorna um array vazio quando não há nada salvo no localStorage', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    const savedItems = getSavedCartItems();
    expect(savedItems).toEqual([]);
  });
  test('6 - Verifica se getSavedCartItems retorna um array vazio quando um JSON inválido estiver salvo no localStorage', () => {
    const invalidJSON = [{id: '123MLB2131342947', site_id: 'MLB', title: 'Notebook Multilaser Legacy Cloud Pc134 Cinza 14.1 …Ssd, Intel Hd Graphics 1366x768px Windows 10 Home'}];
    localStorage.getItem.mockReturnValueOnce(invalidJSON);
    const savedItems = getSavedCartItems();
    expect(savedItems).toEqual([]);
  });
});
