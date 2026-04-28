# M&Z Store — Modest Fashion E-Commerce

> A full-stack e-commerce store for **M&Z Store**, a Pakistani modest fashion brand selling hijabs, chaddars, and dupattas nationwide with COD.

🌐 **Live Site:** [mzstorepk.com](https://www.mzstorepk.com)

---

## What Was Built

A complete e-commerce platform built for a modest fashion brand with a catalogue of 233+ products. The store needed a scalable product system with real stock visibility per item, a URL-based search engine so customers could filter and land directly on relevant pages, and a clean admin dashboard to manage everything without developer involvement. Meta Pixel is integrated throughout for Facebook and Instagram ad conversion tracking.

---

## What I Learned Building This

**URL query-based search & filtering** — Built the backend search engine using URL query parameters rather than client-side state. Search, category filters, and sort options are all encoded in the URL, making filtered results shareable, bookmarkable, and indexable by search engines. This was a new pattern for me and significantly improved both UX and SEO.

**Stock management** — Implemented per-product stock tracking that displays live availability on every product card and detail page. Out-of-stock items are flagged automatically and blocked from being added to cart. Stock is decremented on order placement and managed by the admin from the dashboard.

---

## Features

### Customer-Facing
- **233+ products** across hijabs, chaddars, dupattas, and scarves
- **URL query-based search** — filtering by category, price, and sort order encoded in the URL for shareable, SEO-friendly results
- **Live stock display** — each product shows exact units available; out-of-stock items are clearly flagged
- **Cart system** — add to cart with stock validation, quantity management, and order placement
- **COD (Cash on Delivery)** — primary payment method for the Pakistani market
- **Customer reviews** — submit and view testimonials per product
- **Meta Pixel** — integrated for Facebook & Instagram ad conversion tracking
- **Accessibility statement** — inclusive design commitment on the storefront

### Admin Dashboard
- **Product CRUD** — add, edit, and delete products with image upload via Cloudinary
- **Order management** — view and handle all incoming orders
- **Review moderation** — approve or remove customer reviews
- **Stock management** — update stock levels per product from the dashboard
- **Secure access** — JWT authentication with bcrypt password hashing

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, SSR & SSG |
| **React 19 + TypeScript** | Type-safe component architecture |
| **Tailwind CSS v4** | Utility-first styling |
| **Motion (Framer Motion)** | UI animations |
| **Swiper.js** | Product image carousels |
| **MUI v7 + Data Grid** | Admin dashboard tables and UI |
| **React Icons** | Icon library |

### Backend (Next.js API Routes)
| Technology | Purpose |
|---|---|
| **MongoDB + Mongoose** | Products, orders, reviews, stock |
| **JWT + bcryptjs** | Secure admin authentication |
| **Nodemailer** | Order confirmation emails |
| **Cloudinary** | Image storage and CDN delivery |
| **browser-image-compression** | Client-side compression before upload |
| **Axios + UUID** | API calls and unique order ID generation |

---

## 👨‍💻 Built By

Designed & developed by **[Mussadiq Khan](https://github.com/mussadiqkhan6886)** — **[Scrupulous](https://scrupulous.vercel.app)** Agency.

> *Shared for portfolio purposes with client permission. Environment variables and sensitive configuration are excluded.*

---

**Business:** M&Z Store · **Location:** Pakistan · **Specialty:** Hijabs, chaddars, and dupattas for modest fashion
