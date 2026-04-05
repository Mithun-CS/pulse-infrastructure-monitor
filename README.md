# 🚀 Elite-Pulse: Real-Time Infrastructure Monitoring Dashboard

A high-density, low-latency monitoring solution designed for sub-second data visualization and cluster health management.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-blueviolet?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

---

## 💡 The Problem & Solution
Standard monitoring dashboards often rely on "polling" (refreshing every X seconds), which creates unnecessary server load and delayed insights. **Elite-Pulse** solves this by implementing a **Bi-Directional WebSocket Pipeline** using PostgreSQL Listen/Notify triggers.

### Key Engineering Achievements:
- **Sub-Second Latency:** Real-time UI updates triggered directly from database inserts via Supabase Realtime.
- **Secure Middleware Architecture:** Integrated Next.js Middleware with Supabase Auth to ensure zero-access to dashboard metrics without valid JWT credentials.
- **Hydration Guarding Pattern:** Solved complex SSR vs. CSR synchronization issues for responsive SVG data rendering.
- **Automated Pulse Simulation:** Engineered a background heartbeat service to simulate high-density metric traffic for testing environments.

---

## 🛠 Technical Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Charts:** Recharts (SVG-optimized responsive containers)
- **Backend-as-a-Service:** Supabase (PostgreSQL)
- **Real-time Engine:** WebSockets & Broadcast channels
- **Deployment:** Vercel (CI/CD Pipeline)

---

## 🏗 System Architecture


1. **The Pulse:** A simulated or real hardware event inserts a row into the `sensors` table.
2. **The Trigger:** PostgreSQL identifies the change and broadcasts a notification.
3. **The Stream:** The client-side React hook listens to the WebSocket channel.
4. **The Render:** Recharts performs a smooth "monotone" interpolation to update the UI instantly.

---

## 🚀 Getting Started
1. **Clone & Install:**
```bash
git clone [https://github.com/Mithun-CS/Internship-project-alpha.git]
npm install