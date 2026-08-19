/* =========================================================
   LUXORA — wishlist.js
   Everything related to the wishlist:
   - reading/writing the wishlist to localStorage
   - adding, removing, and checking products
   - rendering the wishlist page
   ========================================================= */

const WISHLIST_KEY = "luxora_wishlist";

/* ---------- Storage helpers ---------- */

// Read the wishlist array (a list of product ids) from localStorage
function getWishlist() {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
}

// Save the wishlist array back to localStorage
function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

// Check if a product is already in the wishlist
function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

/* ---------- Core wishlist actions ---------- */

// Add or remove a product from the wishlist (heart icon click)
function toggleWishlist(productId) {
    let list = getWishlist();

    if (list.includes(productId)) {
        list = list.filter(function (id) { return id !== productId; });
        showToast("Removed from wishlist");
    } else {
        list.push(productId);
        showToast("Added to wishlist!");
    }

    saveWishlist(list);
    renderWishlistPage();
}

// Remove one product from the wishlist (used on the wishlist page)
function removeFromWishlist(productId) {
    let list = getWishlist();
    list = list.filter(function (id) { return id !== productId; });
    saveWishlist(list);
    updateWishlistCount();
    renderWishlistPage();
}

// Number of items in the wishlist (for the header badge)
function getWishlistCount() {
    return getWishlist().length;
}

/* ---------- UI updates ---------- */

// Update the little number badge on the wishlist icon in the header
function updateWishlistCount() {
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach(function (badge) {
        badge.textContent = getWishlistCount();
    });
}

// Render the full wishlist grid on wishlist.html
function renderWishlistPage() {
    const grid = document.getElementById("wishlist-grid");
    const emptyState = document.getElementById("wishlist-empty");
    if (!grid) return;

    const list = getWishlist();
    const wishedProducts = list
        .map(function (id) { return getProductById(id); })
        .filter(Boolean);

    updateWishlistCount();

    if (wishedProducts.length === 0) {
        grid.style.display = "none";
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    grid.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    grid.innerHTML = wishedProducts
        .map(function (product) {
            return (
                '<div class="product-card">' +
                    '<div class="product-image-wrap">' +
                        '<button class="wishlist-btn active" data-id="' + product.id + '" aria-label="Remove from wishlist">♥</button>' +
                        '<a href="product.html?id=' + product.id + '">' +
                            '<img src="' + product.image + '" alt="' + product.name + '">' +
                        "</a>" +
                        '<div class="product-quick-add" data-id="' + product.id + '">Add to Cart</div>' +
                    "</div>" +
                    '<div class="product-category">' + product.category + "</div>" +
                    '<h3 class="product-name"><a href="product.html?id=' + product.id + '">' + product.name + "</a></h3>" +
                    '<div class="product-price">' + formatPrice(product.price) + "</div>" +
                "</div>"
            );
        })
        .join("");

    grid.querySelectorAll(".wishlist-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            removeFromWishlist(Number(btn.dataset.id));
        });
    });

    grid.querySelectorAll(".product-quick-add").forEach(function (btn) {
        btn.addEventListener("click", function () {
            addToCart(Number(btn.dataset.id), 1);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderWishlistPage();
});
