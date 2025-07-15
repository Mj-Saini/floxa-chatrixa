# Backend Deployment Guide

## Deploy to Railway (Recommended)

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Connect Repository**: Connect your GitHub repository
3. **Configure Project**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=production
   PORT=3001
   ```
5. **Deploy**: Railway will automatically deploy your backend

## Deploy to Render

1. **Create Render Account**: Go to [render.com](https://render.com)
2. **Create New Web Service**:
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Environment Variables**: Same as above
4. **Deploy**: Render will provide you with a URL like `https://your-app.onrender.com`

## After Backend Deployment

Once your backend is deployed, you'll get a URL like:
- Railway: `https://your-app.railway.app`
- Render: `https://your-app.onrender.com`

Update your frontend environment variable:
```
VITE_API_URL=https://your-backend-url.com/api
```

## MongoDB Setup

1. **MongoDB Atlas**: Create a free cluster at [mongodb.com](https://mongodb.com)
2. **Connection String**: Get your connection string from MongoDB Atlas
3. **Network Access**: Add `0.0.0.0/0` to allow connections from anywhere
4. **Database**: Your database will be created automatically when the app first connects 