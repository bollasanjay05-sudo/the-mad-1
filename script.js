// --- MOCK DATA (Add your new images here as they come) ---
const products = [
  // APPAREL
  { id: 'squirrel-tee', name: 'Look Mom I Can Fly Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/squirrel-tee.jpg', collection: 'Meme' },
  { id: 'panda-tee', name: 'Inner Peace Panda Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/panda-tee.jpg', collection: 'Zen' },
  { id: 'superman-tee', name: 'Chibi Superman Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/superman-tee.jpg', collection: 'Comics' },
  { id: 'kurama-tee', name: 'Nine Tails Kurama Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/kurama-tee.jpg', collection: 'Anime' },
  { id: 'summertime-tee', name: 'Summertime Vintage Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/summertime-tee.jpg', collection: 'Aesthetic' },
  { id: 'catdad-tee', name: 'Cat Dad Club Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/catdad-tee.jpg', collection: 'Pets' },
  { id: 'ramen-cat-tee', name: 'Ramen Cat Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/ramen-cat-tee.jpg', collection: 'Food' },
  { id: 'retro-girl-tee', name: 'Retro Collage Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/retro-girl-tee.jpg', collection: 'Retro' },
  { id: 'strawberry-tee', name: 'Another Strawberry Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/strawberry-tee.jpg', collection: 'Aesthetic' },
  { id: 'inbloom-tee', name: 'In Bloom Stamp Tee', price: 'Quote', category: 'Apparel', subcategory: 'T-Shirts', image: 'assets/images/inbloom-tee.jpg', collection: 'Minimalist' },
  { id: 'turtle-hoodie', name: 'ORNG Deep Sea Hoodie', price: 'Quote', category: 'Apparel', subcategory: 'Hoodies', image: 'assets/images/turtle-hoodie.jpg', collection: 'Ocean' },
  
  // DRINKWARE
  { id: 'tumbler', name: 'Sound of Music Tumbler', price: 'Quote', category: 'Drinkware', subcategory: 'Tumblers', image: 'assets/images/tumbler.jpg', collection: 'Custom' },

  // PHOTO GIFTS
  { id: 'shadow-box', name: 'Custom Collage Shadow Box', price: 'Quote', category: 'Photo Gifts', subcategory: 'Frames', image: 'assets/images/shadow-box.jpg', collection: 'Memory' },
  { id: 'white-frame', name: 'Lucky To Have You Frame', price: 'Quote', category: 'Photo Gifts', subcategory: 'Frames', image: 'assets/images/white-frame.jpg', collection: 'Memory' },
  { id: 'magnets', name: 'Colorful Photo Magnets', price: 'Quote', category: 'Photo Gifts', subcategory: 'Magnets', image: 'assets/images/magnets.jpg', collection: 'Fridge' },
  { id: 'mini-calendars', name: 'Floral Mini Calendars', price: 'Quote', category: 'Photo Gifts', subcategory: 'Calendars', image: 'assets/images/mini-calendars.jpg', collection: 'Stationery' },
  { id: 'wall-calendar', name: 'Custom Photo Wall Calendar', price: 'Quote', category: 'Photo Gifts', subcategory: 'Calendars', image: 'assets/images/wall-calendar.jpg', collection: 'Stationery' }
];

// --- STATE ---
let cart = JSON.parse(localStorage.getItem('mad_cart')) || [];
let currentCategory = 'All';
let searchQuery = '';

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const resultsSummary = document.getElementById('results-summary');
const noResults = document.getElementById('no-results');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Handle Image Loading Transitions
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });

  renderProducts();
  updateCartUI();
  setupScrollReveal();
  setupEventListeners();
});

// --- SCROLL REVEAL ANIMATION ---
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- RENDER PRODUCTS ---
function renderProducts() {
  let filtered = products.filter(p => {
    const matchCat = currentCategory === 'All' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.collection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  resultsSummary.innerText = `SHOWING ${filtered.length} DESIGNS`;

  if (filtered.length === 0) {
    productGrid.style.display = 'none';
    noResults.hidden = false;
  } else {
    productGrid.style.display = 'grid';
    noResults.hidden = true;
    productGrid.innerHTML = filtered.map(p => `
      <div class="product-card reveal active" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.collection} Collection</p>
          <button class="button button-dark" style="margin-top:1rem; width:100%; justify-content:center;">View Details</button>
        </div>
      </div>
    `).join('');
  }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  // Search
  document.getElementById('product-search').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  // Cart Open/Close
  document.getElementById('cart-trigger').addEventListener('click', toggleCart);
  document.getElementById('close-cart').addEventListener('click', toggleCart);
  overlay.addEventListener('click', toggleCart);

  // Checkout
  document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) return showToast('Your cart is empty!');
    const name = document.getElementById('checkout-name').value;
    let msg = `Hi THE MAD ENGINEER & CO.! I'd like a quote for:\n\n`;
    cart.forEach(item => { msg += `- ${item.name} (Qty: ${item.qty})\n`; });
    if (name) msg += `\nName: ${name}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// --- CART LOGIC ---
function toggleCart() {
  const isOpen = cartDrawer.classList.contains('active');
  if (isOpen) {
    cartDrawer.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => overlay.hidden = true, 300);
  } else {
    overlay.hidden = false;
    setTimeout(() => overlay.classList.add('active'), 10);
    cartDrawer.classList.add('active');
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart!`);
  toggleCart(); // Open cart to show the user
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('mad_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.innerText = totalItems;
  document.getElementById('drawer-count').innerText = `(${totalItems})`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:2rem;">Your cart is empty.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div style="display:flex; gap:1rem; margin-bottom:1rem; align-items:center; border-bottom:1px solid var(--border); padding-bottom:1rem;">
      <img src="${item.image}" style="width:60px; height:60px; border-radius:8px; object-fit:cover;">
      <div style="flex:1;">
        <h4 style="font-size:1rem; margin-bottom:0.2rem;">${item.name}</h4>
        <p style="font-size:0.9rem;">Qty: ${item.qty}</p>
      </div>
      <button onclick="removeFromCart('${item.id}')" style="color:red; font-size:1.5rem;">&times;</button>
    </div>
  `).join('');
}

// --- PRODUCT MODAL ---
window.openProductModal = function(id) {
  const p = products.find(prod => prod.id === id);
  const modal = document.getElementById('product-modal');
  const body = document.getElementById('product-modal-body');
  
  body.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem; align-items:center;">
      <img src="${p.image}" style="width:100%; border-radius:16px;">
      <div>
        <span class="section-kicker">${p.collection} COLLECTION</span>
        <h2 style="font-size:3rem; margin-bottom:1rem;">${p.name}</h2>
        <p style="margin-bottom:2rem;">Premium quality custom print. Upload your own design or choose from our original graphics. Price available on request.</p>
        <button class="button button-dark" style="width:100%; justify-content:center;" onclick="addToCart('${p.id}')">ADD TO CART <span>↗</span></button>
      </div>
    </div>
  `;
  
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');
  document.getElementById('close-modal').onclick = () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
  };
}

// --- TOAST NOTIFICATION ---
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3000);
}
