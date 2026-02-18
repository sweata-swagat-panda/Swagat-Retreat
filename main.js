// ===================================
// Navigation
// ===================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===================================
// Hero Section - Image Slider
// ===================================

const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}

// Auto-advance slides every 5 seconds
if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000);
}

// ===================================
// Sticky CTA Button
// ===================================

const heroCTA = document.querySelector('.hero-cta');

function handleStickyCTA() {
    const scrollPosition = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    if (scrollPosition > viewportHeight && heroCTA) {
        heroCTA.classList.add('sticky');
    } else if (heroCTA) {
        heroCTA.classList.remove('sticky');
    }
}

window.addEventListener('scroll', handleStickyCTA);

// ===================================
// Booking Form
// ===================================

const bookingForm = document.getElementById('booking-form');
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');
const roomTypeSelect = document.getElementById('room-type');
const roomCountInput = document.getElementById('room-count');
const subtotalElement = document.getElementById('subtotal');
const gstAmountElement = document.getElementById('gst-amount');
const totalElement = document.getElementById('total');

// Room prices
const roomPrices = {
    'executive-suite': 4999,
    'business-deluxe': 3499
};

// Set minimum date to today
if (checkInInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);
}

// Update check-out minimum date when check-in changes
if (checkInInput && checkOutInput) {
    checkInInput.addEventListener('change', () => {
        const checkInDate = new Date(checkInInput.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);
        
        // Clear check-out if it's before new minimum
        if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
            checkOutInput.value = '';
        }
        
        calculatePrice();
    });
    
    checkOutInput.addEventListener('change', calculatePrice);
}

if (roomTypeSelect) {
    roomTypeSelect.addEventListener('change', calculatePrice);
}

if (roomCountInput) {
    roomCountInput.addEventListener('change', calculatePrice);
}

function calculatePrice() {
    if (!checkInInput.value || !checkOutInput.value || !roomTypeSelect.value) {
        subtotalElement.textContent = '₹0';
        gstAmountElement.textContent = '₹0';
        totalElement.textContent = '₹0';
        return;
    }
    
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        subtotalElement.textContent = '₹0';
        gstAmountElement.textContent = '₹0';
        totalElement.textContent = '₹0';
        return;
    }
    
    const roomPrice = roomPrices[roomTypeSelect.value] || 0;
    const roomCount = parseInt(roomCountInput.value) || 1;
    
    const subtotal = roomPrice * nights * roomCount;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    
    subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    gstAmountElement.textContent = `₹${gst.toLocaleString('en-IN')}`;
    totalElement.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Form validation
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (!field.value.trim() && field.hasAttribute('required')) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'This field is required';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Please enter a valid email address';
            return false;
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && field.value && field.hasAttribute('required')) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Please enter a valid 10-digit phone number';
            return false;
        }
    }
    
    // Date validation
    if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Date cannot be in the past';
            return false;
        }
        
        // Check-out validation
        if (field.id === 'check-out' && checkInInput.value) {
            const checkIn = new Date(checkInInput.value);
            if (selectedDate <= checkIn) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Check-out must be after check-in';
                return false;
            }
        }
    }
    
    // GST number validation (optional field)
    if (field.id === 'gst-number' && field.value) {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstRegex.test(field.value)) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Please enter a valid GST number';
            return false;
        }
    }
    
    formGroup.classList.remove('error');
    return true;
}

// Add blur event listeners to form fields
if (bookingForm) {
    const formFields = bookingForm.querySelectorAll('input, select');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
}

// Form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const formFields = bookingForm.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            alert('Please correct the errors in the form');
            return;
        }
        
        // Collect form data
        const formData = {
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            roomType: roomTypeSelect.value,
            roomCount: parseInt(roomCountInput.value),
            guestName: document.getElementById('guest-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            companyName: document.getElementById('company-name').value,
            gstNumber: document.getElementById('gst-number').value
        };
        
        // TODO: Send to API endpoint
        console.log('Booking data:', formData);
        
        // Show success message (temporary)
        alert('Booking submitted successfully! You will receive a confirmation email shortly.');
        bookingForm.reset();
        calculatePrice();
    });
}

// ===================================
// Contact Form
// ===================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // TODO: Send to API endpoint
        console.log('Contact form data:', formData);
        
        // Show success message (temporary)
        alert('Thank you for your message! We will respond within 2 hours during business hours.');
        contactForm.reset();
    });
}

// ===================================
// Real-time Inventory Display
// ===================================

