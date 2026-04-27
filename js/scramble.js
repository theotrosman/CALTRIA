// ─── SCRAMBLE TEXT EFFECT ──────────────────────────────────────
// Efecto local: solo scramble la palabra más cercana al cursor

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

let scrambleEnabled = false;

// Habilitar después de 3 segundos
setTimeout(() => {
  scrambleEnabled = true;
}, 3000);

function scrambleWord(span) {
  if (span._scrambling) return;
  span._scrambling = true;

  const original = span.dataset.original;
  const totalFrames = 28;
  let frame = 0;

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
      span.style.color = '';
      span._scrambling = false;
    }
  }

  // Color rosa durante el scramble
  span.style.color = 'var(--color-primary)';
  tick();
}

function wrapWords(el) {
  const text = el.textContent.trim();
  const words = text.split(' ');

  el.innerHTML = words
    .map(word => {
      const span = document.createElement('span');
      span.className = 'scramble-word';
      span.dataset.original = word;
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      span.style.transition = 'color 0.3s ease';
      return span.outerHTML;
    })
    .join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-scramble]');

  targets.forEach(el => {
    wrapWords(el);

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

      if (closest && minDist < 80) {
        scrambleWord(closest);
      }
    });
  });
});
