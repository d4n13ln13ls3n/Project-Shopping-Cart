const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

const fetchProducts = async () => {
  const promiseFetch = await fetch(endpoint);
  const data = await promiseFetch.json();
  return data.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
