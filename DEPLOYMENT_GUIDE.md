# Metric Time Website - Deployment Guide

## Quick Start: Deploy to Netlify (Recommended)

### Step 1: Prepare Your Files
- You have `index.html` - this is your complete website
- No additional files needed (all CSS and JavaScript are embedded)

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free account)
3. Click "Add new site" → "Deploy manually"
4. Drag and drop your `index.html` file
5. Your site will be live at a temporary URL (e.g., `random-name.netlify.app`)

### Step 3: Connect Your Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter `metrictime.info`
4. Netlify will provide DNS records to add to your domain registrar
5. Update DNS at your registrar (Namecheap, GoDaddy, etc.)
6. Wait 24-48 hours for DNS propagation
7. Your site is now at `metrictime.info`

---

## Alternative: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free account)
3. Click "New Project"
4. Upload your `index.html` file
5. Follow custom domain setup (similar to Netlify)

---

## Alternative: Deploy to GitHub Pages

1. Create a GitHub account and repository
2. Push `index.html` to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose main branch
6. Add custom domain `metrictime.info` in Pages settings
7. Update DNS records at your domain registrar

---

## Domain Registration

If you don't have `metrictime.info` yet:
1. Go to [namecheap.com](https://namecheap.com) or [godaddy.com](https://godaddy.com)
2. Search for `metrictime.info`
3. Purchase the domain
4. Once purchased, you'll have access to DNS settings
5. Add the DNS records provided by your hosting platform (Netlify, Vercel, etc.)

---

## File Structure

Your website consists of a single file:
```
metrictime/
└── index.html (contains all HTML, CSS, and JavaScript)
```

This is all you need to deploy!

---

## Features Included

✅ Live metric time display (updates every second)
✅ Bidirectional time converter
✅ Year-view metric calendar with 10 months
✅ Educational content about metric time
✅ Responsive design (mobile & desktop)
✅ Modern minimalist aesthetic with teal accents
✅ Smooth animations and interactions

---

## Next Steps After Publishing

1. **Add analytics** — Track visitor engagement
2. **Create social media presence** — Share on Twitter, LinkedIn, etc.
3. **Build email signup** — Collect interested users for updates
4. **Add more features** — Date converter, adoption tracker, etc.
5. **SEO optimization** — Improve search engine visibility

---

## Support

If you need help with:
- Domain registration → Contact your registrar's support
- DNS setup → Check your registrar's documentation
- Netlify/Vercel issues → Visit their help centers
- Website updates → Modify `index.html` and redeploy

Good luck with Metric Time adoption! 🚀
