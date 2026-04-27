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
    if (href === '#') return;
    
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

// ─── Parallax Effect for Hero Blobs ─────────────────────────────

const heroBlobs = document.querySelectorAll('.hero__blob');

function updateParallax() {
  const scrolled = window.pageYOffset;
  
  heroBlobs.forEach((blob, index) => {
    const speed = 0.3 + (index * 0.1);
    const yPos = -(scrolled * speed);
    blob.style.transform = `translateY(${yPos}px)`;
  });
}

// ─── Mouse Move Effect on Service Cards ─────────────────────────

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ─── Scroll Event Listeners ─────────────────────────────────────

let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbar();
      updateParallax();
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

// ─── Duplicate Testimonials for Infinite Scroll ─────────────────

const testimonialsTrack = document.querySelector('.testimonials__track');

if (testimonialsTrack) {
  const cards = Array.from(testimonialsTrack.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    testimonialsTrack.appendChild(clone);
  });
}
