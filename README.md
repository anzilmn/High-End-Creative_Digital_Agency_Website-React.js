# 🏢 ANZIL — Premium Digital Agency Website

A full-stack MERN application for a premium digital agency.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: http://localhost:5000

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at: http://localhost:3000

## 🔐 Admin Access
- URL: http://localhost:3000/admin/login
- Username: **admin**
- Password: **admin**

## 📁 Project Structure
```
anzil-agency/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # Express API routes
│   ├── middleware/      # Auth middleware
│   ├── seedData.js      # Initial data seeder
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # Navbar, Footer
    │   ├── pages/       # All page components
    │   ├── context/     # Auth context
    │   └── utils/       # API helpers
    └── public/
```

## 🛠 Tech Stack
- **Frontend**: React 18, React Router 6, Framer Motion, Axios
- **Backend**: Express.js, Mongoose, JWT, bcryptjs
- **Database**: MongoDB

## 🌐 Pages
- `/` — Home with hero, services, testimonials
- `/services` — All agency services
- `/portfolio` — Filterable portfolio grid
- `/case-studies` — Detailed project case studies
- `/blog` — Blog with category filter
- `/blog/:id` — Individual blog post
- `/contact` — Contact form
- `/admin` — Protected admin dashboard