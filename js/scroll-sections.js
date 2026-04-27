// ─── Advanced Scroll Animations per Section ─────────────────────

// Section-based scroll effects
const sections = document.querySelectorAll('section');
let currentSection = 0;

// Track which section is in view
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionIndex = Array.from(sections).indexOf(entry.target);
      currentSection = sectionIndex;
      
      // Add active class to section
      entry.target.classList.add('section-active');
      
      // Trigger section-specific animations
      triggerSectionAnimation(entry.target);
    } else {
      entry.target.classList.remove('section-active');
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-10% 0px -10% 0px'
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Section-specific animations
function triggerSectionAnimation(section) {
  const sectionId = section.id;
  
  switch(sectionId) {
    case 'servicios':
      animateServiceCards();
      break;
    case 'proceso':
      animateProcessSteps();
      break;
    case 'trabajo':
      animateWorkCards();
      break;
    case 'testimonios':
      // Already has auto-scroll
      break;
  }
}

// Animate service cards with wave effect
function animateServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'none';
      card.offsetHeight; // Trigger reflow
      card.style.animation = `fadeUp 0.6s ${index * 0.1}s var(--ease-out) both`;
    }, 0);
  });
}

// Animate process steps sequentially
function animateProcessSteps() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.style.animation = 'none';
      step.offsetHeight;
      step.style.animation = `scaleIn 0.5s ${index * 0.15}s var(--ease-out) both`;
    }, 0);
  });
}

// Animate work cards with stagger
function animateWorkCards() {
  const cards = document.querySelectorAll('.work-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = `fadeUp 0.7s ${index * 0.12}s var(--ease-out) both`;
    }, 0);
  });
}

// ─── Parallax Scroll for Different Elements ─────────────────────

const parallaxElements = [
  { selector: '.hero__blob--1', speed: 0.5 },
  { selector: '.hero__blob--2', speed: 0.3 },
  { selector: '.hero__blob--3', speed: 0.4 },
  { selector: '.service-card', speed: 0.05 },
  { selector: '.work-card', speed: 0.08 }
];

function updateParallaxElements() {
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach(({ selector, speed }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (elementVisible) {
        const offset = (scrolled - elementTop) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  });
}

// ─── Smooth Section Snapping (Optional) ──────────────────────────

let isScrolling = false;
let scrollTimeout;

function handleSectionSnap() {
  clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 150);
  
  if (!isScrolling) {
    isScrolling = true;
  }
}

// ─── Text Reveal on Scroll ───────────────────────────────────────

const textRevealElements = document.querySelectorAll('.section-header__title, .hero__title');

textRevealElements.forEach(element => {
  const text = element.textContent;
  const words = text.split(' ');
  
  element.innerHTML = words.map((word, index) => 
    `<span class="word-reveal" style="display: inline-block; opacity: 0; transform: translateY(20px); transition: all 0.5s ${index * 0.05}s var(--ease-out);">${word}</span>`
  ).join(' ');
});

const textRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const words = entry.target.querySelectorAll('.word-reveal');
      words.forEach(word => {
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      });
    }
  });
}, { threshold: 0.5 });

textRevealElements.forEach(el => {
  textRevealObserver.observe(el);
});

// ─── Scroll-based Color Transitions ──────────────────────────────

function updateScrollColors() {
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  
  // Subtle background color shift
  const hue = 280 + (scrollPercent * 40); // 280 to 320
  document.body.style.backgroundColor = `hsl(${hue}, 60%, 8%)`;
}

// ─── Main Scroll Handler ─────────────────────────────────────────

let scrollTicking = false;

function onAdvancedScroll() {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      updateParallaxElements();
      updateScrollColors();
      handleSectionSnap();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

window.addEventListener('scroll', onAdvancedScroll, { passive: true });

// ─── Mouse-based Tilt Effect on Cards ────────────────────────────

const tiltCards = document.querySelectorAll('.service-card, .work-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── Scroll Progress Indicator per Section ───────────────────────

function updateSectionProgress() {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const sectionTop = rect.top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      section.style.setProperty('--section-progress', progress);
    }
  });
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(updateSectionProgress);
}, { passive: true });

console.log('%c🎬 Advanced Scroll Animations Loaded', 'color: #fb5607; font-size: 14px; font-weight: bold;');
