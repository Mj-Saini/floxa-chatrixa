# Chatrixa Authentication Setup

## Backend Setup

### 1. Install Dependencies
```bash
npm install mongoose bcryptjs jsonwebtoken cors dotenv @types/bcryptjs @types/jsonwebtoken
```

### 2. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/chatrixa

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=3001

# Environment
NODE_ENV=development
```

### 3. MongoDB Setup
Make sure MongoDB is running on your system. You can:
- Install MongoDB locally
- Use MongoDB Atlas (cloud)
- Use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 4. Start the Server
```bash
npm run dev
```

## Frontend Setup

### 1. Environment Configuration
Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
```

### 2. Start the Frontend
```bash
npm run dev
```

## Features Implemented

### Backend
- ✅ User registration with email/username validation
- ✅ User login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ User profile management
- ✅ Username availability checking
- ✅ Logout functionality
- ✅ MongoDB integration with Mongoose

### Frontend
- ✅ Authentication context with React hooks
- ✅ Real-time user state management
- ✅ Protected routes with loading states
- ✅ Updated login/signup forms with API integration
- ✅ User profile display in header
- ✅ Logout functionality
- ✅ Toast notifications for user feedback

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-username/:username` - Check username availability

## User Flow

1. **First Visit**: User lands on login page
2. **Registration**: User creates account with email/username/password
3. **Login**: User logs in with email/username and password
4. **Onboarding**: New users complete gender/country selection
5. **App Access**: Authenticated users can access all features
6. **Profile**: User information is displayed throughout the app

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation
- ✅ Error handling
- ✅ Secure token storage

## Next Steps

1. Add email verification
2. Implement password reset functionality
3. Add social login (Google, Facebook)
4. Add user avatars and file upload
5. Implement real-time chat features
6. Add user search and friend requests 