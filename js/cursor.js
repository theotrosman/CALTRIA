// ─── Custom Neon Cursor (Desktop Only) ───────────────────────────

if (window.innerWidth >= 1024) {
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(follower);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate cursor
  function animateCursor() {
    // Smooth cursor movement
    const cursorSpeed = 0.2;
    cursorX += (mouseX - cursorX) * cursorSpeed;
    cursorY += (mouseY - cursorY) * cursorSpeed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Smooth follower movement (slower)
    const followerSpeed = 0.1;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-card, .work-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Text selection cursor
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');

  textElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-text');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-text');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  console.log('%c🎯 Custom Cursor Loaded', 'color: #ff006e; font-size: 14px; font-weight: bold;');
}
