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
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    sheet.classList.remove('active');
    backdrop.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
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

  /* ── Active link highlighting on scroll (Home Page Only) ── */
  const path = window.location.pathname;
  const isHomePage = path.indexOf('index.html') !== -1 || 
                     path.endsWith('/') || 
                     (!path.includes('adventures.html') && 
                      !path.includes('packages.html') && 
                      !path.includes('skiing.html') && 
                      !path.includes('treks.html'));

  if (isHomePage) {
    const sections = document.querySelectorAll('section[id]');
    const allLinks = document.querySelectorAll('.navbar__link, .nav-sheet__item');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });

      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Reset active state for hash links and Home link
        const isHashLink = href.includes('#');
        const isHomeLink = href === 'index.html' || href === '/' || href.endsWith('index.html');

        if (isHashLink || isHomeLink) {
          link.classList.remove('active');
        }

        if (current) {
          if (href === '#' + current || href === 'index.html#' + current) {
            link.classList.add('active');
          }
        } else {
          // If not scrolled to any section, highlight Home
          if (isHomeLink) {
            link.classList.add('active');
          }
        }
      });
    }, { passive: true });
  }

  /* ── Active Page Highlighting on Load / Manual Override ── */
  function initActiveState(overrideHash) {
    const currentPath = window.location.pathname;
    const hash = overrideHash !== undefined ? overrideHash : window.location.hash;
    const isAdventures = currentPath.includes('adventures.html');
    const isPackages = currentPath.includes('packages.html');
    const isSkiing = currentPath.includes('skiing.html');
    const isTreks = currentPath.includes('treks.html');
    const isHome = !isAdventures && !isPackages && !isSkiing && !isTreks;

    const allLinks = document.querySelectorAll('.navbar__link, .nav-sheet__item');
    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;

      if (isAdventures) {
        // If hash is activities or tab parameter is activities, highlight Activity
        const params = new URLSearchParams(window.location.search);
        const isAct = hash === '#activities' || params.get('tab') === 'activities';
        if (isAct) {
          if (href.includes('#activities')) {
            link.classList.add('active');
          }
        } else {
          // Highlight Adventures link (not Activity)
          if ((href.includes('adventures.html') || href === 'adventures.html') && !href.includes('#')) {
            link.classList.add('active');
          }
        }
      } else if (isPackages) {
        if (href.includes('packages.html')) {
          link.classList.add('active');
        }
      } else if (isSkiing || isTreks) {
        // Skiing/Treks are sub-adventures, highlight Adventures
        if ((href.includes('adventures.html') || href === 'adventures.html') && !href.includes('#')) {
          link.classList.add('active');
        }
      } else if (isHome) {
        // For Home page, highlight index.html or Home by default (scroll will update sections)
        if (href === 'index.html' || href === '/' || href.endsWith('index.html')) {
          link.classList.add('active');
        }
      }
    });
  }

  // Expose function for dynamic updates (e.g. from tab switcher)
  window.updateNavbarActiveState = initActiveState;

  // Run initial setup
  initActiveState();

})();
