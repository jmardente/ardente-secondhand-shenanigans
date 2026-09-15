fetch('script-main.js').then(function(r){return r.text();}).then(function(code){
  var newProducts = `{
    id: 'toshiba-tk05-toner-3-pack',
    name: 'Toshiba Fax Toner Cartridge TK05 — Black — 3 Pack',
    price: 19.50,
    image: 'assets/file_00000000d4ec81fdb1231075a81276b3.png',
    alt: 'Toshiba TK05 black fax toner cartridge three-pack sales image',
    description: 'New Toshiba Fax Toner Cartridge TK05 in black, product number 01083970. Sold as a 3-pack for $19.50 plus shipping. Boxed weight is approximately 2 lb 4 oz.',
    category: 'Computer Stuff',
    condition: 'New',
    badge: '3 Pack',
    status: 'available',
    highlights: ['Genuine Toshiba TK05 fax toner cartridges','Black toner','New condition','3 cartridges included','Product number 01083970','Boxed weight: 2 lb 4 oz','Price: $19.50 plus shipping'],
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
  code = code.replace('const PRODUCTS = [', 'const PRODUCTS = [' + newProducts);
  code = code.replace("const categories = ['All Finds','80s & Retro','Vintage','Home Decor','Collectibles','Clothing & Accessories','Electronics'];", "const categories = ['All Finds','80s & Retro','Vintage','Home Decor','Collectibles','Clothing & Accessories','Electronics','Computer Stuff','Misc'];");
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
