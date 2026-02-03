/* main.js — renders product listing, search, sort, filters, and handles UI interactions */
(function(){
  var productsNode = document.getElementById('products');
  var searchInput = document.getElementById('search');
  var sortSelect = document.getElementById('sort');
  var catButtons = document.querySelectorAll('.cat-btn');

  // Small helper for currency
  function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

  // Create skeletons
  function showSkeletons(){
    var html = '';
    for(var i=0;i<8;i++) html += '<div class="card"><div class="skeleton"></div><div style="height:12px;margin-top:12px;width:70%" class="skeleton"></div><div style="height:12px;margin-top:8px;width:40%" class="skeleton"></div></div>';
    productsNode.innerHTML = html;
  }

  // Render products list
  function renderProducts(list){
    if(!list) list = products;
    if(list.length === 0){ productsNode.innerHTML = '<p class="center">No products found.</p>'; return; }

    var html = list.map(function(p){
      var stars = new Array(5).fill('☆').map(function(_,i){ return i < p.rating ? '★' : '☆'; }).join(' ');
      return '\n        <article class="card" data-id="'+p.id+'">\n          <div class="product-media"><img src="'+p.image+'" alt="'+p.name+'"></div>\n          <h3>'+p.name+'</h3>\n          <div class="rating">'+stars+'</div>\n          <div class="price">'+formatINR(p.price)+'</div>\n          <div class="card-actions">\n            <button class="btn outline view-btn" data-id="'+p.id+'">View Details</button>\n            <button class="btn primary add-btn" data-id="'+p.id+'">Add to Cart</button>\n          </div>\n        </article>';
    }).join('');

    productsNode.innerHTML = html;

    // Attach events
    document.querySelectorAll('.add-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var id = this.dataset.id; window.AuroraCart.addToCart(id,1);
      });
    });

    document.querySelectorAll('.view-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var id = this.dataset.id; location.href = 'product.html?id=' + encodeURIComponent(id);
      });
    });
  }

  // Apply sort
  function applySort(list){
    var val = sortSelect ? sortSelect.value : 'default';
    var out = list.slice();
    if(val === 'price-asc') out.sort(function(a,b){return a.price - b.price});
    if(val === 'price-desc') out.sort(function(a,b){return b.price - a.price});
    return out;
  }

  // Apply search and category filter
  function filterAndRender(){
    var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var activeCat = document.querySelector('.cat-btn.active') ? document.querySelector('.cat-btn.active').dataset.cat : 'all';
    var filtered = products.filter(function(p){
      var matchQ = p.name.toLowerCase().indexOf(q) !== -1;
      var matchCat = activeCat === 'all' ? true : p.category === activeCat;
      return matchQ && matchCat;
    });
    filtered = applySort(filtered);
    renderProducts(filtered);
  }

  // Setup handlers
  function init(){
    showSkeletons();
    setTimeout(function(){ renderProducts(products); }, 600); // simulate loading

    if(searchInput) searchInput.addEventListener('input', filterAndRender);
    if(sortSelect) sortSelect.addEventListener('change', filterAndRender);

    catButtons.forEach(function(b){ b.addEventListener('click', function(){ catButtons.forEach(function(x){x.classList.remove('active')}); this.classList.add('active'); filterAndRender(); }); });

    // Mobile menu toggle (UI only)
    var menuBtn = document.getElementById('menu-toggle'); if(menuBtn){
      menuBtn.addEventListener('click', function(){ alert('Mobile menu - UI only.'); });
    }

    // Live search on product page search input (present on all pages)
    var pageSearch = document.getElementById('search'); if(pageSearch && pageSearch !== searchInput){
      pageSearch.addEventListener('input', function(){
        // redirect to index with query
        localStorage.setItem('aurora_search_q', this.value);
        if(window.location.pathname.indexOf('index.html') === -1) { window.location.href = 'index.html'; }
      });
    }

    // If redirected from another page with a preserved query
    var storedQ = localStorage.getItem('aurora_search_q'); if(storedQ && searchInput){ searchInput.value = storedQ; localStorage.removeItem('aurora_search_q'); filterAndRender(); }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
