# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Git repository connected to Vercel
- **Backend deployed separately** (Railway, Render, etc.)

## Important: Backend Deployment Required

Your application has a separate backend that needs to be deployed first. Follow the `BACKEND_DEPLOYMENT.md` guide to deploy your backend.

## Build Configuration
This project uses a custom build setup for the frontend only.

### Build Commands
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install`

## Environment Variables (Set in Vercel Dashboard)

### Required
- `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-app.railway.app/api`)

### Example
```
VITE_API_URL=https://your-backend-url.com/api
```

## Deployment Steps

1. **Deploy Backend First**: Follow `BACKEND_DEPLOYMENT.md`
2. **Get Backend URL**: Note your backend deployment URL
3. **Configure Vercel**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`
4. **Set Environment Variables**: Add `VITE_API_URL` with your backend URL
5. **Deploy**: Vercel will build and deploy your frontend

## Project Structure
- `client/`: React frontend application (deployed to Vercel)
- `backend/`: Express.js API server (deployed separately)
- `dist/spa/`: Built frontend files (for Vercel)

## Notes
- Only the frontend is deployed to Vercel
- Backend must be deployed separately (Railway, Render, etc.)
- Frontend communicates with backend via API calls
- All routes redirect to the SPA for client-side routing
- Builder.io has been completely removed

## Troubleshooting
If you encounter build errors:
1. Ensure backend is deployed and accessible
2. Verify `VITE_API_URL` environment variable is set correctly
3. Check that all dependencies are properly installed
4. Review build logs for specific error messages

## Common Issues
- **404 Errors**: Usually means backend isn't deployed or URL is incorrect
- **CORS Errors**: Backend needs proper CORS configuration
- **Build Failures**: Check that all dependencies are in package.json 