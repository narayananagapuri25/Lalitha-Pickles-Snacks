'use strict';

const PRODUCTS = [
  { id: 'mango', name: 'Mango', category: 'pickles', image: 'assets/mango.webp', prices: { '250 g': 150, '500 g': 300, '1 kg': 550 } },
  { id: 'usiri-amla', name: 'Usiri (Amla)', category: 'pickles', image: 'assets/usiri-amla.webp', prices: { '250 g': 150, '500 g': 300, '1 kg': 550 } },
  { id: 'lemon', name: 'Lemon', category: 'pickles', image: 'assets/lemon.webp', prices: { '250 g': 150, '500 g': 300, '1 kg': 550 } },
  { id: 'allam-sweet', name: 'Allam (Sweet)', category: 'pickles', image: 'assets/allam-sweet.webp', prices: { '250 g': 200, '500 g': 400, '1 kg': 650 } },
  { id: 'gongura', name: 'Gongura', category: 'pickles', image: 'assets/gongura.webp', prices: { '250 g': 150, '500 g': 300, '1 kg': 500 } },
  { id: 'sesame-mango', name: 'Sesame Mango', category: 'pickles', image: 'assets/sesame-mango.webp', prices: { '250 g': 200, '500 g': 400, '1 kg': 750 } },
  { id: 'tomato', name: 'Tomato', category: 'pickles', image: 'assets/tomato.webp', prices: { '250 g': 100, '500 g': 200, '1 kg': 400 } },
  { id: 'chekkalu', name: 'Chekkalu', category: 'snacks', price: 400, weight: '1 kg', emoji: '🥨' },
  { id: 'murukulu', name: 'Murukulu', category: 'snacks', price: 400, weight: '1 kg', emoji: '🍥' },
  { id: 'mixture', name: 'Mixture', category: 'snacks', price: 400, weight: '1 kg', emoji: '🥜' },
  { id: 'sakinalu', name: 'Sakinalu', category: 'snacks', price: 400, weight: '1 kg', emoji: '⭕' },
  { id: 'arshalu', name: 'Arshalu', category: 'snacks', price: 400, weight: '1 kg', emoji: '🥨' },
  { id: 'boondi', name: 'Boondi', category: 'snacks', price: 400, weight: '1 kg', emoji: '🟠' },
  { id: 'chekodi', name: 'Chekodi', category: 'snacks', price: 400, weight: '1 kg', emoji: '⭕' },
  { id: 'ragi-laddu', name: 'Ragi Laddu', category: 'sweets', price: 500, weight: '1 kg', emoji: '🟤' },
  { id: 'flax-seed-laddu', name: 'Flax Seed Laddu', category: 'sweets', price: 500, weight: '1 kg', emoji: '🟤' },
  { id: 'sununda', name: 'Sununda', category: 'sweets', price: 600, weight: '1 kg', emoji: '🟡' },
  { id: 'nuvvula-laddu', name: 'Nuvvula Laddu', category: 'sweets', price: 500, weight: '1 kg', emoji: '🟡' },
  { id: 'palli-laddu', name: 'Palli Laddu', category: 'sweets', price: 500, weight: '1 kg', emoji: '🟤' },
  { id: 'dry-fruit-laddu', name: 'Dry Fruit Laddu', category: 'sweets', price: 1400, weight: '1 kg', emoji: '🟡' }
];

const CATEGORY_NAMES = { pickles: 'Pickles', snacks: 'Snacks', sweets: 'Sweets' };
const WHATSAPP_NUMBER = '917416338403';
const cart = new Map();
let activeCategory = 'all';
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const itemKey = (id, weight) => `${id}::${weight}`;
const productById = (id) => PRODUCTS.find((product) => product.id === id);

function selectedPrice(product, weight) {
  return product.prices ? product.prices[weight] : product.price;
}

