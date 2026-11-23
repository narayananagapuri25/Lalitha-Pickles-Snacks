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

## Hosting architecture

The storefront is a static HTML, CSS and JavaScript site. It does not register a service worker, run a server-side Worker, or require a backend. Cloudflare Pages publishes the files directly from the repository root.

## Ordering model — WhatsApp only

This business website is intentionally a simple WhatsApp-first storefront. **There is no dashboard, owner login, admin panel, database, server-side order system or online payment flow.**

- Customers browse the menu, select products and pack sizes, and build a shopping bag on the website.
- The bag's **Send order on WhatsApp** button opens WhatsApp directly with the selected items, pack sizes, quantities and product subtotal already written in the message.
- Customers share their name, mobile number, delivery address and any special instructions inside the WhatsApp conversation itself.
- Product questions and delivery enquiries also go through WhatsApp. The second WhatsApp contact is **+91 99595 62940**.
- The business confirms availability, delivery charge, payment method and the order directly in the WhatsApp conversation.
- The website does not store customer details or orders and does not claim an order is confirmed merely because WhatsApp opens.

The website has no customer details form. Customer details are exchanged only in WhatsApp after the customer chooses to send a message. The website does not collect or transmit personal details to a separate backend.

## Deployment — Cloudflare Pages

This repository is deployed as a static site on **Cloudflare Pages**. The GitHub repository's `main` branch is the source of truth; Cloudflare Pages builds and publishes the root of that branch when new commits are pushed.

Configure the Cloudflare Pages project with:

- **Connect to Git:** `narayananagapuri25/Lalitha-Pickles-Snacks`
- **Production branch:** `main`
- **Framework preset:** `None` (static HTML/CSS/JavaScript)
- **Build command:** leave empty
- **Build output directory:** `.` (the repository root)
- **Root directory:** `/` (repository root; leave the default if the dashboard shows the repository root)

There is no Node build step, package installation, GitHub Pages deployment, GitHub Actions publish workflow, Cloudflare Worker, server-side runtime or database required. Preview deployments may be used for non-production branches; only merges or pushes to `main` should update the production site.

After a push, verify the latest deployment in **Cloudflare Dashboard → Workers & Pages → lalitha-pickles-snacks → Deployments** and confirm the production URL serves the latest `index.html`, `styles.css`, `app.js` and assets.

## Business operations not yet connected

This repository does not currently include a secure owner/admin portal, server-side order database, stock management, automated delivery pricing or online payment processing. Those features need the business's confirmed operating rules and a secure backend. The current website sends the customer-prepared order to WhatsApp and does not store customer details or claim an order is confirmed.
