const form = document.getElementById('treasure-search');
const input = document.getElementById('search-input');
const note = document.getElementById('search-note');
const items = [...document.querySelectorAll('.searchable')];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();
  items.forEach(item => item.classList.remove('search-hidden','search-match'));

  if (!query) {
    note.textContent = 'Search the categories and preview sections already on the site.';
    return;
  }

  const matches = items.filter(item => {
    const haystack = `${item.dataset.search || ''} ${item.textContent}`.toLowerCase();
    return haystack.includes(query);
  });

  items.forEach(item => {
    if (!matches.includes(item)) item.classList.add('search-hidden');
  });

  matches.forEach(item => item.classList.add('search-match'));
  note.textContent = matches.length
    ? `${matches.length} match${matches.length === 1 ? '' : 'es'} found for “${input.value.trim()}”.`
    : `No preview matches yet for “${input.value.trim()}”. Inventory is still coming soon.`;

  if (matches[0]) matches[0].scrollIntoView({behavior:'smooth', block:'center'});
});

input.addEventListener('search', () => {
  if (!input.value) {
    items.forEach(item => item.classList.remove('search-hidden','search-match'));
    note.textContent = 'Search the categories and preview sections already on the site.';
  }
});
