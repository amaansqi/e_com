/* cart.js — manages cart state (localStorage) and shared UI helpers */
(function(){
  var STORAGE_KEY = 'aurora_cart_v1';

  // Retrieve cart from localStorage
  function getCart(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e){
      console.error('Failed to parse cart', e);
      return {};
    }
  }

  function saveCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    // Custom event to notify other parts of UI
    window.dispatchEvent(new CustomEvent('cart:updated'));
  }

  function addToCart(productId, qty){
    qty = parseInt(qty) || 1;
    var cart = getCart();
    if(cart[productId]) cart[productId] += qty; else cart[productId] = qty;
    saveCart(cart);
    showToast('Added to cart ✅');
    updateCartCount();
  }

  function setQuantity(productId, qty){
    var cart = getCart();
    if(qty <= 0){ delete cart[productId]; } else cart[productId] = qty;
    saveCart(cart);
    updateCartCount();
  }

  function removeItem(productId){
    var cart = getCart();
    if(cart[productId]) delete cart[productId];
    saveCart(cart);
    showToast('Removed from cart ⚠️');
    updateCartCount();
  }

  function clearCart(){
    saveCart({});
    updateCartCount();
  }

  function getCartCount(){
    var cart = getCart();
    return Object.values(cart).reduce(function(acc,n){return acc + n}, 0);
  }

  function getCartTotal(){
    var cart = getCart();
    var total = 0;
    Object.keys(cart).forEach(function(id){
      var p = products.find(function(x){return x.id===id});
      if(p) total += p.price * cart[id];
    });
    return total;
  }

  /* Toast */
  var toastTimeout = null;
  function showToast(msg, actionLabel, actionCallback){
    var el = document.getElementById('toast');
    if(!el) return;
    // Clear previous content & any handlers
    el.innerHTML = '';
    var body = document.createElement('div');
    body.className = 'toast-body';
    var text = document.createElement('span');
    text.className = 'toast-text';
    text.textContent = msg;
    body.appendChild(text);

    if(actionLabel && typeof actionCallback === 'function'){
      var btn = document.createElement('button');
      btn.className = 'toast-action';
      btn.textContent = actionLabel;
      btn.addEventListener('click', function(e){ e.stopPropagation(); actionCallback(); el.classList.remove('show'); });
      body.appendChild(btn);
    }

    el.appendChild(body);
    el.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function(){ el.classList.remove('show'); }, 3500);
  }

  /* Update cart count in navbar */
  function updateCartCount(){
    var countEls = document.querySelectorAll('#cart-count');
    var count = getCartCount();
    countEls.forEach(function(el){ el.textContent = count; });
  }

  // Listen to storage events (other tabs)
  window.addEventListener('storage', function(e){ if(e.key===STORAGE_KEY) updateCartCount(); });
  window.addEventListener('cart:updated', updateCartCount);
  document.addEventListener('DOMContentLoaded', updateCartCount);

  // Expose API globally
  window.AuroraCart = {
    getCart: getCart,
    saveCart: saveCart,
    addToCart: addToCart,
    setQuantity: setQuantity,
    removeItem: removeItem,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotal: getCartTotal,
    showToast: showToast
  };
})();
