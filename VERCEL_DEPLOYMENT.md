# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Git repository connected to Vercel

## Build Configuration
This project uses a custom build setup with both client and server builds.

### Build Commands
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install`

## Environment Variables
Make sure to set these environment variables in your Vercel project settings:

### Required
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure JWT secret key
- `NODE_ENV`: Set to `production`

### Optional
- `PORT`: Server port (Vercel will set this automatically)
- `CLIENT_URL`: Your frontend URL

## Deployment Steps

1. **Connect Repository**: Connect your Git repository to Vercel
2. **Configure Build Settings**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`
3. **Set Environment Variables**: Add the required environment variables
4. **Deploy**: Vercel will automatically build and deploy your application

## Project Structure
- `client/`: React frontend application
- `backend/`: Express.js API server
- `dist/spa/`: Built frontend files (for Vercel)
- `dist/server/`: Built server files

## Notes
- The frontend is a Single Page Application (SPA)
- API routes are handled by the Express server
- All routes redirect to the SPA for client-side routing
- Builder.io has been completely removed to prevent deployment conflicts

## Troubleshooting
If you encounter build errors:
1. Check that all dependencies are properly installed
2. Verify environment variables are set correctly
3. Ensure MongoDB is accessible from Vercel's servers
4. Check the build logs for specific error messages 