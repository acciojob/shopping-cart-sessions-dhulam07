// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart array to store cart items
let cart = [];

// Load cart from sessionStorage on page load
function loadCartFromStorage() {
  const cartData = sessionStorage.getItem('shoppingCart');
  if (cartData) {
    cart = JSON.parse(cartData);
  }
}

// Save cart to sessionStorage
function saveCartToStorage() {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  // Clear existing cart items
  cartList.innerHTML = '';
  
  if (cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Cart is empty";
    li.style.fontStyle = "italic";
    cartList.appendChild(li);
    return;
  }
  
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    if (!existingItem) {
      cart.push(product);
      saveCartToStorage();
      renderCart();
    }
  }
}

// Clear cart
function clearCart() {
  cart = [];
  saveCartToStorage();
  renderCart();
}

// Event listener for clear cart button
clearCartBtn.addEventListener('click', clearCart);

// Initial render
loadCartFromStorage();
renderProducts();
renderCart();
