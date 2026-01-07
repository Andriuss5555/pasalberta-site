// Security Features Addition for PasAlberta

// ========================================
// SECURITY FEATURES
// ========================================

function initSecurityFeatures() {
  // CSRF Token Generation
  function generateCSRFToken() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Add CSRF token to forms
  const csrfTokenField = document.getElementById('csrf-token');
  if (csrfTokenField) {
    csrfTokenField.value = generateCSRFToken();
  }
  
  // Rate Limiting for Forms
  const RATE_LIMIT_KEY = 'form_submission_';
  const RATE_LIMIT_DURATION = 60000; // 1 minute
  const MAX_SUBMISSIONS = 3; // Maximum 3 submissions per minute
  
  function checkRateLimit(formId) {
    const storageKey = RATE_LIMIT_KEY + formId;
    const now = Date.now();
    
    try {
      const submissions = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Filter out old submissions
      const recentSubmissions = submissions.filter(function(timestamp) {
        return now - timestamp < RATE_LIMIT_DURATION;
      });
      
      if (recentSubmissions.length >= MAX_SUBMISSIONS) {
        return false; // Rate limit exceeded
      }
      
      // Add current submission
      recentSubmissions.push(now);
      localStorage.setItem(storageKey, JSON.stringify(recentSubmissions));
      return true;
    } catch(e) {
      // If localStorage fails, allow submission
      return true;
    }
  }
  
  // Honeypot Validation
  function validateHoneypot(form) {
    const honeypotField = form.querySelector('#website');
    if (honeypotField && honeypotField.value !== '') {
      // Honeypot was filled - likely a bot
      return false;
    }
    return true;
  }
  
  // Apply security to booking form
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const submitBtn = document.getElementById('submit-btn');
    
    bookingForm.addEventListener('submit', function(e) {
      // Check honeypot
      if (!validateHoneypot(bookingForm)) {
        e.preventDefault();
        console.warn('Security: Honeypot triggered');
        return false;
      }
      
      // Check rate limiting
      if (!checkRateLimit('booking')) {
        e.preventDefault();
        const lang = document.documentElement.lang || 'lt';
        const messages = {
          'lt': 'Per daug užklausų. Prašome palaukti minutę ir bandyti dar kartą.',
          'en': 'Too many requests. Please wait a minute and try again.',
          'lv': 'Pārāk daudz pieprasījumu. Lūdzu, uzgaidiet minūti un mēģiniet vēlreiz.',
          'pl': 'Zbyt wiele próśb. Proszę poczekać minutę i spróbować ponownie.'
        };
        alert(messages[lang] || messages['en']);
        return false;
      }
      
      // Disable submit button to prevent double submission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Re-enable after 5 seconds if form submission fails
        setTimeout(function() {
          submitBtn.disabled = false;
          const lang = document.documentElement.lang || 'lt';
          const btnTexts = {
            'lt': 'Siųsti užklausą',
            'en': 'Send Request',
            'lv': 'Nosūtīt pieprasījumu',
            'pl': 'Wyślij zapytanie'
          };
          submitBtn.textContent = btnTexts[lang] || btnTexts['en'];
        }, 5000);
      }
    });
    
    // Set minimum date to today for booking date
    const bookingDateField = document.getElementById('booking-date');
    if (bookingDateField) {
      const today = new Date().toISOString().split('T')[0];
      bookingDateField.setAttribute('min', today);
    }
  }
  
  // Additional XSS Protection - sanitize inputs on submission
  const allForms = document.querySelectorAll('form');
  allForms.forEach(function(form) {
    form.addEventListener('submit', function() {
      const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
      textInputs.forEach(function(input) {
        // Basic XSS prevention - remove script tags
        if (input.value) {
          input.value = input.value.replace(/<script[^>]*>.*?<\/script>/gi, '');
          input.value = input.value.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
        }
      });
    });
  });
  
  console.log('PasAlberta Security: Initialized ✓');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSecurityFeatures);
} else {
  initSecurityFeatures();
}
