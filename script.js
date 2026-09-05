fetch('script-main.js').then(function(r){return r.text();}).then(function(code){
  var newProduct = `{
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
  code = code.replace('const PRODUCTS = [', 'const PRODUCTS = [' + newProduct);
  (0,eval)(code);
}).catch(function(err){console.error('Store script could not load',err);});
