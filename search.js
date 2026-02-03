const container = document.getElementById("product-container");
const heading = document.getElementById("heading");

// URL se query nikalna
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

// API se products fetch karna
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    // search filter
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    );

    if (filtered.length === 0) {
      heading.innerText = "❌ No results found for: " + query;
      return;
    }

    filtered.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = product.thumbnail;

      const title = document.createElement("h3");
      title.innerText = product.title;

      const desc = document.createElement("p");
      desc.innerText = product.description.slice(0, 60) + "...";

      const price = document.createElement("p");
      price.className = "price";
      price.innerText = "₹ " + product.price;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(price);

      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error(err);
    heading.innerText = "⚠️ Error loading products";
  });
