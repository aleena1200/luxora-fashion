/* =========================================================
   LUXORA — main.js
   Shared site behavior: navigation, search, product card
   rendering, homepage sections, accordions, forms, etc.
   This file checks if an element exists on the current page
   before using it, so one file can safely run on every page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSearch();
    initNewsletter();
    initHomePage();
    initTabs();
    initAccordions();
    initProductDetailsPage();
    initShopPage();
    initCountdown();
    initContactForm();
    initRegisterForm();
    initLoginForm();
    initCheckoutForm();

    // These live in cart.js / wishlist.js but we call them
    // here so every page shows the correct header counters.
    if (typeof updateCartCount === "function") updateCartCount();
    if (typeof updateWishlistCount === "function") updateWishlistCount();
});/* =================================
   LUXORA SCROLL REVEAL ANIMATION
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    const animatedElements = document.querySelectorAll(
        "section, .product-card, .product, .card, .hero, .banner"
    );

    animatedElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

});

/* =========================================================
   Mobile navigation drawer
   ========================================================= */
function initMobileNav() {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".mobile-nav-close");
    const scrim = document.querySelector(".nav-scrim");

    if (!hamburger || !mobileNav) return;

    function openNav() {
        mobileNav.classList.add("open");
        scrim.classList.add("open");
    }

    function closeNav() {
        mobileNav.classList.remove("open");
        scrim.classList.remove("open");
    }

    hamburger.addEventListener("click", openNav);
    if (closeBtn) closeBtn.addEventListener("click", closeNav);
    if (scrim) scrim.addEventListener("click", closeNav);
}

/* =========================================================
   Search overlay
   ========================================================= */
function initSearch() {
    const searchTriggers = document.querySelectorAll(".search-trigger");
    const overlay = document.querySelector(".search-overlay");
    const closeBtn = document.querySelector(".search-close");
    const input = document.querySelector(".search-input");
    const resultsBox = document.querySelector(".search-results");

    if (!overlay || !input) return;

    searchTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            overlay.classList.add("open");
            input.focus();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            overlay.classList.remove("open");
        });
    }

    input.addEventListener("input", function () {
        const query = input.value;

        if (!query.trim()) {
            resultsBox.innerHTML = "";
            return;
        }

        const matches = searchProducts(query);

        if (matches.length === 0) {
            resultsBox.innerHTML = '<p class="empty-msg">No products found.</p>';
            return;
        }

        resultsBox.innerHTML = matches
            .map(function (product) {
                return (
                    '<a href="product.html?id=' + product.id + '" class="search-result-item">' +
                    "<span>" + product.name + "</span>" +
                    "<span>" + formatPrice(product.price) + "</span>" +
                    "</a>"
                );
            })
            .join("");
    });
}

/* =========================================================
   Newsletter subscribe (homepage + footer)
   ========================================================= */
function initNewsletter() {
    const forms = document.querySelectorAll(".newsletter-form");

    forms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const messageBox = form.querySelector(".newsletter-message") ||
                form.parentElement.querySelector(".newsletter-message");
            const emailInput = form.querySelector("input[type='email']");

            if (messageBox) {
                messageBox.textContent = "Thank you for subscribing!";
            }
            if (emailInput) emailInput.value = "";
        });
    });
}

/* =========================================================
   Reusable product card builder
   Used by: home page, shop page, wishlist page, search
   ========================================================= */
