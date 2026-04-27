// ─── Scroll Progress Bar ────────────────────────────────────────

const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight);
  
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${scrollPercentage})`;
  }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ─── Nav Background on Scroll ───────────────────────────────────

const nav = document.querySelector('.nav');

function updateNav() {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── Scroll Reveal Animation ────────────────────────────────────

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

// Observe all elements with .reveal class
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ─── Smooth Scroll for Anchor Links ─────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 72; // Nav height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
