# Primus Tech Labs - Website

A premium, production-ready, SEO-optimized single-page website for Primus Tech Labs - a professional web development agency.

## 🌟 Features

- **Dark Theme** with neon green accent colors (#7CFF00, #39FF14)
- **Fully Responsive** - Mobile, Tablet, Desktop optimized
- **No Frameworks** - Pure HTML, CSS, and Vanilla JavaScript
- **High Performance** - Fast loading, optimized assets
- **SEO Optimized** - Meta tags, Schema markup, semantic HTML
- **Accessibility** - ARIA labels, keyboard navigation
- **Professional UI/UX** - Glassmorphism, smooth animations, modern design

## 📁 Project Structure

```
/Users/arise/Desktop/Primus Tech/
├── index.html          # Main HTML file (all content)
├── style.css           # Complete styling with mobile breakpoints
├── script.js           # Interactivity & animations
├── vercel.json         # Vercel deployment config
├── robots.txt          # SEO robots configuration
├── sitemap.xml         # XML sitemap for search engines
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Open in Browser**: Double-click `index.html` or open with any modern browser
2. **Live Server** (Optional):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

### Deployment

#### **Vercel (Recommended)**
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically (uses `vercel.json`)

```bash
npm install -g vercel
vercel
```

#### **Netlify**
1. Connect GitHub repository
2. Build settings: Leave as default (static site)
3. Deploy

#### **GitHub Pages**
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch as source

#### **Traditional Hosting**
Upload all files to your server's public directory.

## 🎨 Customization

### Change Logo
Replace the placeholder logo URL in `index.html`:
```html
<img src="YOUR_LOGO_URL" alt="Primus Logo" class="logo">
```

### Update Contact Information
Find and replace these placeholders in `index.html`:
- `+91YOURNUMBER` → Your WhatsApp number
- `hello@primustechlabs.com` → Your email
- `@primustechlabs` → Your Instagram handle

### Modify Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-green: #7CFF00;
    --accent-green: #39FF14;
    --bg-dark: #050505;
    --bg-card: #111111;
    /* ... more variables ... */
}
```

### Change Fonts
Fonts are loaded from Google Fonts in `index.html`. Modify the link:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONTS" rel="stylesheet">
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

All sections are optimized for each breakpoint.

## ✨ Key Sections

1. **Hero** - Animated particles, CTA buttons, floating shapes
2. **Stats** - Animated counters with scroll trigger
3. **Services** - 8 service offerings with icons
4. **Features** - Why Choose Us with 6 key features
5. **Process** - Development timeline with 6 steps
6. **Portfolio** - 3 featured projects with tech tags
7. **Technologies** - 10 tech stacks with logos
8. **Testimonials** - Auto-rotating carousel with 3 testimonials
9. **Pricing** - 3-tier pricing model
10. **FAQ** - 10 FAQs with accordion
11. **CTA** - Final call-to-action section
12. **Contact** - Contact form + info cards
13. **Footer** - Multi-column footer with links

## 🔧 Features in Detail

### Interactivity
- ✅ Smooth scroll navigation
- ✅ Animated counters (stats section)
- ✅ Testimonials carousel (auto-rotate + manual controls)
- ✅ FAQ accordion (expand/collapse)
- ✅ Form validation (real-time)
- ✅ WhatsApp floating button
- ✅ Mobile hamburger menu

### Performance
- ✅ Particle canvas animation
- ✅ Lazy loading support
- ✅ Optimized CSS (no duplication)
- ✅ Minimal JavaScript (~15KB)
- ✅ CDN-based icons & fonts
- ✅ No dependencies required

### Accessibility
- ✅ Semantic HTML5
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliant

### SEO
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD schema
- ✅ Semantic HTML structure
- ✅ robots.txt & sitemap.xml

## 📝 Form Integration

The contact form collects data but doesn't send emails by default.

### To Enable Email Notifications:

**Option 1: FormSubmit.co (Free, No Backend)**
```javascript
// In script.js, uncomment and modify:
fetch('https://formsubmit.co/your@email.com', {
    method: 'POST',
    body: new FormData(contactForm),
})
.then(response => console.log('Form sent successfully'))
```

**Option 2: Getform.io**
Update form action in HTML:
```html
<form action="https://getform.io/f/YOUR_FORM_ID" method="POST">
    <!-- form fields -->
</form>
```

**Option 3: Backend Service (Node.js, Python, etc.)**
Set up your own backend endpoint and update the fetch URL.

## 🔐 Security Best Practices

- ✅ Secure form validation (client-side)
- ✅ No sensitive data in frontend
- ✅ HTTPS recommended
- ✅ Content Security Policy headers (in vercel.json)
- ✅ X-Frame-Options security header
- ✅ XSS protection enabled

## 🐛 Troubleshooting

### WhatsApp Button Not Working
- Verify phone number format: `+91XXXXXXXXXXX`
- Test link: `https://wa.me/91YOURNUMBER`

### Contact Form Not Submitting
- Check browser console for errors
- Ensure form backend is configured
- Verify email service is active

### Animations Not Smooth
- Check browser GPU acceleration
- Reduce particle count in `script.js` (line ~20)
- Disable animations for low-end devices

### Mobile View Looks Off
- Clear browser cache (Cmd+Shift+R on Mac)
- Check viewport meta tag in HTML head
- Test on actual device (not just browser devtools)

## 📊 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (limited support)

## 📦 File Sizes

- `index.html` ~50 KB
- `style.css` ~65 KB
- `script.js` ~15 KB
- **Total**: ~130 KB (uncompressed)

Compressed with gzip: ~35-40 KB

## 🎯 SEO Tips

1. **Update Meta Tags** in `<head>` section
2. **Add Real Images** instead of placeholders
3. **Update Contact Info** with real details
4. **Submit Sitemap** to Google Search Console
5. **Test Mobile Friendliness** with Google Mobile-Friendly Test
6. **Monitor Rankings** with SEO tools

## 📞 Support

For issues or questions:
- Check the FAQ section in the website
- Review inline code comments in `script.js`
- Test in multiple browsers
- Check console for error messages

## 📄 License

This template is provided for Primus Tech Labs. Commercial use requires proper licensing.

---

**Made with ❤️ for Primus Tech Labs**  
*Last Updated: June 3, 2026*