function createProductCard(product) {
    const isWished = isInWishlist(product.id);
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null;

    return (
        '<div class="product-card" data-category="' + product.category + '">' +
            '<div class="product-image-wrap">' +
                (product.isNew ? '<span class="badge">New</span>' : "") +
                (discount ? '<span class="badge badge-sale">-' + discount + "%</span>" : "") +
                '<button class="wishlist-btn' + (isWished ? " active" : "") + '" data-id="' + product.id + '" aria-label="Add to wishlist">' +
                    (isWished ? "♥" : "♡") +
                '</button>' +
                '<a href="product.html?id=' + product.id + '">' +
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
                '</a>' +
                '<div class="product-quick-add" data-id="' + product.id + '">Add to Cart</div>' +
            "</div>" +
            '<div class="product-category">' + product.category + "</div>" +
            '<h3 class="product-name"><a href="product.html?id=' + product.id + '">' + product.name + "</a></h3>" +
            '<div class="product-rating">' + renderStars(product.rating) + " <span>(" + product.reviews + ")</span></div>" +
            '<div class="product-price">' + formatPrice(product.price) +
                (product.oldPrice ? '<span class="old-price">' + formatPrice(product.oldPrice) + "</span>" : "") +
            "</div>" +
        "</div>"
    );
}

// Attach click handlers for wishlist hearts and quick-add buttons
// inside a container that was just filled with product cards.
function bindProductCardEvents(container) {
    container.querySelectorAll(".wishlist-btn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            toggleWishlist(Number(btn.dataset.id));
            btn.classList.toggle("active");
            btn.textContent = btn.classList.contains("active") ? "♥" : "♡";
            updateWishlistCount();
        });
    });

    container.querySelectorAll(".product-quick-add").forEach(function (btn) {
        btn.addEventListener("click", function () {
            addToCart(Number(btn.dataset.id), 1);
        });
    });
}

/* =========================================================
   Home page sections: New Arrivals + Best Sellers
   ========================================================= */
function initHomePage() {
    const newArrivalsGrid = document.getElementById("new-arrivals-grid");
    if (newArrivalsGrid) {
        const newest = products.filter(function (p) { return p.isNew; }).slice(0, 8);
        const list = newest.length >= 8 ? newest : products.slice(0, 8);
        newArrivalsGrid.innerHTML = list.map(createProductCard).join("");
        bindProductCardEvents(newArrivalsGrid);
    }

    const bestSellersGrid = document.getElementById("best-sellers-grid");
    if (bestSellersGrid) {
        renderBestSellers("All");
    }
}

function renderBestSellers(category) {
    const grid = document.getElementById("best-sellers-grid");
    if (!grid) return;

    const sorted = products.slice().sort(function (a, b) { return b.rating - a.rating; });
    const filtered = category === "All"
        ? sorted.slice(0, 8)
        : sorted.filter(function (p) { return p.category === category; }).slice(0, 8);

    grid.innerHTML = filtered.map(createProductCard).join("");
    bindProductCardEvents(grid);
}

/* =========================================================
   Category tabs (used on Best Sellers section)
   ========================================================= */
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    if (!tabButtons.length) return;

    tabButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            tabButtons.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            renderBestSellers(btn.dataset.category);
        });
    });
}

/* =========================================================
   Generic accordion (Product details + FAQ)
   ========================================================= */
function initAccordions() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(function (header) {
        header.addEventListener("click", function () {
            const item = header.closest(".accordion-item");
            item.classList.toggle("open");
        });
    });
}

/* =========================================================
   Product Details Page
   ========================================================= */
