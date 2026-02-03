const container = document.getElementById("history-container");

let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

// ✅ Sort by latest time (timestamp order)
visits.sort((a, b) => new Date(b.time) - new Date(a.time));

if (visits.length === 0) {
  container.innerHTML = "<p>No history found 😢</p>";
}

visits.forEach((item) => {
  const div = document.createElement("div");
  div.className = "history-item";

  const date = new Date(item.time).toLocaleString();

  div.innerHTML = `
    <h3>${item.title}</h3>
    <p>Visited at: ${date}</p>
  `;

  // ✅ click → go to product detail page
  div.addEventListener("click", () => {
    window.location.href = `product.html?id=${item.id}`;
  });

  container.appendChild(div);
});
