# INSY7314 - MERN Secure Payments Scaffold

## Overview

This project is a **secure Customer International Payments Portal** scaffold for the INSY7314 course.  
It uses the **MERN stack**:

- **Frontend:** Vite + React + TailwindCSS
- **Backend:** Express + Node.js + Mongoose (MongoDB)
- **Authentication:** JWT-based
- **Security features:** bcrypt password hashing, input validation, rate limiting, and more.

The scaffold provides a starting point for a secure payment application, including customer and employee workflows, with security considerations in mind.

---

## Features Implemented (✅)

### Backend
- Salting and hashing passwords ✅
- Input whitelisting / validation ✅
- SQL injection prevention ✅
- Rate limiting / basic DDoS protection ✅
- JWT Authentication ✅

### Frontend
- Input whitelisting / validation (partially implemented) ⬜
- Customer pages:
  - Register ✅
  - Login ✅
  - Make Payment ✅
  - My Payments ✅

### Database / Architecture
- MongoDB Atlas setup ✅
- MERN architecture ✅

---

## Features to Implement (⬜)

### Backend Security Enhancements
- Securing data in transit (SSL/TLS) ⬜
- Session hijacking protection ⬜
- Clickjacking protection ⬜
- XSS protection ⬜
- Man-in-the-middle (MITM) protection ⬜
- DevSecOps pipeline ⬜

### Frontend
- Input whitelisting fully implemented ⬜
- Static pages:
  - Home ⬜
  - About Us ⬜
  - Security ⬜

### Employee Workflows
- Payment Portal (view pending payments) ⬜
- Verify Transaction (approve payments) ⬜

---

## Pages / Routes

### Customer
- `/register` – Register a new account
- `/login` – Login for Customer or Employee
- `/make-payment` – Make a new payment
- `/my-payments` – View past payments

### Employee
- `/payment-portal` – View pending payments
- `/verify-transaction` – Verify or approve a payment

### Static Pages
- `/` – Home
- `/about` – About Us
- `/security` – Security information

---

## Installation

### Backend
```bash
cd backend
npm install
npm run dev


cd frontend
npm install
npm run dev

The backend runs on port 4000 by default.
The frontend runs on port 5173 by default.