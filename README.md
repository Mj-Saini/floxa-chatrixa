# Chatrixa - Simplified Structure

## Project Structure

```
floxa-chatrixa/
├── backend/           # Backend API (Node.js + Express + MongoDB)
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   ├── index.js      # Main server file
│   └── package.json  # Backend dependencies
├── client/           # Frontend (React + TypeScript)
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── contexts/     # React contexts
│   └── package.json  # Frontend dependencies
└── README.md         # This file
```

## Quick Start

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run on: `http://localhost:5000`

### 2. Start Frontend
```bash
cd client
npm install
npm run dev
```
Frontend will run on: `http://localhost:8081`

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

## Features

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Profile management
- ✅ MongoDB database
- ✅ Real-time user state
- ✅ Protected routes
- ✅ Modern UI with Tailwind CSS

## Environment Setup

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/chatrixa
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Database

Make sure MongoDB is running:
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
``` 