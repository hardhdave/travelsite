/* ============================================
   HERO.JS — Snow Particles & Hero Slideshow
   ============================================ */

(function() {
  // ---- 1. Snow Particle System ----
  const canvas = document.getElementById('snowCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SnowParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.radius = Math.random() * 3 + 0.5;
        this.speedY = Math.random() * 1.5 + 0.3;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;

        if (this.y > canvas.height + 10) {
          this.reset();
          this.y = -10;
        }

        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.85})`;
        ctx.fill();
      }
    }

    const PARTICLE_COUNT = 100;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new SnowParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function animateSnow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animateSnow);
    }

    animateSnow();
  }

  // ---- 2. Hero Slideshow Controller (Island* & Voyago Style) ----
  const slides = document.querySelectorAll('.hero__slide');
  const prevBtn = document.querySelector('.hero__control--prev');
  const nextBtn = document.querySelector('.hero__control--next');
  let currentSlide = 0;
  let slideInterval;
  const AUTOPLAY_SPEED = 6000; // 6 seconds

  if (slides.length > 0) {
    // Initialize first slide animations
    animateSlideIn(slides[0]);

    function goToSlide(n, direction = 'next') {
      if (n === currentSlide) return;

      const prevSlideEl = slides[currentSlide];
      const nextSlideEl = slides[n];

      // Reset states
      prevSlideEl.classList.remove('active');
      nextSlideEl.classList.add('active');

      // Animate backgrounds (media zoom and crossfade)
      const prevMedia = prevSlideEl.querySelector('.hero__video, .hero__image');
      const nextMedia = nextSlideEl.querySelector('.hero__video, .hero__image');

      if (window.gsap) {
        // Reset scale on next slide media
        gsap.set(nextMedia, { scale: 1.15 });
        gsap.to(nextMedia, { scale: 1.02, duration: 2, ease: 'power2.out' });
      }

      // Animate text elements on enter
      animateSlideIn(nextSlideEl);

      currentSlide = n;
    }

    function animateSlideIn(slideEl) {
      if (!window.gsap) return;

      const label = slideEl.querySelector('.hero__label');
      const title = slideEl.querySelector('.hero__title');
      const subtitle = slideEl.querySelector('.hero__subtitle');
      const buttons = slideEl.querySelector('.hero__buttons');

      // Setup initial positions for entry reveal
      gsap.killTweensOf([label, title, subtitle, buttons]);
      gsap.set([label, title, subtitle, buttons], { opacity: 0, y: 30 });

      // Create slide reveal timeline
      const tl = gsap.timeline();
      tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.2)
        .to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4)
        .to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.6)
        .to(buttons, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.8);
    }

    function nextSlide() {
      const nextIdx = (currentSlide + 1) % slides.length;
      goToSlide(nextIdx, 'next');
    }

    function prevSlide() {
      const prevIdx = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevIdx, 'prev');
    }

    // Event Listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Scroll Down Event
    const scrollDown = document.querySelector('.hero__scroll-down');
    if (scrollDown) {
      scrollDown.addEventListener('click', () => {
        const expSection = document.getElementById('experiences');
        if (expSection) {
          // scrollIntoView with smooth behaviour isn't reliable on iOS < 15.4
          // Use a cross-browser safe approach: window.scrollTo with offsetTop
          if ('scrollBehavior' in document.documentElement.style) {
            // Modern browsers (Chrome, Firefox, Safari 15.4+)
            expSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Fallback for older iOS Safari — instant scroll to element
            var targetY = expSection.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      });
      scrollDown.style.cursor = 'pointer';
    }

    // Autoplay Timer
    function startAutoplay() {
      slideInterval = setInterval(nextSlide, AUTOPLAY_SPEED);
    }

    function resetAutoplay() {
      clearInterval(slideInterval);
      startAutoplay();
    }

    // Start on load
    startAutoplay();
  }

  // ---- 3. Smooth Hero Media Parallax Scroll ----
  if (window.gsap && window.ScrollTrigger) {
    gsap.to('.hero__slider', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
})();
