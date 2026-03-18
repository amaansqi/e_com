# 🛍️ E-Commerce Platform

A lightweight, client-side e-commerce web application built with pure HTML, CSS, and JavaScript. It fetches product data from the [DummyJSON API](https://dummyjson.com/) and provides a fully functional shopping browsing experience — no build tools or dependencies required.

---

## 📸 Features

- **Product Listing** — Browse products displayed in a responsive grid with images, titles, descriptions, and prices.
- **Pagination** — Products are paginated (8 per page) with numbered navigation buttons.
- **Search** — Search for products with real-time autocomplete suggestions powered by your local search history.
- **Product Details** — Click any product to view its full details on a dedicated page.
- **Visit History** — All viewed products are tracked with timestamps and accessible from the History page.
- **Persistent Storage** — Search history and visit history are stored in the browser's `localStorage`.
- **Responsive Design** — Works on desktop and mobile devices.

---

## 🗂️ Project Structure

```
e_com/
├── index.html       # Home page — product listing with pagination and search
├── search.html      # Search results page
├── product.html     # Individual product detail page
├── history.html     # User visit history page
├── script.js        # Home page logic (product fetching, pagination, search)
├── search.js        # Search results filtering logic
├── product.js       # Product detail fetching logic
├── history.js       # Visit history rendering logic
└── style.css        # Global styles
```

---

## 🚀 Getting Started

This project is a **static site** with no dependencies. Simply open `index.html` in a browser.

### Option 1 — Open Directly

```bash
open index.html
```

### Option 2 — Serve Locally (recommended to avoid CORS issues)

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🔗 Pages & URL Parameters

| Page | URL | Description |
|------|-----|-------------|
| Home | `/index.html` | Product listing with pagination and search |
| Search | `/search.html?q={query}` | Filtered search results |
| Product | `/product.html?id={id}` | Full product details |
| History | `/history.html` | Recently viewed products |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantics |
| CSS3 | Styling, flexbox/grid layout, responsive design |
| Vanilla JavaScript (ES6+) | Page logic, API calls, DOM manipulation |
| [DummyJSON API](https://dummyjson.com/products) | Product data source |
| Browser `localStorage` | Persisting search and visit history |

---

## 🌐 API

Product data is sourced from the public **DummyJSON API**:

- All products: `https://dummyjson.com/products`
- Single product: `https://dummyjson.com/products/{id}`
- Search products: `https://dummyjson.com/products/search?q={query}`

No API key is required.

---

## 💾 Local Storage

The application uses `localStorage` to persist user data between sessions:

| Key | Value |
|-----|-------|
| `searchHistory` | Array of past search queries |
| `visitHistory` | Array of visited products with timestamps |
