/* ============================================
   EXPERIENCES-TABS.JS — Editorial Magazine Tabs
   Keyboard, Touch & Auto-Advance Support
   ============================================ */

(function () {
  'use strict';

  function initExperiencesTabs() {
    const section = document.querySelector('.experiences');
    if (!section) return;

    const navBtns = section.querySelectorAll('.experiences__nav-btn');
    const panels  = section.querySelectorAll('.experiences__panel');
    const dots    = section.querySelectorAll('.experiences__dot');

    if (!navBtns.length || !panels.length) return;

    let currentIndex = 0;
    let autoTimer    = null;
    const AUTO_DELAY = 5000;

    /* ---- Core switch function ---- */
    function switchTo(index) {
      if (index === currentIndex) return;
      if (index < 0) index = navBtns.length - 1;
      if (index >= navBtns.length) index = 0;

      // De-activate current
      navBtns[currentIndex].classList.remove('is-active');
      navBtns[currentIndex].setAttribute('aria-selected', 'false');
      panels[currentIndex].classList.remove('is-active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('is-active');

      // Activate new
      currentIndex = index;
      navBtns[currentIndex].classList.add('is-active');
      navBtns[currentIndex].setAttribute('aria-selected', 'true');
      panels[currentIndex].classList.add('is-active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('is-active');

      // Scroll nav button into view on mobile
      navBtns[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }

    /* ---- Auto-advance ---- */
    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        switchTo(currentIndex + 1);
      }, AUTO_DELAY);
    }

    function stopAuto() {
      clearInterval(autoTimer);
    }

    /* ---- Bind nav buttons ---- */
    navBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        stopAuto();
        switchTo(i);
        startAuto();
      });
    });

    /* ---- Bind progress dots ---- */
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAuto();
        switchTo(i);
        startAuto();
      });
    });

    /* ---- Keyboard navigation (arrow keys) ---- */
    section.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        stopAuto();
        switchTo(currentIndex + 1);
        startAuto();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        stopAuto();
        switchTo(currentIndex - 1);
        startAuto();
      }
    });

    /* ---- Touch swipe on stage ---- */
    const stage = section.querySelector('.experiences__stage');
    if (stage) {
      let touchStartX = 0;
      let touchStartY = 0;

      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Only horizontal swipes (dx > dy in absolute terms)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          stopAuto();
          switchTo(dx < 0 ? currentIndex + 1 : currentIndex - 1);
          startAuto();
        }
      }, { passive: true });
    }

    /* ---- Pause on hover ---- */
    section.addEventListener('mouseenter', stopAuto);
    section.addEventListener('mouseleave', startAuto);

    /* ---- Intersection Observer: only auto-advance when visible ---- */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAuto();
          } else {
            stopAuto();
          }
        });
      }, { threshold: 0.3 });
      io.observe(section);
    } else {
      startAuto();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperiencesTabs);
  } else {
    initExperiencesTabs();
  }

})();
