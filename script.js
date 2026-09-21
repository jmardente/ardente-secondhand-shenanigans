const QUOTED_PAYMENT_URL = 'https://buy.stripe.com/eVqdR1bos31ZcBj8LxcAo07';
fetch('script-main.js').then(function(r){return r.text();}).then(function(code){
  var newProducts = `{
    id: 'philips-wired-over-ear-headphones',
    name: 'Philips Wired Over-Ear Headphones',
    price: 16.50,
    image: 'assets/file_00000000302c81fd84fb33f35b59f337.png',
    alt: 'Black Philips wired over-ear headphones sales image',
    description: 'Pre-owned Philips wired over-ear headphones in black with attached audio cable. Includes the plug and adapter shown in the listing photo. Item weight is 9 oz without packaging.',
    category: 'Electronics',
    condition: 'Pre-owned — see photos',
    badge: 'Philips',
    status: 'available',
    highlights: ['Philips wired over-ear headphones','Black finish','Attached audio cable','Plug and adapter shown in listing photo','Weight: 9 oz without packaging','Price: $16.50 plus shipping'],
    tags: 'Philips wired headphones over ear stereo audio black electronics 3.5mm quarter inch adapter headset'
  },
  {
    id: 'toshiba-tk05-toner-3-pack',
    name: 'Toshiba Fax Toner Cartridge TK05 — Black — 3 Pack',
    price: 19.99,
    image: 'assets/toshiba.fax.toner.png',
    alt: 'Toshiba TK05 black fax toner cartridge three-pack sales image',
    description: 'New Toshiba Fax Toner Cartridge TK05 in black, product number 01083970. Sold as a 3-pack for $19.99 plus shipping. Boxed weight is approximately 2 lb 4 oz.',
    category: 'Computer Stuff',
    condition: 'New',
    badge: '3 Pack',
    status: 'available',
    highlights: ['Genuine Toshiba TK05 fax toner cartridges','Black toner','New condition','3 cartridges included','Product number 01083970','Boxed weight: 2 lb 4 oz','Price: $19.99 plus shipping'],
    tags: 'Toshiba fax toner cartridge TK05 TK-05 black 01083970 toner printer fax office computer supplies 3 pack new'
  },
  {
    id: 'tolerant-liberal-metal-sign',
    name: '“I’m a Tolerant Liberal!” Political Humor Metal Sign',
    price: 9.99,
    image: 'assets/FzgxAPHaUAEY-z7.jpg',
    alt: 'Black metal political humor sign reading I’m a Tolerant Liberal with a humorous list of labels',
    description: 'Vintage-style political humor metal sign featuring the “I’m a Tolerant Liberal!” message and a deliberately provocative list of labels. A tongue-in-cheek collectible for a garage, workshop, game room or political-humor collection.',
    category: 'Collectibles',
    condition: 'Pre-owned — see photos',
    badge: 'Political Humor',
    status: 'available',
    highlights: ['Metal sign with distressed/vintage-style appearance','Political satire / humor decor','Bold black-and-white design','Priced at $9.99 plus shipping','See listing photo for exact condition and appearance'],
    tags: 'political humor sign metal sign liberal conservative satire funny garage man cave workshop vintage decor collectible tongue in cheek'
  },`;

  var staticProducts = [
    {id:'farm-market-rooster-15-inch',name:'Farm Market Rooster — 15-Inch Figurine',price:69.99,shippingQuoteOnly:false},
    {id:'marcel-marceau-bip-lithographs',name:'Marcel Marceau — Pair of Signed & Numbered Bip Lithographs',price:799.99,shippingQuoteOnly:true},
    {id:'claude-monet-garden-replica',name:'Claude Monet — Hand-Painted Garden Replica',price:299.99,shippingQuoteOnly:true},
    {id:'book-trails-8-volume-set',name:'Book Trails — Complete 8-Volume Set',price:219.99,shippingQuoteOnly:true},
    {id:'charlie-chocolate-factory-1964',name:'Charlie and the Chocolate Factory',price:349.99,shippingQuoteOnly:false},
    {id:'african-game-trails-2-volume-set',name:'African Game Trails — Two-Volume Set',price:125.99,shippingQuoteOnly:true},
    {id:'library-worlds-best-literature-46-volume',name:"Library of the World's Best Literature",price:899.99,shippingQuoteOnly:true},
    {id:'tigers-curse-signed-first-edition',name:"Tiger's Curse — Signed First Edition / First Printing",price:49.99,shippingQuoteOnly:false},
    {id:'colleen-houck-book-collection',name:'Colleen Houck Book Collection',price:119.99,shippingQuoteOnly:true}
  ];

  code = 'window.__SECONDHAND_STATIC_PRODUCTS = ' + JSON.stringify(staticProducts) + ';\n' + code;
  code = code.replace('const PRODUCTS = [', 'const PRODUCTS = [' + newProducts);
  code = code.replace("const categories = ['All Finds','80s & Retro','Vintage','Home Decor','Collectibles','Clothing & Accessories','Electronics'];", "const categories = ['All Finds','80s & Retro','Vintage','Home Decor','Collectibles','Clothing & Accessories','Electronics','Computer Stuff','Misc'];");
  code = code.split('ardente3@cox.net').join('apardente@outlook.com');
  // Prevent the older in-page navigation handler from hijacking the Books link.
  code = code.replace("'Books':{section:'#books'},", "");

  code += `

function secondhandAllProducts(){ return [...PRODUCTS, ...(window.__SECONDHAND_STATIC_PRODUCTS || [])]; }
function secondhandFindProduct(id){ return secondhandAllProducts().find(function(p){return p.id===id;}); }
function secondhandFindStaticByTitle(title){ return (window.__SECONDHAND_STATIC_PRODUCTS || []).find(function(p){return p.name===title;}); }
function secondhandShippingCopy(product){
  return product && product.shippingQuoteOnly
    ? '<strong>Oversized item:</strong> Shipping is quoted before purchase so you only pay the appropriate shipping cost. Local pickup may also be available.'
    : '<strong>Exact-total checkout:</strong> We confirm shipping from your ZIP code first, then you pay the exact quoted total securely through Stripe.';
}

renderProducts = function(){
  const products = filteredProducts();
  if (!products.length){ productGrid.innerHTML = '<div class="empty-store"><strong>No treasures match that search yet.</strong><br>Try another category or search.</div>'; return; }
  productGrid.innerHTML = products.map(function(product){
    const shipping = secondhandShippingCopy(product);
    const priceSuffix = product.shippingQuoteOnly ? ' + shipping quote' : ' + shipping';
    return '<article class="product-card" tabindex="0" role="button" aria-label="View details for '+product.name+'" data-view-product="'+product.id+'"><img class="product-image" src="'+product.image+'" alt="'+(product.alt || product.name)+'"><div class="product-info">'+(product.badge ? '<span class="product-badge">'+product.badge+'</span>' : '')+'<h3>'+product.name+'</h3><div class="product-meta">'+product.category+(product.condition ? ' • Condition: '+product.condition : '')+'</div><div class="product-desc">'+(product.description || '')+'</div><div class="shipping-before-payment">'+shipping+'</div><div class="product-bottom"><strong class="product-price">'+money(product.price)+priceSuffix+'</strong><span class="view-details-cue">View Full Details →</span></div></div></article>';
  }).join('');
  productGrid.querySelectorAll('[data-view-product]').forEach(function(card){
    const open = function(){ openProductDetails(PRODUCTS.find(function(p){return p.id===card.dataset.viewProduct;})); };
    card.addEventListener('click', open);
    card.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();open();} });
  });
};

openProductDetails = function(product){
  if(!product) return;
  const highlights = (product.highlights || []).map(function(item){return '<li>'+item+'</li>';}).join('');
  const quoteOnly = !!product.shippingQuoteOnly;
  const shippingNote = secondhandShippingCopy(product);
  const primaryLabel = quoteOnly ? 'Request Shipping Quote' : 'Buy Now — Get Final Total';
  const primaryAttr = 'data-quote-now="'+product.name+'"';
  document.getElementById('treasure-modal-content').innerHTML = '<div class="treasure-detail-grid"><div class="treasure-detail-media"><img src="'+product.image+'" alt="'+(product.alt || product.name)+'"></div><div class="treasure-detail-copy">'+(product.badge ? '<span class="product-badge">'+product.badge+'</span>' : '')+'<h2 id="treasure-modal-title">'+product.name+'</h2><div class="product-meta">'+product.category+' • <strong>Condition:</strong> '+(product.condition || 'See description')+'</div><div class="detail-price">'+money(product.price)+' <small>'+(quoteOnly ? '+ shipping quote' : '+ shipping')+'</small></div><p class="detail-description">'+product.description+'</p>'+(highlights ? '<h3>Item Details</h3><ul class="detail-highlights">'+highlights+'</ul>' : '')+'<div class="detail-note">'+shippingNote+'</div><div class="detail-actions"><button class="detail-buy-btn" '+primaryAttr+'>'+primaryLabel+'</button><button class="detail-offer-btn" id="detail-offer-btn">Make an Offer</button></div><div class="offer-box" id="offer-box"><label for="offer-amount">Your offer (item price before shipping)</label><input id="offer-amount" type="number" min="1" step="0.01" placeholder="Enter your offer"><button class="offer-continue-btn" data-offer-item="'+product.name+'">Continue with Offer</button></div><div class="contact-shortcut"><strong>Questions or want more photos?</strong>Email <a href="mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Question about '+product.name)+'">'+CONTACT_EMAIL+'</a> and mention this item.</div></div></div>';
  modalBackdrop.classList.add('open'); document.body.style.overflow='hidden';
  const quoteButton = document.querySelector('[data-quote-now]');
  if(quoteButton) quoteButton.addEventListener('click', function(){ beginQuote(product.name, quoteOnly ? 'Oversized shipping quote request' : 'Purchase request — please send final total'); });
  document.getElementById('detail-offer-btn').addEventListener('click', function(){ document.getElementById('offer-box').classList.toggle('open'); document.getElementById('offer-amount').focus(); });
  document.querySelector('[data-offer-item]').addEventListener('click', function(){ const amount=document.getElementById('offer-amount').value; if(!amount||Number(amount)<=0){document.getElementById('offer-amount').focus();return;} beginQuote(product.name,'Offer: '+money(Number(amount))); });
};

openExistingCard = function(card,index){
  const title=card.querySelector('h3')?.textContent.trim() || 'Treasure';
  const product=secondhandFindStaticByTitle(title);
  const subtitle=card.querySelector('.book-subtitle')?.innerHTML || '';
  const paragraphs=[...card.querySelectorAll('.book-card-body > p')];
  const condition=card.querySelector('.condition')?.innerHTML || 'Please review the listing photos and ask us any questions before purchase.';
  const priceText=card.querySelector('.price')?.textContent.trim() || 'Contact us for price';
  const image=card.querySelector('img');
  const description=paragraphs.filter(function(p){return !p.classList.contains('condition')&&!p.classList.contains('price')&&!p.classList.contains('shipping-note');}).map(function(p){return p.innerHTML;}).join('<br><br>');
  const badge=card.querySelector('.book-badge')?.textContent || 'Treasure';
  const quoteOnly=!!(product && product.shippingQuoteOnly);
  const note=product ? secondhandShippingCopy(product) : '<strong>Shipping:</strong> Contact us and we will help with the best shipping option.';
  const primaryLabel=quoteOnly ? 'Request Shipping Quote' : (product ? 'Add to Cart — Secure Checkout' : 'Contact Us to Purchase');
  document.getElementById('treasure-modal-content').innerHTML='<div class="treasure-detail-grid"><div class="treasure-detail-media">'+(image?'<img src="'+image.src+'" alt="'+(image.alt||title)+'">':'<div style="font-size:6rem">📦</div>')+'</div><div class="treasure-detail-copy"><span class="product-badge">'+badge+'</span><h2 id="treasure-modal-title">'+title+'</h2>'+(subtitle?'<p class="product-meta">'+subtitle+'</p>':'')+'<div class="detail-price">'+priceText+'</div><p class="detail-description">'+description+'</p><p class="detail-description"><strong>Condition:</strong> '+condition.replace(/<strong>Condition:<\/strong>/i,'')+'</p><div class="detail-note">'+note+'</div><div class="detail-actions"><button class="detail-buy-btn" id="static-primary-btn">'+primaryLabel+'</button><button class="detail-offer-btn" id="static-offer-btn">Make an Offer</button></div><div class="offer-box" id="static-offer-box"><label for="static-offer-amount">Your offer (before shipping)</label><input id="static-offer-amount" type="number" min="1" step="0.01" placeholder="Enter your offer"><button class="offer-continue-btn" data-static-offer="'+title+'">Continue with Offer</button></div><div class="contact-shortcut"><strong>Have a question?</strong>Email <a href="mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Question about '+title)+'">'+CONTACT_EMAIL+'</a>. We are happy to answer questions or send more photos.</div></div></div>';
  modalBackdrop.classList.add('open');document.body.style.overflow='hidden';
  document.getElementById('static-primary-btn').addEventListener('click',function(){
    if(!product){window.location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Purchase question about '+title);return;}
    beginQuote(title, quoteOnly ? 'Oversized shipping quote request' : 'Purchase request — please send final total');return;
  });
  document.getElementById('static-offer-btn').addEventListener('click',function(){document.getElementById('static-offer-box').classList.toggle('open');document.getElementById('static-offer-amount').focus();});
  document.querySelector('[data-static-offer]').addEventListener('click',function(){const amount=document.getElementById('static-offer-amount').value;if(!amount||Number(amount)<=0){document.getElementById('static-offer-amount').focus();return;}beginQuote(title,'Offer: '+money(Number(amount)));});
};

addToCart = function(id){
  const product=secondhandFindProduct(id);
  if(!product||product.status==='sold')return;
  if(product.shippingQuoteOnly){beginQuote(product.name,'Oversized shipping quote request');return;}
  if(!cart.includes(id))cart.push(id);
  saveCart();renderCart();cartDrawer.classList.add('open');
};

renderCart = function(){
  const valid=cart.map(function(id){return secondhandFindProduct(id);}).filter(Boolean).filter(function(p){return !p.shippingQuoteOnly;});
  cart=valid.map(function(p){return p.id;});saveCart();
  document.getElementById('cart-count').textContent=valid.length;
  document.getElementById('cart-items').innerHTML=valid.length?valid.map(function(p){return '<div class="cart-item"><div class="cart-line"><strong>'+p.name+'</strong><strong>'+money(p.price)+'</strong></div><button class="remove-btn" data-remove="'+p.id+'">Remove</button></div>';}).join(''):'<p>Your cart is empty. Go find something wonderfully unnecessary.</p>';
  document.getElementById('cart-total').textContent=money(valid.reduce(function(s,p){return s+p.price;},0));
  const checkoutButton=document.getElementById('checkout-btn');
  if(checkoutButton){checkoutButton.disabled=valid.length===0;checkoutButton.textContent='Get Final Total';}
  document.querySelectorAll('[data-remove]').forEach(function(btn){btn.addEventListener('click',function(){cart=cart.filter(function(id){return id!==btn.dataset.remove;});renderCart();});});
};

function secondhandCheckout(){
  const cartProducts=cart.map(function(id){return secondhandFindProduct(id);}).filter(Boolean);
  const itemNames=cartProducts.map(function(p){return p.name;}).join(', ');
  if(!itemNames)return;
  beginQuote(itemNames,'Purchase request — please send the exact final total including shipping');
}

function secondhandApplyShippingLabels(){
  document.querySelectorAll('.book-card:not(.book-card-empty)').forEach(function(card){
    const title=card.querySelector('h3')?.textContent.trim();
    const product=secondhandFindStaticByTitle(title);
    if(!product)return;
    const small=card.querySelector('.price small');
    if(small)small.textContent=product.shippingQuoteOnly?'+ shipping quote':'+ standard shipping';
    const existingNote=card.querySelector('.shipping-note');
    if(existingNote)existingNote.textContent=product.shippingQuoteOnly?'Oversized or heavy item: shipping is quoted before purchase. Local pickup may be available.':'Standard shipping is added at checkout. No shipping quote is needed for this item.';
    const quoteBtn=card.querySelector('.quote-btn');
    if(quoteBtn&&!product.shippingQuoteOnly)quoteBtn.remove();
  });
}

const storeHeadCopy=document.querySelector('.store-head p');
if(storeHeadCopy)storeHeadCopy.innerHTML='Click any treasure to see full details and purchase options.<br><strong>Exact-total checkout:</strong> We confirm shipping first, then you pay the exact quoted total securely through Stripe.';
const contactBar=document.querySelector('.store-contact-bar p');
if(contactBar)contactBar.innerHTML='<strong>Questions, shipping quotes, or need more photos?</strong><br>Email us anytime. We confirm your final total before payment so there are no surprise shipping charges.';
const cartNote=document.querySelector('.cart-note');
if(cartNote)cartNote.innerHTML='<strong>Buyer-friendly shipping:</strong> Click Get Final Total and we will confirm shipping for every item before you pay.';
const checkoutBtn=document.getElementById('checkout-btn');
if(checkoutBtn){
  checkoutBtn.insertAdjacentHTML('afterend','<p class="cart-note" id="checkout-status" aria-live="polite"></p>');
  checkoutBtn.addEventListener('click',secondhandCheckout);
}
const quoteCopy=document.querySelector('.shipping-quote-copy');
if(quoteCopy){
  const heading=quoteCopy.querySelector('h2');if(heading)heading.textContent='Oversized Shipping & Local Pickup';
  const paras=quoteCopy.querySelectorAll('p');
  if(paras[1])paras[1].textContent='Most items now use standard shipping at checkout. Use this form for items marked Shipping Quote Required, oversized or heavy pieces, local pickup arrangements, offers, or special shipping questions.';
}
const quoteSection=document.getElementById('shipping-quote');
if(quoteSection && !document.getElementById('quoted-payment-link')){
  quoteSection.insertAdjacentHTML('beforeend','<div id="quoted-payment-link" style="grid-column:1/-1;background:#fff8ea;border:3px solid #315f59;border-radius:14px;padding:18px;text-align:center"><strong>Already received your final total?</strong><br><span>Pay that exact amount securely through Stripe.</span><br><a href="'+QUOTED_PAYMENT_URL+'" target="_blank" rel="noopener" style="display:inline-block;margin-top:12px;background:#a33d20;color:#fff;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:10px">Pay Your Quoted Total</a></div>');
}
const pageParams=new URLSearchParams(location.search);
if(pageParams.get('payment')==='success'){
  const shop=document.getElementById('shop');
  if(shop)shop.insertAdjacentHTML('afterbegin','<div style="background:#dceadf;border:2px solid #4d7556;color:#26472d;padding:12px;border-radius:10px;margin-bottom:16px"><strong>Payment received!</strong> Thank you. We will use the shipping address entered in Stripe to fulfill your order.</div>');
}
secondhandApplyShippingLabels();
renderProducts();renderCart();
`;

  (0,eval)(code);
}).catch(function(err){console.error('Store script could not load',err);});

