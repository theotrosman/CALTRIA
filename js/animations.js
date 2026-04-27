// ─── Intersection Observer for Scroll Reveals ───────────────────

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      
      // Si tiene hijos con clase reveal, revelarlos también
      const children = entry.target.querySelectorAll('.reveal');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('is-visible');
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observar todos los elementos con clase .reveal
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ─── Counter Animation for Stats ────────────────────────────────

const statNumbers = document.querySelectorAll('.stat-item__number');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const number = parseInt(text.replace(/\D/g, ''));
  
  if (isNaN(number)) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = number / steps;
  const stepDuration = duration / steps;
  
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= number) {
      element.textContent = number + (hasPlus ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }
  }, stepDuration);
}

// ─── Process Steps Sequential Reveal ────────────────────────────

const processSteps = document.querySelectorAll('.step');

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = Array.from(processSteps);
      const index = steps.indexOf(entry.target);
      
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 200);
    }
  });
}, { threshold: 0.3 });

processSteps.forEach(step => {
  processObserver.observe(step);
});

// ─── Work Cards Stagger Animation ───────────────────────────────

const workCards = document.querySelectorAll('.work-card');

const workObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = Array.from(workCards);
      const index = cards.indexOf(entry.target);
      
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 150);
    }
  });
}, { threshold: 0.2 });

workCards.forEach(card => {
  workObserver.observe(card);
});

// ─── Cursor Glow Effect (opcional, sutil) ───────────────────────

let cursorGlow = null;

function createCursorGlow() {
  cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(cursorGlow);
}

// Solo en desktop
if (window.innerWidth > 1024) {
  createCursorGlow();
  
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    }
  });
  
  document.addEventListener('mouseleave', () => {
    if (cursorGlow) {
      cursorGlow.style.opacity = '0';
    }
  });
}

// ─── Magnetic Button Effect ─────────────────────────────────────

const magneticButtons = document.querySelectorAll('.btn--primary');

magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ─── Log de inicialización ──────────────────────────────────────

console.log('%c✨ Caltria Animations Loaded', 'color: #6c63ff; font-size: 14px; font-weight: bold;');
