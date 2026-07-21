/* ============================================
   NAVBAR.JS — Bottom-sheet menu & scroll binds
   ============================================ */

(function() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const sheet     = document.getElementById('navSheet');
  const backdrop  = document.getElementById('navSheetBackdrop');

  // ── iOS-safe scroll freeze helpers ──
  // iOS Safari ignores overflow:hidden on body — use position:fixed technique
  var _scrollY = 0;

  function lockScroll() {
    if (window._isIOS) {
      _scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.top = '-' + _scrollY + 'px';
      document.body.classList.add('ios-scroll-locked');
      document.documentElement.classList.add('ios-scroll-locked');
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  function unlockScroll() {
    if (window._isIOS) {
      document.body.classList.remove('ios-scroll-locked');
      document.documentElement.classList.remove('ios-scroll-locked');
      document.body.style.top = '';
      // Restore scroll position without animation
      window.scrollTo(0, _scrollY);
    } else {
      document.body.style.overflow = '';
    }
  }

  /* ── Open / close sheet ── */
  function openSheet() {
    sheet.classList.add('active');
    backdrop.classList.add('active');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    lockScroll();
  }

  function closeSheet() {
    sheet.classList.remove('active');
    backdrop.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    unlockScroll();
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

    // Mobile Activities Dropdown Accordion Toggle
    const mobileToggle = document.getElementById('mobileActivitiesToggle');
    const mobileSubmenu = document.getElementById('mobileActivitiesSubmenu');
    if (mobileToggle && mobileSubmenu) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = mobileSubmenu.classList.contains('is-open');
        mobileSubmenu.classList.toggle('is-open', !isOpen);
        mobileToggle.classList.toggle('active', !isOpen);
        mobileToggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    }
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
                      !path.includes('treks.html') &&
                      !path.includes('activities.html'));

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
    const isActivities = currentPath.includes('activities.html');
    const isHome = !isAdventures && !isPackages && !isSkiing && !isTreks && !isActivities;

    const allLinks = document.querySelectorAll('.navbar__link, .nav-sheet__item, .nav-sheet__item--dropdown-toggle');
    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (!href) {
        // If we are on activities page, keep the toggle highlight active
        if (isActivities && link.id === 'mobileActivitiesToggle') {
          link.classList.add('active');
        }
        return;
      }

      if (isAdventures) {
        // Highlight Adventures link
        if ((href.includes('adventures.html') || href === 'adventures.html') && !href.includes('#')) {
          link.classList.add('active');
        }
      } else if (isActivities) {
        if (href.includes('activities.html')) {
          link.classList.add('active');
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
