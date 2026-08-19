/* =========================================================
   LUXORA — products.js
   This file holds all product data for the whole website.
   Every page (shop, home, product details, search) reads
   from this same array, so we only have to manage
   products in ONE place.
   ========================================================= */

const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        category: "Men",
        price: 49,
        oldPrice: 65,
        image: "assets/images/product-1.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday cotton t-shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
    {
        id: 2,
        name: "Premium Two piece set",
        category: "Women",
        price: 289,
        oldPrice: null,
        image: "assets/images/product-2.jpg",
        rating: 4.9,
        reviews: 84,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#777777"],
        isNew: true,
        description: "Elevate your everyday look with this chic, matching 2-piece corduroy set—crafted from ultra-soft textured fabric for the perfect blend of comfort and effortless style. ."
    },
    {
        id: 3,
        name: "Baggy Shirt",
        category: "Men",
        price: 95,
        oldPrice: 120,
        image: "assets/images/product-3.jpg",
        rating: 4.6, 
        reviews: 57,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#777777"],
        isNew: false,
        description: "Loose and comfortable fit, perfect for a relaxed and trendy everyday look.."
    },
    {
        id: 4,
        name: "Classic Denim Jacket",
        category: "Women/Men",
        price: 110,
        oldPrice: null,
        image: "assets/images/jacket.jpg",
        rating: 4.7,
        reviews: 96,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#C9A96E"],
        isNew: false,
        description: "A timeless wardrobe essential that adds a stylish layer to any outfit.."
    },
    {
        id: 5,
        name: "Yellow top",
        category: "Women",
        price: 68,
        oldPrice: null,
        image: "assets/images/product-5.jpg",
        rating: 4.5,
        reviews: 41,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#FFFFFF", "#F7F4EF"],
        isNew: true,
        description: "A trendy short-length top that pairs perfectly with high-waist bottoms for a modern look."
    },
    {
        id: 6,
        name: "Wideleg Trouser",
        category: "Women",
        price: 165,
        oldPrice: 210,
        image: "assets/images/product-6.jpg",
        rating: 4.9,
        reviews: 132,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#111111", "#C9A96E"],
        isNew: true,
        description: "Stylish trousers with a loose, flowing fit for a comfortable and elegant look.."
    },
    {
        id: 7,
        name: "Crop-top",
        category: "Women",
        price: 145,
        oldPrice: null,
        image: "assets/images/product-7.jpg",
        rating: 4.8,
        reviews: 77,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#F7F4EF", "#777777", "#111111"],
        isNew: false,
        description: "A trendy short-length top that pairs perfectly with high-waist bottoms for a modern look."
    },
    {
        id: 8,
        name: "High-Waist Tailored Trousers",
        category: "men",
        price: 98,
        oldPrice: 130,
        image: "assets/images/product-8.jpg",
        rating: 4.6,
        reviews: 63,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#111111", "#F7F4EF"],
        isNew: false,
        description: "A trendy short-length top that pairs perfectly with high-waist bottoms for a modern look."
    },
    {
        id: 9,
        name: "Wideleg Trouser",
        category: "men",
        price: 175,
        oldPrice: null,
        image: "assets/images/product-9.jpg",
        rating: 4.9,
        reviews: 108,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#111111", "#777777"],
        isNew: true,
        description: ": Stylish trousers with a loose, flowing fit for a comfortable and elegant look.",
    },{
        id: 10,
        name: "Top",
        category: "Women",
        price: 99,
        oldPrice: null,
        image: "assets/images/product-10.jpg",
        rating: 4.4,
        reviews: 39,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#C9A96E", "#111111"],
        isNew: false,
        description: "A trendy short-length top that pairs perfectly with high-waist bottoms for a modern look."
    },
    {
        id: 11,
        name: "Cotton T-shirt",
        category: "men",
        price: 39,
        oldPrice: 52,
        image: "assets/images/product-1.jpg",
        rating: 4.7,
        reviews: 46,
        sizes: ["S", "M", "L"],
        colors: ["#C9A96E", "#111111"],
        isNew: true,
        description: "Soft, breathable, and comfortable for everyday wear, offering a simple and versatile style.."
    },
    {
        id: 12,
        name: "Kids Cotton suit",
        category: "Kids",
        price: 45,
        oldPrice: null,
        image: "assets/images/kids.jpg",
        rating: 4.6,
        reviews: 28,
        sizes: ["S", "M", "L"],
        colors: ["#777777", "#F7F4EF"],
        isNew: false,
        description: "Soft, breathable, and comfortable for everyday wear, offering a simple and versatile style..",
    },
    {
        id: 13,
        name: "Wideleg-Trouser",
        category: "Women",
        price: 66,
        oldPrice: null,
        image: "assets/images/t1.webp",
        rating: 4.5,
        reviews: 33,
        sizes: ["S", "M", "L"],
        colors: ["#111111", "#FFFFFF"],
        isNew: false,
        description: "Stylish trousers with a loose, flowing fit for a comfortable and elegant look..",
    },
    {
        id: 14,
        name: "Kids t-shirt",
        category: "Kids",
        price: 48,
        oldPrice: 60,
        image: "assets/images/product-4.jpg",
        rating: 4.8,
        reviews: 51,
        sizes: ["S", "M", "L"],
        colors: ["#111111"],
        isNew: true,
        description: "Soft, breathable, and comfortable for everyday wear, offering a simple and versatile style..",},

    {
        id: 15,
        name: "Kids baby suit",
        category: "Kids",
        price: 55,
        oldPrice: null,
        image: "assets/images/kids2.jpg",
        rating: 4.7,
        reviews: 40,
        sizes: ["S", "M", "L"],
        colors: ["#FFFFFF", "#C9A96E"],
        isNew: false,
        description: "."
    },
    {
        id: 16,
        name: "Leather Crossbody Bag",
        category: "Accessories",
        price: 135,
        oldPrice: 170,
        image: "assets/images/bag.webp",
        rating: 4.9,
        reviews: 91,
        sizes: ["One Size"],
        colors: ["#111111", "#777777"],
        isNew: true,
        description: "Soft and comfortable baby outfit designed for easy movement and everyday comfort."
    },
    {
        id: 17,
        name: "Gold-Trim Sunglasses",
        category: "Accessories",
        price: 78,
        image: "assets/images/product-7.jpg",
        rating: 4.6,
        reviews: 47,
        sizes: ["One Size"],
        colors: ["#111111", "#C9A96E"],
        isNew: false,
        description: ""
    },
    {
        id: 18,
        name: "Silk Neck Scarf",
        category: "Accessories",
        price: 45,
        oldPrice: null,
        image: "assets/images/product-8.jpg",
        rating: 4.5,
        reviews: 22,
        sizes: ["One Size"],
        colors: ["#C9A96E", "#F7F4EF", "#111111"],
        isNew: false,
        description: "A lightweight silk scarf finished with hand-rolled edges, versatile enough to wear at the neck, wrist or bag handle."
    },
    {
        id: 19,
        name: "Fine Leather Beg",
        category: "Accessories",
        price: 58,
        image: "assets/images/product-9.jpg",
        rating: 4.7,
        reviews: 65,
        sizes: ["S", "M", "L"],
        colors: ["#111111", "#777777"],
        isNew: false,
        description: "A compact and stylish bag made for carrying essentials while keeping your hands free."
    },
    {
        id: 20,
        name: "Structured Wool Cap",
        category: "Accessories",
        price: 38,
        image: "assets/images/product-10.jpg",
        rating: 4.4,
        reviews: 19,
        sizes: ["One Size"],
        colors: ["#111111", "#C9A96E", "#777777"],
        isNew: true,
        description: "A structured wool cap with a clean, low-profile crown, finished with a subtle embroidered LUXORA wordmark."
    },
     {
        id: 21,
        name: "Premium T-Shirt",
        category: "Men",
        price: 79,
        image: "assets/images/shirt1.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday cotton t-shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
     {
        id:22,
        name: "Premium Cotton T-Shirt",
        category: "Men",
        price: 29,
        oldPrice: 65,
        image: "assets/images/trouser1.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday cotton t-shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
     {
        id: 23,
        name: "Wideleg Pant",
        category: "Men",
        price: 89,
        image: "assets/images/pant.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "Stylish trousers with a loose, flowing fit for a comfortable and elegant look.."
    },
  {
        id: 24,
        name: "Brown Ballon pant",
        category: "Men",
        price: 229,
        image: "assets/images/pant2.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ": A trendy, relaxed-fit pant with a voluminous shape that offers both comfort and a stylish modern look.."
    },
      
    {
        id: 25,
        name: "Baggy tee",
        category: "Men",
        price: 89,
        image: "assets/images/shirt2.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday  shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
     {
        id: 25,
        name: "Baggy tee",
        category: "Men",
        price: 69,
        image: "assets/images/shirt3.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111"],
        isNew: true,
        description: "A premium everyday shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
    
 {
        id: 26,
        name: "Polo-style Shirt",
        category: "Men",
        price: 90,
        image: "assets/images/shirt4.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday  t-shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
     {
        id: 27,
        name: "Polos-shirt",
        category: "Men",
        price:49,
        oldPrice:90,
        image: "assets/images/shirt5.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "A premium everyday cotton t-shirt, cut from breathable combed cotton for a soft handfeel and a clean, tailored silhouette."
    },
     {
        id: 28,
        name: "Brown Leather Jacket",
        category: "Men",
        price: 99,
        image: "assets/images/shirt6.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ""
    },
     {
        id: 29,
        name: "Leather Jacket",
        category: "Men",
        price:199,
        image: "assets/images/shirt8.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "."
    },
    
     {
        id: 30,
        name: "Brown wideleg trouser",
        category: "Men",
        price: 59,
        oldPrice :44,
        image: "assets/images/pant3.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "."
    },
     {
        id: 31,
        name: "Cargo pant",
        category: "Men",
        price: 99,
        image: "assets/images/pant4.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ""
    },
     {
        id: 31,
        name: "Wideleg jeans",
        category: "Men",
        price: 89,
        image: "assets/images/pant5.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ""
    },
     {
        id: 32,
        name: "Baggy trouser",
        category: "Men",
        price: 29,
        image: "assets/images/pant6.webp",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ""
    },
     {
        id: 33,
        name: "Baggy shirt ",
        category: "Women",
        price: 50,
        image: "assets/images/shirt10.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "."
    },
     {
        id: 34,
        name: "Baggy trouser",
        category: "Women",
        price: 29,
        image: "assets/images/t2.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: ""
    },
     {
        id: 35,
        name: "Baggy shirt",
        category: "Women",
        price: 88,
        image: "assets/images/shirt9.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "",
     },{
        id: 36,
        name: "Wideleg trouser",
        category: "Women",
        price: 55,
        image: "assets/images/t3.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: " ."
    }, {
        id: 37,
        name: "Wideleg Pant",
        category: "Women",
        price: 79,
        image: "assets/images/t4.jpg",
        rating: 4.8,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#111111", "#FFFFFF", "#C9A96E"],
        isNew: true,
        description: "."
    },
     {
        id: 38,
        name: "Kids  suit",
        category: "Kids",
        price: 35,
        oldPrice: null,
        image: "assets/images/kids3.jpg",
        rating: 4.7,
        reviews: 40,
        sizes: ["S", "M", "L"],
        colors: ["#FFFFFF", "#C9A96E"],
        isNew: false,
        description: ""
    }, {
        id: 39,
        name: "Kids  suit",
        category: "Kids",
        price: 55,
        oldPrice: null,
        image: "assets/images/kids4.jpg",
        rating: 4.7,
        reviews: 40,
        sizes: ["S", "M", "L"],
        colors: ["#FFFFFF", "#C9A96E"],
        isNew: false,
        description: "."
    },
     {
        id: 40,
        name: "Kids  suit",
        category: "Kids",
        price: 155,
        oldPrice: null,
        image: "assets/images/kids5.jpg",
        rating: 4.7,
        reviews: 40,
        sizes: ["S", "M", "L"],
        colors: ["#FFFFFF", "#C9A96E"],
        isNew: false,
        description: ""
    },
];

/* ---------- Helper functions used across pages ---------- */

// Get a single product by its id
function getProductById(id) {
    return products.find(function (product) {
        return product.id === Number(id);
    });
}

// Get all products in a given category ("All" returns everything)
function getProductsByCategory(category) {
    if (!category || category === "All") {
        return products;
    }
    return products.filter(function (product) {
        return product.category.toLowerCase() === category.toLowerCase();
    });
}

// Search products by name, category or description
function searchProducts(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(function (product) {
        return (
            product.name.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q)
        );
    });
}

// Format a number as a USD price string, e.g. 49 -> "$49"
function formatPrice(amount) {
    return "$" + amount.toFixed(0);
}

// Build the small star-rating markup used on product cards
function renderStars(rating) {
    const fullStars = Math.round(rating);
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < fullStars ? "★" : "☆";
    }
    return stars;
}