function initProductDetailsPage() {
    const wrap = document.getElementById("product-details-page");
    if (!wrap) return;

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id")) || 1;
    const product = getProductById(id);

    if (!product) {
        wrap.innerHTML = '<p class="empty-msg">Product not found.</p>';
        return;
    }

    document.title = product.name + " — LUXORA";

    document.getElementById("pd-main-image").src = product.image;
    document.getElementById("pd-main-image").alt = product.name;
    document.getElementById("pd-category").textContent = product.category;
    document.getElementById("pd-name").textContent = product.name;
    document.getElementById("pd-rating-stars").textContent = renderStars(product.rating);
    document.getElementById("pd-rating-count").textContent = "(" + product.reviews + " reviews)";
    document.getElementById("pd-price").textContent = formatPrice(product.price);
    document.getElementById("pd-description").textContent = product.description;
    document.getElementById("breadcrumb-product-name").textContent = product.name;

    if (product.oldPrice) {
        const oldPriceEl = document.createElement("span");
        oldPriceEl.className = "old-price";
        oldPriceEl.textContent = formatPrice(product.oldPrice);
        document.getElementById("pd-price").appendChild(oldPriceEl);
    }

    // Thumbnails (we reuse the same image a few times as a simple demo gallery)
    const thumbsWrap = document.getElementById("pd-thumbs");
    const thumbImages = [product.image, product.image, product.image];
    thumbsWrap.innerHTML = thumbImages
        .map(function (src, index) {
            return '<img src="' + src + '" class="' + (index === 0 ? "active" : "") + '">';
        })
        .join("");

    thumbsWrap.querySelectorAll("img").forEach(function (thumb) {
        thumb.addEventListener("click", function () {
            thumbsWrap.querySelectorAll("img").forEach(function (t) { t.classList.remove("active"); });
            thumb.classList.add("active");
            document.getElementById("pd-main-image").src = thumb.src;
        });
    });

    // Color options
    const colorWrap = document.getElementById("pd-colors");
    colorWrap.innerHTML = product.colors
        .map(function (color, index) {
            return '<span class="color-swatch' + (index === 0 ? " active" : "") + '" style="background-color:' + color + '" data-color="' + color + '"></span>';
        })
        .join("");

    colorWrap.querySelectorAll(".color-swatch").forEach(function (swatch) {
        swatch.addEventListener("click", function () {
            colorWrap.querySelectorAll(".color-swatch").forEach(function (s) { s.classList.remove("active"); });
            swatch.classList.add("active");
        });
    });

    // Size options
    const sizeWrap = document.getElementById("pd-sizes");
    sizeWrap.innerHTML = product.sizes
        .map(function (size, index) {
            return '<span class="size-box' + (index === 0 ? " active" : "") + '" data-size="' + size + '">' + size + "</span>";
        })
        .join("");

    sizeWrap.querySelectorAll(".size-box").forEach(function (box) {
        box.addEventListener("click", function () {
            sizeWrap.querySelectorAll(".size-box").forEach(function (b) { b.classList.remove("active"); });
            box.classList.add("active");
        });
    });

    // Quantity selector
    let quantity = 1;
    const qtyDisplay = document.getElementById("pd-qty");
    document.getElementById("pd-qty-minus").addEventListener("click", function () {
        if (quantity > 1) quantity--;
        qtyDisplay.textContent = quantity;
    });
    document.getElementById("pd-qty-plus").addEventListener("click", function () {
        quantity++;
        qtyDisplay.textContent = quantity;
    });

    // Wishlist heart on product page
    const wishBtn = document.getElementById("pd-wishlist-btn");
    function refreshWishBtn() {
        const active = isInWishlist(product.id);
        wishBtn.classList.toggle("active", active);
        wishBtn.textContent = active ? "♥ Wishlisted" : "♡ Add to Wishlist";
    }
    refreshWishBtn();
    wishBtn.addEventListener("click", function () {
        toggleWishlist(product.id);
        updateWishlistCount();
        refreshWishBtn();
    });

    // Add to cart / Buy now
    document.getElementById("pd-add-to-cart").addEventListener("click", function () {
        addToCart(product.id, quantity);
    });

    document.getElementById("pd-buy-now").addEventListener("click", function () {
        addToCart(product.id, quantity);
        window.location.href = "cart.html";
    });

    // Related products (same category)
    const relatedGrid = document.getElementById("related-products-grid");
    if (relatedGrid) {
        const related = products
            .filter(function (p) { return p.category === product.category && p.id !== product.id; })
            .slice(0, 4);
        relatedGrid.innerHTML = related.map(createProductCard).join("");
        bindProductCardEvents(relatedGrid);
    }
}

/* =========================================================
   Shop Page: filters, sort, search, load more
   ========================================================= */
