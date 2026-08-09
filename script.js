const PRODUCTS = [
  {
    id: 'cobalt-blue-art-glass-candle-holders',
    name: 'Cobalt Blue Art Glass Candle Holders — Set of 3',
    price: 34.99,
    image: 'assets/cobalt-blue-art-glass-candle-holders-set3.png',
    alt: 'Set of three cobalt blue art glass candle holders with clear twisted stems',
    description: 'Elegant cobalt blue art glass candle holders with clear twisted stems and decorative glass accents. Set of three graduated heights. No maker’s markings found. Pre-owned in good condition; one candle holder has a very small chip on the rim, shown in the product photo. Shipping is not included in the listed price and will be calculated separately.',
    category: 'Home Decor',
    condition: 'Good',
    badge: 'Set of 3',
    status: 'available',
    tags: 'cobalt blue glass candle candlestick holder coastal decor hand blown art glass'
  }
];

const form = document.getElementById('treasure-search');
const input = document.getElementById('search-input');
const note = document.getElementById('search-note');

const storeStyles = document.createElement('style');
storeStyles.textContent = `
.store-section{padding:58px clamp(18px,5vw,70px);background:#f7ead4;border-top:6px solid #315f59}.store-head{display:flex;justify-content:space-between;gap:20px;align-items:end;flex-wrap:wrap;margin-bottom:24px}.store-head h2{font-family:'League Spartan',sans-serif;font-size:clamp(2.4rem,5vw,4.8rem);line-height:.9;margin:0;color:#2e786f}.store-head p{max-width:620px;line-height:1.6;margin:8px 0 0}.store-toolbar{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}.filter-btn,.cart-btn,.add-btn,.checkout-btn,.remove-btn{border:0;cursor:pointer;font:inherit;font-weight:800}.filter-btn{background:#e6d3b4;color:#332b24;border:2px solid #684932;border-radius:999px;padding:9px 14px}.filter-btn.active{background:#2e786f;color:#fff}.cart-btn{background:#a33d20;color:#fff1d9;border-radius:12px;padding:12px 16px}.product-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.product-card{background:#fff7e8;border:3px solid #684932;border-radius:18px;overflow:hidden;box-shadow:0 5px 0 #c09c6c;display:flex;flex-direction:column}.product-image{width:100%;aspect-ratio:1/1;object-fit:cover;background:#dfcfb5}.product-info{padding:16px;display:flex;flex-direction:column;gap:8px;flex:1}.product-badge{display:inline-block;align-self:flex-start;background:#2e786f;color:white;border-radius:999px;padding:5px 9px;font-size:.72rem;font-weight:800;text-transform:uppercase}.product-card h3{font-family:'League Spartan',sans-serif;font-size:1.35rem;margin:0}.product-meta{font-size:.85rem;color:#6b5a4d}.product-desc{font-size:.92rem;line-height:1.5;color:#5b4d42;flex:1}.product-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}.product-price{font-family:'League Spartan',sans-serif;font-size:1.5rem;color:#a33d20}.add-btn{background:#2e786f;color:white;border-radius:10px;padding:10px 13px}.empty-store{grid-column:1/-1;background:#efe1c7;border:3px dashed #8a6d50;border-radius:18px;padding:36px;text-align:center;line-height:1.6}.cart-drawer{position:fixed;top:0;right:-430px;width:min(92vw,410px);height:100vh;background:#fff8ea;z-index:9999;box-shadow:-8px 0 30px rgba(0,0,0,.2);transition:right .25s ease;display:flex;flex-direction:column}.cart-drawer.open{right:0}.cart-head{padding:20px;border-bottom:3px solid #315f59;display:flex;justify-content:space-between;align-items:center}.cart-head h2{font-family:'League Spartan',sans-serif;margin:0}.cart-close{border:0;background:transparent;font-size:1.8rem;cursor:pointer}.cart-items{padding:16px;overflow:auto;flex:1}.cart-item{padding:12px 0;border-bottom:1px solid #d7c3a6}.cart-line{display:flex;justify-content:space-between;gap:10px}.remove-btn{background:transparent;color:#a33d20;padding:3px 0}.cart-footer{padding:18px;border-top:3px solid #315f59}.cart-total{font-family:'League Spartan',sans-serif;font-size:1.35rem;display:flex;justify-content:space-between;margin-bottom:12px}.checkout-btn{width:100%;background:#a33d20;color:white;border-radius:12px;padding:13px}.checkout-btn[disabled]{opacity:.5;cursor:not-allowed}.cart-note{font-size:.78rem;line-height:1.4;color:#6b5a4d;margin-top:10px}.nav-cart-count{background:#a33d20;color:white;border-radius:999px;padding:2px 7px;font-size:.72rem;margin-left:4px}
@media(max-width:1050px){.product-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:760px){.product-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.product-grid{grid-template-columns:1fr}.store-section{padding:42px 16px}}
`;
document.head.appendChild(storeStyles);

const categories = ['All Finds','80s & Retro','Vintage','Home Decor','Collectibles','Clothing & Accessories','Electronics'];
let activeCategory = 'All Finds';
let activeQuery = '';
let cart = JSON.parse(localStorage.getItem('ardente-shenanigans-cart') || '[]');

