/* product.js — renders a single product based on ?id=... and handles add-to-cart */
(function(){
  function qParam(name){
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

  function renderProduct(id){
    var p = products.find(function(x){ return x.id === id; });
    if(!p){ document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>'; return; }

    document.getElementById('product-title').textContent = p.name;
    document.getElementById('product-image').src = p.image;
    document.getElementById('product-price').textContent = formatINR(p.price);
    document.getElementById('product-desc').textContent = p.desc;

    var ratingEl = document.getElementById('product-rating');
    ratingEl.innerHTML = new Array(5).fill('☆').map(function(_,i){ return i < p.rating ? '★' : '☆'; }).join(' ');

    // qty controls
    var qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-increase').addEventListener('click', function(){ qtyInput.value = parseInt(qtyInput.value) + 1; });
    document.getElementById('qty-decrease').addEventListener('click', function(){ qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1); });

    document.getElementById('add-to-cart').addEventListener('click', function(){
      var qty = parseInt(qtyInput.value) || 1; window.AuroraCart.addToCart(p.id, qty);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){ var id = qParam('id'); if(id) renderProduct(id); });
})();
