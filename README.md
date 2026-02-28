💊 MediStore – Online Medicine Shop

🔗 Frontend Live: https://medistore-client-bice.vercel.app

🔗 Backend Live: https://medistore-server-fawn.vercel.app

🎥 Demo Video: https://drive.google.com/file/d/15dPqwcP9rfxQYUSjQkfi8nzgI-WNqPrr/view?usp=sharing

📂 Frontend Repository: https://github.com/iamsondev/mdeistore-client

📂 Backend Repository: https://github.com/iamsondev/medistore-server

🚀 Project Overview

MediStore is a full-stack e-commerce web application for purchasing over-the-counter (OTC) medicines.

Users can:

Browse medicines

View detailed product information

Add products to cart

Login with Google

Place orders securely

🛠 Tech Stack
🖥 Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Shadcn UI

Better Auth (Google OAuth)

Axios

⚙ Backend

Node.js

Express.js

PostgreSQL

Prisma ORM

Better Auth

Zod Validation

☁ Deployment

Vercel (Frontend & Backend)

PostgreSQL (Production Database)

🔐 Authentication

Google OAuth Login

Secure session handling using Better Auth

Role-based user management

✨ Core Features

🔍 Medicine Search & Browse

🛒 Add to Cart

📦 Order Placement

🔐 Secure Authentication

📱 Responsive UI

🗂 Admin Medicine Management

❌ Out-of-stock Handling

📦 Installation Guide
1️⃣ Clone Repositories
git clone https://github.com/iamsondev/mdeistore-client
git clone https://github.com/iamsondev/medistore-server
2️⃣ Backend Setup
cd medistore-server
npm install

Create .env file:

DATABASE_URL=your_postgres_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_secret

Run:

npx prisma generate
npx prisma migrate dev
npm run dev
3️⃣ Frontend Setup
cd mdeistore-client
npm install
npm run dev
🗄 Database Schema

Built using Prisma ORM with:

User

Medicine

Order

Cart

Role-based system

🌍 Live Deployment

Frontend deployed on Vercel
Backend deployed on Vercel Serverless Functions

📈 Future Improvements

💳 Payment Gateway Integration

📊 Admin Dashboard Analytics

📦 Order Tracking System

⭐ Review & Rating System

📧 Email Notification System

👨‍💻 Author

Sondip Kumar
Full Stack Developer (MERN + Next.js + PostgreSQL)

GitHub: https://github.com/iamsondev

📜 License

This project is for educational purposes.
