// ─── VENOM UI NAVIGATION ────────────────────────────────────────

const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

let currentSection = '';
let isScrolling = false;
let scrollTimeout;

// ─── SCROLL DETECTION ───────────────────────────────────────────

function updateActiveSection() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      if (currentSection !== sectionId) {
        currentSection = sectionId;
        updateNavLinks(sectionId);
      }
    }
  });
  
  // Handle top of page (no section active)
  if (scrollY < 100) {
    if (currentSection !== '') {
      currentSection = '';
      updateNavLinks('');
    }
  }
}

// ─── UPDATE NAV LINKS ───────────────────────────────────────────

function updateNavLinks(activeId) {
  navLinks.forEach(link => {
    const linkTarget = link.getAttribute('data-nav');
    
    if (linkTarget === activeId) {
      link.classList.add('active');
      // Trigger magnetic effect
      triggerMagneticPulse(link);
    } else {
      link.classList.remove('active');
    }
  });
}

// ─── MAGNETIC PULSE EFFECT ──────────────────────────────────────

function triggerMagneticPulse(element) {
  const bg = element.querySelector('.nav__link-bg');
  
  // Create ripple effect
  bg.style.transition = 'none';
  bg.style.transform = 'scale(0.9)';
  
  requestAnimationFrame(() => {
    bg.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    bg.style.transform = 'scale(1)';
  });
}

// ─── SMOOTH SCROLL ──────────────────────────────────────────────

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('data-nav');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      e.preventDefault();
      
      // Remove active from all
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active to clicked
      link.classList.add('active');
      currentSection = targetId;
      
      // Enhanced smooth scroll with easing
      const offsetTop = targetSection.offsetTop - 80;
      const startPosition = window.pageYOffset;
      const distance = offsetTop - startPosition;
      const duration = 1200; // Increased duration for smoother feel
      let start = null;
      
      // Easing function for smooth deceleration
      function easeInOutCubic(t) {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      
      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
      
      // Trigger magnetic effect
      triggerMagneticPulse(link);
    }
  });
});

// ─── HOVER MAGNETIC EFFECT ──────────────────────────────────────

navLinks.forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    if (!link.classList.contains('active')) {
      const bg = link.querySelector('.nav__link-bg');
      
      // Subtle scale pulse on hover
      bg.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        bg.style.transform = 'scale(1)';
      }, 200);
    }
  });
  
  link.addEventListener('mousemove', (e) => {
    if (!link.classList.contains('active')) {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Subtle magnetic pull
      const moveX = deltaX * 2;
      const moveY = deltaY * 2;
      
      link.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    }
  });
  
  link.addEventListener('mouseleave', () => {
    if (!link.classList.contains('active')) {
      link.style.transform = '';
    }
  });
});

// ─── SCROLL LISTENER ────────────────────────────────────────────

window.addEventListener('scroll', () => {
  // Add scrolled class to nav
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update active section
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      updateActiveSection();
      isScrolling = false;
    });
    isScrolling = true;
  }
  
  // Clear timeout
  clearTimeout(scrollTimeout);
  
  // Set timeout to detect scroll end
  scrollTimeout = setTimeout(() => {
    updateActiveSection();
  }, 100);
});

// ─── PARALLAX EFFECT ON NAV ─────────────────────────────────────

let lastScrollY = window.pageYOffset;
let ticking = false;

function updateNavParallax() {
  const scrollY = window.pageYOffset;
  const delta = scrollY - lastScrollY;
  
  // Subtle parallax on nav background
  if (nav.classList.contains('scrolled')) {
    const parallaxAmount = Math.min(delta * 0.1, 2);
    nav.style.transform = `translateY(${-parallaxAmount}px)`;
    
    setTimeout(() => {
      nav.style.transform = 'translateY(0)';
    }, 100);
  }
  
  lastScrollY = scrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavParallax);
    ticking = true;
  }
});

// ─── INITIALIZE ─────────────────────────────────────────────────

// Set initial active state
updateActiveSection();

// Add smooth transitions
nav.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

console.log('%c🕷️ Venom Nav Ready', 'color: #ff006e; font-size: 14px; font-weight: bold;');
