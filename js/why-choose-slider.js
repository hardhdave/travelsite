/* ============================================================
   WHY-CHOOSE-SLIDER.JS - Mobile Bento Grid Alternating Vertical Scroll
   Supports continuous autoscroll marquee, pointer-based manual swiping/dragging,
   momentum glide on release, and seamless wrap-around looping.
   ============================================================ */
(function () {
  'use strict';

  function initWhyChooseSlider() {
    const bento = document.querySelector('.why-choose__bento');
    if (!bento) return;

    // Capture the original card elements as they appear on desktop/tablet layout
    let originalCards = Array.from(bento.querySelectorAll('.wc-card'));
    if (!originalCards.length) return;

    let isMobileLayout = false;
    let columns = [];
    let marqueeActive = false;
    let animationId = null;

    let isUserInteracting = false;
    let resumeTimeout = null;

    // Tracker arrays for columns
    let yPositions = [0, 0];
    let halfHeights = [0, 0];
    let activePointerEvents = []; // tracks event listeners for removal

    const scrollSpeed = 0.6; // Speed of autoscroll (pixels per frame)

    // Helper to keep translate coordinates within seamless bounds [-halfHeight, 0]
    function wrapY(y, halfHeight) {
      while (y < -halfHeight) y += halfHeight;
      while (y > 0) y -= halfHeight;
      return y;
    }

    // Animation frame loop for continuous smooth autoscroll
    function animateMarquee() {
      if (!marqueeActive) return;

      if (!isUserInteracting && columns.length === 2) {
        // Column 1 (Index 0) scrolls UP (y decreases)
        yPositions[0] -= scrollSpeed;
        yPositions[0] = wrapY(yPositions[0], halfHeights[0]);
        columns[0].style.transform = `translate3d(0, ${yPositions[0]}px, 0)`;

        // Column 2 (Index 1) scrolls DOWN (y increases)
        yPositions[1] += scrollSpeed;
        yPositions[1] = wrapY(yPositions[1], halfHeights[1]);
        columns[1].style.transform = `translate3d(0, ${yPositions[1]}px, 0)`;
      }

      animationId = requestAnimationFrame(animateMarquee);
    }

    function startMarquee() {
      if (marqueeActive) return;
      marqueeActive = true;
      animationId = requestAnimationFrame(animateMarquee);
    }

    function stopMarquee() {
      marqueeActive = false;
      cancelAnimationFrame(animationId);
    }

    // Set up dragging listeners on a column
    function bindDragEvents(col, colIdx) {
      let startTouchY = 0;
      let startPosY = 0;
      let lastTouchY = 0;
      let dragVelocity = 0;
      let lastTouchTime = 0;
      let isDragging = false;

      const onPointerDown = (e) => {
        // Capture pointer events to track movement even outside card bounds
        try {
          col.setPointerCapture(e.pointerId);
        } catch (err) {}

        isDragging = true;
        isUserInteracting = true;
        clearTimeout(resumeTimeout);

        startTouchY = e.clientY;
        startPosY = yPositions[colIdx];
        lastTouchY = startTouchY;
        lastTouchTime = Date.now();
        dragVelocity = 0;
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;

        const currentTouchY = e.clientY;
        const deltaY = currentTouchY - startTouchY;
        const now = Date.now();
        const dt = now - lastTouchTime;

        if (dt > 0) {
          dragVelocity = (currentTouchY - lastTouchY) / dt;
        }

        let newY = startPosY + deltaY;
        newY = wrapY(newY, halfHeights[colIdx]);

        yPositions[colIdx] = newY;
        col.style.transform = `translate3d(0, ${newY}px, 0)`;

        lastTouchY = currentTouchY;
        lastTouchTime = now;
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;

        try {
          col.releasePointerCapture(e.pointerId);
        } catch (err) {}

        // Apply brief momentum glide based on drag speed on release
        if (Math.abs(dragVelocity) > 0.1) {
          let momentumY = yPositions[colIdx];
          let velocity = dragVelocity * 16; // scale to frame delta
          
          const frictionDecel = () => {
            if (isDragging || !isUserInteracting) return; // cancel glide if user touches again
            
            momentumY += velocity;
            momentumY = wrapY(momentumY, halfHeights[colIdx]);
            yPositions[colIdx] = momentumY;
            col.style.transform = `translate3d(0, ${momentumY}px, 0)`;
            
            velocity *= 0.92; // friction reduction
            if (Math.abs(velocity) > 0.15) {
              requestAnimationFrame(frictionDecel);
            }
          };
          requestAnimationFrame(frictionDecel);
        }

        // Resume auto-scroll after 2.5 seconds of inactivity
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          isUserInteracting = false;
        }, 2500);
      };

      col.addEventListener('pointerdown', onPointerDown);
      col.addEventListener('pointermove', onPointerMove);
      col.addEventListener('pointerup', onPointerUp);
      col.addEventListener('pointercancel', onPointerUp);

      // Keep references to clean up listeners on resize
      activePointerEvents.push({
        col,
        onPointerDown,
        onPointerMove,
        onPointerUp
      });
    }

    // Toggle bento grid layout structure depending on viewport size
    function setupLayout() {
      const isMobile = window.innerWidth <= 767;

      if (isMobile && !isMobileLayout) {
        // Clear bento container and load mobile column frames
        bento.innerHTML = '';
        bento.classList.add('wc-mobile-layout');

        const colUp = document.createElement('div');
        colUp.className = 'wc-column wc-column--up';

        const colDown = document.createElement('div');
        colDown.className = 'wc-column wc-column--down';

        // Distribute cards: Odd indices in Column 1, Even indices in Column 2
        originalCards.forEach((card, idx) => {
          const clone = card.cloneNode(true);
          clone.classList.remove('reveal');
          
          if (idx % 2 === 0) {
            colUp.appendChild(clone);
          } else {
            colDown.appendChild(clone);
          }
        });

        // Duplicate contents to enable infinite scrolling loops
        const colUpChildren = Array.from(colUp.children);
        colUpChildren.forEach(child => {
          colUp.appendChild(child.cloneNode(true));
        });

        const colDownChildren = Array.from(colDown.children);
        colDownChildren.forEach(child => {
          colDown.appendChild(child.cloneNode(true));
        });

        bento.appendChild(colUp);
        bento.appendChild(colDown);

        columns = [colUp, colDown];
        activePointerEvents = [];

        // Bind drag listeners to each column independently
        bindDragEvents(colUp, 0);
        bindDragEvents(colDown, 1);

        isMobileLayout = true;

        // Force a brief paint cycle before measuring heights and starting animations
        setTimeout(() => {
          if (columns.length === 2) {
            halfHeights[0] = columns[0].scrollHeight / 2;
            halfHeights[1] = columns[1].scrollHeight / 2;

            yPositions[0] = 0;
            // Column 2 starts at the half point to scroll down smoothly
            yPositions[1] = -halfHeights[1];

            columns[0].style.transform = `translate3d(0, ${yPositions[0]}px, 0)`;
            columns[1].style.transform = `translate3d(0, ${yPositions[1]}px, 0)`;

            startMarquee();
          }
        }, 150);
      } else if (!isMobile && isMobileLayout) {
        stopMarquee();

        // Clean up event listeners
        activePointerEvents.forEach(({ col, onPointerDown, onPointerMove, onPointerUp }) => {
          col.removeEventListener('pointerdown', onPointerDown);
          col.removeEventListener('pointermove', onPointerMove);
          col.removeEventListener('pointerup', onPointerUp);
          col.removeEventListener('pointercancel', onPointerUp);
        });
        activePointerEvents = [];

        // Reset layout structure back to default desktop/tablet grid
        bento.innerHTML = '';
        bento.classList.remove('wc-mobile-layout');
        originalCards.forEach(card => {
          bento.appendChild(card);
        });

        columns = [];
        isMobileLayout = false;
      }
    }

    // Temporarily pause scroll animations during page scrolling to avoid stutters
    const onWindowScroll = () => {
      if (isMobileLayout) {
        isUserInteracting = true;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          isUserInteracting = false;
        }, 2500);
      }
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    // Initialize layout setup and listen to window resizes
    setupLayout();
    window.addEventListener('resize', setupLayout);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhyChooseSlider);
  } else {
    initWhyChooseSlider();
  }
})();
