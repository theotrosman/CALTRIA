// ─── SCRAMBLE + ROTATING WORD ──────────────────────────────────

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

const ROTATING_WORDS = [
  'comercio',
  'trabajo',
  'empresa',
  'negocio',
  'equipo',
  'proceso',
];

// ─── Scramble animación genérica ───────────────────────────────

function scrambleAnimate(el, newWord, keepColor) {
  const totalFrames = 24;
  let frame = 0;

  el.style.color = 'var(--color-primary)';

  function tick() {
    const progress = frame / totalFrames;
    el.textContent = newWord
      .split('')
      .map((char, i) => {
        if (i < Math.floor(progress * newWord.length)) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');

    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = newWord;
      if (!keepColor) {
        el.style.transition = 'color 0.4s ease';
        el.style.color = '';
      }
    }
  }

  tick();
}

// ─── Rotating word ─────────────────────────────────────────────

function initRotatingWord() {
  const el = document.getElementById('rotating-word');
  if (!el) return;

  // Siempre rosa
  el.style.color = 'var(--color-primary)';

  let index = 0;

  // Cambiar inmediatamente y luego cada 2.5s
  function rotate() {
    index = (index + 1) % ROTATING_WORDS.length;
    const target = document.getElementById('rotating-word');
    if (target) scrambleAnimate(target, ROTATING_WORDS[index], true);
  }

  rotate();
  setInterval(rotate, 2000);
}

// ─── Scramble on hover ─────────────────────────────────────────

let scrambleEnabled = false;
setTimeout(() => { scrambleEnabled = true; }, 3000);

function scrambleWord(span) {
  if (span._scrambling) return;
  span._scrambling = true;

  const original = span.dataset.original;
  const totalFrames = 28;
  let frame = 0;

  span.style.color = 'var(--color-primary)';

  function tick() {
    const progress = frame / totalFrames;
    span.textContent = original
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (i < Math.floor(progress * original.length)) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');

    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(tick);
    } else {
      span.textContent = original;
      span.style.transition = 'color 0.4s ease';
      span.style.color = '';
      span._scrambling = false;
    }
  }

  tick();
}

function wrapWords(el) {
  const newChildren = [];

  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/);
      parts.forEach(part => {
        if (/^\s+$/.test(part) || part === '') {
          newChildren.push(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'scramble-word';
          span.dataset.original = part;
          span.textContent = part;
          span.style.display = 'inline-block';
          newChildren.push(span);
        }
      });
    } else {
      // Preservar elementos como #rotating-word sin clonar
      newChildren.push(node);
    }
  });

  // Limpiar y re-insertar (sin clonar el rotating span)
  while (el.firstChild) el.removeChild(el.firstChild);
  newChildren.forEach(child => el.appendChild(child));
}

// ─── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-scramble]');

  targets.forEach(el => {
    wrapWords(el); // primero wrap, preservando #rotating-word en el DOM

    el.addEventListener('mousemove', (e) => {
      if (!scrambleEnabled) return;

      const spans = el.querySelectorAll('.scramble-word');
      let closest = null;
      let minDist = Infinity;

      spans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (dist < minDist) {
          minDist = dist;
          closest = span;
        }
      });

      if (closest && minDist < 80) scrambleWord(closest);
    });
  });

  // Iniciar rotating word DESPUÉS del wrap
  initRotatingWord();
});
