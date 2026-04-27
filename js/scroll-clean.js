// ─── Scroll Progress Bar ────────────────────────────────────────

const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = scrollTop / scrollHeight;
  
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  }
}

// ─── Navbar Scroll Effect ───────────────────────────────────────

const nav = document.querySelector('.nav');

function updateNavbar() {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
}

// ─── Smooth Scroll for Anchor Links ─────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#success') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 72; // nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ─── Scroll Event Listeners ─────────────────────────────────────

let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbar();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
  updateScrollProgress();
  updateNavbar();
});

// ─── Intersection Observer for Fade In ──────────────────────────

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add fade-in effect to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(section);
});

console.log('Scroll Effects Ready');
