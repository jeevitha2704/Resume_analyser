# 🚀 Deployment Guide

## Frontend Deployment (Vercel)

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import the `Resume_analyser` repository
4. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: `VITE_API_URL` (your backend URL)

## Backend Deployment (Railway)

### Option 1: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 2: Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub account
3. New Project → Deploy from GitHub
4. Select `Resume_analyser` repository
5. Configure:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Environment Variables

### Backend (Railway)
- `DATABASE_URL`: SQLite will be created automatically
- `SECRET_KEY`: Generate a random JWT secret
- `OPENAI_API_KEY`: Optional, for AI analysis

### Frontend (Vercel)
- `VITE_API_URL`: Your Railway backend URL

## Post-Deployment Steps

1. **Update Frontend API URL**
   - Get your Railway backend URL
   - Add it as `VITE_API_URL` in Vercel environment variables
   - Redeploy frontend

2. **Test the Application**
   - Visit your Vercel URL
   - Test registration/login
   - Test resume upload and analysis
   - Test job matching

## Alternative Deployments

### Heroku (Backend)
```bash
# Install Heroku CLI
heroku create your-app-name
heroku buildpacks:set heroku/python
git subtree push --prefix backend heroku main
```

### Netlify (Frontend)
- Similar to Vercel
- Connect GitHub repository
- Configure build settings
- Add environment variables

## Notes

- The application uses mock data as fallback
- Resume parsing works with PDF and DOCX files
- JWT authentication is fully functional
- Database is SQLite (file-based, works on deployment)
