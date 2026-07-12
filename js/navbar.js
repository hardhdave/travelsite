/* ============================================
   NAVBAR.JS — Bottom-sheet menu & scroll binds
   ============================================ */

(function() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const sheet     = document.getElementById('navSheet');
  const backdrop  = document.getElementById('navSheetBackdrop');

  /* ── Open / close sheet ── */
  function openSheet() {
    sheet.classList.add('active');
    backdrop.classList.add('active');
    navToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    sheet.classList.remove('active');
    backdrop.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle && sheet) {
    navToggle.addEventListener('click', () => {
      sheet.classList.contains('active') ? closeSheet() : openSheet();
    });

    // Close on backdrop click
    backdrop && backdrop.addEventListener('click', closeSheet);

    // Close on any sheet link click
    sheet.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeSheet);
    });
  }

  /* ── Scroll: add .scrolled class to navbar ── */
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Active link highlighting on scroll ── */
  const sections    = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current || href === 'index.html#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

})();
