// ShopFeed Cart Management (localStorage)

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('shopfeed_cart')) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem('shopfeed_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  updateCartCount();
  showToast('Added to cart!');
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  document.querySelectorAll('#cart-count, #cart-count-mobile').forEach(el => {
    if (el) el.textContent = count;
  });
}

function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

document.addEventListener('DOMContentLoaded', updateCartCount);
