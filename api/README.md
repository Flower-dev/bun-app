# Backend API Documentation

This project implements a RESTful API using Elysia.js, a modern web framework for Bun runtime.

## 🚀 Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: SQLite
- **Authentication**: JWT
- **Validation**: TypeBox
- **Testing**: Bun Test

## 🛠️ Development Setup

1. **Prerequisites**

    - Bun (latest version recommended)
    - SQLite3

2. **Installation**

    ```bash
    # Install dependencies
    bun install
    ```

3. **Available Scripts**

    ```bash
    # Start development server
    bun run dev

    # Build for production
    bun run build

    # Run tests
    bun run test

    # Run database migrations
    bun run migrate
    ```

## 📚 API Endpoints

### Authentication

- `POST /auth/login`

    - Authenticates user and returns JWT token
    - Request body: `{ email: string, password: string }`
    - Response: `{ token: string }`

- `POST /auth/register`
    - Creates new user account
    - Request body: `{ email: string, password: string, name: string }`
    - Response: `{ success: boolean, message: string }`

### Feeds

- `POST /feed/newFeed`
    - Adds a new RSS feed for the authenticated user
    - Request body: `{ url: string }`
    - Response: `{ success: boolean, message: string }`

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. All protected routes require a valid JWT token in the `Authorization` header.

## 💾 Database

The application uses SQLite for data persistence. The database schema includes:

- `users` - User accounts
- `feeds` - RSS feed sources
- `user_feed` - User-feed relationships
- `entries` - Feed entries
