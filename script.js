fetch('script-main.js').then(function(r){return r.text();}).then(function(code){
  var newProduct = `{
    id: 'temp-tations-old-world-soup-bowl-set',
    name: 'Temp-tations Old World Ceramic Soup Bowl Set — 4 Bowls, Lids & Trivets',
    price: 49.99,
    image: 'assets/file_00000000d18c81fdb6bed5ba561e04ea.png',
    alt: 'Temp-tations Old World ceramic soup bowl set with four bowls, four matching lids and four black metal trivets',
    description: 'Charming Temp-tations Old World ceramic soup bowl set in warm red and cream tones. The set includes four handled soup bowls, four coordinating ceramic lids and four individual black metal trivets. A beautiful oven-to-table set for soup, chili, casseroles and individual baked dishes.',
    category: 'Home Decor',
    condition: 'Gently used / excellent',
    badge: '12-Piece Set',
    status: 'available',
    shippingQuoteOnly: true,
    highlights: ['4 ceramic handled soup bowls','4 matching ceramic lids','4 individual black metal trivets','Old World-style red and cream pattern','Oven-to-table serving set','Gently used and in excellent condition','Shipping quoted by buyer ZIP code before payment'],
    tags: 'Temp-tations temptations Old World ceramic soup bowls covered bowls lids trivets ovenware bakeware kitchen casserole red cream 4 piece set'
  },`;
  code = code.replace('const PRODUCTS = [', 'const PRODUCTS = [' + newProduct);
  (0,eval)(code);
}).catch(function(err){console.error('Store script could not load',err);});
