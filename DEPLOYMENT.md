# Deployment Guide

Complete deployment instructions for the Gender Equity Intelligence Platform across various hosting platforms.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All tests pass locally (`npm test`)
- [ ] No console errors or warnings
- [ ] Responsive design verified
- [ ] ESLint checks pass (`npm run lint`)
- [ ] Firebase project created and configured
- [ ] Google Gemini API key obtained
- [ ] Environment variables prepared
- [ ] Domain/hosting account set up
- [ ] SSL certificate obtained (for HTTPS)
- [ ] Database backups configured
- [ ] Team notified of deployment

---

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

**Advantages**: Automatic deployments, edge functions, preview URLs, free tier

#### Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd frontend
vercel
```

#### Configuration (vercel.json)

Create `frontend/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url",
    "REACT_APP_FIREBASE_API_KEY": "@react_app_firebase_api_key"
  },
  "routes": [
    { "src": "^/static/(.*)", "dest": "/static/$1" },
    { "src": ".*", "dest": "/index.html" }
  ]
}
```

#### Set Environment Variables in Vercel Dashboard

```
Settings → Environment Variables
```

Add:
- `REACT_APP_API_URL`
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- (other Firebase config variables)

#### Deploy

```bash
# Automatic from Git
# Connect GitHub repo in Vercel dashboard
# Push to main branch triggers automatic deployment

# Manual deployment
vercel --prod
```

---

### Option 2: Netlify

**Advantages**: Free tier, continuous deployment, form handling, CMS support

#### Setup

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod --dir=build
```

#### Configuration (netlify.toml)

Create `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  REACT_APP_API_URL = "https://api.yourdomain.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

#### Set Environment Variables

```
Settings → Build & deploy → Environment
```

---

### Option 3: GitHub Pages

**Advantages**: Free, integrated with GitHub, no external service

#### Setup

```bash
# Update package.json homepage
# "homepage": "https://yourusername.github.io/gender-equity-platform"

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

#### Deploy

```bash
cd frontend
npm run deploy
```

---

## Backend Deployment

### Option 1: Heroku (Recommended for Node.js)

**Advantages**: Easy setup, built-in Git deployment, free hobby tier

#### Setup

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create geip-backend

# Deploy
cd server
git push heroku main
```

#### Set Environment Variables

```bash
# Via CLI
heroku config:set GEMINI_API_KEY=your_key
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://yourdomain.com
heroku config:set PORT=3001

# Or via Heroku Dashboard
Settings → Config Vars
```

#### Procfile

Create `server/Procfile`:
```
web: node server.js
```

#### Monitor Logs

```bash
heroku logs --tail
```

---

### Option 2: Railway.app

**Advantages**: Modern platform, GitHub integration, good free tier

#### Setup

1. Connect GitHub repository at railway.app
2. Select `server` directory as root
3. Add environment variables in Railway dashboard
4. Deploy automatically from Git

#### Configure

Create `server/Procfile`:
```
web: node server.js
```

---

### Option 3: AWS EC2

**Advantages**: Scalable, flexible, but requires more configuration

#### Setup

```bash
# SSH into EC2 instance
ssh -i your-keypair.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/gender-equity-platform.git
cd gender-equity-platform/server

# Install dependencies
npm install

# Create .env file
nano .env
# Add environment variables

# Install PM2 process manager
sudo npm install -g pm2

# Start server
pm2 start server.js --name "geip-backend"

# Setup auto-restart
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt-get install nginx
# Configure /etc/nginx/sites-available/default
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option 4: Docker + Any Host

**Advantages**: Consistent environments, scalable

Create `server/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

Create `server/.dockerignore`:
```
node_modules
npm-debug.log
.env
.git
```

Build and deploy:
```bash
# Build image
docker build -t geip-backend:latest .

# Push to registry
docker tag geip-backend:latest yourusername/geip-backend:latest
docker push yourusername/geip-backend:latest

# Run container
docker run -p 3001:3001 \
  -e GEMINI_API_KEY=your_key \
  -e NODE_ENV=production \
  yourusername/geip-backend:latest
```

---

## Database Setup

### Firebase Firestore Setup

#### 1. Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Get Started"
3. Create new project
4. Enable Firestore Database

#### 2. Initialize Firestore

Create `districts` collection:

```javascript
// Example document structure
{
  region_id: 1,
  district_name: "Indore",
  state_name: "Madhya Pradesh",
  risk_level: "Low",
  sex_ratio: 955,
  female_literacy: 75.2,
  male_literacy: 88.5,
  child_marriage_rate: 15.3,
  female_labor_participation: 28.4,
  crimes_against_women: 145,
  lat: 22.7196,
  lng: 75.8577
}
```

#### 3. Set Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read-only collections
    match /districts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /articles/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User-specific data
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

#### 4. Enable Authentication

- Go to "Authentication"
- Enable "Email/Password"
- Configure sign-up restrictions if needed

#### 5. Backup Configuration

```bash
# Schedule automated backups
# Go to Firestore → Backups → Set Schedule
# Recommended: Daily at off-peak hours
```

---

## Environment Variables

### Production Frontend (.env.production)

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_FIREBASE_API_KEY=your_production_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_production_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_DEBUG_MODE=false
```

