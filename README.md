# Book Store API

## About the Project / Loyiha haqida

This project is a backend REST API for a Book Store system built with Node.js, Express.js, and MongoDB.

Users can:

* register
* verify email using OTP
* login with JWT
* browse books
* create orders

This API also includes:

* role-based authentication
* protected routes
* validation
* stock management

---

Ushbu loyiha Node.js, Express.js va MongoDB yordamida qurilgan Book Store backend REST API hisoblanadi.

Foydalanuvchilar:

* ro'yxatdan o'tishi
* OTP orqali email tasdiqlashi
* JWT orqali tizimga kirishi
* kitoblarni ko'rishi
* buyurtma yaratishi mumkin

Loyihada:

* role-based authentication
* protected routes
* validation
* stock management

mavjud.

---

# Features / Imkoniyatlar

# Features / Imkoniyatlar

- User Registration
  Foydalanuvchi ro'yxatdan o'tishi

- OTP Email Verification
  OTP orqali email tasdiqlash

- JWT Authentication
  JWT autentifikatsiyasi

- Role-based Authorization (ADMIN / USER)
  Role asosidagi avtorizatsiya

- Protected Routes
  Himoyalangan routelar

- Book Full CRUD
  Kitoblar uchun to'liq CRUD amallari

- Order Full CRUD
  Buyurtmalar uchun to'liq CRUD amallari

- Stock Management
  Stock boshqaruvi

- Validation with Zod
  Zod orqali validation

- Password Hashing with Bcrypt
  Bcrypt orqali password hashing

- Email Sending with Nodemailer
  Nodemailer orqali email yuborish


---

# Technologies / Texnologiyalar

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Zod
* Nodemailer

---

# Environment Variables / Muhit o'zgaruvchilari

Create `.env` file in root directory:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BCRYPT_SALT_ROUNDS=10

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

# Installation / O'rnatish

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:3000
```

---

# Authentication Flow / Autentifikatsiya jarayoni

1. User registers
2. OTP is sent to email
3. User verifies OTP
4. User logs in
5. JWT token is generated
6. Protected routes use Bearer Token

---

# API Endpoints

## Authentication API

| Method | Endpoint               | Description   |
| ------ | ---------------------- | ------------- |
| POST   | `/api/auth/register`   | Register user |
| POST   | `/api/auth/verify-otp` | Verify OTP    |
| POST   | `/api/auth/login`      | Login user    |

---

## Users API

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/users`     | Get all users (ADMIN)   |
| GET    | `/api/users/:id` | Get single user (ADMIN) |
| PUT    | `/api/users/:id` | Update user (ADMIN)     |
| DELETE | `/api/users/:id` | Delete user (ADMIN)     |

---

## Books API

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/api/books`     | Get all books               |
| GET    | `/api/books/:id` | Get single book             |
| POST   | `/api/books`     | Create new book (ADMIN)     |
| PUT    | `/api/books/:id` | Update book (ADMIN)         |
| PATCH  | `/api/books/:id` | Partial update book (ADMIN) |
| DELETE | `/api/books/:id` | Delete book (ADMIN)         |

---

## Orders API

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | `/api/orders`            | Create order           |
| GET    | `/api/orders`            | Get all orders (ADMIN) |
| GET    | `/api/orders/my/:userId` | Get user orders        |
| PATCH  | `/api/orders/:id/cancel` | Cancel order           |
| PUT    | `/api/orders/:id`        | Update order (ADMIN)   |
| DELETE | `/api/orders/:id`        | Delete order (ADMIN)   |

---

# Request Examples

## Register

POST `/api/auth/register`

```json
{
  "fullName": "Davron Jurayev",
  "email": "davron@gmail.com",
  "password": "123456"
}
```

---

## Verify OTP

POST `/api/auth/verify-otp`

```json
{
  "email": "davron@gmail.com",
  "otp": "123456"
}
```

---

## Login

POST `/api/auth/login`

```json
{
  "email": "davron@gmail.com",
  "password": "123456"
}
```

---

## Create Book

POST `/api/books`

```json
{
  "title": "Amallar Niyatga Bog'liq",
  "author": "Shayx Muhammad Sodiq Muhammad Yusuf",
  "description": "Hadis va islomiy ta'limotlar asosida niyatning ahamiyati haqida yozilgan mashhur asar.",
  "price": 75000,
  "stock": 20,
  "category": "Islomiy Kitob"
}
```

---

## Create Order

POST `/api/orders`

```json
{
  "bookId": "BOOK_ID",
  "quantity": 1
}
```

---

# Business Logic / Biznes qoidalari

# Business Logic / Biznes qoidalari

- Only verified users can login
  Faqat tasdiqlangan foydalanuvchilar tizimga kira oladi

- JWT authentication is used
  JWT autentifikatsiyasi ishlatilgan

- ADMIN can manage books
  ADMIN kitoblarni boshqarishi mumkin

- USER can create orders
  USER buyurtma yaratishi mumkin

- Stock decreases after ordering
  Buyurtma berilganda stock kamayadi

- Stock restores after cancellation
  Buyurtma bekor qilinganda stock qayta tiklanadi

- One user can have one active order per book
  Bir foydalanuvchi bitta kitob uchun faqat bitta aktiv buyurtmaga ega bo'lishi mumkin


---

# Error Handling

| Status Code | Description  |
| ----------- | ------------ |
| 400         | Bad Request  |
| 401         | Unauthorized |
| 403         | Forbidden    |
| 404         | Not Found    |
| 409         | Conflict     |

---

# Author

Davron Jurayev
