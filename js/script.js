// Fallback storage για Firefox
let safeStorage;
try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    safeStorage = localStorage;
} catch (e) {
    try {
        const testKey = '__storage_test__';
        sessionStorage.setItem(testKey, testKey);
        sessionStorage.removeItem(testKey);
        safeStorage = sessionStorage;
    } catch (e) {
        safeStorage = {
            _data: {},
            getItem(key) { return this._data[key] },
            setItem(key, value) { this._data[key] = value }
        };
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Dynamic Products Loading
    const productList = document.getElementById('product-list');
    if (productList) {
        const products = [
            { id: 1, name: 'T-shirt', price: 15.90, image: 'assets/images/tshirt.jpg' },
            { id: 2, name: 'Jean', price: 32.00, image: 'assets/images/jeans.jpg' },
            { id: 3, name: 'Jacket', price: 75.00, image: 'assets/images/jacket.jpg' }
        ];

        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <div class="ratio ratio-4x3">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mt-2">${product.name}</h5>
                        <p class="card-text">${product.price.toFixed(2)}€</p>
                        <button class="btn btn-primary mt-auto">Προσθήκη στο καλάθι</button>
                    </div>
                </div>
            `;
            productList.appendChild(col);
        });
    }

    // Contact Form Validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            alert('Το μήνυμά σας στάλθηκε με επιτυχία!');
            form.reset();
            form.classList.remove('was-validated');
        });
    }

    // Cart Helper Functions
    function getCart() {
        return JSON.parse(safeStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        safeStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) badge.innerText = count;
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

    // initialize badge on load
    updateCartCount();

    // “Add to Cart” Buttons
    document.querySelectorAll('#product-list .btn.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const title = card.querySelector('.card-title').innerText;
            const price = parseFloat(card.querySelector('.card-text').innerText);
            addToCart({ title, price, quantity: 1 });
        });
    });

    // Load Cart Page Items
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        const cart = getCart();
        let total = 0;
        cart.forEach(item => {
            const line = document.createElement('div');
            line.className = 'list-group-item d-flex justify-content-between align-items-center';
            line.innerText = `${item.title} x${item.quantity}`;
            const priceSpan = document.createElement('span');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            priceSpan.innerText = itemTotal.toFixed(2) + '€';
            line.appendChild(priceSpan);
            cartItemsContainer.appendChild(line);
        });
        document.getElementById('cart-total').innerText = total.toFixed(2);
    }

    // Clear Cart Button
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            safeStorage.removeItem('cart');
            updateCartCount();
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '';
            }
            document.getElementById('cart-total').innerText = '0.00';
        });
    }
});