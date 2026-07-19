/* ============================================
   GALLERY.JS — Lightbox & Mobile Infinite Scroll
   ============================================ */

(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage) return;

  const container = document.getElementById('galleryMasonry');

  // ── iOS-safe scroll freeze helpers ──
  // iOS Safari ignores overflow:hidden on body — use position:fixed technique
  var _scrollY = 0;

  function lockScroll() {
    if (window._isIOS) {
      _scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.top = '-' + _scrollY + 'px';
      document.body.classList.add('ios-scroll-locked');
      document.documentElement.classList.add('ios-scroll-locked');
    } else {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  }

  function unlockScroll() {
    if (window._isIOS) {
      document.body.classList.remove('ios-scroll-locked');
      document.documentElement.classList.remove('ios-scroll-locked');
      document.body.style.top = '';
      window.scrollTo(0, _scrollY);
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  // Event Delegation for lightbox click (supports cloned mobile items)
  // NOTE: iOS Safari won't fire 'click' on non-interactive elements unless
  // they have cursor:pointer in CSS OR a touchstart listener is attached.
  // The touchstart listener below acts as the iOS click-enabler.
  if (container) {
    // iOS click-enabler: empty touchstart makes the element "interactive"
    container.addEventListener('touchstart', function() {}, { passive: true });

    container.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (item) {
        const img = item.querySelector('img');
        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt;
          lightbox.classList.add('active');
          lockScroll();
        }
      }
    });
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    unlockScroll();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ---- Duplicate Testimonial Track for Infinite Scroll ----
  const testimonialTrack = document.getElementById('testimonialTrack');
  if (testimonialTrack) {
    const cards = testimonialTrack.innerHTML;
    testimonialTrack.innerHTML = cards + cards; // Double for seamless loop
  }

  // ---- 2-Row Infinite Scroll Loop (All Screens) ----
  if (container) {
    const originalItems = Array.from(container.children);
    const originalLength = originalItems.length;

    // Clear container
    container.innerHTML = '';
    // Clone set 1
    originalItems.forEach(item => container.appendChild(item.cloneNode(true)));
    // Original set
    originalItems.forEach(item => container.appendChild(item.cloneNode(true)));
    // Clone set 2
    originalItems.forEach(item => container.appendChild(item.cloneNode(true)));

    // Initialize scroll position to show the second (middle) set
    requestAnimationFrame(() => {
      const loopWidth = getLoopWidth();
      container.scrollLeft = loopWidth;
    });

    let animationFrameId = null;
    let isInteracting = false;
    let resumeTimeout = null;

    // Drag state
    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;

    function getLoopWidth() {
      if (container.children.length < originalLength * 2) return 0;
      const rect0 = container.children[0].getBoundingClientRect();
      const rectClone = container.children[originalLength].getBoundingClientRect();
      return rectClone.left - rect0.left;
    }

    let lastTime = performance.now();
    const autoSpeed = 0.03; // pixels per millisecond

    function scrollStep(now) {
      if (!isInteracting) {
        const delta = now - lastTime;
        if (delta < 100) {
          container.scrollLeft += delta * autoSpeed;
        }
        
        wrapScroll();
      }
      
      lastTime = now;
      animationFrameId = requestAnimationFrame(scrollStep);
    }

    function wrapScroll() {
      const loopWidth = getLoopWidth();
      if (loopWidth <= 0) return;

      if (container.scrollLeft >= 2 * loopWidth) {
        container.scrollLeft -= loopWidth;
      } else if (container.scrollLeft < loopWidth) {
        container.scrollLeft += loopWidth;
      }
    }

    function handleScroll() {
      wrapScroll();
      if (isInteracting) {
        resetResumeTimer();
      }
    }

    function startInteraction() {
      isInteracting = true;
      container.classList.add('is-interacting');
      clearTimeout(resumeTimeout);
    }

    function resetResumeTimer() {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        container.classList.remove('is-interacting');
        isInteracting = false;
        lastTime = performance.now(); // Reset time delta
      }, 1500); // Resume auto-scroll after 1.5 seconds of inactivity
    }

    function endInteraction() {
      resetResumeTimer();
    }

    function dragStart(e) {
      isDown = true;
      container.classList.add('active-drag');
      startX = e.clientX - container.getBoundingClientRect().left;
      scrollLeftStart = container.scrollLeft;
      startInteraction();
    }

    function dragMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX - container.getBoundingClientRect().left;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeftStart - walk;
    }

    function dragEnd() {
      if (isDown) {
        isDown = false;
        container.classList.remove('active-drag');
        endInteraction();
      }
    }

    function wheelScroll() {
      startInteraction();
      endInteraction();
    }

    // Add event listeners
    container.addEventListener('touchstart', startInteraction, { passive: true });
    container.addEventListener('touchend', endInteraction, { passive: true });
    container.addEventListener('touchcancel', endInteraction, { passive: true });
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mousemove', dragMove);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('mouseleave', dragEnd);
    container.addEventListener('wheel', wheelScroll, { passive: true });
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Start auto scroll loop
    animationFrameId = requestAnimationFrame(scrollStep);
  }
})();