// Send the main Books navigation directly to the full searchable library.
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href="#books"]').forEach(function(link){
    link.setAttribute('href','books.html');
  });
  document.querySelectorAll('.category-card').forEach(function(card){
    var heading = card.querySelector('h3');
    if (heading && heading.textContent.trim() === 'Books') {
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      card.style.cursor='pointer';
      card.addEventListener('click',function(){window.location.href='books.html';});
      card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();window.location.href='books.html';}});
    }
  });

  // Public customer point of contact for Ardente Secondhand Shenanigans.
  var contactEmail = 'apardente@outlook.com';
  var footer = document.querySelector('footer');
  if (footer && !footer.querySelector('[data-contact-email]')) {
    var contact = document.createElement('span');
    contact.setAttribute('data-contact-email','true');
    contact.innerHTML = 'Point of Contact: <a href="mailto:' + contactEmail + '" style="color:inherit;font-weight:700">' + contactEmail + '</a>';
    footer.appendChild(contact);
  }

  var about = document.getElementById('about');
  if (about && !about.querySelector('[data-contact-email]')) {
    var aboutContact = document.createElement('p');
    aboutContact.setAttribute('data-contact-email','true');
    aboutContact.innerHTML = '<strong>Questions or purchase inquiries?</strong> Email <a href="mailto:' + contactEmail + '">' + contactEmail + '</a>.';
    about.appendChild(aboutContact);
  }
});