/* ============================================
   MAP.JS — Interactive Kashmir Map
   ============================================ */

(function() {
  const places = {
    gulmarg: {
      title: 'Gulmarg',
      desc: 'The "Meadow of Flowers" — home to Asia\'s highest gondola and world-class skiing terrain at 2,650m altitude. A winter paradise for skiers and a summer haven for nature lovers.',
      image: 'assets/images/gallery-gulmarg.png'
    },
    srinagar: {
      title: 'Srinagar',
      desc: 'The summer capital of Kashmir, famous for its houseboats on Dal Lake, Mughal Gardens, and vibrant floating markets. A city where timeless beauty meets warm hospitality.',
      image: 'assets/images/sightseeing-dal-lake.png'
    },
    pahalgam: {
      title: 'Pahalgam',
      desc: 'The "Valley of Shepherds" — a pristine riverside town surrounded by pine forests and snow-capped peaks. Gateway to the famous Amarnath Yatra and stunning Betaab Valley.',
      image: 'assets/images/gallery-pahalgam.png'
    },
    sonamarg: {
      title: 'Sonamarg',
      desc: 'The "Meadow of Gold" — a breathtaking valley at 2,740m known for its glaciers, alpine lakes, and the stunning Thajiwas Glacier. Gateway to Ladakh via the Zoji La pass.',
      image: 'assets/images/gallery-sonamarg.png'
    }
  };

  const infoCard = document.getElementById('infoCard');
  const infoImage = document.getElementById('infoImage');
  const infoTitle = document.getElementById('infoTitle');
  const infoDesc = document.getElementById('infoDesc');
  const infoClose = document.getElementById('infoClose');

  if (!infoCard) return;

  // Pin click handlers
  document.querySelectorAll('.sightseeing__pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const placeKey = pin.dataset.place;
      const place = places[placeKey];

      if (place) {
        infoImage.src = place.image;
        infoImage.alt = place.title;
        infoTitle.textContent = place.title;
        infoDesc.textContent = place.desc;

        // Animate in
        infoCard.classList.add('active');
      }
    });
  });

  // Close handler
  if (infoClose) {
    infoClose.addEventListener('click', () => {
      infoCard.classList.remove('active');
    });
  }

  // Close on outside click
  document.getElementById('kashmirMap')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('sightseeing__map-bg')) {
      infoCard.classList.remove('active');
    }
  });
})();
