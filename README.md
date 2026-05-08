# M&Z Store — Full-Stack Modest Fashion E-Commerce Platform

> A production-level full-stack eCommerce platform built for **M&Z Store**, a Pakistani modest fashion brand selling hijabs, chaddars, dupattas, and scarves nationwide with Cash on Delivery (COD).

🌐 **Live Website:** [M&Z Store PK](https://mzstorepk.com/?utm_source=chatgpt.com)

---

# Overview

M&Z Store required more than just a storefront.

The goal was to build a scalable eCommerce system capable of handling:

* Real-world product management
* Product variants
* Live stock visibility
* Delivery management
* Secure admin authentication
* Analytics tracking
* SEO-friendly search architecture
* Order management workflows

The platform was engineered with a strong focus on:

* Scalability
* Security
* Performance
* Business usability
* Clean architecture

---

# Key Features

## Customer-Facing Features

### Advanced Product System

* 300+ products across hijabs, chaddars, dupattas, and scarves
* Flexible product variants architecture
* Variant-based image switching
* Dynamic pricing support
* Product detail pages with stock visibility

### URL Query-Based Search & Filtering

Built a search system using URL query parameters instead of client-side state.

Supports:

* Category filtering
* Price filtering
* Sorting
* Search queries

Benefits:

* Shareable filtered URLs
* Better SEO indexing
* Improved UX
* Bookmarkable searches

### Stock Management

* Live stock display on product cards
* Out-of-stock prevention logic
* Automatic stock decrement on order placement
* Admin-controlled stock updates

### Cart & Checkout

* Add-to-cart system with validation
* Quantity management
* COD (Cash on Delivery) checkout flow
* Order placement handling

### Customer Reviews

* Product review system
* Testimonials per product
* Review moderation support

### Meta Pixel Integration

Integrated Meta Pixel throughout the store for:

* Facebook Ads conversion tracking
* Instagram Ads analytics
* Purchase event tracking
* Marketing performance insights

### Accessibility & UX

* Responsive UI across devices
* Accessibility-focused structure
* Smooth animations & transitions
* Optimized product browsing experience

---

# Admin Dashboard

A complete custom admin dashboard was built for non-technical business management.

## Product Management

* Create products
* Edit products
* Delete products
* Upload images via Cloudinary
* Manage product variants
* Control pricing & stock

## Variant Management

Implemented a scalable variants system supporting:

* Different designs
* Multiple lengths/sizes
* Dynamic image rendering per selected variant
* Flexible pricing structure

## Order Management

* View all incoming orders
* Track customer orders
* Manage order workflows

## Delivery Charges Management

Built a dedicated delivery management system allowing admins to:

* Update shipping charges dynamically
* Manage delivery costs without code changes
* Scale delivery pricing logic in future

## Review Moderation

* Approve customer reviews
* Remove inappropriate reviews

## Analytics Dashboard

Integrated analytics tracking to monitor:

* Total Sales
* Sale per Day
* Hot Seller Product

---

# Authentication & Security

Security was a major focus during development.

Implemented:

* JWT authentication
* Secure cookie-based sessions
* bcrypt password hashing
* Protected admin routes
* Role-based authorization

## Admin Protection Flow

Used Next.js Middleware/Proxy protection to prevent unauthorized dashboard access.

Authentication flow:

1. Admin login
2. Password verification using bcrypt
3. JWT generation
4. Secure cookie storage
5. Middleware validates token before dashboard access

Unauthorized users are blocked from accessing protected admin routes.

---

# Performance Optimizations

Focused heavily on improving:

* Page load speed
* API efficiency
* Component reusability
* Database query handling
* Image optimization
* Frontend responsiveness

Additional optimizations:

* Client-side image compression before upload
* Optimized rendering patterns
* Scalable folder architecture

---

# Tech Stack

## Frontend

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| Next.js 16            | App Router, SSR & SSG            |
| React 19 + TypeScript | Type-safe component architecture |
| Tailwind CSS v4       | Utility-first styling            |
| Framer Motion         | UI animations                    |
| Swiper.js             | Product image carousels          |
| MUI v7 + Data Grid    | Admin dashboard UI & tables      |

---

## Backend (Next.js API Routes)

| Technology                | Purpose                        |
| ------------------------- | ------------------------------ |
| MongoDB + Mongoose        | Database & schema modeling     |
| JWT                       | Authentication                 |
| bcryptjs                  | Password hashing               |
| Cookies                   | Secure session handling        |
| Nodemailer                | Order confirmation emails      |
| Cloudinary                | Image hosting & CDN            |
| browser-image-compression | Client-side image optimization |
| Axios                     | API handling                   |
| UUID                      | Unique order ID generation     |

---

# What I Learned Building This

This project helped me move beyond frontend development and think more like a software engineer.

Major learning areas included:

* Scalable data modeling
* Authentication architecture
* Middleware-based route protection
* Admin dashboard systems
* Product variants architecture
* URL-based search systems
* State & API design
* Real-world business workflows
* Performance optimization
* Secure session handling

One of the biggest shifts was learning how production systems are designed around business problems — not just UI components.

---

# Built By

Developed by **[Mussadiq Khan GitHub](https://github.com/mussadiqkhan6886?utm_source=chatgpt.com)**

Agency: **[Scrupulous](https://scrupulous.vercel.app/?utm_source=chatgpt.com)**

---

# Disclaimer

Shared publicly for portfolio purposes with client permission.

Sensitive environment variables, credentials, and production secrets are excluded from the repository.

---

**Business:** M&Z Store
**Location:** Pakistan
**Industry:** Modest Fashion eCommerce
