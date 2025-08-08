# URHired Backend Documentation

## Overview

This is a Node.js/Express authentication backend that provides user registration, login, and token verification functionality using JWT (JSON Web Tokens) and bcrypt for password hashing.

## Architecture

### Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv

### Project Structure
```
backend/
├── controllers/
│   └── authController.js     # Authentication business logic
├── middlewares/
│   └── authMiddleware.js     # JWT token verification middleware
├── models/
│   └── userModel.js          # User database schema
├── routes/
│   └── authRoutes.js         # Authentication route definitions
└── index.js                  # Application entry point
```

## Environment Variables

Create a `.env` file in your backend root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/your-database-name

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for reset links)
FRONTEND_URL=http://localhost:5173
```

### Email Setup Notes
- For Gmail: Enable 2FA and use an app password
- For other providers: Update HOST, PORT, and SECURE settings accordingly
- The FRONTEND_URL is used in password reset emails

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  resetPasswordToken: String (optional, hashed),
  resetPasswordExpires: Date (optional)
}
```

## API Endpoints

### Base URL
```
http://localhost:5000/api/auth
```

### 1. User Registration

**Endpoint**: `POST /register`

**Description**: Creates a new user account with hashed password

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- **400**: User already exists
```json
{
  "message": "User already exists"
}
```
- **500**: Server error
```json
{
  "error": "Error message"
}
```

### 2. User Login

**Endpoint**: `POST /login`

**Description**: Authenticates user and returns JWT token

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- **404**: User not found
```json
{
  "message": "User not found"
}
```
- **400**: Invalid credentials
```json
{
  "message": "Invalid credentials"
}
```
- **500**: Server error
```json
{
  "error": "Error message"
}
```

### 3. Token Verification

**Endpoint**: `GET /verify`

**Description**: Verifies if the provided JWT token is valid

**Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**Success Response** (200):
```json
{
  "message": "Token is valid"
}
```

**Error Responses**:
- **401**: No token provided
```json
{
  "message": "No token provided"
}
```
- **401**: Invalid token
```json
{
  "message": "Invalid token"
}
```

### 4. Forgot Password

**Endpoint**: `POST /forgot-password`

**Description**: Sends a password reset email to the user

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

**Error Responses**:
- **400**: Email not provided
```json
{
  "success": false,
  "message": "Please provide your email"
}
```
- **404**: User not found
```json
{
  "success": false,
  "message": "User not found with this email"
}
```
- **500**: Email sending failed
```json
{
  "success": false,
  "message": "Email could not be sent. Please try again later."
}
```

### 5. Reset Password

**Endpoint**: `POST /reset-password/:token`

**Description**: Resets user password using the reset token from email

**URL Parameters**:
- `token`: The password reset token received via email

**Request Body**:
```json
{
  "password": "newpassword123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Password reset successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- **400**: Password not provided
```json
{
  "success": false,
  "message": "Please provide a new password"
}
```
- **400**: Password too short
```json
{
  "success": false,
  "message": "Password must be at least 6 characters long"
}
```
- **400**: Invalid or expired token
```json
{
  "success": false,
  "message": "Invalid token or token has expired"
}
```

## Usage Examples

### Using curl

#### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "mypassword123"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "mypassword123"
  }'
```

#### Verify token:
```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### Request password reset:
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### Reset password with token:
```bash
curl -X POST http://localhost:5000/api/auth/reset-password/YOUR_RESET_TOKEN_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "password": "mynewpassword123"
  }'
```

### Using JavaScript (Frontend)

#### Register:
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'mypassword123'
  })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('token', data.token);
}
```

#### Login:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'mypassword123'
  })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('token', data.token);
}
```

#### Verify token:
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5000/api/auth/verify', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.message); // "Token is valid"
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with a salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication with 24-hour expiration
3. **Input Validation**: Basic validation for required fields
4. **CORS**: Cross-origin resource sharing enabled
5. **Environment Variables**: Sensitive data stored in environment variables

## Middleware Details

### authMiddleware
- Extracts JWT token from `Authorization` header (Bearer format)
- Verifies token using JWT_SECRET
- Adds decoded user information to `req.user`
- Passes control to next middleware/controller if token is valid
- Returns 401 error for missing or invalid tokens

## Installation & Setup

1. Install dependencies:
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

2. Create `.env` file with required environment variables

3. Start the server:
```bash
node index.js
```

4. Server will run on `http://localhost:5000` (or your specified PORT)

## Error Handling

The API uses standard HTTP status codes:
- **200**: Success
- **201**: Created successfully
- **400**: Bad request (validation error)
- **401**: Unauthorized (authentication error)
- **404**: Not found
- **500**: Internal server error

All error responses include a descriptive message to help with debugging.

## Token Information

- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Payload**: Contains user ID (`id` field)
- **Format**: Bearer token in Authorization header