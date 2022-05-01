// line 1
const fetchProducts = async (item) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  try {
  const promiseFetch = await fetch(endpoint);
  const data = await promiseFetch.json();
  console.log('data.results:', data.results);
  console.log('data:', data);
  return data; // it was data.results before
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
// ORIGINAL FUNCTION
// const fetchProducts = async () => {
//   const promiseFetch = await fetch(endpoint);
//   const data = await promiseFetch.json();
//   return data.results;
// };
