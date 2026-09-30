const PRODUCTS = [
  {
    id: 'hjc-full-face-motorcycle-helmet-medium',
    name: 'HJC Full-Face Motorcycle Helmet — Size Medium',
    price: 62.00,
    image: 'assets/file_000000005e6481fdbf59d64416feac72.png',
    alt: 'White HJC full-face motorcycle helmet, size Medium, shown from multiple angles',
    description: 'White HJC full-face motorcycle helmet in size Medium with clear visor, interior padding, ventilation and chin bar. Pre-owned in great condition. Item weight is approximately 3 lb 12 oz. Because this is pre-owned safety equipment, please review the photos carefully and verify fit and suitability before use.',
    category: 'Clothing & Accessories',
    condition: 'Great pre-owned condition',
    badge: 'Motorcycle Gear',
    status: 'available',
    shippingQuoteOnly: true,
    highlights: ['HJC full-face motorcycle helmet','Size Medium (M)','White shell with clear visor','Approx. weight: 3 lb 12 oz','Pre-owned in great condition','Please review photos carefully and verify fit and suitability before use'],
    tags: 'HJC helmet motorcycle full face riding gear biker white medium M visor protective gear motorsports'
  },
  {
    id: 'cobalt-blue-art-glass-candle-holders',
    name: 'Cobalt Blue Art Glass Candle Holders — Set of 3',
    price: 34.99,
    image: 'assets/cobalt-blue-art-glass-candle-holders-set3.png',
    alt: 'Set of three cobalt blue art glass candle holders with clear twisted stems',
    description: 'Elegant cobalt blue art glass candle holders with clear twisted stems and decorative glass accents. Set of three graduated heights. No maker’s markings found. Pre-owned in good condition; one candle holder has a very small chip on the rim, shown in the product photo.',
    category: 'Home Decor',
    condition: 'Good',
    badge: 'Set of 3',
    status: 'available',
    highlights: ['Set of three graduated-height candle holders','Cobalt-blue art glass with clear twisted stems','No maker markings found','Small rim chip is disclosed and shown in the listing photo'],
    tags: 'cobalt blue glass candle candlestick holder coastal decor hand blown art glass'
  },
  {
    id: 'temp-tations-old-world-red-12-piece-set',
    name: 'Temp-tations Presentable Ovenware — Old World Red 12-Piece Set',
    price: 119.99,
    image: 'temptation-ovenware-set.png',
    alt: 'Temp-tations Presentable Ovenware Old World Red 12-piece set listing',
    description: 'Four matching covered casserole/bakers, each with its coordinating ceramic lid and black metal serving/storage rack — 12 pieces total. This set has never been used and is in beautiful like-new condition.',
    category: 'Home Decor',
    condition: 'Never used / like new',
    badge: '12-Piece Set',
    status: 'available',
    shippingQuoteOnly: true,
    highlights: ['12 pieces total','Four matching casserole/bakers','Four coordinating ceramic lids','Four black metal serving/storage racks','Never used'],
    tags: 'temp-tations temptations presentable ovenware old world red casserole baker covered dish ceramic lid wire rack unused kitchen bakeware'
  },
  {
    id: 'fisher-price-little-people-share-care-safari',
    name: 'Fisher-Price Little People Share & Care Safari — Complete Set FHF35',
    price: 179.99,
    image: 'assets/little-people-safari.png',
    alt: 'Fisher-Price Little People Share and Care Safari complete set with safari guide and six animals',
    description: 'Complete Fisher-Price Little People Share & Care Safari playset, model FHF35. Includes all original pieces, safari guide and 6 animals. Features 6 animal habitats, working zipline, waterfall, peek-a-boo play, lights, sounds and music. Gently used, clean and in excellent condition with excellent stickers. From a smoke-free home. Batteries were never installed.',
    category: 'Collectibles',
    condition: 'Gently used / excellent',
    badge: 'Complete Set',
    status: 'available',
    shippingQuoteOnly: true,
    highlights: ['Complete FHF35 set','Includes safari guide and all 6 animals','Excellent stickers','Working play features','Batteries were never installed','Smoke-free home'],
    tags: 'Fisher Price Little People Share Care Safari FHF35 toy playset complete animals safari guide zipline waterfall vintage collectible learning imaginative play'
  }
];

const CONTACT_EMAIL = 'ardente3@cox.net';
const form = document.getElementById('treasure-search');
const input = document.getElementById('search-input');
const note = document.getElementById('search-note');

const storeStyles = document.createElement('style');
storeStyles.textContent = ``;
document.head.appendChild(storeStyles);
