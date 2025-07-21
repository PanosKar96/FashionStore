# 🛍️ FashionStore

**Language:** Greek (el)  
**Built With:** HTML5 · CSS3 · JavaScript (ES6) · Bootstrap 5.3 · Bootstrap Icons  
**Compatibility:** Responsive design (λειτουργεί σε όλες τις συσκευές)

---

## 📦 Project Overview

Το **FashionStore** είναι ένα demo e-shop που σχεδιάστηκε στο πλαίσιο φοιτητικού project, με έμφαση στη λειτουργικότητα του καλαθιού, το responsive layout και τη δομή front-end.

---
<img src="images/preview1.png" alt="Home Page" width="600"/>
## 🔑 Features

### 🛍️ Product Catalog
- Δυναμική φόρτωση προϊόντων μέσω JavaScript
- Responsive κάρτες προϊόντων με ομοιόμορφες εικόνες
- Λειτουργία **Add to Cart**

### 🛒 Shopping Cart System
- Προσθαφαίρεση προϊόντων
- Διαχείριση ποσοτήτων
- Αυτόματος υπολογισμός συνολικού ποσού
- Αποθήκευση καλαθιού με `localStorage`
- Δείκτης προϊόντων στο καλάθι σε όλες τις σελίδες
<img src="images/preview2.png" alt="Products" width="600"/>
### 📬 Contact Page
- Ενσωματωμένη φόρμα επικοινωνίας
- HTML5 validation με custom μηνύματα
- Εμφάνιση επιβεβαίωσης αποστολής
<img src="images/preview3.png" alt="Contact us" width="600"/>
### 🔢 Cart Management
- Σελίδα με αναλυτική λίστα καλαθιού και ποσότητες
- Κουμπί εκκαθάρισης καλαθιού
- Διαδικασία checkout (placeholder)
<img src="images/preview4.png" alt="Cart" width="600"/>
---

## 🗂️ File Structure

FashionStore/
├── index.html # Home page
├── products.html # Product listing
├── cart.html # Shopping cart
├── contact.html # Contact page
├── css/
│ └── style.css # Custom styles
├── js/
│ └── script.js # Core JS logic
└── assets/
└── images/
├── tshirt.jpg
├── jeans.jpg
└── jacket.jpg


---

## ⚙️ Core Functionality (JS Snippets)

```js
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
