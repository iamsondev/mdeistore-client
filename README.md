# 💊 Medistore — Modern Online Pharmacy & Healthcare Platform

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-v1.4-purple?style=for-the-badge)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

**Medistore** is a state-of-the-art, full-stack healthcare e-commerce application designed to deliver authentic medicines, healthcare essentials, and wellness products. Built with **Next.js 16 (App Router)**, **TypeScript**, **Better Auth**, and **Stripe Payment Gateway**, it features multi-role dashboard management, real-time cart synchronization, dynamic filtering, and AI-powered health assistance.

---

## 🔗 Quick Links & Live Demos

- 🌐 **Frontend Live Application:** [medistore-client-bice.vercel.app](https://medistore-client-bice.vercel.app)
- ⚙️ **Backend API Service:** [medistore-server-fawn.vercel.app](https://medistore-server-fawn.vercel.app)
- 🎥 **Video Demo Walkthrough:** [Google Drive Demo Video](https://drive.google.com/file/d/15dPqwcP9rfxQYUSjQkfi8nzgI-WNqPrr/view?usp=sharing)
- 📂 **Frontend Repository:** [github.com/iamsondev/mdeistore-client](https://github.com/iamsondev/mdeistore-client)
- 📂 **Backend Repository:** [github.com/iamsondev/medistore-server](https://github.com/iamsondev/medistore-server)

---

## ✨ Key Features & Architecture

### 1. 👥 Multi-Role Authorization & Dashboard System
- **Customer Dashboard:** Manage personal orders, track delivery status, view purchase history, and update profile settings.
- **Seller Dashboard:** Add/edit/delete medicine inventory, manage incoming customer order requests, and track stock.
- **Admin Dashboard:** Overall platform statistics, manage users, approve sellers, handle payments, and control categories.
- **Moderator Dashboard:** Review products, moderate product ratings/reviews, and generate compliance reports.
- **Delivery Agent Dashboard:** View assigned order dispatches, update order delivery statuses, and view delivery history.

### 2. 🛒 E-Commerce & Instant Purchase Flow
- **Interactive Shop & Advanced Search:** Filter medicines by category, price range (`৳`), stock availability, and sort parameters.
- **Instant Purchase & Checkout:** Direct checkout option from product details pages.
- **Cart Management:** Dynamic Zustand cart state synchronized with `localStorage` and hydration error protection.

### 3. 💳 Stripe Payment Gateway & Cash on Delivery (COD)
- Support for **Stripe Online Card Payments** with automatic webhooks and redirect success/cancel handling.
- Seamless **Cash on Delivery (COD)** checkout flow.

### 4. 🤖 AI Health Assistant (HealthBot)
- Integrated AI health assistant to guide users with quick medical queries and product recommendations.

---

## 🛠 Tech Stack & Tools

| Layer | Technology / Library |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Actions, Middleware) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Framer Motion, GSAP Animations |
| **UI Components** | Shadcn UI, Radix UI Primitives, Lucide Icons |
| **State Management**| Zustand (Persisted Cart Store) |
| **Form & Validation**| TanStack Form, Zod Schema Validation |
| **Authentication** | Better Auth (Google OAuth, Credentials, Proxy Handler) |
| **Payments** | Stripe JS / React Stripe SDK |
| **Notifications** | Sonner Toasts |

---

## 🔑 Environment Variables Setup

Create a `.env.local` file in the root of `medistore-client`:

```env
# Server URLs
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5000

AUTH_URL=http://localhost:3000/api/auth
API_URL=http://localhost:3000

# Client Public Env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

---

## 📦 Getting Started & Installation

### Prerequisites
- Node.js `v18.x` or `v20.x`
- `npm` or `pnpm`

### 1. Clone the repository
```bash
git clone https://github.com/iamsondev/mdeistore-client.git
cd mdeistore-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## 📂 Project Structure

```
medistore-client/
├── src/
│   ├── actions/               # Server Actions (Orders, Payments, Reviews)
│   ├── app/                   # Next.js App Router Structure
│   │   ├── (commonLayout)/    # Public routes (Home, Shop, Cart, Checkout, Auth)
│   │   ├── (dashboardLayout)/ # Parallel routes (@admin, @seller, @customer, etc.)
│   │   └── api/               # Better Auth Proxy & Revalidation API routes
│   ├── components/
│   │   ├── checkout/          # Checkout & Stripe Payment forms
│   │   ├── layout/            # Navbar, Footer, CartIcon, Buttons
│   │   ├── modules/           # Feature-specific modules (Shop, Home, Seller, AI)
│   │   └── ui/                # Shadcn UI reusable primitives
│   ├── lib/                   # Auth Client setup, Utilities
│   ├── services/              # API Fetchers (Customer, Seller, Admin)
│   ├── store/                 # Zustand Stores (Cart, etc.)
│   ├── types/                 # TypeScript Types & Interfaces
│   └── middleware.ts          # Edge Role-Based Protection Middleware
└── public/                    # Static Assets & Icons
```

---

## 👨‍💻 Author

**Sondip Kumar**  
*Full Stack Web Developer (Next.js | TypeScript | Node.js | PostgreSQL)*

- **GitHub:** [@iamsondev](https://github.com/iamsondev)
- **Email:** sondip@example.com

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
