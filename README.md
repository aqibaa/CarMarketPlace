# 🚗 Car Marketplace - Full Stack Application

A production-grade **Car Sale & Purchase Marketplace** where users can list their vehicles, search with advanced filters, and negotiate directly with sellers via real-time chat. Built using the latest **Next.js 15** ecosystem.

## 🚀 Live Demo
[**Click Here to View Live App**](https://your-vercel-link.app) *(Link update karein deploy ke baad)*

---

## 🛠️ Tech Stack & Tools

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript / React 19
- **Styling:** Tailwind CSS + Shadcn UI
- **Database:** PostgreSQL (via NeonDB)
- **ORM:** Drizzle ORM
- **Authentication:** Clerk (Google & Email)
- **Storage:** UploadThing (Cloud Image Storage)
- **Real-time Chat:** Sendbird (Messaging System)

---

## 🔥 Key Features

### 1. User Authentication 🔐
- Secure Login/Signup using **Clerk**.
- Google Social Auth integration.
- Protected Routes (Middleware) for creating listings.

### 2. Marketplace & Listings 🚙
- **Create Listing:** Multi-step form with validation.
- **Image Upload:** Drag & drop image upload powered by **UploadThing**.
- **Edit/Delete:** Full CRUD functionality for Users to manage their ads.

### 3. Advanced Search & Filtering 🔍
- Filter by **Condition** (New/Used), **Make**, and **Price**.
- Dynamic search results with empty state handling.

### 4. Real-time Chat System 💬
- Integrated **Sendbird** for instant messaging between Buyer and Seller.
- Auto-generated chat channels with **Context** (Car Name & Price).
- Inbox management with unread indicators.

---

## ⚙️ Environment Variables

To run this project locally, you will need to add the following keys in your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

NEXT_PUBLIC_DATABASE_URL=your_neon_db_url

UPLOADTHING_TOKEN=your_uploadthing_token

NEXT_PUBLIC_SENDBIRD_APP_ID=your_sendbird_app_id

git clone https://github.com/your-username/car-marketplace.git

npm install --legacy-peer-deps

npx drizzle-kit push

npm run dev

🤝 Contact & Connect
Designed and Developed by [Your Name]
LinkedIn: https://www.linkedin.com/in/aaqib-aarif/
GitHub: https://github.com/aqibaa