/* ============================================
   MAIN.JS - App Init, Lenis + GSAP Setup
   ============================================ */

const hasGsapScroll = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

if (hasGsapScroll) {
  gsap.registerPlugin(ScrollTrigger);
}

// ---- iOS Detection ----
// Lenis smooth scroll conflicts with iOS Safari's native momentum scrolling
// and rubber-band behaviour. On touch-only devices it provides no benefit.
var _isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// ---- Lenis Smooth Scroll ----
let lenis;
if (typeof window.Lenis !== 'undefined' && !_isIOS) {
  lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  if (hasGsapScroll) {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
} else if (_isIOS) {
  // On iOS: use native scroll. GSAP ScrollTrigger works fine with native scroll.
  if (hasGsapScroll) {
    // Sync ScrollTrigger with native scroll
    window.addEventListener('scroll', ScrollTrigger.update, { passive: true });
  }
} else {
  console.warn('Lenis smooth scroll library is not defined. Falling back to native scrolling.');
}

// Expose iOS flag globally for other scripts to use
window._isIOS = _isIOS;

// ---- Preloader / DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (hasGsapScroll) ScrollTrigger.refresh();
  }, 500);
});

window.addEventListener('load', () => {
  if (hasGsapScroll) ScrollTrigger.refresh();
});

// Enable immediate CSS :active tap feedback on WebKit / iOS touch screens
document.addEventListener('touchstart', () => {}, { passive: true });