function renderProducts() {
  const searchTerm = $('#productSearch').value.trim().toLocaleLowerCase('en-IN');
  const results = PRODUCTS.filter((product) => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const searchMatch = product.name.toLocaleLowerCase('en-IN').includes(searchTerm) || CATEGORY_NAMES[product.category].toLocaleLowerCase('en-IN').includes(searchTerm);
    return categoryMatch && searchMatch;
  });
  $('#productGrid').innerHTML = results.map((product) => {
    const imageMarkup = product.image
      ? `<img src="${product.image}" alt="${escapeHtml(product.name)} pickle in a serving bowl" loading="lazy"><span class="product-tag">Homemade pickle</span>`
      : `<div class="product-emoji" aria-hidden="true">${product.emoji}</div><span class="product-tag">Traditional ${product.category === 'snacks' ? 'snack' : 'sweet'}</span>`;
    const configuration = product.prices
      ? `<label class="sr-only" for="size-${product.id}">Choose pack size for ${escapeHtml(product.name)}</label><select class="size-select" id="size-${product.id}" data-size-for="${product.id}">${Object.entries(product.prices).map(([weight, price]) => `<option value="${weight}">${weight} · ${money(price)}</option>`).join('')}</select><strong class="product-price" data-price-for="${product.id}">${money(Object.values(product.prices)[0])}</strong>`
      : `<span class="fixed-weight">${product.weight}</span><strong class="product-price">${money(product.price)}</strong>`;
    return `<article class="product-card"><div class="product-visual ${product.image ? '' : 'no-image'}">${imageMarkup}</div><div class="product-info"><div class="product-category">${CATEGORY_NAMES[product.category]}</div><h3>${escapeHtml(product.name)}</h3><div class="product-config">${configuration}</div><button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${escapeHtml(product.name)} to bag"><span>+</span> Add to bag</button></div></article>`;
  }).join('');
  $('#resultCount').textContent = `${results.length} ${results.length === 1 ? 'item' : 'items'}`;
  $('#noResults').hidden = results.length !== 0;
  $('#productGrid').hidden = results.length === 0;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function cartQuantity() {
  return [...cart.values()].reduce((total, line) => total + line.quantity, 0);
}

function cartSubtotal() {
  return [...cart.values()].reduce((total, line) => total + line.price * line.quantity, 0);
}

function addToCart(product, weight, price) {
  const key = itemKey(product.id, weight);
  const line = cart.get(key);
  if (line) line.quantity += 1;
  else cart.set(key, { id: product.id, name: product.name, weight, price, quantity: 1 });
  updateCartUI();
  showToast(`${product.name} added to your bag`);
}

function changeQuantity(key, delta) {
  const line = cart.get(key);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) cart.delete(key);
  updateCartUI();
  renderCartLines();
}

function removeLine(key) {
  cart.delete(key);
  updateCartUI();
  renderCartLines();
}

function updateCartUI() {
  const quantity = cartQuantity();
  const subtotal = cartSubtotal();
  $('#cartCount').textContent = quantity;
  $('#floatingCart').hidden = quantity === 0;
  $('#floatingCartSummary').textContent = `${quantity} ${quantity === 1 ? 'item' : 'items'} in your bag`;
  $('#floatingCartTotal').textContent = money(subtotal);
  $('#cartSubtotal').textContent = money(subtotal);
  $('#checkoutTotal').textContent = money(subtotal);
  $('#cartSummary').hidden = quantity === 0;
  $('#emptyCart').hidden = quantity !== 0;
}

function renderCartLines() {
  const lines = [...cart.entries()];
  $('#cartLines').innerHTML = lines.map(([key, line]) => `
    <div class="cart-line">
      <div><h3>${escapeHtml(line.name)}</h3><small>${escapeHtml(line.weight)} · ${money(line.price)} each</small>
        <div class="cart-line-actions"><button class="qty-button" type="button" data-qty="${escapeHtml(key)}" data-delta="-1" aria-label="Remove one ${escapeHtml(line.name)}">−</button><span class="qty-number">${line.quantity}</span><button class="qty-button" type="button" data-qty="${escapeHtml(key)}" data-delta="1" aria-label="Add one ${escapeHtml(line.name)}">+</button><button class="remove-button" type="button" data-remove="${escapeHtml(key)}">Remove</button></div>
      </div><div class="cart-line-price">${money(line.price * line.quantity)}</div>
    </div>`).join('');
  updateCartUI();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}

function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog.open) dialog.close();
  if (!$('dialog[open]')) document.body.classList.remove('dialog-open');
}

function buildWhatsAppMessage(formData) {
  const lines = [...cart.values()];
  const orderLines = lines.map((line) => `• ${line.name} (${line.weight}) × ${line.quantity} — ${money(line.price * line.quantity)}`);
  const message = [
    'Hello Lalitha Pickles & Snacks! I would like to place an order.',
    '',
    'ORDER DETAILS',
    ...orderLines,
    '',
    `Product subtotal: ${money(cartSubtotal())}`,
    '(Delivery charges to be confirmed)',
    '',
    'CUSTOMER DETAILS',
    `Name: ${formData.get('name').trim()}`,
    `Mobile: ${formData.get('phone').trim()}`,
    `Delivery address: ${formData.get('address').trim()}`,
    formData.get('note').trim() ? `Note: ${formData.get('note').trim()}` : null,
    '',
    'Please confirm product availability, delivery charge and payment details. Thank you!'
  ].filter((line) => line !== null);
  return message.join('\n');
}

