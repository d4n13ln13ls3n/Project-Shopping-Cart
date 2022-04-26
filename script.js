const itemsSection = document.querySelector('.items'); // inserted by me
const cartItems = document.querySelector('.cart__items');
const cartProducts = getSavedCartItems();

// let state = {
//   tasks: [],
//   selectedTaskIndex: -1,
// };

// function updateState(key, updatedValue) {
//   state[key] = updatedValue;
//   renderTasks(state);
// }

// synchs HTML(UI) and state
// function renderTasks(state) {
//   const taskListElement = document.querySelector('ol');
//   taskListElement.innerHTML = '';
  
  // state.tasks.forEach((task, index) => {
    // task represents the state
//     const taskElement = createTaskElement(task, index);
//     taskListElement.appendChild(taskElement);
//   });
// }

// function clearAll() {
//   updateState("tasks", []);
// }
// clearButton.addEventListener('click', clearAll);

// function saveTasks() {
//   localStorage.setItem('currentState', JSON.stringify(state));
// }
// saveButton.addEventListener('click', saveTasks);

// function removeSelectedTask() {
//   const unselectedTasks = [];
  
//   state.tasks.forEach((task, index) => {
//     if (index !== state.selectedTaskIndex) {
//       unselectedTasks.push(task);
//     }
//   });
  
//   updateState("tasks", unselectedTasks);
//   updateState("selectedTaskIndex", -1);
// }
// buttonRemoveSelected.addEventListener('click', removeSelectedTask);

// function initialize() {
//   const savedState = localStorage.getItem('currentState');
  
//   if (savedState !== null) {
//     state = JSON.parse(savedState);
//   }
  
//   renderTasks(state);
// }
// initialize();

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

function createProductItemElement({ sku, name, image }) {
  // createProductItemElement({
//   sku: product.id,
//   name: product.name,
//   thumbnail: product.image
//  }) CALL IT LIKE THIS
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

function getSkuFromProductItem(item) { // sku se referem aos campos 'id' retornados pela API
  return item.querySelector('span.item__sku').innerText; // selects the id of the span passed as an argument
}

function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) { // sends item to shopping cart?
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addProductToCart(itemRetrieved) {
  const cartItem = createCartItemElement({ sku: itemRetrieved.id, name: itemRetrieved.title, salePrice: itemRetrieved.price });
  cartItems.appendChild(cartItem);
}

async function addProductCartFromAPI(productId) {
  const itemRetrieved = await fetchItem(productId);
  addProductToCart(itemRetrieved);
}
async function insertProductItemElementsFromAPI() { // written by me
  const products = await fetchProducts();
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

window.onload = () => { };
