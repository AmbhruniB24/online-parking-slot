# 🚗 SmartPark - Online Parking Slot Booking System
> **VES Institute of Technology (Autonomous Institute Affiliated to University of Mumbai)**  
> **Full-Stack MERN, Redux, WebSockets, UPI/Card Payment & Multi-Channel Notification Project (Experiments 1–10)**

---

## 📌 Project Overview
**SmartPark (Online Parking Slot Booking System)** is an autonomous IoT-inspired parking bay reservation and management platform built with modern web technologies:
- **Frontend:** React 18, Vite, Tailwind CSS, Redux Toolkit, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Security & Auth:** JSON Web Tokens (JWT), Bcrypt password hashing, Helmet, Rate Limiter
- **Payment Gateway:** Multi-channel payment simulation supporting **UPI** (Google Pay, PhonePe, Paytm, BHIM UPI), **Credit & Debit Cards** (Visa, Mastercard, RuPay), and **Net Banking**
- **Experiment 8 Notifications:** Real-time WebSockets synchronization + **Direct Email (Nodemailer HTML with QR Code) & WhatsApp notifications in proper English**
- **DevOps & CI/CD:** GitHub Actions pipeline + Multi-stage Docker Compose orchestration

---

## 📋 Syllabus Lab Index (Experiments 1 to 10)

| Exp # | Syllabus Title | Key Implementation in SmartPark |
| :---: | :--- | :--- |
| **1** | **Build responsive and interactive UIs using Tailwind CSS** | Interactive 2D architectural garage radar (`ParkingGarageMap.jsx`), color-coded parking slots (`SlotGrid.jsx`), responsive navbar, and location selector modal. |
| **2** | **Experiment based on React Hooks (`useEffect`, `useContext`, custom hooks)** | `AuthContext` for global session state, `useEffect` for data polling, custom countdown hook (`useSlotTimer.js`), and WebSocket listener (`useSocket.js`). |
| **3** | **Manage complex state with Redux or Context API** | Redux Toolkit (`bookingSlice.js`, `store.js`) managing multi-step booking: Slot selection → Vehicle info → Dynamic tariff calculation → Multi-mode payment → Confirmed digital pass. |
| **4** | **REST API Design with MongoDB + Mongoose Integration** | Relational schemas with strict validation for `User`, `ParkingSlot`, and `Booking` models with full CRUD endpoints. |
| **5** | **Create secure, production-ready RESTful APIs** | Express rate-limiting to prevent slot-hoarding, `helmet` HTTP headers, centralized error middleware, and input sanitization. |
| **6** | **Implement authentication and user roles with JWT** | Role-Based Access Control (Driver vs Admin), password hashing with bcrypt, JWT token signing & verification middleware. |
| **7** | **Validating RESTful APIs using Postman** | Automated Postman collection and environment with assertions for HTTP status codes, JWT extraction, and response schemas. |
| **8** | **Enable real-time communication via WebSockets & Instant Notifications** | Socket.IO bidirectional sync for instant slot status changes + **Automated direct Email & WhatsApp notifications formatted in formal English**. |
| **9** | **CI/CD Deployment with GitHub Actions + Render/Vercel** | GitHub Actions pipeline for backend syntax validation, frontend build check, and auto-deployment hooks. |
| **10** | **Deploy full-stack apps using DevOps tools and Docker** | Multi-stage Dockerfiles for frontend (Nginx) & backend (Node.js) + `docker-compose.yml` to run Frontend, Backend, and MongoDB. |

---

## 💳 Payment Channels (UPI, Credit/Debit Card & Net Banking)
1. **UPI (Unified Payments Interface):**
   - High-resolution vector logos for **Google Pay, PhonePe, Paytm, and BHIM UPI**.
   - Dynamic QR code generation for mobile scanning.
   - UPI ID / Virtual Payment Address (VPA) verification.
2. **Credit & Debit Cards:**
   - Card number auto-spacing (`XXXX XXXX XXXX XXXX`), Expiry (`MM/YY`), CVV (`***`), and Cardholder name.
   - Visa, Mastercard, and RuPay support with 256-Bit SSL badge.
3. **Net Banking:**
   - Top Indian banking gateways (HDFC, SBI, ICICI, Axis Bank, Kotak).

---

## 📱 Experiment 8: Direct Email & WhatsApp Notification System
Whenever any parking bay is booked, the system automatically triggers:
1. **Direct Email (Nodemailer):**
   - Sends a modern HTML invoice pass directly to the customer's email with QR entry barcode, ticket ID, bay number, duration, amount, and directions.
2. **Direct WhatsApp Notification:**
   - Dispatches a polite, formal English message containing ticket pass ID, assigned bay, vehicle reg number, duration, and gate instructions.
   - Features a **1-click "Open in WhatsApp" button** (`https://wa.me/...`) in the booking confirmation modal and pass details.

---

## 🔑 Default Test Accounts

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smartpark.com` | `admin123` | Add/delete slots, view all reservations, override bay statuses |
| **Driver** | `driver@smartpark.com` | `driver123` | Browse bays, book parking with UPI/Card, view QR passes & vacate |

---

## 🚀 How to Run Locally

### 1. Backend Setup
```bash
cd backend
npm install
node seed.js     # Seeds default parking slots and accounts
npm run dev      # Runs Express + Socket.IO on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev      # Runs Vite dev server on http://localhost:5173
```
Open **`http://localhost:5173`** in your browser.

---

### 3. Docker Compose Setup (Experiment 10)
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`