function initShopPage() {
    const grid = document.getElementById("shop-product-grid");
    if (!grid) return;

    let visibleCount = 8;
    const state = {
        category: "All",
        sizes: [],
        colors: [],
        maxPrice: 300,
        sort: "featured",
        query: ""
    };

    // Pre-fill category from the URL, e.g. shop.html?category=Women
    const params = new URLSearchParams(window.location.search);
    if (params.get("category")) {
        state.category = params.get("category");
    }
    if (window.LUXORA_SALE_ONLY === true) {
        state.saleOnly = true;
    }

    function getFilteredProducts() {
        let list = products.slice();

        if (state.saleOnly) {
            list = list.filter(function (p) { return p.oldPrice; });
        }

        if (state.category !== "All") {
            list = list.filter(function (p) { return p.category === state.category; });
        }

        if (state.sizes.length) {
            list = list.filter(function (p) {
                return p.sizes.some(function (s) { return state.sizes.includes(s); });
            });
        }

        if (state.colors.length) {
            list = list.filter(function (p) {
                return p.colors.some(function (c) { return state.colors.includes(c); });
            });
        }

        list = list.filter(function (p) { return p.price <= state.maxPrice; });

        if (state.query) {
            const q = state.query.toLowerCase();
            list = list.filter(function (p) {
                return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
            });
        }

        switch (state.sort) {
            case "newest":
                list = list.filter(function (p) { return p.isNew; }).concat(list.filter(function (p) { return !p.isNew; }));
                break;
            case "price-low":
                list.sort(function (a, b) { return a.price - b.price; });
                break;
            case "price-high":
                list.sort(function (a, b) { return b.price - a.price; });
                break;
            case "rating":
                list.sort(function (a, b) { return b.rating - a.rating; });
                break;
            default:
                break; // "featured" keeps the original order
        }

        return list;
    }

    function render() {
        const filtered = getFilteredProducts();
        const toShow = filtered.slice(0, visibleCount);

        document.getElementById("results-count").textContent = filtered.length + " products";

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="no-results">No products found.</p>';
        } else {
            grid.innerHTML = toShow.map(createProductCard).join("");
            bindProductCardEvents(grid);
        }

        const loadMoreBtn = document.getElementById("load-more-btn");
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleCount >= filtered.length ? "none" : "inline-block";
        }
    }

    // Category filter (radio-style links in sidebar)
    document.querySelectorAll(".category-filter-option").forEach(function (el) {
        el.addEventListener("click", function (e) {
            e.preventDefault();
            state.category = el.dataset.category;
            visibleCount = 8;
            document.querySelectorAll(".category-filter-option").forEach(function (o) { o.classList.remove("active"); });
            el.classList.add("active");
            render();
        });
    });

    // Size filter checkboxes
    document.querySelectorAll(".size-filter-list .size-box").forEach(function (box) {
        box.addEventListener("click", function () {
            box.classList.toggle("active");
            const size = box.dataset.size;
            if (state.sizes.includes(size)) {
                state.sizes = state.sizes.filter(function (s) { return s !== size; });
            } else {
                state.sizes.push(size);
            }
            visibleCount = 8;
            render();
        });
    });

    // Color filter swatches
    document.querySelectorAll(".color-filter-list .color-swatch").forEach(function (swatch) {
        swatch.addEventListener("click", function () {
            swatch.classList.toggle("active");
            const color = swatch.dataset.color;
            if (state.colors.includes(color)) {
                state.colors = state.colors.filter(function (c) { return c !== color; });
            } else {
                state.colors.push(color);
            }
            visibleCount = 8;
            render();
        });
    });

    // Price range slider
    const priceSlider = document.getElementById("price-range");
    if (priceSlider) {
        priceSlider.addEventListener("input", function () {
            state.maxPrice = Number(priceSlider.value);
            document.getElementById("price-range-value").textContent = "$" + state.maxPrice;
            visibleCount = 8;
            render();
        });
    }

    // Sort dropdown
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            state.sort = sortSelect.value;
            render();
        });
    }

    // Shop search box
    const shopSearch = document.getElementById("shop-search-input");
    if (shopSearch) {
        shopSearch.addEventListener("input", function () {
            state.query = shopSearch.value;
            visibleCount = 8;
            render();
        });
    }

    // Load more
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            visibleCount += 8;
            render();
        });
    }

    // Mobile filter drawer toggle
    const mobileFilterBtn = document.getElementById("mobile-filter-btn");
    const filterSidebar = document.getElementById("filter-sidebar");
    if (mobileFilterBtn && filterSidebar) {
        mobileFilterBtn.addEventListener("click", function () {
            filterSidebar.classList.toggle("open");
        });
    }

    render();
}

