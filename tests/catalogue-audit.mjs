import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = readFileSync(join(root, 'app.js'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');
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
assert.ok(html.includes('+91 74163 38403'));
assert.ok(html.includes('+91 99595 62940'));
assert.ok(html.includes('https://wa.me/917416338403'));
assert.ok(html.includes('https://wa.me/919959562940'));
assert.ok(!html.includes('tel:'), 'Customer contact actions must use WhatsApp rather than phone links');
assert.ok(html.includes('Rajesh Nagar Colony'));
assert.ok(html.includes('application/ld+json'), 'Business structured data should be present');
assert.ok(html.includes('Street No. 4, Phase III, Rajesh Nagar Colony'), 'Full business address should be present');
console.log('Catalogue audit passed: 20 unique products, supplied prices, 10 photo/install assets, contact and business details.');
