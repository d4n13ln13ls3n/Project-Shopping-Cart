require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('1 - Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('2 - Verifica se ao chamar fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('3 - Verifica se, ao chamar fetchItem com o argumento do item MLB1615760527, a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('4 - Verifica se o retorno de fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  test('5 - Verifica se, ao chamar fetchItem sem argumento, retorna um erro com a mensagem "You must provide an url" ', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  });
});
