/* ============================================================
   WHY-CHOOSE-SLIDER.JS - Mobile Bento Grid Vertical Auto-Scroll Ticker
   Implements an infinite vertical marquee loop on mobile viewports.
   Manual swiping/dragging is disabled to prevent conflicts with page scrolling.
   ============================================================ */
(function () {
  'use strict';

  function initWhyChooseSlider() {
    const bento = document.querySelector('.why-choose__bento');
    if (!bento) return;

    let marqueeActive = false;
    let animationId = null;
    let cloned = false;
    let originalCards = [];

    function checkAndSetup() {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (marqueeActive) return;

        // If we haven't cloned cards for marquee, clone now
        if (!cloned) {
          originalCards = Array.from(bento.querySelectorAll('.wc-card'));
          originalCards.forEach(card => {
            bento.appendChild(card.cloneNode(true));
          });
          cloned = true;
        }

        const scrollSpeed = 0.55; // Smooth, premium slow speed
        let halfHeight = bento.scrollHeight / 2;
        let currentScrollTop = bento.scrollTop;

        marqueeActive = true;

        function tick() {
          if (!marqueeActive) return;

          currentScrollTop += scrollSpeed;
          if (currentScrollTop >= halfHeight) {
            currentScrollTop = 0;
          }
          bento.scrollTop = Math.floor(currentScrollTop);
          animationId = requestAnimationFrame(tick);
        }

        animationId = requestAnimationFrame(tick);
      } else {
        // Restore desktop layout and cancel ticker if layout changed
        if (marqueeActive) {
          marqueeActive = false;
          cancelAnimationFrame(animationId);

          bento.scrollTop = 0;

          // Remove cloned elements
          if (cloned) {
            const allCards = bento.querySelectorAll('.wc-card');
            allCards.forEach((card, idx) => {
              if (idx >= originalCards.length) {
                card.remove();
              }
            });
            cloned = false;
          }
        }
      }
    }

    // Initialize layout setup and listen to window resizes
    checkAndSetup();
    window.addEventListener('resize', checkAndSetup);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhyChooseSlider);
  } else {
    initWhyChooseSlider();
  }
})();
