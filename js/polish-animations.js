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

    // Stats Count Up Animation using Intersection Observer
    const statsSection = document.querySelector('.why-choose__stats');
    const statNums = document.querySelectorAll('.why-choose__stat-num');
    
    if (statsSection && statNums.length) {
      // Parse targets and set elements to 0 initially
      const parsedStats = Array.from(statNums).map(numEl => {
        let targetText = numEl.getAttribute('data-target-val');
        if (!targetText) {
          targetText = numEl.textContent.trim();
          numEl.setAttribute('data-target-val', targetText);
        }

        const matches = targetText.match(/^([0-9.]+)(.*)$/);
        if (!matches) return null;
        
        const targetVal = parseFloat(matches[1]);
        const suffix = matches[2] || '';
        
        // Immediately set state to 0 on page load
        numEl.textContent = "0" + suffix;
        
        return {
          el: numEl,
          targetVal,
          suffix
        };
      }).filter(Boolean);

      // Create an intersection observer targeting 40% (30-50% range) visibility threshold
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // Once the statistics container matches our visibility threshold
          if (entry.isIntersecting) {
            // Disconnect immediately to run the count-up only once
            observer.unobserve(entry.target);
            observer.disconnect();

            // Fire the smooth count-up animations using GSAP
            parsedStats.forEach(stat => {
              const countObj = { val: 0 };
              gsap.to(countObj, {
                val: stat.targetVal,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  if (stat.targetVal % 1 === 0) {
                    stat.el.textContent = Math.floor(countObj.val) + stat.suffix;
                  } else {
                    stat.el.textContent = countObj.val.toFixed(1) + stat.suffix;
                  }
                }
              });
            });
          }
        });
      }, {
        threshold: 0.4 // 40% visible trigger point
      });

      statsObserver.observe(statsSection);
    }

    // Interactive typography character reveals
    initTextReveal();

    // Tactile magnetic hover feedback for interactive components
    initMagneticButtons();

    // Ambient floating backdrop glow filters
    initAmbientOrbs();

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

  function initTextReveal() {
    const titles = document.querySelectorAll('.section-title.split-text');
    titles.forEach(title => {
      if (title.classList.contains('is-split')) return;
      
      const contents = title.childNodes;
      let newHtml = '';
      contents.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/\s+/).filter(Boolean);
          newHtml += words.map(w => `<span class="word-wrapper" style="display:inline-block; overflow:hidden;"><span class="word-inner" style="display:inline-block;">${w}</span></span> `).join('');
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('text-gradient')) {
            const innerWords = node.textContent.split(/\s+/).filter(Boolean);
            const wrappedInner = innerWords.map(w => `<span class="word-wrapper" style="display:inline-block; overflow:hidden;"><span class="word-inner" style="display:inline-block;">${w}</span></span> `).join('');
            newHtml += `<span class="text-gradient" style="display:inline-block;">${wrappedInner}</span>`;
          } else {
            newHtml += node.outerHTML;
          }
        }
      });
      
      title.innerHTML = newHtml;
      title.classList.add('is-split');
      
      const inners = title.querySelectorAll('.word-inner');
      gsap.fromTo(inners, {
        yPercent: 100,
        rotate: 3
      }, {
        yPercent: 0,
        rotate: 0,
        duration: 0.95,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  function initMagneticButtons() {
    const magnetics = document.querySelectorAll('.btn, .navbar__logo, .navbar__link, .navbar__toggle, .hero__control');
    magnetics.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    });
  }

  function initAmbientOrbs() {
    if (!document.querySelector('.why-choose') && !document.querySelector('.experiences')) return;
    if (document.querySelector('.ambient-orb')) return; // Prevent double injection
    
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    container.style.overflow = 'hidden';
    
    const orb1 = document.createElement('div');
    orb1.className = 'ambient-orb ambient-orb--1';
    
    const orb2 = document.createElement('div');
    orb2.className = 'ambient-orb ambient-orb--2';
    
    const orb3 = document.createElement('div');
    orb3.className = 'ambient-orb ambient-orb--3';
    
    container.appendChild(orb1);
    container.appendChild(orb2);
    container.appendChild(orb3);
    
    document.body.prepend(container);
    
    gsap.to('.ambient-orb--1', {
      x: 'random(-100, 100)',
      y: 'random(-100, 100)',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.ambient-orb--2', {
      x: 'random(-120, 120)',
      y: 'random(-120, 120)',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.ambient-orb--3', {
      x: 'random(-80, 80)',
      y: 'random(-80, 80)',
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
})();