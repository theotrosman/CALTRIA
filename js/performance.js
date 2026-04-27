// ─── Performance Optimizations ───────────────────────────────────

// Preload critical fonts
const fontPreload = document.createElement('link');
fontPreload.rel = 'preconnect';
fontPreload.href = 'https://fonts.googleapis.com';
document.head.appendChild(fontPreload);

// Lazy load images when they come into view
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--dur-fast', '0ms');
  document.documentElement.style.setProperty('--dur-normal', '0ms');
  document.documentElement.style.setProperty('--dur-slow', '0ms');
  document.documentElement.style.setProperty('--dur-xslow', '0ms');
  
  // Disable animations
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Optimize scroll performance
const optimizedScroll = throttle(() => {
  // Your scroll logic here
}, 16); // ~60fps

// Preload next section images
const preloadNextSection = () => {
  const sections = document.querySelectorAll('section');
  const currentScroll = window.pageYOffset;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight * 1.5;
    
    if (isNearViewport) {
      const images = section.querySelectorAll('img[data-src]');
      images.forEach(img => {
        if (img.dataset.src) {
          const tempImg = new Image();
          tempImg.src = img.dataset.src;
        }
      });
    }
  });
};

window.addEventListener('scroll', debounce(preloadNextSection, 200), { passive: true });

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}

// Performance monitoring
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('%c⚡ Performance Metrics', 'color: #ffbe0b; font-size: 14px; font-weight: bold;');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Connect Time: ${connectTime}ms`);
      console.log(`Render Time: ${renderTime}ms`);
    }, 0);
  });
}

// Intersection Observer polyfill check
if (!('IntersectionObserver' in window)) {
  console.warn('IntersectionObserver not supported. Some animations may not work.');
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = document.createElement('script');
  smoothScrollPolyfill.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  document.head.appendChild(smoothScrollPolyfill);
}

// Detect if user is on mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  document.body.classList.add('is-mobile');
  // Disable some heavy animations on mobile
  document.documentElement.style.setProperty('--dur-slow', '400ms');
  document.documentElement.style.setProperty('--dur-xslow', '600ms');
}

// Detect if user is on a slow connection
if ('connection' in navigator) {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection && connection.effectiveType) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.body.classList.add('slow-connection');
      // Reduce animations for slow connections
      document.documentElement.style.setProperty('--dur-fast', '100ms');
      document.documentElement.style.setProperty('--dur-normal', '200ms');
      document.documentElement.style.setProperty('--dur-slow', '300ms');
    }
  }
}

// Battery API - reduce animations on low battery
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    if (battery.level < 0.2 && !battery.charging) {
      document.body.classList.add('low-battery');
      console.log('Low battery detected - reducing animations');
    }
  });
}

// Visibility API - pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});

// Log initialization
console.log('%c🚀 Caltria Performance Module Loaded', 'color: #3a86ff; font-size: 14px; font-weight: bold;');
console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
console.log(`Reduced Motion: ${prefersReducedMotion.matches ? 'Yes' : 'No'}`);
