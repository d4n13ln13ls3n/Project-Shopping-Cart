// linha 1

const itemsSection = document.querySelector('.items'); // inserted by me
const cartItems = document.querySelector('.cart__items');
const priceContainer = document.querySelector('.total-price');
const emptyCartButton = document.querySelector('.empty-cart');

console.log('fetchProducts(computador):', fetchProducts('computador'));
// console.log('computadorSearch:', computadorSearch);
// console.log('computadorSearch.results:', computadorSearch.results);

const fetchProducts2 = async (item) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  try {
  const promiseFetch = await fetch(endpoint);
  const data = await promiseFetch.json();
  return data.results;
  } catch (error) {
    return error;
  }
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function loading(parentElement) {
  parentElement.setAttribute('display', 'none');
  parentElement.appendChild(createCustomElement('div', 'loading', 'Carregando...'));
}

function removeLoading(parentElement) {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
  parentElement.removeChild(loadingElement);
  parentElement.setAttribute('display', '');  
  }
}

function createProductItemElement({ sku, name, image }) {
  // sku refers to the key 'id' returned by the API
  const section = document.createElement('section'); // creates a new section
  section.className = 'item'; // assigns the class 'item' to that section

  section.appendChild(createCustomElement('span', 'item__sku', sku)); // appends to that section a span element that belongs to the class item__sku and the id retrieved from the API
  section.appendChild(createCustomElement('span', 'item__title', name)); // appends to that section a span element that belongs to the class item__title and the title retrieved from the API
  section.appendChild(createProductImageElement(image)); // appends to that section an IMG element that belongs to the class item__image and the image source (thumbnail) retrieved from the API
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')); // appends to that section a button element that belongs to the class item__add and the inner Text 'add to cart';

  return section;
}

// criar função que pegue a requisição da API e inclua os elementos desejados dentro do card gerado pela função createProductItemElement

// function getSkuFromProductItem(item) { // sku se referem aos campos 'id' retornados pela API
//   return item.querySelector('span.item__sku').innerText; // selects the id of the span passed as an argument
// }

function calculatePrice() {
  const savedItems = getSavedCartItems();
  let totalPrice = 0;
  savedItems.forEach((item) => {
    totalPrice += item.price;
  });
  console.log('total price:', totalPrice);
  priceContainer.innerText = `Subtotal: R$ ${totalPrice.toFixed(2)}`;
}

function cartItemClickListener(event) {
  const currentCart = getSavedCartItems();
  // const removedId = getSkuFromProductItem(event.target);
  const removedIndex = Array.from(cartItems.children).indexOf(event.target); // gets the removed element index, must be called before removeChild to get the accurate number before cartItems is modified
  cartItems.removeChild(event.target);
  currentCart.splice(removedIndex, 1);
  // const updatedItems = currentCart.filter((item) => item.id !== removedId);
  saveCartItems(currentCart);
  calculatePrice();
}

function clearCart() {
  cartItems.innerHTML = '';
  saveCartItems([]);
  calculatePrice();
}
emptyCartButton.addEventListener('click', clearCart);

function createCartItemElement({ sku, name, salePrice, image }) { // sends item to shopping cart
  const li = document.createElement('li');
  const div = document.createElement('div');
  cartItems.appendChild(li);
  li.appendChild(createProductImageElement(image));
  li.className = 'cart__item';
  li.appendChild(div);
  div.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addProductToCart(itemRetrieved) { // completed function
  const cartItem = createCartItemElement({ 
    image: itemRetrieved.thumbnail,
    sku: itemRetrieved.id, 
    name: itemRetrieved.title, 
    salePrice: itemRetrieved.price,
    });
  cartItems.appendChild(cartItem); 
}

async function addProductCartFromAPI(productId) { // fetches the product to be added on the cart
  loading(cartItems);
  const itemRetrieved = await fetchItem(productId);
  removeLoading(cartItems);
  addProductToCart(itemRetrieved); // render the new product on the page
  const currentCart = getSavedCartItems();
  saveCartItems([...currentCart, itemRetrieved]);
  calculatePrice();
}
async function insertProductItemElementsFromAPI() { // written by me
  loading(itemsSection);
  const products = await fetchProducts2('computador');
  removeLoading(itemsSection); 
  // There is one array with 50 objects inside. I have to iterate through each object and call the function createProduct 50 times using the keys sky, name and image as parameters
  products.forEach((product) => {
    const productElement = createProductItemElement({ 
      image: product.thumbnail, 
      sku: product.id, 
      name: product.title, 
    });
    itemsSection.appendChild(productElement);
    const buttonAdd = productElement.querySelector('.item__add');
    buttonAdd.addEventListener('click', () => {
      addProductCartFromAPI(product.id);
    });
  });
  
  return itemsSection;
}
insertProductItemElementsFromAPI();

function renderSavedItems() {
  const itemsToRender = getSavedCartItems(); 
  console.log('items to render:', itemsToRender[0]);
  itemsToRender.forEach((item) => {
    addProductToCart(item);
    }); 
}

renderSavedItems();

window.onload = () => { 
  calculatePrice();
};
