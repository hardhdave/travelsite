/* ============================================
   CURSOR.JS — Custom Adventure Cursor
   Lightweight lerp-based smooth cursor follow
   ============================================ */

(function () {
  'use strict';

  // Skip on touch devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if ('ontouchstart' in window) return;

  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  const lerpFactor = 0.15;
  let raf;

  // Track mouse position
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    cursor.style.opacity = '1';
  });

  // Click states
  document.addEventListener('mousedown', function () {
    cursor.classList.add('cursor--clicking');
  });
  document.addEventListener('mouseup', function () {
    cursor.classList.remove('cursor--clicking');
  });

  // Smooth animation loop
  function animate() {
    cursorX += (mouseX - cursorX) * lerpFactor;
    cursorY += (mouseY - cursorY) * lerpFactor;

    cursor.style.transform = 'translate3d(' + cursorX + 'px, ' + cursorY + 'px, 0)';

    raf = requestAnimationFrame(animate);
  }
  raf = requestAnimationFrame(animate);

  // Hover detection via event delegation
  document.addEventListener('mouseover', function (e) {
    var target = e.target;

    // Check for interactive elements
    var link = target.closest('a, button, [role="button"], .btn, .nav-sheet__item, .navbar__link');
    var card = target.closest('.wc-card, .skiing__package-card, .rentals__card, .transport__card, .packages__card, .testimonials__card, .gallery__item, .activities__item, .trekking__card');
    var image = target.closest('img, video, .hero__media, .hero__slide');
    var textInput = target.closest('input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea');

    // Remove all states
    cursor.classList.remove('cursor--link', 'cursor--card', 'cursor--image', 'cursor--text');

    // Apply appropriate state (priority: text > link > card > image)
    if (textInput) {
      cursor.classList.add('cursor--text');
    } else if (link) {
      cursor.classList.add('cursor--link');
    } else if (card) {
      cursor.classList.add('cursor--card');
    } else if (image) {
      cursor.classList.add('cursor--image');
    }
  }, { passive: true });
})();
