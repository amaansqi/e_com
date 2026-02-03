/* cart-page.js — renders the cart page and handles item updates */
(function(){
  var container = document.getElementById('cart-container');
  var totalEl = document.getElementById('cart-total');
  var checkoutBtn = document.getElementById('checkout');

  function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

  function renderEmpty(){
    container.innerHTML = '<div class="center" style="flex-direction:column;padding:3rem;gap:1rem">\n      <svg width="120" height="80" viewBox="0 0 24 24"><path fill="#e6eef8" d="M7 4h10l1 3H6z"/></svg>\n      <h3>Your cart is empty</h3>\n      <a href="index.html" class="btn primary">Continue shopping</a>\n    </div>';
    totalEl.textContent = formatINR(0);
    checkoutBtn.disabled = true;
  }

  function renderCart(){
    var cart = window.AuroraCart.getCart();
    var keys = Object.keys(cart);
    if(keys.length === 0) return renderEmpty();

    var html = keys.map(function(id){
      var qty = cart[id];
      var p = products.find(function(x){ return x.id === id; });
      if(!p) return '';
      return '\n      <div class="cart-item" data-id="'+id+'">\n        <img src="'+p.image+'" alt="'+p.name+'">\n        <div class="item-details">\n          <h4>'+p.name+'</h4>\n          <div class="desc">'+p.desc+'</div>\n          <div class="item-meta">\n            <div class="unit-price">'+formatINR(p.price)+'</div>\n            <div class="item-subtotal">'+formatINR(p.price * qty)+'</div>\n          </div>\n        </div>\n        <div class="cart-actions">\n          <button class="qty-btn minus">−</button>\n          <input class="qty-input" type="number" min="1" value="'+qty+'">\n          <button class="qty-btn plus">+</button>\n          <button class="btn outline remove">Remove</button>\n        </div>\n      </div>';
    }).join('');

    container.innerHTML = html;
    totalEl.textContent = formatINR(window.AuroraCart.getCartTotal());
    // pulse animation for update
    totalEl.classList.add('pulse'); setTimeout(function(){ totalEl.classList.remove('pulse'); }, 300);
    checkoutBtn.disabled = false;

    // Attaching events
    var lastRemoved = null;
    container.querySelectorAll('.cart-item').forEach(function(item){
      var id = item.dataset.id;
      var minus = item.querySelector('.minus');
      var plus = item.querySelector('.plus');
      var input = item.querySelector('.qty-input');
      var rem = item.querySelector('.remove');

      minus.addEventListener('click', function(){
        var v = Math.max(1, parseInt(input.value) - 1);
        input.value = v; window.AuroraCart.setQuantity(id, v); renderCart();
      });
      plus.addEventListener('click', function(){
        var v = Math.max(1, parseInt(input.value) + 1);
        input.value = v; window.AuroraCart.setQuantity(id, v); renderCart();
      });
      input.addEventListener('change', function(){
        var v = Math.max(1, parseInt(input.value) || 1); input.value = v; window.AuroraCart.setQuantity(id, v); renderCart();
      });
      rem.addEventListener('click', function(){
        // capture for undo
        var qty = parseInt(item.querySelector('.qty-input').value) || 1;
        lastRemoved = { id: id, qty: qty };
        window.AuroraCart.removeItem(id);
        renderCart();
        // offer undo
        window.AuroraCart.showToast('Removed from cart ⚠️', 'Undo', function(){
          if(lastRemoved){ window.AuroraCart.addToCart(lastRemoved.id, lastRemoved.qty); renderCart(); lastRemoved = null; }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){ renderCart(); });
  window.addEventListener('cart:updated', function(){ renderCart(); });
})();
