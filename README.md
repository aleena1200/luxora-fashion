# LUXORA

**Modern Fashion E-Commerce Website**

A responsive, front-end fashion e-commerce website built with plain HTML, CSS and JavaScript. Created as a portfolio project to demonstrate real-world UI/UX design and e-commerce logic without a backend.

---

## Features

- Fully responsive design (desktop, tablet, mobile, small mobile)
- Product filtering (category, size, color, price) and sorting
- Live product search with an overlay search panel
- Shopping cart with quantity controls, persisted with `localStorage`
- Mini-cart drawer with an "added to cart" toast notification
- Wishlist with heart-icon toggling, persisted with `localStorage`
- Product details page with a color/size selector, quantity picker, and an info accordion
- Checkout flow with an order-confirmation screen (frontend demo only)
- Sign in / create account pages with form validation (frontend demo only)
- FAQ accordion, size guide, and a sale page with a live countdown timer
- Subtle CSS animations: fade/slide-in hero text, image hover zoom, drawer slides, toast notifications

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, custom properties, media queries)
- Vanilla JavaScript (DOM manipulation, events, `localStorage`)

No frameworks, no build tools, no backend — everything runs by opening the HTML files directly in a browser.

## Project Structure

```text
luxora/
│
├── index.html          Home page
├── shop.html            Full catalog with filters & sorting
├── product.html          Product details (reads ?id= from the URL)
├── about.html            Brand story
├── contact.html          Contact form
├── cart.html             Shopping cart
├── wishlist.html         Saved products
├── checkout.html         Checkout form + order confirmation
├── login.html            Sign in (demo only)
├── register.html         Create account (demo only)
├── faq.html               FAQ accordion
├── size-guide.html        Size charts
├── sale.html              Sale page with countdown timer
├── 404.html                Not-found page
│
├── css/
│   ├── style.css          Core styles, layout, components
│   └── responsive.css     Media queries
│
├── js/
│   ├── products.js        Product data (20 products) + helpers
│   ├── main.js             Shared UI: nav, search, forms, page renderers
│   ├── cart.js              Shopping cart logic (localStorage)
│   └── wishlist.js          Wishlist logic (localStorage)
│
└── assets/
    └── images/             Brand & product photography
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` directly in your browser — **no server or build step required.**
3. (Optional) For the smoothest experience with relative links, you can also serve the folder locally, e.g.:
   ```
   npx serve .
   ```
   or, with Python:
   ```
   python3 -m http.server
   ```
   then visit `http://localhost:8000`.

## How to Customize Products

All product data lives in **`js/products.js`** as a single array. To add, remove or edit a product, edit the array — every page (home, shop, product details, search, wishlist) reads from this one file automatically.

```javascript
{
    id: 21,
    name: "Your Product Name",
    category: "Men",              // "Men" | "Women" | "Kids" | "Accessories"
    price: 79,
    oldPrice: 99,                  // set to null if not on sale
    image: "assets/images/product-1.jpg",
    rating: 4.7,
    reviews: 34,
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#C9A96E"],
    isNew: true,
    description: "A short product description."
}
```

## How to Replace Images

Replace the files inside `assets/images/` with your own photos, **keeping the same file names** (e.g. `product-1.jpg`, `hero.jpg`, `category-women.jpg`). If you want to use new file names, update the matching `image` paths in `js/products.js` and the `<img src="...">` tags in the HTML files.

## How the JavaScript Works

- **`products.js`** stores all product data in one array and exposes small helper functions (`getProductById`, `searchProducts`, `formatPrice`, `renderStars`) that every other file reuses.
- **`main.js`** wires up shared UI: the mobile menu, the search overlay, homepage sections, the shop page's filters/sorting, the product details page, forms, the FAQ accordion, and the sale countdown. Each function checks whether its target element exists on the current page before running, so one file safely powers every page.
- **`cart.js`** and **`wishlist.js`** each manage their own slice of `localStorage`, with functions to add, remove, and update items, plus the rendering functions that turn that data into HTML on the cart, wishlist, and mini-cart.

## Portfolio Description

> LUXORA is a responsive fashion e-commerce website built with HTML, CSS and vanilla JavaScript. The project demonstrates modern UI/UX design, responsive layouts, product filtering, shopping cart functionality, wishlist management and localStorage-based data persistence.

## Suggested GitHub Repository Name

`luxora-fashion-ecommerce`

## Suggested Portfolio Project Title

**LUXORA — Modern Fashion E-Commerce Website**

## Suggested Skills / Technologies to List

HTML5 · CSS3 · JavaScript (ES6) · Responsive Web Design · CSS Grid & Flexbox · DOM Manipulation · localStorage · Form Validation · UI/UX Design · Front-End E-Commerce Logic

---

### Note on Authentication & Payments

This is a **frontend-only** portfolio project. The Sign In, Create Account and Checkout pages simulate the expected user experience but do not connect to a real backend, database or payment processor — no personal or payment data is transmitted or stored anywhere outside your own browser's `localStorage`.
