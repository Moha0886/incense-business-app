# Incense Business App - Deployment Guide

This guide covers multiple deployment options for your incense business management application.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended) ⭐

**One-click deployment:**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite app and deploy

**CLI Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run deploy:vercel
```

### 2. Netlify

**Drag & Drop:**
1. Run `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area

**CLI Deployment:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
npm run deploy:netlify
```

### 3. GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select "GitHub Actions" as source
4. The workflow will auto-deploy on every push to main

### 4. Railway

1. Visit [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect and deploy

## 🛠️ Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Serve locally**: `npm run serve`

## 📁 Build Output

- **Directory**: `dist/`
- **Assets**: `dist/assets/`
- **Entry point**: `dist/index.html`

## 🌐 Environment Configuration

### Production URLs
- The app is configured to work with relative paths
- Static assets are optimized and cached
- React Router is configured for SPA routing

### Environment Variables (if needed)
Create a `.env` file for any environment-specific settings:
```
VITE_API_URL=your-api-url
VITE_APP_NAME=Incense Business App
```

## 🔧 Deployment Files Created

- `vercel.json` - Vercel configuration
- `netlify.toml` - Netlify configuration
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- Updated `vite.config.js` - Optimized build settings
- Updated `package.json` - Added deployment scripts

## 📱 Features Ready for Production

✅ Currency properly set to Nigerian Naira (₦)
✅ Product management with editable pricing
✅ Customer management system
✅ Sales recording and order management
✅ Inventory tracking
✅ Responsive design
✅ Optimized build output

## 🚨 Post-Deployment Checklist

1. ✅ Test all main features work
2. ✅ Verify data persistence (currently local storage)
3. ✅ Check responsive design on mobile
4. ✅ Test all forms and calculations
5. ✅ Verify Nigerian Naira currency displays correctly

## 🔄 Continuous Deployment

Once connected to your preferred platform:
- Every push to `main` branch will auto-deploy
- Pull request previews available (Vercel/Netlify)
- Build status notifications

## 📞 Next Steps

Choose your preferred deployment method above and follow the instructions. The app is ready for production use!

For custom domain setup, check your deployment platform's documentation.
