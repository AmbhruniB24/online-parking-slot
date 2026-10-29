# V.E.S. INSTITUTE OF TECHNOLOGY (VESIT)
### (An Autonomous Institute Affiliated to University of Mumbai)
## Department of Information Technology / Computer Engineering
# Project Report: Online Parking Slot Booking System (SmartPark)

---

## 📋 LAB EXPERIMENTS INDEX & MAPPING

| Exp No. | Syllabus Title | Core Project Feature Implemented | Primary Source Files |
| :---: | :--- | :--- | :--- |
| **1** | **Build responsive and interactive UIs using Tailwind CSS** | Real-time interactive 2D parking garage floorplan, responsive bay grid, color-coded status badges, and mobile-responsive layout. | `frontend/src/components/SlotGrid.jsx`<br>`frontend/src/components/ParkingGarageMap.jsx`<br>`frontend/src/components/Navbar.jsx`<br>`frontend/tailwind.config.js` |
| **2** | **Experiment based on React Hooks (`useEffect`, `useContext`, custom hooks)** | `useEffect` for data polling, `useContext` for session (`AuthContext`), custom countdown timer (`useSlotTimer`), and custom WebSocket hook (`useSocket`). | `frontend/src/hooks/useSlotTimer.js`<br>`frontend/src/hooks/useSocket.js`<br>`frontend/src/context/AuthContext.jsx` |
| **3** | **Manage complex state with Redux or Context API** | Redux Toolkit (`bookingSlice.js`, `store.js`) managing multi-step booking: slot selection → vehicle info → dynamic tariff calculation → multi-channel payment → confirmed ticket. | `frontend/src/redux/bookingSlice.js`<br>`frontend/src/redux/store.js`<br>`frontend/src/components/BookingModal.jsx` |
| **4** | **REST API Design with MongoDB + Mongoose Integration** | Relational schemas with validations for `User`, `ParkingSlot`, and `Booking` models with full CRUD endpoints. | `backend/models/User.js`<br>`backend/models/ParkingSlot.js`<br>`backend/models/Booking.js`<br>`backend/controllers/` |
| **5** | **Create secure, production-ready RESTful APIs** | Express rate-limiting to block slot-hoarding attacks, Helmet security headers, centralized error middleware, and input sanitization. | `backend/middlewares/rateLimiter.js`<br>`backend/middlewares/errorMiddleware.js`<br>`backend/server.js` |
| **6** | **Implement authentication and user roles with JWT** | Role-Based Access Control (Driver vs. Admin), password hashing with bcrypt, JWT token signing, and protected middleware. | `backend/middlewares/authMiddleware.js`<br>`backend/controllers/authController.js`<br>`frontend/src/components/AuthModal.jsx`<br>`frontend/src/components/AdminPanel.jsx` |
| **7** | **Validating RESTful APIs using Postman** | Postman automated test collection and environment with assertions for HTTP status codes, JWT extraction, and JSON response schemas. | `backend/postman/Parking_Slot_API.postman_collection.json`<br>`backend/postman/Local_Environment.postman_environment.json` |
| **8** | **Enable real-time communication via WebSockets & Official Email Notification** | Socket.IO bidirectional sync across all terminals (booking, vacating, barrier status) + **Instant direct Official Email Notification (Nodemailer HTML with QR barcode)**. | `backend/sockets/socketHandler.js`<br>`backend/services/notificationService.js`<br>`frontend/src/hooks/useSocket.js`<br>`frontend/src/components/BookingModal.jsx` |
| **9** | **CI/CD Deployment with GitHub Actions + Render/Vercel** | GitHub Actions pipeline for linting, syntax tests, frontend build, and automated deploy trigger hooks. | `.github/workflows/ci-cd.yml` |
| **10** | **Deploy full-stack apps using DevOps tools and Docker** | Multi-stage Dockerfiles for frontend (Nginx) & backend (Node.js) + `docker-compose.yml` orchestrating MongoDB, Backend, and Frontend. | `docker-compose.yml`<br>`backend/Dockerfile`<br>`frontend/Dockerfile`<br>`frontend/nginx.conf` |

