/**
 * Floating WhatsApp Chat Popup Controller
 * - Shows automatically 2.5s after page load.
 * - Shows on every window reload.
 * - Re-appears every 5 minutes after being closed/canceled.
 */
document.addEventListener('DOMContentLoaded', () => {
  const chatPopup = document.getElementById('chat-whatsapp-popup');
  if (!chatPopup) return;

  let reappearanceTimer = null;

  function showPopup() {
    chatPopup.classList.add('chat-popup--visible');
  }

  function hidePopup() {
    chatPopup.classList.remove('chat-popup--visible');
    
    // Clear any active timer to prevent duplicate schedules
    if (reappearanceTimer) {
      clearTimeout(reappearanceTimer);
    }
    
    // Set a timer to show the popup again after 5 minutes (300,000 milliseconds)
    reappearanceTimer = setTimeout(() => {
      showPopup();
    }, 5 * 60 * 1000);
  }

  // Initial show after 5 seconds on page load
  setTimeout(showPopup, 5000);

  // Handle closing the popup (cancel action)
  const closeButton = chatPopup.querySelector('.chat-popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', hidePopup);
  }

  // Handle CTA button click (also hide and schedule next popup after 5 minutes)
  const ctaButton = chatPopup.querySelector('.chat-popup__btn');
  if (ctaButton) {
    ctaButton.addEventListener('click', hidePopup);
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatPopup.classList.contains('chat-popup--visible')) {
      hidePopup();
    }
  });
});
