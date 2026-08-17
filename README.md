# BOLT - OTP Based User Login

A web application built as part of the **BOLT Software Engineer Take-Home Assignment**.

The application implements an OTP-based user recognition and login flow during checkout. Users can register with their name and email, receive a randomly generated 6-digit login code, and use that code to log in when they return to the checkout page.

---

## Features

### 1. User Registration

Users can create an account by providing:

- First name
- Last name
- Email address

After successful registration:

- A random 6-digit numeric login code is generated.
- The code is displayed to the user.
- The code is stored in the PostgreSQL database.
- The user can use the code during checkout to log in.

---

### 2. User Recognition

During checkout:

- The user enters their email address.
- The email is validated in real time.
- Once a valid email is entered, the application checks the backend to determine whether the email belongs to a registered user.
- The recognition check happens while the user continues filling out the checkout form.

If the email belongs to a registered user, an OTP login modal is displayed.

---

### 3. OTP Login

For a registered user:

- A login modal is displayed.
- The user enters their 6-digit login code.
- The code is validated against the code stored during registration.

#### Correct OTP

The user is logged in and their name is displayed at the top of the checkout form.

#### Incorrect OTP

An error message is displayed inside the OTP modal.

#### Skip Login

The user can skip the login process and continue checkout as a guest.

---

### 4. Checkout

The checkout form collects:

- Email address
- Phone number
- Shipping address

After submitting the form:

- The checkout information is stored in PostgreSQL.
- If the user is logged in, their `user_id` is stored.
- If the user skips login, `user_id` is stored as `NULL`.

No real payment processing is implemented, as required by the assignment.

---

## Tech Stack

### Frontend

- React
- JavaScript
- CSS
- Vite
- React Router

### Backend

- Node.js
- Express.js
- JavaScript
- REST API
- CORS
- Helmet
- Morgan

### Database

- PostgreSQL
- Supabase

### Development Tools

- VS Code
- Git
- GitHub
- Blackbox API Client / REST API testing

---

## Application Architecture

The application follows a three-layer architecture as required by the assignment.

```text
┌─────────────────────────┐
│     React Frontend      │
│                         │
│ Registration / Checkout │
│       OTP Modal         │
└────────────┬────────────┘
             │
             │ REST API
             ▼
┌─────────────────────────┐
│    Express.js API       │
│                         │
│ Controllers             │
│ Models                  │
│ Routes                  │
└────────────┬────────────┘
             │
             │ PostgreSQL
             ▼
┌─────────────────────────┐
│    Supabase PostgreSQL  │
│                         │
│ users                   │
│ checkout_orders         │
└─────────────────────────┘
```

---

# Project Structure

```text
BOLT/
│
├── Backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controller/
│   │   ├── authController.js
│   │   └── checkoutController.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   └── checkoutModel.js
│   │
│   ├── router/
│   │   ├── authRouter.js
│   │   └── checkoutRouter.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── OTPModal.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Checkout.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   ├── users.sql
│   └── checkout_orders.sql
│
├── prompts.md
└── README.md
```

---

# Application Flow

## Registration Flow

```text
User opens Registration
        |
        v
Enter First Name
        |
        v
Enter Last Name
        |
        v
Enter Email
        |
        v
Submit Registration
        |
        v
Backend generates 6-digit OTP
        |
        v
User is registered in PostgreSQL
        |
        v
OTP is displayed to the user
```

---

## Checkout Flow

```text
User opens Checkout
        |
        v
Enter Email
        |
        v
Validate Email
        |
        v
Check Registered User
        |
        +----------------------+
        |                      |
        v                      v
   Registered              Not Registered
        |                      |
        v                      |
   OTP Modal                   |
        |                      |
    +---+---+                  |
    |       |                  |
    v       v                  |
  Login    Skip                |
    |       |                  |
    +---+---+------------------+
        |
        v
Enter Phone Number
        |
        v
Enter Shipping Address
        |
        v
Submit Checkout
        |
        v
Save Checkout Data
        |
        v
PostgreSQL
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "firstName": "Divya",
  "lastName": "M",
  "email": "divya@example.com"
}
```

Response example:

```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": 1,
    "firstName": "Divya",
    "lastName": "M",
    "email": "divya@example.com"
  },
  "otp": "123456"
}
```

---

## Recognize User

```http
GET /api/auth/recognize?email=divya@example.com
```

This endpoint checks whether the supplied email belongs to a registered user.

Example response for a registered user:

```json
{
  "success": true,
  "registered": true,
  "user": {
    "firstName": "Divya",
    "lastName": "M",
    "email": "divya@example.com"
  }
}
```

Example response for an unregistered user:

```json
{
  "success": true,
  "registered": false
}
```

---

## Verify OTP

```http
POST /api/auth/verify-otp
```

Request body:

```json
{
  "email": "divya@example.com",
  "otp": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "firstName": "Divya",
    "lastName": "M",
    "email": "divya@example.com"
  }
}
```

