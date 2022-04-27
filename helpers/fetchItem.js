const fetchItem = async (productId) => {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  const promiseFetch = await fetch(endpoint);
  const data = await promiseFetch.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
