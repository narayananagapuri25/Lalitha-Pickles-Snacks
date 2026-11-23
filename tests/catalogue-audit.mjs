import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = readFileSync(join(root, 'app.js'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'styles.css'), 'utf8');
const ids = [...app.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1]);
assert.equal(ids.length, 20, `Expected 20 menu products, found ${ids.length}`);
assert.equal(new Set(ids).size, ids.length, 'Product IDs must be unique');

const picklePrices = {
  mango: [150, 300, 550],
  'usiri-amla': [150, 300, 550],
  lemon: [150, 300, 550],
  'allam-sweet': [200, 400, 650],
  gongura: [150, 300, 500],
  'sesame-mango': [200, 400, 750],
  tomato: [100, 200, 400]
};
for (const [id, values] of Object.entries(picklePrices)) {
  const line = app.split('\n').find((row) => row.includes(`id: '${id}'`));
  assert.ok(line, `Missing pickle ${id}`);
  for (const price of values) assert.ok(line.includes(String(price)), `Missing ₹${price} for ${id}`);
}
for (const [id, price] of Object.entries({ chekkalu: 400, murukulu: 400, mixture: 400, sakinalu: 400, arshalu: 400, boondi: 400, chekodi: 400, 'ragi-laddu': 500, 'flax-seed-laddu': 500, sununda: 600, 'nuvvula-laddu': 500, 'palli-laddu': 500, 'dry-fruit-laddu': 1400 })) {
  const line = app.split('\n').find((row) => row.includes(`id: '${id}'`));
  assert.ok(line?.includes(`price: ${price}`), `Unexpected price for ${id}`);
}
for (const image of ['mango.webp', 'usiri-amla.webp', 'lemon.webp', 'allam-sweet.webp', 'gongura.webp', 'sesame-mango.webp', 'tomato.webp', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']) {
  assert.ok(readdirSync(join(root, 'assets')).includes(image), `Missing asset ${image}`);
}
const atlasPositions = [...app.matchAll(/imagePosition: '([^']+)'/g)].map((match) => match[1]);
assert.equal(atlasPositions.length, 13, 'All 13 snack and sweet products must have atlas crops');
assert.equal(new Set(atlasPositions).size, 13, 'Snack and sweet products must use unique atlas crops');
assert.ok(css.includes('background-size:400% 400%'), 'Food atlas must use exact four-by-four tile sizing');
assert.ok(!css.includes('background-size:404% 404%'), 'Food atlas must not use oversized, offset crops');
assert.ok(app.includes("imagePosition: '33.3333% 0%'"), 'Second atlas column must align to the exact tile boundary');
assert.ok(app.includes("imagePosition: '0% 100%'"), 'Final atlas column and row must align to the exact tile boundary');
assert.ok(html.includes('+91 74163 38403'));
assert.ok(html.includes('+91 99595 62940'));
assert.ok(html.includes('https://wa.me/917416338403'));
assert.ok(html.includes('https://wa.me/919959562940'));
assert.ok(!html.includes('tel:'), 'Customer contact actions must use WhatsApp rather than phone links');
assert.ok(!html.includes('checkoutForm'), 'There must be no customer details form on the website');
assert.ok(!html.includes('checkoutDialog'), 'There must be no separate website checkout dialog');
assert.ok(html.includes('Send order on WhatsApp'), 'Shopping bag must hand off the order to WhatsApp');
assert.ok(!app.includes('checkoutForm'), 'App must not collect customer details on the website');
assert.ok(app.includes('window.location.assign(url)'), 'Order action must navigate straight to WhatsApp');
assert.ok(app.includes('I will share my name, mobile number and delivery address here on WhatsApp.'), 'WhatsApp message must ask customer to share delivery details in chat');
assert.ok(html.includes('Rajesh Nagar Colony'));
assert.ok(html.includes('application/ld+json'), 'Business structured data should be present');
assert.ok(html.includes('Street No. 4, Phase III, Rajesh Nagar Colony'), 'Full business address should be present');
console.log('Catalogue audit passed: 20 unique products, supplied prices, photo/install assets, contacts, and direct WhatsApp-only ordering without website checkout.');
