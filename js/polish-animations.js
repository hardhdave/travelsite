/* ============================================
   POLISH-ANIMATIONS.JS - Premium scroll motion
   ============================================ */

(function() {
  window.addEventListener('load', () => {
    setTimeout(initPolishAnimations, 250);
  });

  function initPolishAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lowerSections = gsap.utils.toArray([
      '.skiing',
      '.trekking',
      '.activities',
      '.sightseeing',
      '.rentals',
      '.transport',
      '.packages',
      '.testimonials',
      '.gallery',
      '.about',
      '.cta'
    ].join(','));

    lowerSections.forEach((section) => {
      gsap.fromTo(section, {
        y: 44,
        scale: 0.992,
        filter: 'brightness(0.97)'
      }, {
        y: 0,
        scale: 1,
        filter: 'brightness(1)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 96%',
          end: 'top 62%',
          scrub: 0.65
        }
      });

      const headerBits = section.querySelectorAll('.section-label, .section-title, .section-subtitle');
      if (headerBits.length) {
        gsap.fromTo(headerBits, {
          opacity: 0,
          y: 22
        }, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });

    const imageReveals = [
      '.skiing__hero-image',
      '.trekking__card',
      '.sightseeing__map-container',
      '.gallery__item',
      '.about__portrait'
    ].join(',');

    gsap.utils.toArray(imageReveals).forEach((item) => {
      gsap.fromTo(item, {
        clipPath: 'inset(10% 0% 10% 0% round 24px)',
        opacity: 0.76,
        y: 28
      }, {
        clipPath: 'inset(0% 0% 0% 0% round 24px)',
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 86%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.skiing__hero-image img, .trekking__card-image, .gallery__item img, .transport__bg img, .skiing__bg img').forEach((image) => {
      gsap.to(image, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('section') || image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });

    const staggerGroups = [
      ['.why-choose__bento', '.wc-card', 20],
      ['.skiing__category', '.skiing__package-card', 18],
      ['.activities__split', '.activities__item', 18],
      ['.rentals__grid', '.rentals__card', 24],
      ['.transport__grid', '.transport__card', 24],
      ['.packages__grid', '.packages__card', 26],
      ['.packages__bottom-row', '.packages__bottom-card', 22],
      ['.testimonials__slider', '.testimonials__card', 18],
      ['.gallery__masonry', '.gallery__item', 20],
      ['.about__timeline', '.about__timeline-item', 18]
    ];

    staggerGroups.forEach(([trigger, selector, y]) => {
      const group = document.querySelector(trigger);
      const items = document.querySelectorAll(selector);
      if (!group || !items.length) return;

      gsap.fromTo(items, {
        opacity: 0,
        y,
        scale: 0.985
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 84%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.section-title').forEach((title) => {
      gsap.fromTo(title, {
        backgroundPosition: '0% 50%'
      }, {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      initTiltCards();
    }

    ScrollTrigger.refresh();
  }

  function initTiltCards() {
    const cards = document.querySelectorAll([
      '.why-choose__card',
      '.experiences__card',
      '.skiing__package-card',
      '.trekking__card',
      '.rentals__card',
      '.transport__card',
      '.packages__card',
      '.packages__bottom-card',
      '.gallery__item'
    ].join(','));

    cards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateX: y * -3,
          rotateY: x * 4,
          y: -3,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 900
        });
      });

      card.addEventListener('pointerleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.55,
          ease: 'elastic.out(1, 0.55)'
        });
      });
    });
  }
})();