If the OTP is incorrect:

```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

---

# Checkout API

## Submit Checkout

```http
POST /api/checkout
```

Request body for a logged-in user:

```json
{
  "userId": 1,
  "email": "divya@example.com",
  "phone": "9876543210",
  "shippingAddress": "Bengaluru, Karnataka"
}
```

Request body for a guest user:

```json
{
  "userId": null,
  "email": "guest@example.com",
  "phone": "9876543210",
  "shippingAddress": "Bengaluru, Karnataka"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Checkout details saved successfully",
  "order": {
    "id": 1,
    "userId": 1,
    "email": "divya@example.com",
    "phone": "9876543210",
    "shippingAddress": "Bengaluru, Karnataka"
  }
}
```

---

# Database

The application uses **PostgreSQL hosted on Supabase**.

Two tables are used.

## Users

The `users` table stores registered users.

```text
id
first_name
last_name
email
otp_code
created_at
```

### Purpose

- Stores user registration information.
- Stores the generated 6-digit OTP.
- Uses email as a unique identifier.

---

## Checkout Orders

The `checkout_orders` table stores checkout information.

```text
id
user_id
email
phone
shipping_address
created_at
```

### Purpose

- Stores checkout details.
- `user_id` references the registered user when the user logs in.
- `user_id` is `NULL` when the user continues as a guest.

The database schema files are available in:

```text
database/
├── users.sql
└── checkout_orders.sql
```

---

# Environment Variables

## Backend

Create a `.env` file inside the `Backend` directory.

```env
PORT=3000
DATABASE_URL=your_supabase_postgresql_connection_string
```

Do not commit the `.env` file to GitHub.

---

# Running the Application Locally

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd BOLT
```

---

## 2. Start the Backend

Open a terminal:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add:

```env
PORT=3000
DATABASE_URL=your_supabase_postgresql_connection_string
```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

## 3. Start the Frontend

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# Testing

The following functionality has been tested:

### Registration

- [x] Register a new user
- [x] Generate a random 6-digit OTP
- [x] Store user details in PostgreSQL
- [x] Display generated OTP

### User Recognition

- [x] Validate email format
- [x] Recognize registered users
- [x] Handle unregistered emails

### OTP Login

- [x] Display OTP modal for registered users
- [x] Accept valid 6-digit OTP
- [x] Reject invalid OTP
- [x] Display error for incorrect OTP
- [x] Allow user to skip login
- [x] Display logged-in user's name

### Checkout

- [x] Collect email
- [x] Collect phone number
- [x] Collect shipping address
- [x] Save checkout details to PostgreSQL
- [x] Store logged-in user's `user_id`
- [x] Store `NULL` user ID for guest checkout

### API & Database

- [x] Backend API tested
- [x] Database connection tested
- [x] Database tables verified
- [x] Registration API tested
- [x] Recognition API tested
- [x] OTP verification API tested
- [x] Checkout API tested

---

# Deployment

The application is designed with separate frontend, API, and database layers.

```text
Frontend
React + Vite
    |
    v
Backend
Node.js + Express
    |
    v
Database
PostgreSQL + Supabase
```

## Frontend

Deployed using:

```text
Vercel
```

Frontend URL:

```text
<frontend-url>
```

## Backend

Deployed using:

```text
<backend-hosting-service>
```

Backend URL:

```text
<backend-url>
```

## Database

Hosted using:

```text
Supabase PostgreSQL
```

---

# Security & Configuration

- Database credentials are stored in environment variables.
- `.env` files are excluded from GitHub.
- CORS is configured for the frontend.
- Helmet is used for basic HTTP security headers.
- Input validation is performed for email and OTP.
- OTP is restricted to a 6-digit numeric value.

---

# LLM Usage

LLMs were used during development for assistance with:

- Project structure
- Database schema design
- API implementation
- React component implementation
- Debugging
- UI improvements
- Testing and troubleshooting

A record of the prompts used during development is available in:

```text
prompts.md
```

---

# Assignment Requirements

The implementation covers the main requirements of the BOLT take-home assignment:

| Requirement | Status |
|---|---|
| Registration flow | ✅ |
| Generate 6-digit login code | ✅ |
| Checkout form | ✅ |
| Real-time email validation | ✅ |
| Background user recognition | ✅ |
| OTP login modal | ✅ |
| OTP verification | ✅ |
| Invalid OTP handling | ✅ |
| Skip login | ✅ |
| Display logged-in user's name | ✅ |
| Store checkout data | ✅ |
| PostgreSQL database | ✅ |
| Separate frontend/API/database layers | ✅ |
| SQL schema files | ✅ |
| Public deployment | ⏳ |
| GitHub repository | ⏳ |

---

# Author

**Divyashree Mallarapu**

B.E. Artificial Intelligence and Machine Learning

Built for the **BOLT Software Engineer Take-Home Assignment**.