async function updateInventory() {
    // TODO: Fetch from API endpoint
    // For now, using mock data
    const mockInventory = {
        'executive-suite': 2,
        'business-deluxe': 4
    };
    
    const scarcityBadges = document.querySelectorAll('.scarcity-badge');
    
    scarcityBadges.forEach(badge => {
        const roomId = badge.getAttribute('data-room-id');
        const availableCount = mockInventory[roomId];
        
        if (availableCount === 0) {
            badge.textContent = 'Sold out';
            badge.style.backgroundColor = '#6c757d';
        } else if (availableCount <= 2) {
            badge.textContent = `Only ${availableCount} room${availableCount > 1 ? 's' : ''} left`;
            badge.style.backgroundColor = '#DC3545';
        } else if (availableCount <= 4) {
            badge.textContent = 'Limited availability';
            badge.style.backgroundColor = '#FFC107';
            badge.style.color = '#000';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Update inventory on page load
updateInventory();

// Poll inventory every 30 seconds
setInterval(updateInventory, 30000);

// ===================================
// Analytics Tracking
// ===================================

function trackEvent(eventType, metadata = {}) {
    const event = {
        eventType,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        metadata
    };
    
    // TODO: Send to analytics API endpoint
    console.log('Analytics event:', event);
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// Track page view
trackEvent('page_view', {
    page: window.location.pathname,
    referrer: document.referrer
});

// Track CTA clicks
document.querySelectorAll('.hero-cta, .nav-cta, .room-cta').forEach(cta => {
    cta.addEventListener('click', () => {
        trackEvent('cta_click', {
            ctaText: cta.textContent,
            ctaLocation: cta.className
        });
    });
});

// Track booking form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', () => {
        trackEvent('booking_started', {
            roomType: roomTypeSelect.value,
            roomCount: roomCountInput.value
        });
    });
}

// Track session duration
let sessionStartTime = Date.now();

window.addEventListener('beforeunload', () => {
    const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
    trackEvent('session_end', {
        duration: sessionDuration
    });
});

// ===================================
// Map Integration
// ===================================

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps) {
        mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center; padding: 20px;">Map requires Google Maps API key. Please add your API key in index.html</div>';
        return;
    }
    
    // Swagat Retreat coordinates
    const hotelLocation = { lat: 19.810392, lng: 85.827141 };
    
    // Create map
    const map = new google.maps.Map(mapContainer, {
        center: hotelLocation,
        zoom: 15,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });
    
    // Hotel marker
    const hotelMarker = new google.maps.Marker({
        position: hotelLocation,
        map: map,
        title: 'Swagat Retreat',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#D4AF37" stroke="#001440" stroke-width="2"/>
                    <text x="20" y="26" font-size="20" text-anchor="middle" fill="#001440" font-weight="bold">H</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40)
        }
    });
    
    // Jagannath Temple marker
    const templeLocation = { lat: 19.8048, lng: 85.8182 };
    const templeMarker = new google.maps.Marker({
        position: templeLocation,
        map: map,
        title: 'Jagannath Temple',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#001440',
            fillOpacity: 1,
            strokeColor: '#D4AF37',
            strokeWeight: 2
        }
    });
    
    // Puri Beach marker
    const beachLocation = { lat: 19.8100, lng: 85.8300 };
    const beachMarker = new google.maps.Marker({
        position: beachLocation,
        map: map,
        title: 'Puri Sea Beach',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#001440',
            fillOpacity: 1,
            strokeColor: '#D4AF37',
            strokeWeight: 2
        }
    });
    
    // Info windows
    const hotelInfo = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><strong>Swagat Retreat</strong><br>Premium Business Hotel</div>'
    });
    
    const templeInfo = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><strong>Jagannath Temple</strong><br>5 minutes away</div>'
    });
    
    const beachInfo = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><strong>Puri Sea Beach</strong><br>2 minutes away</div>'
    });
    
    // Add click listeners
    hotelMarker.addListener('click', () => {
        hotelInfo.open(map, hotelMarker);
    });
    
    templeMarker.addListener('click', () => {
        templeInfo.open(map, templeMarker);
    });
    
    beachMarker.addListener('click', () => {
        beachInfo.open(map, beachMarker);
    });
    
    // Lazy load map when section is visible
    const locationSection = document.getElementById('location');
    if (locationSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger map resize to ensure proper rendering
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(hotelLocation);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(locationSection);
    }
}

// Initialize map when Google Maps API is loaded (callback from script tag)
window.initMap = initMap;

// ===================================
// Distance Calculator
// ===================================

const calculateDistanceBtn = document.getElementById('calculate-distance-btn');
const destinationInput = document.getElementById('destination-input');
const distanceResult = document.getElementById('distance-result');

if (calculateDistanceBtn && destinationInput) {
    calculateDistanceBtn.addEventListener('click', calculateDistance);
    
    destinationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateDistance();
        }
    });
}

function calculateDistance() {
    const destination = destinationInput.value.trim();
    
    if (!destination) {
        alert('Please enter a destination');
        return;
    }
    
    if (typeof google === 'undefined' || !google.maps) {
        distanceResult.innerHTML = '<p style="color: #DC3545;">Google Maps API is required for distance calculation</p>';
        distanceResult.classList.add('show');
        return;
    }
    
    const hotelLocation = { lat: 19.810392, lng: 85.827141 };
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    
    // Show loading
    distanceResult.innerHTML = '<p>Calculating...</p>';
    distanceResult.classList.add('show');
    
    // Geocode the destination
    geocoder.geocode({ address: destination + ', Puri, Odisha' }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const destinationLocation = results[0].geometry.location;
            
            // Calculate distance
            service.getDistanceMatrix({
                origins: [hotelLocation],
                destinations: [destinationLocation],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }, (response, status) => {
                if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                    const element = response.rows[0].elements[0];
                    const distance = element.distance.text;
                    const duration = element.duration.text;
                    
                    distanceResult.innerHTML = `
                        <p><strong>${distance}</strong> away</p>
                        <p>Approximately <strong>${duration}</strong> by car</p>
                    `;
                } else {
                    distanceResult.innerHTML = '<p style="color: #DC3545;">Could not calculate distance. Please try a different location.</p>';
                }
            });
        } else {
            distanceResult.innerHTML = '<p style="color: #DC3545;">Location not found. Please try a different address.</p>';
        }
    });
}