### Production Backend (.env)

```env
PORT=3001
NODE_ENV=production
GEMINI_API_KEY=your_production_gemini_key
CORS_ORIGIN=https://yourdomain.com
FIREBASE_PROJECT_ID=your_production_project_id
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Post-Deployment

### Verification Checklist

- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] Firebase authentication works
- [ ] Firestore data accessible
- [ ] Sakhi AI chat functions
- [ ] Risk map displays correctly
- [ ] All routes functional
- [ ] No console errors in browser
- [ ] Responsive on mobile
- [ ] HTTPS enabled

### DNS & Domain Setup

```bash
# Update DNS records to point to your hosting

# For Vercel
CNAME: your-subdomain.vercel.app

# For Netlify
CNAME: your-subdomain.netlify.app

# For custom domains on Heroku
heroku domains:add api.yourdomain.com
```

### SSL/TLS Certificate

```bash
# Let's Encrypt (free)
# Most platforms handle this automatically

# Manual Certbot setup
sudo certbot certonly --standalone -d yourdomain.com
sudo certbot renew --dry-run
```

---

## Monitoring & Maintenance

### Error Tracking (Optional)

Setup Sentry for error monitoring:

```bash
npm install @sentry/react @sentry/node

# Configure in frontend main.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

# Configure in backend server.js
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### Performance Monitoring

```bash
# Frontend: Google Lighthouse
chrome://inspect > Run Lighthouse

# Backend: Use platform built-in tools
# Heroku: heroku metrics
# Railway: Dashboard metrics
# AWS: CloudWatch
```

### Log Monitoring

```bash
# Heroku
heroku logs --tail

# Vercel
vercel logs

# AWS CloudWatch
aws logs tail /aws/lambda/function-name --follow
```

### Automated Backups

```bash
# Firebase automatic backups (configured above)
# Database: Daily at 2 AM UTC

# Manual backup
gsutil -m cp -r gs://your-backup-bucket gs://your-backup-bucket-$(date +%Y%m%d)
```

### Health Checks

Add health check endpoint in `server.js`:

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

---

## Troubleshooting

### Frontend Won't Build

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build

# Check for environment variables
echo $REACT_APP_API_URL

# Check build output
npm run build 2>&1 | tail -50
```

### Backend Won't Start

```bash
# Check Node version
node --version  # Should be 16+

# Check port
lsof -i :3001

# Check environment variables
env | grep GEMINI_API_KEY

# Check logs
npm start 2>&1 | head -50
```

### Firebase Connection Issues

```bash
# Verify credentials
cat frontend/src/firebase.js

# Check Firestore rules
# Go to Firebase Console → Firestore → Rules

# Test connection
curl -X GET \
  https://firestore.googleapis.com/v1/projects/your-project/databases/default

# Grant permissions
firebase auth:import users.json --hash-algo=scrypt
```

### CORS Errors

```javascript
// Check backend CORS configuration
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Verify frontend API_URL
console.log(process.env.REACT_APP_API_URL);
```

### API Timeout Issues

```bash
# Increase timeouts
# For Heroku
heroku config:set WEB_TIMEOUT=60

# For Railway
# Railway settings → Deployment

# Check Gemini API status
# https://status.cloud.google.com
```

---

## Rollback Procedure

### If deployment fails:

#### Vercel
```bash
# View deployments
vercel --list

# Rollback to previous
vercel rollback
```

#### Heroku
```bash
# View releases
heroku releases

# Rollback
heroku releases:rollback v123
```

#### Manual
```bash
# Git rollback
git revert <commit-hash>
git push

# Redeploy
vercel --prod
# or
git push heroku main
```

---

## Scheduled Maintenance

### Weekly
- Monitor dashboard for errors
- Review analytics
- Check database size

### Monthly
- Update dependencies
- Review security advisories
- Backup databases (manual verification)
- Performance analysis

### Quarterly
- Major version updates
- Security audit
- User feedback review
- Feature planning

---

## Support & Help

- 📧 Email: [support@geipshield.org](mailto:support@geipshield.org)
- 📚 Platform Docs: [Your hosting platform documentation]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/gender-equity-platform/issues)

---

**Need help with deployment? Check our [Troubleshooting](#troubleshooting) section or contact support!**