/* =========================================================
   Sale page countdown timer
   ========================================================= */
function initCountdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;

    // Countdown target: 5 days from when the page is first loaded
    const target = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = Math.max(target - now, 0);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
        document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* =========================================================
   Contact form validation
   ========================================================= */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        ["contact-name", "contact-email", "contact-subject", "contact-message"].forEach(function (id) {
            const field = document.getElementById(id);
            const error = field.parentElement.querySelector(".form-error");
            if (!field.value.trim()) {
                valid = false;
                if (error) error.style.display = "block";
            } else if (error) {
                error.style.display = "none";
            }
        });

        const emailField = document.getElementById("contact-email");
        if (emailField.value && !emailField.value.includes("@")) {
            valid = false;
            emailField.parentElement.querySelector(".form-error").textContent = "Please enter a valid email.";
            emailField.parentElement.querySelector(".form-error").style.display = "block";
        }

        const successMsg = document.getElementById("contact-success");
        if (valid) {
            successMsg.textContent = "Your message has been sent. We'll be in touch soon!";
            form.reset();
        } else {
            successMsg.textContent = "";
        }
    });
}

/* =========================================================
   Register form validation
   ========================================================= */
function initRegisterForm() {
    const form = document.getElementById("register-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const error = field.parentElement.querySelector(".form-error");
            error.textContent = message;
            error.style.display = "block";
            valid = false;
        }

        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            const error = field.parentElement.querySelector(".form-error");
            error.style.display = "none";
        }

        ["reg-first-name", "reg-last-name", "reg-email", "reg-password", "reg-confirm-password"].forEach(clearError);

        const firstName = document.getElementById("reg-first-name").value.trim();
        const lastName = document.getElementById("reg-last-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("reg-confirm-password").value;

        if (!firstName) showError("reg-first-name", "First name is required.");
        if (!lastName) showError("reg-last-name", "Last name is required.");
        if (!email.includes("@")) showError("reg-email", "Please enter a valid email.");
        if (password.length < 6) showError("reg-password", "Password must be at least 6 characters.");
        if (password !== confirmPassword) showError("reg-confirm-password", "Passwords do not match.");

        const successMsg = document.getElementById("register-success");
        if (valid) {
            successMsg.textContent = "Account created! This is a frontend demo, so no real account was saved.";
            form.reset();
        } else {
            successMsg.textContent = "";
        }
    });
}

/* =========================================================
   Login form (frontend demo only — no real authentication)
   ========================================================= */
function initLoginForm() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const successMsg = document.getElementById("login-success");
        successMsg.textContent = "This is a frontend demo, so sign-in is not connected to a real account.";
    });
}

/* =========================================================
   Checkout form (frontend demo only — no real payments)
   ========================================================= */
function initCheckoutForm() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Very small check so the demo feels real: required fields filled in
        const requiredFields = form.querySelectorAll("[required]");
        let allFilled = true;
        requiredFields.forEach(function (field) {
            if (!field.value.trim()) allFilled = false;
        });

        if (!allFilled) {
            alert("Please fill in all required fields.");
            return;
        }

        // Generate a simple order number for the success screen
        const orderNumber = "LUX-" + Math.floor(100000 + Math.random() * 900000);

        clearCart();

        document.getElementById("checkout-form-view").style.display = "none";
        document.getElementById("order-success-view").style.display = "block";
        document.getElementById("order-number-display").textContent = orderNumber;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
