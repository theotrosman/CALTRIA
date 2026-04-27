// ─── Stagger Animation for Grids ───────────────────────────────

function initStaggerAnimation() {
  const staggerContainers = document.querySelectorAll('.stagger');
  
  staggerContainers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 80}ms`;
    });
  });
}

// ─── Parallax Effect for Hero Background ───────────────────────

function initParallax() {
  const heroBg = document.querySelector('.hero__bg-image');
  
  if (!heroBg) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    heroBg.style.transform = `translateY(${rate}px) scale(1.05)`;
  }, { passive: true });
}

// ─── Card Hover Effect with Mouse Position ─────────────────────

function initCardHoverEffect() {
  const cards = document.querySelectorAll('.service-card, .result-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });
}

// ─── Number Counter Animation ───────────────────────────────────

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        entry.target.dataset.counted = 'true';
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });
}

// ─── Initialize All Animations ──────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initStaggerAnimation();
  initParallax();
  initCardHoverEffect();
  initCounters();
});