---

## 🛠️ EXPERIMENT-BY-EXPERIMENT TECHNICAL IMPLEMENTATION

### 🔷 Experiment 1: Responsive & Interactive UIs using Tailwind CSS
- **Objective:** Design an executive, mobile-responsive user interface using modern utility classes.
- **Key Features:**
  - Dynamic 2D architectural parking garage visualization (`ParkingGarageMap.jsx`) with realistic top-down cars.
  - Interactive parking bay grid with color codes:
    - 🟢 **Emerald (Green):** Available Bay (ready to reserve)
    - 🔵 **Blue:** Selected Bay
    - 🔴 **Slate / Gray:** Occupied Bay
  - Responsive Navbar, location selector modal, tariff cards, and mobile sidebar navigation.

---

### 🔷 Experiment 2: React Hooks (`useEffect`, `useContext`, custom hooks)
- **Objective:** Utilize advanced React Hooks for modular logic and state sharing.
- **Key Hooks Implemented:**
  - `useContext` (`AuthContext.jsx`): Manages authentication tokens, current user role (`driver` vs `admin`), and session login/logout.
  - `useEffect`: Manages polling, active bay counters, and event listeners for window triggers.
  - Custom Hook `useSocket.js`: Subscribes to real-time Socket.IO broadcasts for instant slot updates.
  - Custom Hook `useSlotTimer.js`: Calculates countdown time until reserved parking duration expires.

---

### 🔷 Experiment 3: Complex State Management with Redux Toolkit
- **Objective:** Centralize state management for multi-step transactional flows.
- **Store Configuration (`store.js` & `bookingSlice.js`):**
  - **Step 1:** Bay selection & vehicle registration number entry.
  - **Step 2:** Duration slider (1 to 24 hours) with real-time tariff calculation (`₹60/hr × 2 hrs = ₹120`).
  - **Step 3:** Payment channel selection (UPI / QR Code / Credit & Debit Card / Net Banking).
  - **Step 4:** Payment simulation and confirmed pass generation.

---

### 🔷 Experiment 4: REST API Design with MongoDB + Mongoose Integration
- **Objective:** Build robust database schemas and CRUD REST endpoints.
- **Data Models:**
  - `User`: Full name, email, hashed password, role (`driver` or `admin`), phone number.
  - `ParkingSlot`: Slot number (`A-01`), floor (`1` or `2`), vehicle type (`4-wheeler`, `2-wheeler`, `EV`), status (`available`, `reserved`, `occupied`), price per hour.
  - `Booking`: User ID, slot ID, vehicle number, duration, amount, payment method, transaction ID, ticket code (`SP-2026-XXXXX`), status (`confirmed`, `vacated`).

---

### 🔷 Experiment 5: Secure, Production-Ready RESTful APIs
- **Objective:** Enforce enterprise-grade security standards.
- **Security Middlewares:**
  - `rateLimiter.js`: Limits API requests per window to prevent denial-of-service and bot slot-hoarding.
  - `helmet()`: Sets HTTP security headers (CSP, HSTS, X-Frame-Options).
  - Centralized Error Middleware: Captures uncaught exceptions without leaking server stack traces.

---

### 🔷 Experiment 6: Authentication & User Roles with JWT
- **Objective:** Role-Based Access Control (RBAC) using JSON Web Tokens.
- **Roles:**
  - **Driver (`role: driver`):** Can search slots, reserve bays, pay via UPI/Card, view active passes, and vacate.
  - **Admin (`role: admin`):** Can add new slots, delete slots, manually override bay statuses, and inspect all system bookings.
- **Default Credentials for Testing:**
  - **Admin:** `admin@smartpark.com` | `admin123`
  - **Driver:** `driver@smartpark.com` | `driver123`

---

### 🔷 Experiment 7: Validating RESTful APIs using Postman
- **Objective:** Automated API regression testing with status code and schema assertions.
- **Artifacts:**
  - Collection: `backend/postman/Parking_Slot_API.postman_collection.json`
  - Environment: `backend/postman/Local_Environment.postman_environment.json`
