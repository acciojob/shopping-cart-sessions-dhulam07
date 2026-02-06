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

// ---------- STORAGE HELPERS ----------

// Restore sessionStorage from localStorage if needed
function restoreCart() {
  const sessionCart = sessionStorage.getItem("cart");
  const backupCart = localStorage.getItem("cartBackup");

  if (!sessionCart && backupCart) {
    sessionStorage.setItem("cart", backupCart);
  }
}

// Always return an array
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save to BOTH storages
function saveCart(cart) {
  const data = JSON.stringify(cart);
  sessionStorage.setItem("cart", data);
  localStorage.setItem("cartBackup", data);
}

// ---------- UI RENDERING ----------

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

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ---------- CART ACTIONS ----------

function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);

  cart.push(product);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  saveCart([]);
  renderCart();
}

// ---------- EVENTS ----------

productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ---------- INIT ----------

restoreCart();
renderProducts();
renderCart();
