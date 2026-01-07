// PasAlberta Main JavaScript
// Mobile menu, lightbox, back-to-top, animations, and language switching

(function() {
  'use strict';

  // ========================================
  // LANGUAGE PREFERENCE HANDLER
  // ========================================
  
  function initLanguageSwitcher() {
    const languageSelects = document.querySelectorAll('select[onchange*="location"]');
    
    languageSelects.forEach(function(select) {
      // Remove inline onchange attribute
      select.removeAttribute('onchange');
      
      // Add event listener
      select.addEventListener('change', function() {
        const selectedUrl = this.value;
        
        // Extract language code from URL (e.g., /lt/, /en/, /lv/, /pl/)
        const langMatch = selectedUrl.match(/\/(lt|en|lv|pl)\//);
        if (langMatch) {
          // Store language preference
          localStorage.setItem('preferredLanguage', langMatch[1]);
        }
        
        // Navigate to selected language
        window.location.href = selectedUrl;
      });
    });
  }

  // ========================================
  // MOBILE MENU FUNCTIONALITY
  // ========================================
  
  function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    // Open mobile menu
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.classList.add('no-scroll');
    });
    
    // Close mobile menu
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    }
    
    // Close menu when clicking on links
    mobileMenuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ========================================
  // GALLERY LIGHTBOX
  // ========================================
  
  function initLightbox() {
    // Check if we're on gallery page
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length === 0) return;
    
    // Create lightbox HTML
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" id="lightbox-close">&times;</button>
        <button class="lightbox-prev" id="lightbox-prev">&#10094;</button>
        <button class="lightbox-next" id="lightbox-next">&#10095;</button>
        <img src="" alt="Gallery Image" id="lightbox-img">
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryImages);
    
    // Open lightbox
    galleryImages.forEach(function(img, index) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        currentImageIndex = index;
        showImage(currentImageIndex);
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });
    
    // Show image
    function showImage(index) {
      lightboxImg.src = images[index].src;
      lightboxImg.alt = images[index].alt;
    }
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
    
    // Previous image
    lightboxPrev.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex);
    });
    
    // Next image
    lightboxNext.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
      }
    });
  }

  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  
  function initBackToTop() {
    // Create back to top button
    const backToTopHTML = `
      <button class="back-to-top" id="back-to-top" aria-label="Back to top">
        ↑
      </button>
    `;
    
    document.body.insertAdjacentHTML('beforeend', backToTopHTML);
    
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  function initSmoothScroll() {
    document.documentElement.classList.add('smooth-scroll');
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========================================
  // FADE IN ANIMATIONS ON SCROLL
  // ========================================
  
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all sections and cards
    const animateElements = document.querySelectorAll('section, .border');
    animateElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ========================================
  // ADD HOVER EFFECTS TO CARDS
  // ========================================
  
  function initHoverEffects() {
    const cards = document.querySelectorAll('.border.rounded');
    cards.forEach(function(card) {
      card.classList.add('hover-card');
    });
  }

  // ========================================
  // FORM VALIDATION ENHANCEMENT
  // ========================================
  
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(function(field) {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
          } else {
            field.classList.remove('border-red-500');
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          // Get language-specific alert message
          const lang = document.documentElement.lang || 'lt';
          const messages = {
            'lt': 'Prašome užpildyti visus privalomus laukus.',
            'en': 'Please fill in all required fields.',
            'lv': 'Lūdzu, aizpildiet visus obligātos laukus.',
            'pl': 'Proszę wypełnić wszystkie wymagane pola.'
          };
          alert(messages[lang] || messages['lt']);
        }
      });
    });
  }

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================
  
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img');
      images.forEach(function(img) {
        img.loading = 'lazy';
      });
    }
  }

  // ========================================
  // INITIALIZE ALL FUNCTIONS
  // ========================================
  
  function init() {
    initLanguageSwitcher();
    initMobileMenu();
    initLightbox();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    initFormValidation();
    initLazyLoading();
    
    console.log('PasAlberta: All features initialized ✓');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
