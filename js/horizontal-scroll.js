/* ============================================
   HORIZONTAL-SCROLL.JS — Apple-style Scroll
   ============================================ */

(function() {
  // Expose function globally so it can be initialized sequentially
  window.initHorizontalScroll = initHorizontalScroll;

  function initHorizontalScroll() {
    if (!window.gsap || !window.ScrollTrigger) return;
    const section = document.querySelector('.experiences');
    if (!section) return;

    const track = document.getElementById('experiencesTrack');
    const wrapper = section.querySelector('.experiences__scroll-wrapper');
    const progressBar = document.getElementById('experiencesProgress');
    if (!track || !wrapper) return;

    const cards = track.querySelectorAll('.experiences__card');
    if (!cards.length) return;

    // Full distance the track must travel so the LAST card is fully on screen
    function getTravelDistance() {
      return Math.max(0, track.scrollWidth - wrapper.clientWidth);
    }

    // Vertical scroll length — 2.5× the travel distance for a comfortable pace
    function getScrollLength() {
      return Math.max(getTravelDistance() * 1.05 + window.innerHeight * 0.2, window.innerHeight * 0.9);
    }

    gsap.to(track, {
      x: () => -getTravelDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + getScrollLength(),
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Progress bar
          if (progressBar) {
            progressBar.style.width = (self.progress * 100) + '%';
          }

          // Card scale / opacity based on distance from viewport center
          const centerX = window.innerWidth / 2;
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(centerX - cardCenter);
            const maxDist = window.innerWidth * 0.6;
            const t = Math.min(dist / maxDist, 1);          // 0 = center, 1 = far
            const scale  = 1 - t * 0.1;                     // 1 → 0.9
            const opacity = 1 - t * 0.35;                   // 1 → 0.65

            gsap.set(card, { scale, opacity });

            if (dist < 250) {
              card.classList.add('is-active');
            } else {
              card.classList.remove('is-active');
            }
          });
        }
      }
    });

    // Refresh once more after images settle
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }
})();
