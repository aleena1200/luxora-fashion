/* =========================================================
   LUXORA — cart.js
   Everything related to the shopping cart:
   - reading/writing the cart to localStorage
   - adding, removing, updating quantities
   - showing the "added to cart" toast
   - rendering the mini-cart drawer and the full cart page
   ========================================================= */

const CART_KEY = "luxora_cart";
const SHIPPING_COST = 9;

/* ---------- Storage helpers ---------- */

// Read the cart array from localStorage (empty array if nothing saved yet)
function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// Save the cart array back to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- Core cart actions ---------- */

// Add product to shopping cart
function addToCart(productId, quantity) {
    // Find the selected product
    const product = getProductById(productId);
    if (!product) return;

    // Add it to cart (or increase quantity if it's already there)
    const cart = getCart();
    const existingItem = cart.find(function (item) { return item.id === productId; });

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ id: productId, qty: quantity });
    }

    // Save cart to localStorage
    saveCart(cart);

    // Update cart counter
    updateCartCount();
    renderMiniCart();
    showToast("Product added to cart!");
}

// Remove a product from the cart completely
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(function (item) { return item.id !== productId; });
    saveCart(cart);
    updateCartCount();
    renderMiniCart();
    renderCartPage();
}

// Change the quantity of one cart item (used by +/- buttons)
function updateCartQty(productId, newQty) {
    const cart = getCart();
    const item = cart.find(function (i) { return i.id === productId; });
    if (!item) return;

    item.qty = Math.max(1, newQty);
    saveCart(cart);
    updateCartCount();
    renderMiniCart();
    renderCartPage();
}

// Empty the whole cart (used after checkout)
function clearCart() {
    saveCart([]);
    updateCartCount();
}

// Total number of items in the cart (for the header badge)
function getCartCount() {
    return getCart().reduce(function (total, item) { return total + item.qty; }, 0);
}

// Total price of everything in the cart
function getCartSubtotal() {
    return getCart().reduce(function (total, item) {
        const product = getProductById(item.id);
        return product ? total + product.price * item.qty : total;
    }, 0);
}

/* ---------- UI updates ---------- */

// Update the little number badge on the cart icon in the header
function updateCartCount() {
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(function (badge) {
        badge.textContent = getCartCount();
    });
}

// Show a small "Product added to cart!" notification
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// Fill in the mini-cart sidebar with the current cart contents
function renderMiniCart() {
    const itemsWrap = document.getElementById("mini-cart-items");
    if (!itemsWrap) return;

    const cart = getCart();

    if (cart.length === 0) {
        itemsWrap.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        itemsWrap.innerHTML = cart
            .map(function (item) {
                const product = getProductById(item.id);
                if (!product) return "";
                return (
                    '<div class="mini-cart-item">' +
                        '<img src="' + product.image + '" alt="' + product.name + '">' +
                        '<div class="mini-cart-item-info">' +
                            "<h5>" + product.name + "</h5>" +
                            "<p>Qty: " + item.qty + " &middot; " + formatPrice(product.price) + "</p>" +
                            '<span class="mini-cart-remove" data-id="' + product.id + '">Remove</span>' +
                        "</div>" +
                    "</div>"
                );
            })
            .join("");

        itemsWrap.querySelectorAll(".mini-cart-remove").forEach(function (btn) {
            btn.addEventListener("click", function () {
                removeFromCart(Number(btn.dataset.id));
            });
        });
    }

    const subtotalEl = document.getElementById("mini-cart-subtotal");
    if (subtotalEl) subtotalEl.textContent = formatPrice(getCartSubtotal());
}

// Open / close the mini-cart drawer
function initMiniCart() {
    const cartTriggers = document.querySelectorAll(".cart-trigger");
    const miniCart = document.getElementById("mini-cart");
    const closeBtn = document.getElementById("mini-cart-close");
    const scrim = document.getElementById("mini-cart-scrim");

    if (!miniCart) return;

    cartTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            renderMiniCart();
            miniCart.classList.add("open");
            if (scrim) scrim.classList.add("open");
        });
    });

    function closeMiniCart() {
        miniCart.classList.remove("open");
        if (scrim) scrim.classList.remove("open");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeMiniCart);
    if (scrim) scrim.addEventListener("click", closeMiniCart);
}

// Render the full cart table on cart.html
function renderCartPage() {
    const cartBody = document.getElementById("cart-items-body");
    if (!cartBody) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-msg">Your cart is empty. <a href="shop.html">Start shopping</a>.</p>';
    } else {
        cartBody.innerHTML = cart
            .map(function (item) {
                const product = getProductById(item.id);
                if (!product) return "";
                return (
                    '<div class="cart-row">' +
                        '<div class="cart-product">' +
                            '<img src="' + product.image + '" alt="' + product.name + '">' +
                            '<div class="cart-product-info">' +
                                "<h4>" + product.name + "</h4>" +
                                "<p>" + product.category + "</p>" +
                            "</div>" +
                        "</div>" +
                        '<div class="cart-price">' + formatPrice(product.price) + "</div>" +
                        '<div class="qty-selector" data-id="' + product.id + '">' +
                            '<button class="qty-minus">−</button>' +
                            "<span>" + item.qty + "</span>" +
                            '<button class="qty-plus">+</button>' +
                        "</div>" +
                        '<div class="cart-line-total">' + formatPrice(product.price * item.qty) + "</div>" +
                        '<button class="cart-remove-btn" data-id="' + product.id + '">&times;</button>' +
                    "</div>"
                );
            })
            .join("");

        // Quantity buttons
        cartBody.querySelectorAll(".qty-selector").forEach(function (selector) {
            const id = Number(selector.dataset.id);
            const item = cart.find(function (i) { return i.id === id; });

            selector.querySelector(".qty-minus").addEventListener("click", function () {
                updateCartQty(id, item.qty - 1);
            });
            selector.querySelector(".qty-plus").addEventListener("click", function () {
                updateCartQty(id, item.qty + 1);
            });
        });

        // Remove buttons
        cartBody.querySelectorAll(".cart-remove-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                removeFromCart(Number(btn.dataset.id));
            });
        });
    }

    // Order summary numbers
    const subtotal = getCartSubtotal();
    const shipping = cart.length ? SHIPPING_COST : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById("cart-subtotal");
    const shippingEl = document.getElementById("cart-shipping");
    const totalEl = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = cart.length ? formatPrice(shipping) : "$0";
    if (totalEl) totalEl.textContent = formatPrice(total);
    if (checkoutBtn) checkoutBtn.classList.toggle("disabled", cart.length === 0);
}

// Fill the small order summary shown on the checkout page
function renderCheckoutSummary() {
    const wrap = document.getElementById("checkout-summary-items");
    if (!wrap) return;

    const cart = getCart();
    wrap.innerHTML = cart
        .map(function (item) {
            const product = getProductById(item.id);
            if (!product) return "";
            return (
                '<div class="checkout-summary-item">' +
                    "<span>" + product.name + " × " + item.qty + "</span>" +
                    "<span>" + formatPrice(product.price * item.qty) + "</span>" +
                "</div>"
            );
        })
        .join("");

    const subtotal = getCartSubtotal();
    const shipping = cart.length ? SHIPPING_COST : 0;

    const subtotalEl = document.getElementById("checkout-subtotal");
    const shippingEl = document.getElementById("checkout-shipping");
    const totalEl = document.getElementById("checkout-total");

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(subtotal + shipping);
}

document.addEventListener("DOMContentLoaded", function () {
    initMiniCart();
    renderMiniCart();
    renderCartPage();
    renderCheckoutSummary();
});
