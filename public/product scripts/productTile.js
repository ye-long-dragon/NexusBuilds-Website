// Add item to cart
function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  
  cart.total = calculateTotal(cart.items); // Implement your total calculation logic
  localStorage.setItem('cart', JSON.stringify(cart));
  syncCartToBackend(); // Sync immediately after updating
}
 
 
// Calculate total (example implementation)
function calculateTotal(items) {
  // Replace with actual logic (e.g., fetch product prices from backend)
  return items.reduce((total, item) => total + item.quantity * 10, 0); // Assume $10 per item
}
 
 
// Sync cart to backend
async function syncCartToBackend() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) return;
 
 
  try {
    const response = await fetch('/api/cart/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    });
    if (response.ok) {
      console.log('Cart synced successfully');
    }
  } catch (error) {
    console.error('Error syncing cart:', error);
  }
}
 
 
// Load cart from backend on page load
async function loadCart() {
  try {
    const response = await fetch('/api/cart', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const cart = await response.json();
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI(cart); // Implement UI update logic
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}
 
 
// Handle tab conflicts (optional: detect changes in localStorage)
window.addEventListener('storage', (event) => {
  if (event.key === 'cart') {
    console.log('Cart updated in another tab:', JSON.parse(event.newValue));
    updateCartUI(JSON.parse(event.newValue)); // Update UI if cart changes in another tab
  }
});
 
 
// Trigger sync on key events
document.getElementById('add-to-cart').addEventListener('click', () => {
  addToCart('product123', 1); // Example: Add item with ID 'product123' and quantity 1
});
 
 
// Load cart on page load
window.addEventListener('load', loadCart);