# API Tester - Premium API Client

API Tester is a high-end, fullstack API client built with Next.js and Node.js.

## Features
- **Modern UI**: Dark mode, glassmorphism, and sleek typography.
- **Request Bar**: Support for GET, POST, PUT, DELETE, and PATCH.
- **Workspace Tabs**: Manage Parameters, Headers, and JSON Body.
- **Proxy Engine**: Bypasses CORS using a Node.js/Express proxy.
- **Response Viewer**: Syntax highlighting, latency measurement, and payload size.
- **History & Collections**: Track recent requests and save them for later.

## Structure
- `/frontend`: Next.js (App Router) frontend.
- `/backend`: Node.js (Express) proxy server.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
  - *If missing, install via PowerShell: `winget install OpenJS.NodeJS`*
- npm or yarn

### Installation
1. Clone the repository.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application
1. Start the backend proxy (on port 3001):
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This project is designed to be easily deployable on platforms like Vercel (frontend) and Render/Heroku (backend).