- **Automated Test Scenarios:**
  1. POST `/api/auth/login` (Verify 200 OK & extract JWT token).
  2. GET `/api/slots` (Verify 200 OK & check array of available slots).
  3. POST `/api/bookings` (Verify 201 Created & assert ticket code `SP-`).
  4. GET `/api/bookings/my-bookings` (Verify 200 OK).
  5. PUT `/api/bookings/:id/vacate` (Verify 200 OK and slot release).

---

### 🔷 Experiment 8: Real-Time WebSockets & Direct Email Notification
- **Objective:** Real-time multi-terminal state synchronization + direct email dispatch upon booking.
- **WebSocket Protocol (Socket.IO):**
  - Event `booking_confirmed`: Broadcasts to all users to instantly mark the bay as occupied in green/red without page refresh.
  - Event `slot_status_updated`: Updates garage floorplan when a vehicle enters or vacates.
- **Direct Official Email Dispatch:**
  - Sends an official HTML invoice + QR entry barcode using Nodemailer and Gmail SMTP (`ambhrunibhakte1@gmail.com`).
  - Contains Ticket Pass ID, Assigned Bay Number, Floor, Vehicle Number, Duration, Amount Paid, and Boom Barrier Entry Guidelines.

#### Sample Proper English Notification Template:
```text
🅿️ SMARTPARK - PARKING RESERVATION CONFIRMED
--------------------------------------------------
Dear Valued Customer,

Thank you for choosing SmartPark. Your parking slot reservation has been successfully processed and confirmed.

📋 RESERVATION SUMMARY:
• Ticket Pass ID: SP-2026-X89K2
• Parking Facility: SmartPark Central Facility
• Assigned Bay: Slot A-04 (Floor 1)
• Vehicle Number: MH-01-AB-1234 (4-wheeler)
• Reserved Duration: 2 Hour(s)
• Total Amount Paid: ₹120
• Payment Mode: UPI (Google Pay)
• Transaction Reference: TXN-582910-442
• Reservation Status: CONFIRMED & ACTIVE

🚗 ENTRY & PARKING GUIDELINES:
1. Please drive to the entrance barrier at SmartPark Central Facility.
2. Display this Ticket ID or scan your Digital QR Pass at the boom barrier scanner.
3. Park exclusively within your reserved bay: Slot A-04.

For queries, contact support@smartpark.com or call +91 98765 43210.
Have a safe drive!
Team SmartPark
```

---

### 🔷 Experiment 9: CI/CD Deployment with GitHub Actions + Render/Vercel
- **Workflow File:** `.github/workflows/ci-cd.yml`
- **Stages:**
  1. **Backend Syntax & Dependency Check:** Runs on Node 18, installs dependencies, verifies `server.js`.
  2. **Frontend Build Check:** Runs `npm run build` using Vite to ensure zero TypeScript/JSX errors.
  3. **Auto-Deploy Webhook:** Triggers Render/Vercel deployment upon merge to `main`.

---

### 🔷 Experiment 10: Full-Stack Containerization with Docker & DevOps
- **Orchestration:** `docker-compose.yml`
- **Microservices:**
  1. `smartpark_mongo`: Official MongoDB 6.0 engine on port 27017 with persistent volume.
  2. `smartpark_backend`: Node.js Express server on port 5000.
  3. `smartpark_frontend`: High-performance multi-stage Nginx container serving React SPA on port 3000.
- **Execution Command:**
  ```bash
  docker-compose up --build
  ```

---

## 🚀 HOW TO RUN THE PROJECT LOCALLY

### Prerequisites:
- Node.js (v18+)
- MongoDB (Running locally or via Docker)

### Step 1: Start Backend
```bash
cd backend
npm install
node seed.js    # Seeds demo slots & admin/driver accounts
npm run dev     # Runs on http://localhost:5000
```

### Step 2: Start Frontend
```bash
cd ../frontend
npm install
npm run dev     # Runs on http://localhost:5173
```
Open **`http://localhost:5173`** in your browser!
