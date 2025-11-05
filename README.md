# Ticket Management System

The Ticket Management System is designed to streamline how teams handle support tickets and internal requests. It provides a simple yet powerful platform where users can create, view, update, and delete tickets — all while maintaining secure authentication.

## Overview

The backend is built with `Node.js`, `Express`, and a connected Mongo database.

It exposes endpoints for:

- **User Authentication**: Register and login securely
- **User Profile Management**: Fetch current or specific user data
- **Ticket Management**: Create, view, update, and delete support tickets

The API follows `RESTful principles` and uses `middleware` for authentication, validation, and error handling.

## Tech Stack

- **Runtime**: Node.js (Express)
- **Database**: MongoDB / Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, helmet, cors
- **Environment Management**: dotenv

## Folder Structure

```sh
backend/
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ └── ticketController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Ticket.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── ticketRoutes.js
├── config/
│ └── db.js
├── server.js
└── package.json
```

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/ObiFaith/node-ticket-app.git
cd ticket-management-backend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a .env file in the project root:

```sh
PORT=5000
MONGO_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
```

> Adjust variable names if using SQL or another ORM like `Sequelize`.

### 4. Run the Server

```sh
  npm run dev
```

> The API will be available at: `http://localhost:5000/api`

## API Endpoints

### 1. Auth Routes — `/auth`

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/login `   | Log in user and return JWT |
| POST   | `/register` | Register a new user        |

### 2. User Routes (Auth Required) — `/users`

| Method | Endpoint | Description                          |
| ------ | -------- | ------------------------------------ |
| GET    | `/me`    | Get the currently authenticated user |
| GET    | `/:id `  | Get user by ID                       |

### 3. Ticket Routes (Auth Required) — `/tickets`

| Method | Endpoint | Description Auth Required |
| ------ | -------- | ------------------------- |
| GET    | `/`      | Get all tickets           |
| POST   | `/`      | Create a new ticket       |
| GET    | `/:id`   | Get a single ticket by ID |
| PATCH  | `/:id`   | Update an existing ticket |
| DELETE | `/:id`   | Delete a ticket           |

## Middleware

- **AuthenticatedUser**: Protects private routes using JWT
- **Error Handler**: Catches and formats server errors
- **Validator**: Validates user and ticket input

## Testing

Use `Postman` or `cURL` to test the routes.

## License

This project is licensed under the `MIT License`.