const main = document.querySelector('main');
const store = document.createElement('section');
store.className = 'store-section';
store.id = 'shop';
store.innerHTML = `
  <div class="store-head">
    <div>
      <p class="mini-label">THE TREASURE PILE</p>
      <h2>Shop the Finds</h2>
      <p>One-of-a-kind and secondhand items will appear here as they are added. Most treasures are quantity one, so when they're gone, they're gone.</p>
    </div>
    <button class="cart-btn" id="open-cart">Cart <span class="nav-cart-count" id="cart-count">0</span></button>
  </div>
  <div class="store-toolbar" id="store-toolbar"></div>
  <div class="product-grid" id="product-grid"></div>
`;
main.insertBefore(store, document.getElementById('eighties'));

const cartDrawer = document.createElement('aside');
cartDrawer.className = 'cart-drawer';
cartDrawer.id = 'cart-drawer';
cartDrawer.setAttribute('aria-label','Shopping cart');
cartDrawer.innerHTML = `
  <div class="cart-head"><h2>Your Treasure Cart</h2><button class="cart-close" id="cart-close" aria-label="Close cart">×</button></div>
  <div class="cart-items" id="cart-items"></div>
  <div class="cart-footer">
    <div class="cart-total"><span>Item Total</span><span id="cart-total">$0.00</span></div>
    <button class="checkout-btn" id="checkout-btn" disabled>Checkout Coming Next</button>
    <p class="cart-note"><strong>Shipping is not included in listed prices.</strong> Shipping costs will be calculated separately. Stripe checkout will be connected next.</p>
  </div>`;
document.body.appendChild(cartDrawer);

const productGrid = document.getElementById('product-grid');
const toolbar = document.getElementById('store-toolbar');

categories.forEach(category => {
  const button = document.createElement('button');
  button.className = `filter-btn${category === activeCategory ? ' active' : ''}`;
  button.textContent = category;
  button.addEventListener('click', () => {
    activeCategory = category;
    [...toolbar.children].forEach(btn => btn.classList.toggle('active', btn.textContent === category));
    renderProducts();
    store.scrollIntoView({behavior:'smooth',block:'start'});
  });
  toolbar.appendChild(button);
});

function money(value){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value); }

function filteredProducts(){
  return PRODUCTS.filter(product => {
    const categoryMatch = activeCategory === 'All Finds' || product.category === activeCategory;
    const text = `${product.name} ${product.description || ''} ${product.category || ''} ${product.condition || ''} ${product.tags || ''}`.toLowerCase();
    return categoryMatch && (!activeQuery || text.includes(activeQuery));
  });
}

function renderProducts(){
  const products = filteredProducts();
  if (!products.length){
    productGrid.innerHTML = `<div class="empty-store"><strong>${PRODUCTS.length ? 'No treasures match that search yet.' : 'The shelves are ready — now we just need your first treasures!'}</strong><br>${PRODUCTS.length ? 'Try another category or search.' : 'When we add your first item, its photo, price, condition, description and Add to Cart button will appear here automatically.'}</div>`;
    return;
  }
  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <img class="product-image" src="${product.image}" alt="${product.alt || product.name}">
      <div class="product-info">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <h3>${product.name}</h3>
        <div class="product-meta">${product.category}${product.condition ? ` • Condition: ${product.condition}` : ''}</div>
        <div class="product-desc">${product.description || ''}</div>
        <div class="product-bottom"><strong class="product-price">${money(product.price)} + shipping</strong><button class="add-btn" data-add="${product.id}" ${product.status === 'sold' ? 'disabled' : ''}>${product.status === 'sold' ? 'Sold' : 'Add to Cart'}</button></div>
      </div>
    </article>`).join('');
  productGrid.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
}

function addToCart(id){
  const product = PRODUCTS.find(item => item.id === id);
  if (!product || product.status === 'sold') return;
  if (!cart.includes(id)) cart.push(id);
  saveCart();
  renderCart();
  cartDrawer.classList.add('open');
}

function saveCart(){ localStorage.setItem('ardente-shenanigans-cart', JSON.stringify(cart)); }

function renderCart(){
  const valid = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  cart = valid.map(p => p.id);
  saveCart();
  document.getElementById('cart-count').textContent = valid.length;
  document.getElementById('cart-items').innerHTML = valid.length ? valid.map(p => `<div class="cart-item"><div class="cart-line"><strong>${p.name}</strong><strong>${money(p.price)}</strong></div><button class="remove-btn" data-remove="${p.id}">Remove</button></div>`).join('') : '<p>Your cart is empty. Go find something wonderfully unnecessary.</p>';
  document.getElementById('cart-total').textContent = money(valid.reduce((sum,p) => sum + p.price,0));
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { cart = cart.filter(id => id !== btn.dataset.remove); renderCart(); }));
}

document.getElementById('open-cart').addEventListener('click', () => cartDrawer.classList.add('open'));
document.getElementById('cart-close').addEventListener('click', () => cartDrawer.classList.remove('open'));

form.addEventListener('submit', event => {
  event.preventDefault();
  activeQuery = input.value.trim().toLowerCase();
  activeCategory = 'All Finds';
  [...toolbar.children].forEach(btn => btn.classList.toggle('active', btn.textContent === 'All Finds'));
  renderProducts();
  store.scrollIntoView({behavior:'smooth',block:'start'});
});

input.addEventListener('search', () => {
  if (!input.value){ activeQuery = ''; renderProducts(); }
});

renderProducts();
renderCart();
