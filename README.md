# Swagat Retreat - Premium Business Hotel Website

A high-conversion, modern business hotel website for Swagat Retreat in Puri, Odisha. Built with HTML5, CSS3, and vanilla JavaScript for optimal performance.

## Features

✅ **Responsive Design** - Mobile-first approach, works on all devices
✅ **Hero Section** - Auto-sliding image gallery with sticky CTA
✅ **Golden Triangle Location** - Interactive map with distance calculator
✅ **Business Amenities** - Professional facilities showcase
✅ **Real-time Inventory** - Scarcity indicators for urgency
✅ **Corporate Quick-Book** - Streamlined booking with GST support
✅ **Trust Signals** - Testimonials and credibility badges
✅ **Analytics Tracking** - Built-in event tracking system
✅ **Accessibility** - WCAG compliant with ARIA labels
✅ **Performance Optimized** - Lazy loading, fast page loads

## Project Structure

```
swagat-retreat-website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles (responsive, mobile-first)
├── js/
│   └── main.js            # All JavaScript functionality
├── images/                # Image assets
│   ├── jagannath-temple.jpg
│   ├── puri-beach.jpg
│   ├── executive-suite.jpg
│   ├── business-deluxe.jpg
│   └── README.md
└── README.md
```

## Setup Instructions

### 1. Add Images

Place the following images in the `images/` folder:
- `jagannath-temple.jpg` (1920x1080px recommended)
- `puri-beach.jpg` (1920x1080px recommended)
- `executive-suite.jpg` (800x600px recommended)
- `business-deluxe.jpg` (800x600px recommended)

### 2. Configure Google Maps API

To enable the interactive map and distance calculator:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Distance Matrix API
3. Open `index.html` and replace `YOUR_API_KEY` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&callback=initMap" async defer></script>
```

### 3. Update Hotel Coordinates

In `js/main.js`, update the hotel coordinates to match your actual location:

```javascript
const hotelLocation = { lat: 19.8135, lng: 85.8312 }; // Replace with actual coordinates
```

### 4. Open in Browser

Simply open `index.html` in any modern web browser. No build process required!

## Color Palette

- **Deep Navy Blue**: #001440 (Primary brand color)
- **Charcoal**: #2C2C2C (Text and accents)
- **Gold**: #D4AF37 (CTAs and highlights)
- **White**: #FFFFFF (Background)
- **Light Gray**: #F5F5F5 (Section backgrounds)

## Typography

- **Font Family**: Montserrat (Google Fonts)
- **Weights**: 400 (Regular), 700 (Bold), 900 (Black)
- **Headings**: Bold sans-serif for authority
- **Body**: Regular weight for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images load only when needed
- **CSS Grid & Flexbox**: Modern, efficient layouts
- **Minimal Dependencies**: No heavy frameworks
- **Optimized Assets**: Compressed images recommended
- **Smooth Animations**: Hardware-accelerated transitions

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels for screen readers
- Keyboard navigation support
- Visible focus indicators
- Sufficient color contrast ratios
- Alt text for all images

## Backend Integration (TODO)

The website is ready for backend integration. Look for `TODO` comments in `js/main.js` for:

- Booking form submission endpoint
- Contact form submission endpoint
- Real-time inventory API
- Analytics tracking endpoint
- Email notification service

## Customization

### Update Contact Information

Edit the contact section in `index.html`:
- Phone: `+91 6752 123456`
- Email: `reservations@swagatretreat.com`
- Address: Update in the contact section

### Update Room Prices

Edit the room prices in `js/main.js`:

```javascript
const roomPrices = {
    'executive-suite': 4999,
    'business-deluxe': 3499
};
```

### Update Testimonials

Edit testimonials in `index.html` in the trust signals section.

## Testing Checklist

- [ ] Test on mobile devices (< 768px width)
- [ ] Test on tablets (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test all form validations
- [ ] Test navigation menu (desktop & mobile)
- [ ] Test image slider in hero section
- [ ] Test sticky CTA button
- [ ] Test booking form calculations
- [ ] Test contact form
- [ ] Test keyboard navigation
- [ ] Test with screen reader

## Next Steps

1. **Add Backend API** - Implement booking and contact form endpoints
2. **Email Integration** - Set up confirmation emails
3. **Payment Gateway** - Integrate payment processing
4. **Admin Dashboard** - Build inventory management system
5. **SEO Optimization** - Add meta tags, sitemap, robots.txt
6. **Analytics** - Connect to Google Analytics or similar
7. **SSL Certificate** - Secure the website with HTTPS
8. **CDN Setup** - Deploy static assets to CDN

## Support

For questions or issues, contact the development team.

## License

© 2024 Swagat Retreat. All rights reserved.
