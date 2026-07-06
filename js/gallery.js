/* ============================================
   GALLERY.JS — Lightbox
   ============================================ */

(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage) return;

  // Click gallery items to open lightbox
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ---- Duplicate Testimonial Track for Infinite Scroll ----
  const testimonialTrack = document.getElementById('testimonialTrack');
  if (testimonialTrack) {
    const cards = testimonialTrack.innerHTML;
    testimonialTrack.innerHTML = cards + cards; // Double for seamless loop
  }
})();
