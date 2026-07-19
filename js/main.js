/* ============================================
   MAIN.JS - App Init, Lenis + GSAP Setup
   ============================================ */

const hasGsapScroll = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

if (hasGsapScroll) {
  gsap.registerPlugin(ScrollTrigger);
}

// ---- Lenis Smooth Scroll ----
let lenis;
if (typeof window.Lenis !== 'undefined') {
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
} else {
  console.warn('Lenis smooth scroll library is not defined. Falling back to native scrolling.');
}

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