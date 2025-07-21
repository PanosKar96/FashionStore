Project Overview
Language: Greek (el)

Technologies:

HTML5

CSS3

JavaScript (ES6)

Bootstrap 5.3

Bootstrap Icons

Compatibility: Responsive design (works on all devices)

Features
🛍️ Product Catalog
Dynamic product listing with cards

Product images with responsive ratios

"Add to Cart" functionality

🛒 Shopping Cart System
Add/remove products

Quantity management

Real-time total calculation

Cart persistence using localStorage

Cart badge counter across all pages

📬 Contact Page
Form validation with custom messages

Success message on submission

Responsive form layout

🔢 Cart Management
View cart items with quantities

Clear cart functionality

Checkout process (placeholder)

          File Structure

├── index.html             # Home page
├── products.html          # Product listing page
├── cart.html              # Shopping cart page
├── contact.html           # Contact page
├── css/
│   └── style.css          # Custom styles
├── js/
│   └── script.js          # Core JavaScript functionality
└── assets/                # Images folder (simulated)
    └── images/
        ├── tshirt.jpg
        ├── jeans.jpg
        └── jacket.jpg







        Core Functionality

// Cart management functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.title === item.title);
  
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  
  saveCart(cart);
}

// Contact form validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  
  alert('Your message has been sent successfully!');
  form.reset();
  form.classList.remove('was-validated');
});

              
          Future Improvements
User authentication system

Backend integration

Payment processing (Stripe/PayPal)

Product rating system

Advanced product filtering

Wishlist functionality

            Contributing

Contributions are welcome! Please open an issue or submit a pull request.

            
                                                                                    FashionStore © 2025 - Built with ❤️ for the Greek e-commerce market
      
