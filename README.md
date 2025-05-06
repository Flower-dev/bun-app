# RSS Feed Project

A modern web application for managing and reading RSS feeds, built with a robust architecture combining a TypeScript-based frontend and backend.

## 🚀 Project Overview

This project is a full-stack RSS feed reader application that allows users to:
- Subscribe to and manage RSS feeds
- Read and organize articles
- Track updates from favorite sources
- Enjoy a modern, responsive user interface

## 🏗️ Project Structure

The project is organized into two main components:

### Frontend (`/web`)
- Built with TypeScript and Vite
- Uses modern UI components with Tailwind CSS
- Implements responsive design principles
- Features a clean and intuitive user interface

### Backend (`/api`)
- TypeScript-based REST API
- SQLite database for data persistence
- Secure and efficient data handling
- RESTful endpoints for feed management

## 🛠️ Technology Stack

### Frontend
- TypeScript
- Vite
- Tailwind CSS
- Modern UI Components
- ESLint & Prettier for code quality

### Backend
- TypeScript
- SQLite Database
- RESTful API Architecture
- Secure Authentication

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- Bun package manager
- Git
- Docker and Docker Compose (for containerized setup)

### Installation

#### Option 1: Local Development

1. Clone the repository:
```bash
git clone [repository-url]
cd rss-feed
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd web
bun install

# Install backend dependencies
cd ../api
bun install
```

3. Start the development servers:
```bash
# Start backend server (from api directory)
bun run dev

# Start frontend server (from web directory)
bun run dev
```

#### Option 2: Docker Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd rss-feed
```

2. Build and start the containers:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:3000

## 📝 Development

The project uses several development tools to ensure code quality:
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- TypeScript for type safety

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
