/* ============================================
   MEGA-MENU.JS — Adventures Dropdown Logic
   ============================================ */

(function() {
  'use strict';

  const trigger   = document.getElementById('adventureTrigger');
  const megaMenu  = document.getElementById('megaMenu');
  const backdrop  = document.getElementById('megaBackdrop');
  const navbar    = document.getElementById('navbar');

  if (!trigger || !megaMenu) return;

  let isOpen = false;
  let closeTimer = null;

  // ── Open ──────────────────────────────────────
  function openMenu() {
    clearTimeout(closeTimer);
    isOpen = true;
    megaMenu.classList.add('is-open');
    backdrop && backdrop.classList.add('is-visible');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = '';
  }

  // ── Close ─────────────────────────────────────
  function closeMenu() {
    isOpen = false;
    megaMenu.classList.remove('is-open');
    backdrop && backdrop.classList.remove('is-visible');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function scheduleClose() {
    closeTimer = setTimeout(closeMenu, 120);
  }

  // ── Desktop: hover on trigger ──────────────────
  const adventureItem = document.getElementById('adventureItem');

  if (window.innerWidth > 1024) {
    // Trigger hover
    adventureItem.addEventListener('mouseenter', openMenu);
    adventureItem.addEventListener('mouseleave', scheduleClose);

    // Keep open when hovering over the menu itself
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', scheduleClose);
  }

  // ── Click toggle (desktop + mobile) ───────────
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // ── Backdrop click closes ──────────────────────
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // ── Escape key closes ─────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      trigger.focus();
    }
  });

  // ── Close on outside click ─────────────────────
  document.addEventListener('click', (e) => {
    if (isOpen && !adventureItem.contains(e.target) && !megaMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // ── Scroll closes menu ─────────────────────────
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    if (delta > 80 && isOpen) closeMenu();
    lastScrollY = window.scrollY;
  }, { passive: true });

  // ── Re-bind on resize (desktop ↔ mobile switch) ─
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      closeMenu();
    }, 200);
  });

})();