function initEvents() {
  $$('.category-tab').forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    $$('.category-tab').forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    });
    renderProducts();
  }));

  $('#productSearch').addEventListener('input', renderProducts);
  $('#resetFilters').addEventListener('click', () => {
    activeCategory = 'all';
    $('#productSearch').value = '';
    $$('.category-tab').forEach((tab) => {
      const isActive = tab.dataset.category === 'all';
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    });
    renderProducts();
  });

  $('#productGrid').addEventListener('change', (event) => {
    const select = event.target.closest('[data-size-for]');
    if (!select) return;
    const product = productById(select.dataset.sizeFor);
    $(`[data-price-for="${product.id}"]`).textContent = money(selectedPrice(product, select.value));
  });

  $('#productGrid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    const product = productById(button.dataset.add);
    const select = $(`[data-size-for="${product.id}"]`);
    const weight = select ? select.value : product.weight;
    addToCart(product, weight, selectedPrice(product, weight));
  });

  const openCart = () => { renderCartLines(); openDialog('cartDialog'); };
  $('#openCart').addEventListener('click', openCart);
  $('#floatingCart').addEventListener('click', openCart);
  $('#cartLines').addEventListener('click', (event) => {
    const qty = event.target.closest('[data-qty]');
    const remove = event.target.closest('[data-remove]');
    if (qty) changeQuantity(qty.dataset.qty, Number(qty.dataset.delta));
    if (remove) removeLine(remove.dataset.remove);
  });

  $('#startCheckout').addEventListener('click', () => {
    if (cart.size === 0) return;
    $('#checkoutTotal').textContent = money(cartSubtotal());
    closeDialog('cartDialog');
    openDialog('checkoutDialog');
  });
  $('[name="phone"]', $('#checkoutForm')).addEventListener('input', (event) => event.currentTarget.setCustomValidity(''));

  $('#checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (cart.size === 0) {
      closeDialog('checkoutDialog');
      showToast('Your bag is empty. Add an item to continue.');
      return;
    }
    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get('phone')).replace(/\D/g, '');
    if (phone.length < 10 || phone.length > 13) {
      $('[name="phone"]', event.currentTarget).setCustomValidity('Please enter a valid phone number.');
      $('[name="phone"]', event.currentTarget).reportValidity();
      return;
    }
    $('[name="phone"]', event.currentTarget).setCustomValidity('');
    const message = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    closeDialog('checkoutDialog');
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Your order message is ready in WhatsApp.');
  });

  $$('[data-close]').forEach((button) => button.addEventListener('click', () => closeDialog(button.dataset.close)));
  $$('dialog').forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('dialog-open');
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  $('[data-scroll-shop]').addEventListener('click', () => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }));
  $('#menuToggle').addEventListener('click', () => {
    const nav = $('#mobileNav');
    const isOpen = !nav.hidden;
    nav.hidden = isOpen;
    $('#menuToggle').setAttribute('aria-expanded', String(!isOpen));
    $('#menuToggle').setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });
  $$('#mobileNav a').forEach((link) => link.addEventListener('click', () => {
    $('#mobileNav').hidden = true;
    $('#menuToggle').setAttribute('aria-expanded', 'false');
    $('#menuToggle').setAttribute('aria-label', 'Open menu');
  }));
}

function validateCatalogue() {
  const expected = {
    mango: [150, 300, 550], 'usiri-amla': [150, 300, 550], lemon: [150, 300, 550],
    'allam-sweet': [200, 400, 650], gongura: [150, 300, 500],
    'sesame-mango': [200, 400, 750], tomato: [100, 200, 400]
  };
  for (const [id, values] of Object.entries(expected)) {
    const actual = Object.values(productById(id).prices);
    if (JSON.stringify(actual) !== JSON.stringify(values)) throw new Error(`Pickle price mismatch: ${id}`);
  }
  if (PRODUCTS.length !== 20) throw new Error(`Expected 20 catalogue items, got ${PRODUCTS.length}`);
}

validateCatalogue();
renderProducts();
updateCartUI();
initEvents();
$('#year').textContent = new Date().getFullYear();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
