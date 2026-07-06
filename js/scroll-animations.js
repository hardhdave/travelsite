/* ============================================
   SCROLL-ANIMATIONS.JS — Premium Scroll Effects
   Bellevalia Hydra Style Animations
   ============================================ */

(function() {
  // Wait for window load to ensure all layouts, fonts, and images are fully settled
  window.addEventListener('load', () => {
    setTimeout(initScrollAnimations, 100);
  });

  function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    // ---- 1. Dynamic Text Word Splitting & Reveal (Bellevalia Style) ----
    function splitTextNode(el) {
      const nodes = Array.from(el.childNodes);
      el.innerHTML = '';
      
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Split by spaces but preserve word spacing
          const words = node.textContent.split(/(\s+)/);
          words.forEach(w => {
            if (w.trim() === '') {
              el.appendChild(document.createTextNode(w));
            } else {
              const wrapper = document.createElement('span');
              wrapper.style.display = 'inline-block';
              wrapper.style.overflow = 'hidden';
              wrapper.style.verticalAlign = 'bottom';
              
              const word = document.createElement('span');
              word.className = 'anim-word';
              word.textContent = w;
              word.style.display = 'inline-block';
              word.style.transform = 'translateY(115%)';
              
              wrapper.appendChild(word);
              el.appendChild(wrapper);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Recursively split children for span/bold tags
          const cloned = node.cloneNode(false);
          while (node.firstChild) {
            cloned.appendChild(node.firstChild);
          }
          el.appendChild(cloned);
          splitTextNode(cloned);
        }
      });
    }

    // Split headers and trigger GSAP animations
    document.querySelectorAll('.split-text').forEach(title => {
      splitTextNode(title);
      const words = title.querySelectorAll('.anim-word');

      gsap.to(words, {
        y: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- 2. Mountain Background Scroll Parallax ----
    const parallaxWrapper = document.querySelector('.mountain-parallax-wrapper');
    if (parallaxWrapper) {
      gsap.fromTo(parallaxWrapper, {
        backgroundPositionY: '10%'
      }, {
        backgroundPositionY: '90%',
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxWrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // ---- 3. Custom Image Speed offsets (data-speed parallax) ----
    gsap.utils.toArray('[data-speed]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 1;
      const yOffset = (speed - 1) * 100; // Offset translation

      gsap.fromTo(el, {
        y: -yOffset
      }, {
        y: yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // ---- 4. Generic Reveal (fade up) ----
    gsap.utils.toArray('.reveal:not(.why-choose__card):not(.activities__item):not(.about__timeline-item):not(.gallery__item):not(.footer__column):not(.footer__brand)').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- Reveal Left ----
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- Reveal Right ----
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- Reveal Scale ----
    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- Section Subtitle animation ----
    gsap.utils.toArray('.section-subtitle').forEach(sub => {
      gsap.from(sub, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sub,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- Activities Items Stagger ----
    document.querySelectorAll('.activities__season').forEach(season => {
      const items = season.querySelectorAll('.activities__item');
      const startX = season.classList.contains('activities__season--winter') ? -25 : 25;
      gsap.fromTo(items, {
        opacity: 0,
        x: startX
      }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: season,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ---- About Timeline ----
    const timelineItems = document.querySelectorAll('.about__timeline-item');
    if (timelineItems.length) {
      gsap.fromTo(timelineItems, {
        opacity: 0,
        x: -25
      }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__timeline',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // ---- CTA Title ----
    const ctaTitle = document.querySelector('.cta__title');
    if (ctaTitle) {
      gsap.from(ctaTitle, {
        opacity: 0,
        y: 35,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }

    // ---- Gallery Items Stagger ----
    const galleryItems = document.querySelectorAll('.gallery__item');
    if (galleryItems.length) {
      gsap.fromTo(galleryItems, {
        opacity: 0,
        y: 25
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery__masonry',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // ---- Footer columns entrance ----
    const footerColumns = document.querySelectorAll('.footer__column, .footer__brand');
    if (footerColumns.length) {
      gsap.fromTo(footerColumns, {
        opacity: 0,
        y: 25
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Initialize Experiences horizontal scroll (if it exists)
    if (typeof window.initHorizontalScroll === 'function') {
      window.initHorizontalScroll();
    }

    // Force refresh scroll triggers
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
  }
})();
