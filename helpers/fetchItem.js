const fetchItem = async (productId) => {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  try {
  const promiseFetch = await fetch(endpoint);
  const data = await promiseFetch.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
