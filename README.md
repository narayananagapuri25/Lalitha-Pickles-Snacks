# Lalitha Pickles & Snacks

A responsive, strictly static storefront for Lalitha Pickles & Snacks in Chengicherla, Hyderabad.

## Features

- Responsive customer storefront for pickles, snacks and sweets.
- Catalogue and prices transcribed from the supplied Lalitha menus.
- Pickle pack selector for 250 g, 500 g and 1 kg.
- Product search, category filters, shopping bag and quantity controls.
- WhatsApp order hand-off with selected items, quantities, subtotal and delivery details.
- WhatsApp contact links for both supplied phone numbers.
- Address and map directions link for the supplied Chengicherla address.
- Static, mobile-friendly storefront with no backend or database.
- Keyboard-accessible controls, semantic sections, metadata and reduced-motion support.

## Run locally

This is a static website with no build step or dependencies. Serve the repository root with any local static HTTP server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Order workflow

Customers add products to the bag and send the prepared order through WhatsApp to **+91 74163 38403**. The alternate contact is **+91 99595 62940**. The website does not collect names, phone numbers or delivery addresses, does not collect payments, and does not store orders. Customers share their details in WhatsApp, where the business confirms availability, delivery charges, stock and payment details.

## Catalogue source

Product names and prices are based on the menu images provided for this repository. Pickle prices are shown for 250 g / 500 g / 1 kg. Snack and sweet prices are shown for 1 kg. Update `PRODUCTS` in `app.js` only when the business supplies an authorised catalogue change.

## Deployment

The site can be hosted on any static hosting service. The site is served as ordinary static files over HTTPS. It does not register a service worker, run a server-side Worker, or require a backend. Configure the hosting provider to publish the repository root; no server-side credentials are required.

## Ordering model — WhatsApp only

This business website is intentionally a simple WhatsApp-first storefront. **There is no dashboard, owner login, admin panel, database, server-side order system or online payment flow.**

- Customers browse the menu, select products and pack sizes, and build a shopping bag on the website.
- The bag's **Send order on WhatsApp** button opens WhatsApp directly with the selected items, pack sizes, quantities and product subtotal already written in the message.
- Customers share their name, mobile number, delivery address and any special instructions inside the WhatsApp conversation itself.
- Product questions and delivery enquiries also go through WhatsApp. The second WhatsApp contact is **+91 99595 62940**.
- The business confirms availability, delivery charge, payment method and the order directly in the WhatsApp conversation.
- The website does not store customer details or orders and does not claim an order is confirmed merely because WhatsApp opens.

The website has no customer details form. Customer details are exchanged only in WhatsApp after the customer chooses to send a message. The website does not collect or transmit personal details to a separate backend.

## Static hosting with GitHub Pages

This repository is published as ordinary static files from the `main` branch. It does not use GitHub Actions, workflow tokens, a build pipeline, Cloudflare Workers, a server-side runtime or a database.

To enable GitHub Pages once:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then save.

After this one-time setting, GitHub Pages publishes the static files directly from the root of `main` whenever the branch changes. No workflow or deployment token is required.

## Business operations not yet connected

This repository does not currently include a secure owner/admin portal, server-side order database, stock management, automated delivery pricing or online payment processing. Those features need the business's confirmed operating rules and a secure backend. The current website sends the customer-prepared order to WhatsApp and does not store customer details or claim an order is confirmed.
