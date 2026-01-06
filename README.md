# PasAlberta Website - Deployment Guide

## 📁 File Structure

```
pasalberta.lt/
├── robots.txt              # Search engine configuration
├── sitemap.xml            # Site map for all 40 pages
├── .htaccess              # Apache configuration (optional)
├── _redirects             # Netlify redirects (if using Netlify)
├── favicon.ico            # Site icon (create using favicon generator)
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── (71+ images)
│
├── lt/                    # Lithuanian (10 pages)
│   ├── index.html
│   ├── about.html
│   ├── accommodations.html
│   ├── prices.html
│   ├── gallery.html
│   ├── booking.html
│   ├── contact.html
│   ├── faq.html
│   ├── reviews.html
│   └── thank-you.html
│
├── en/                    # English (10 pages)
│   └── (same structure)
│
├── lv/                    # Latvian (10 pages)
│   └── (same structure)
│
└── pl/                    # Polish (10 pages)
    └── (same structure)
```

## 🚀 Deployment Steps

### 1. Upload Files to Web Host

**Via FTP/SFTP:**
```bash
# Upload entire folder structure
- /assets/
- /lt/
- /en/
- /lv/
- /pl/
- robots.txt
- sitemap.xml
- .htaccess (if using Apache)
- _redirects (if using Netlify)
```

**File Permissions:**
- Files: 644 (rw-r--r--)
- Folders: 755 (rwxr-xr-x)

### 2. Create Favicon

Visit: https://favicon.io/favicon-generator/
- Text: PA or 🏠
- Background: #166534 (green)
- Font: Bold
- Download and upload `favicon.ico` to root

### 3. Configure DNS (if needed)

Point domain to your hosting:
```
A Record: @ → Your server IP
CNAME: www → pasalberta.lt
```

### 4. Enable SSL Certificate

Most hosts provide free SSL via Let's Encrypt.
After SSL is enabled, uncomment HTTPS redirect in .htaccess

### 5. Test Forms

Test both forms with real submissions:
- Booking form → sodybapasalberta@gmail.com
- Review form → sodybapasalberta@gmail.com

### 6. Submit Sitemap to Google

1. Go to Google Search Console
2. Add property: https://pasalberta.lt
3. Submit sitemap: https://pasalberta.lt/sitemap.xml

### 7. Test All Languages

Test each language (LT/EN/LV/PL):
- ✓ Navigation links work
- ✓ Language switcher works
- ✓ Mobile menu works
- ✓ Forms submit correctly
- ✓ Gallery lightbox works
- ✓ Google Maps loads
- ✓ Google Calendar loads
- ✓ Images load properly

## 🔧 Post-Deployment Configuration

### Google Analytics (Optional)

Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Social Media Meta Tags (Already Included)

Each page has:
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Proper descriptions and images

## 📊 SEO Checklist

- ✓ All 40 pages in sitemap.xml
- ✓ robots.txt configured
- ✓ Meta descriptions on all pages
- ✓ Canonical URLs set
- ✓ Alt text on images
- ✓ Mobile responsive
- ✓ Page speed optimized
- ✓ SSL certificate (after deployment)
- ✓ Google Search Console setup
- ⏳ Favicon created

## 🆘 Troubleshooting

**Forms not working?**
- Check FormSubmit.co email: sodybapasalberta@gmail.com
- Verify thank-you page redirects

**Language switcher not working?**
- Check file paths: /lt/, /en/, /lv/, /pl/
- Ensure all 10 pages exist in each folder

**Images not loading?**
- Check paths: ../assets/images/
- Verify image files uploaded to /assets/images/

**Mobile menu not working?**
- Verify main.js is uploaded
- Check browser console for errors

## 📞 Support Contact

Website: https://pasalberta.lt
Email: sodybapasalberta@gmail.com
Phone: +370 611 24895

## 📝 Version

Version: 1.0
Last Updated: 2025-01-06
Total Pages: 40
Languages: 4 (LT, EN, LV, PL)
