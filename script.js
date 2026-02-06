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

// ------------------------------
// 🔑 SINGLE SOURCE OF TRUTH
// ------------------------------
let cart = [];

// Restore cart ONLY once (initial load)
const storedCart = sessionStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
}

// ------------------------------
// Helpers
// ------------------------------
function syncSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ------------------------------
// Render Products
// ------------------------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// ------------------------------
// Render Cart
// ------------------------------
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ------------------------------
// Cart Actions
// ------------------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  cart.push(product);          // ← persists across Cypress tests
  syncSessionStorage();        // ← mirrors state for assertions
  renderCart();
}

function clearCart() {
  cart = [];
  syncSessionStorage();
  renderCart();
}

// ------------------------------
// Events
// ------------------------------
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ------------------------------
// Init
// ------------------------------
renderProducts();
renderCart();
