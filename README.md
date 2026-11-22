# Lalitha Pickles & Snacks

A responsive, installable storefront for Lalitha Pickles & Snacks in Chengicherla, Hyderabad.

## Features

- Responsive customer storefront for pickles, snacks and sweets.
- Catalogue and prices transcribed from the supplied Lalitha menus.
- Pickle pack selector for 250 g, 500 g and 1 kg.
- Product search, category filters, shopping bag and quantity controls.
- WhatsApp order hand-off with selected items, quantities, subtotal and delivery details.
- Click-to-call and WhatsApp contact links for both supplied phone numbers.
- Address and map directions link for the supplied Chengicherla address.
- Installable PWA shell with basic offline caching.
- Keyboard-accessible controls, semantic sections, metadata and reduced-motion support.

## Run locally

This is a static website with no build step or dependencies. Serve the repository root with any local static HTTP server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Order workflow

Customers add products to the bag, enter their name, mobile number and delivery address, then send the prepared order through WhatsApp to **+91 74163 38403**. The alternate contact is **+91 99595 62940**. The website does not collect payments or store orders. Delivery availability, delivery charges, stock and payment details are confirmed directly by the business on WhatsApp.

## Catalogue source

Product names and prices are based on the menu images provided for this repository. Pickle prices are shown for 250 g / 500 g / 1 kg. Snack and sweet prices are shown for 1 kg. Update `PRODUCTS` in `app.js` only when the business supplies an authorised catalogue change.

## Deployment

The site can be hosted on any static hosting service. The included `manifest.webmanifest` and `sw.js` support installation and basic caching when served over HTTPS (or localhost). Configure the hosting provider to publish the repository root; no server-side credentials are required.

## Important scope notes

This first storefront intentionally uses WhatsApp as the order hand-off. No online payment gateway, database-backed inventory, owner login or order-management backend is configured because the business has not supplied payment, inventory, or backend credentials and policies. Do not treat an opened WhatsApp message as a confirmed order; wait for the business to reply.
