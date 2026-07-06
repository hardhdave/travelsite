// ====================================================
// SHRED HIMALAYAS — SITE DATA MANAGER
// Manages all dynamic content via localStorage.
// Public pages read from this; admin panel writes to it.
// ====================================================

const SHData = (function () {
  const KEY = 'sh_site_data_v2';

  // ─── DEFAULT DATA ────────────────────────────────────
  const defaults = {
    settings: {
      whatsappNumber: '919999999999',
      heroTitle: 'Experience Kashmir Beyond The Ordinary',
      heroSubtitle: 'Luxury Adventures, Ski Experiences, Treks and Bespoke Himalayan Journeys Crafted By Local Experts.',
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-peak-under-blue-sky-41584-large.mp4',
      footerCopyright: '© 2024 Shred Himalayas. All rights reserved. Crafted with love in Kashmir.'
    },

    skiing: [
      {
        id: 'cat-learn-ski', title: 'Learn to Ski',
        items: [
          { id: 's1', title: 'Basic Skiing Package', description: 'Perfect for first-timers. Learn the fundamentals of skiing with our certified instructors on gentle slopes. Includes all equipment and personalized coaching.', badge: 'Beginner', meta1: '3 Days', meta2: 'Private Instructor', meta3: 'All Equipment', includes: 'Equipment Rental,Instructor,Gondola Pass,Safety Gear', image: 'assets/images/skiing-action.png', waMsg: "I'm interested in the Basic Skiing Package" },
          { id: 's2', title: 'Intermediate Skiing Package', description: 'Take your skiing to the next level. Master parallel turns, tackle blue runs, and build confidence on varied terrain with expert guidance.', badge: 'Intermediate', meta1: '4 Days', meta2: 'Private Instructor', meta3: 'Blue & Red Runs', includes: 'Equipment Rental,Instructor,Gondola Pass,Video Analysis', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Intermediate Skiing Package" },
          { id: 's3', title: 'Advanced Skiing Package', description: "For experienced skiers looking to conquer Gulmarg's legendary terrain. Off-piste runs, steep chutes, and deep powder coaching with expert local guides.", badge: 'Advanced', meta1: '5 Days', meta2: 'Expert Guide', meta3: 'Off-Piste Access', includes: 'Premium Equipment,Expert Guide,Avalanche Kit,Gondola Pass', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Advanced Skiing Package" }
        ]
      },
      {
        id: 'cat-ski-holidays', title: 'Ski Holidays',
        items: [
          { id: 's4', title: 'Essential Gulmarg Ski Holiday', description: "A complete ski holiday experience with comfortable accommodation, daily skiing, equipment, and airport transfers. Everything you need for an unforgettable Gulmarg trip.", badge: '5 Nights', meta1: '5N / 6D', meta2: '3-Star Hotel', meta3: 'Transfers Included', includes: 'Accommodation,Meals,Equipment,Instructor,Transfers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Essential Gulmarg Ski Holiday" },
          { id: 's5', title: 'Premium Gulmarg Ski Holiday', description: "Elevated ski holiday with premium accommodation, daily instructor-led sessions, après-ski experiences, and a day trip to Srinagar's iconic Dal Lake.", badge: '7 Nights', meta1: '7N / 8D', meta2: '4-Star Hotel', meta3: 'All Meals', includes: 'Premium Stay,All Meals,Equipment,Instructor,Srinagar Day Trip', image: 'assets/images/kashmir-package.png', waMsg: "I'm interested in the Premium Gulmarg Ski Holiday" },
          { id: 's6', title: 'Luxury Gulmarg Skiing Retreat', description: "The ultimate Gulmarg experience. Stay at Kashmir's finest resort, enjoy private ski coaching, gourmet dining, spa treatments, and curated cultural experiences.", badge: 'Luxury', meta1: '7N / 8D', meta2: '5-Star Resort', meta3: 'VIP Experience', includes: '5-Star Resort,Gourmet Meals,Private Coach,Spa Access,Luxury SUV', image: 'assets/images/gallery-luxury-stay.png', waMsg: "I'm interested in the Luxury Gulmarg Skiing Retreat" }
        ]
      },
      {
        id: 'cat-elite-ski', title: 'Elite Experiences',
        items: [
          { id: 's7', title: 'Gulmarg Backcountry Ski Adventure', description: "Venture beyond the groomed runs into Gulmarg's legendary backcountry. Guided by local experts through untouched powder bowls, pristine tree runs, and open faces with 360° Himalayan panoramas.", badge: 'Elite', meta1: '5 Days', meta2: 'Backcountry Access', meta3: 'Advanced Level', includes: 'Expert Guide,Avalanche Safety Kit,Premium Equipment,Accommodation', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Backcountry Ski Adventure" },
          { id: 's8', title: 'Gulmarg Heliskiing Experience', description: "The pinnacle of skiing. Fly by helicopter to untouched Himalayan peaks and ski pristine powder runs that no gondola can reach. Limited availability — the most exclusive skiing experience in Asia.", badge: 'Exclusive', meta1: '3–5 Days', meta2: 'Helicopter Access', meta3: 'Expert Level', includes: 'Helicopter Drops,Certified Guide,Premium Equipment,Luxury Stay,Full Safety Team', image: 'assets/images/gallery-helicopter.png', waMsg: "I'm interested in the Heliskiing Experience" }
        ]
      }
    ],

    snowboarding: [
      {
        id: 'cat-learn-sb', title: 'Learn to Snowboard',
        items: [
          { id: 'sb1', title: 'Beginner Snowboard Package', description: "Start your snowboarding journey on Gulmarg's gentle slopes. Learn balance, edge control, and basic turns with patient, certified instructors.", badge: 'Beginner', meta1: '3 Days', meta2: 'Private Coach', meta3: 'All Equipment', includes: 'Board & Boots,Instructor,Gondola Pass,Helmet', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Beginner Snowboard Package" },
          { id: 'sb2', title: 'Intermediate Snowboard Package', description: 'Progress to carving, switch riding, and tackling varied terrain. Gain confidence on blue and red runs with expert technique coaching.', badge: 'Intermediate', meta1: '4 Days', meta2: 'Expert Coach', meta3: 'Blue & Red Runs', includes: 'Board & Boots,Coach,Gondola Pass,Video Analysis', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Intermediate Snowboard Package" },
          { id: 'sb3', title: 'Advanced Snowboard Package', description: "Push your limits on Gulmarg's steepest terrain. Master powder riding, cliff drops, and tree runs with world-class local guides.", badge: 'Advanced', meta1: '5 Days', meta2: 'Expert Guide', meta3: 'Off-Piste', includes: 'Premium Board,Expert Guide,Avalanche Kit,Gondola Pass', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Advanced Snowboard Package" }
        ]
      },
      {
        id: 'cat-sb-holidays', title: 'Snowboard Holidays',
        items: [
          { id: 'sb4', title: 'Essential Gulmarg Snowboard Holiday', description: "Complete snowboard holiday with accommodation, daily sessions, full equipment, and transfers. The perfect hassle-free Gulmarg snowboarding trip.", badge: '5 Nights', meta1: '5N / 6D', meta2: '3-Star Hotel', meta3: 'Transfers', includes: 'Accommodation,Meals,Equipment,Coach,Transfers', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Essential Snowboard Holiday" },
          { id: 'sb5', title: 'Premium Gulmarg Snowboard Holiday', description: "The ultimate snowboard holiday with premium stays, all meals, daily coaching, cultural excursions, and après-snowboarding experiences.", badge: '7 Nights', meta1: '7N / 8D', meta2: '4-Star Hotel', meta3: 'All Meals', includes: 'Premium Stay,All Meals,Equipment,Coach,Srinagar Trip', image: 'assets/images/gallery-luxury-stay.png', waMsg: "I'm interested in the Premium Snowboard Holiday" }
        ]
      },
      {
        id: 'cat-elite-sb', title: 'Elite Snowboard Experiences',
        items: [
          { id: 'sb6', title: 'Backcountry Snowboard Adventure', description: "Leave the groomed runs behind and explore Gulmarg's endless backcountry powder. Guided splitboard tours through pristine terrain with avalanche-certified guides.", badge: 'Elite', meta1: '5 Days', meta2: 'Backcountry', meta3: 'Advanced', includes: 'Expert Guide,Splitboard,Avalanche Kit,Accommodation', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Backcountry Snowboard Adventure" },
          { id: 'sb7', title: 'Heli-Snowboarding Experience', description: "The ultimate ride. Helicopter access to virgin peaks, bottomless powder, and runs that defy imagination. The most exclusive snowboarding experience in the Himalayas.", badge: 'Exclusive', meta1: '3–5 Days', meta2: 'Helicopter', meta3: 'Expert', includes: 'Heli Drops,Certified Guide,Premium Gear,Luxury Stay,Safety Team', image: 'assets/images/gallery-helicopter.png', waMsg: "I'm interested in the Heli-Snowboarding Experience" }
        ]
      }
    ],

    trekking: [
      { id: 't1', title: 'Kashmir Great Lakes Trek', description: "One of India's most beautiful treks. Walk through seven stunning alpine lakes set amidst flower-carpeted meadows and snow-capped peaks. A life-changing Himalayan journey.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '7 Days / 6 Nights', altitude: '3,800m Max Altitude', distance: '72 km Distance', season: 'Jun – Sep', highlights: '7 pristine alpine lakes,Flower-carpeted meadows at Nichnai Pass,Stunning views of Kolahoi Glacier,Camping beside crystal-clear Vishansar Lake', image: 'assets/images/trekking-landscape.png', waMsg: "I'm interested in the Kashmir Great Lakes Trek" },
      { id: 't2', title: 'Tarsar Marsar Trek', description: "A twin-lake odyssey through the Aru Valley. Two dramatically different alpine lakes — the green Tarsar and the blue Marsar — connected by a stunning high-altitude ridge walk.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '6 Days / 5 Nights', altitude: '3,600m Max Altitude', distance: '48 km Distance', season: 'Jun – Sep', highlights: 'Twin alpine lakes with contrasting colors,Lush Aru Valley base camp,Dramatic Sundersar Pass crossing,Wildflower meadows and shepherd camps', image: 'assets/images/gallery-sonamarg.png', waMsg: "I'm interested in the Tarsar Marsar Trek" },
      { id: 't3', title: 'Gangbal Lake Trek', description: "The sacred Harmukh-Gangbal circuit. Camp beside the twin Gangbal lakes at the foot of Mount Harmukh (4,724m) — one of Kashmir's most revered peaks. A trek of spiritual and natural beauty.", difficulty: 'Challenging', difficultyClass: 'challenging', days: '5 Days / 4 Nights', altitude: '3,570m Max Altitude', distance: '38 km Distance', season: 'Jun – Oct', highlights: 'Sacred Harmukh peak views,Twin glacial Gangbal lakes,Nundkol Lake camping,Rich Kashmiri cultural immersion', image: 'assets/images/gallery-pahalgam.png', waMsg: "I'm interested in the Gangbal Lake Trek" },
      { id: 't4', title: 'Gurez Valley Trek', description: "One of India's most remote and untouched valleys. Trek through the Habba Khatoon range alongside the Kishanganga River to discover villages frozen in time and landscapes of raw beauty.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '4 Days / 3 Nights', altitude: '3,200m Max Altitude', distance: '32 km Distance', season: 'Jun – Sep', highlights: 'Untouched Habba Khatoon peaks,Ancient Dard Shin villages,Kishanganga River valley,One of India\'s last frontiers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Gurez Valley Trek" },
      { id: 't5', title: 'Pir Panjal Trek', description: "A high-altitude expedition crossing the mighty Pir Panjal range. Traverse glaciers, high passes above 4,000m, and experience the raw grandeur of the western Himalayas. For seasoned trekkers only.", difficulty: 'Challenging', difficultyClass: 'challenging', days: '8 Days / 7 Nights', altitude: '4,100m Max Altitude', distance: '65 km Distance', season: 'Jul – Sep', highlights: 'Cross the mighty Pir Panjal range,Glacier traversing experience,360° panoramic Himalayan views,Remote wilderness camping', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Pir Panjal Trek" }
    ],

    packages: [
      { id: 'p1', title: 'Luxury Kashmir Tour Package', description: "Our signature 7-night luxury experience. Stay at Kashmir's finest hotels and houseboats, explore with private guides, enjoy gourmet Kashmiri cuisine, and experience exclusive cultural encounters. The ultimate way to discover Kashmir.", badge: 'Bestseller', duration: '7N / 8D', accommodation: '5-Star Hotels', transport: 'Luxury SUV', meals: 'All Meals', destinations: 'Srinagar,Gulmarg,Pahalgam,Sonamarg,Dal Lake', includes: '5-Star Accommodation,All Meals,Private Guide,Luxury SUV,Houseboat Night,Shikara Ride,Gondola Tickets,Airport Transfers', image: 'assets/images/kashmir-package.png', waMsg: "I'm interested in the Luxury Kashmir Tour Package" },
      { id: 'p2', title: 'Premium Kashmir Tour', description: "A 5-night carefully curated journey through Kashmir's most iconic destinations. Premium accommodation, experienced guides, and a balanced mix of adventure and relaxation. Perfect for first-time visitors who want the best of Kashmir.", badge: 'Popular', duration: '5N / 6D', accommodation: '4-Star Hotels', transport: 'Private Cab', meals: 'Breakfast + Dinner', destinations: 'Srinagar,Gulmarg,Pahalgam,Dal Lake', includes: '4-Star Accommodation,Breakfast & Dinner,Private Guide,Private Cab,Shikara Ride,Gondola Tickets,Airport Transfers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Premium Kashmir Tour" },
      { id: 'p3', title: 'Kashmir Offbeat Tour', description: "Explore Kashmir's hidden gems far from the tourist trail. Discover untouched villages, secret valleys, pristine meadows, and authentic Kashmiri culture that most visitors never see. For the true explorer who seeks the extraordinary.", badge: 'Unique', duration: '6N / 7D', accommodation: 'Boutique Stays', transport: '4x4 Vehicle', meals: 'All Meals', destinations: 'Doodhpathri,Yusmarg,Lolab Valley,Bangus Valley,Gurez Valley', includes: 'Boutique Accommodation,All Meals,Local Expert Guide,4x4 Vehicle,Cultural Experiences,Homestay Night', image: 'assets/images/gallery-sonamarg.png', waMsg: "I'm interested in the Kashmir Offbeat Tour" },
      { id: 'p4', title: 'Gurez Valley Tour Package', description: "Journey to one of India's most remote and beautiful valleys. Cross the Razdan Pass at 3,500m, explore ancient Dard Shin villages, and discover landscapes that feel like another world. A true frontier adventure.", badge: 'Adventure', duration: '4N / 5D', accommodation: 'Guesthouses', transport: '4x4 Vehicle', meals: 'All Meals', destinations: 'Srinagar,Razdan Pass,Dawar,Habba Khatoon Peak,Tulail Valley', includes: 'Accommodation,All Meals,Local Guide,4x4 Vehicle,Permits,Airport Transfers', image: 'assets/images/gallery-pahalgam.png', waMsg: "I'm interested in the Gurez Valley Tour" },
      { id: 'p5', title: 'Kashmir Day Tours', description: "Perfect single-day excursions for those short on time or wanting to add a day adventure to their itinerary. Choose from Gulmarg, Pahalgam, Sonamarg, or Srinagar city — each a curated full-day experience.", badge: 'Day Trip', duration: '1 Day', accommodation: '', transport: 'Private Cab', meals: 'Lunch Included', destinations: 'Gulmarg Day Trip,Pahalgam Day Trip,Sonamarg Day Trip,Srinagar City Tour', includes: 'Private Cab,Local Guide,Lunch,Entry Tickets,Hotel Pickup', image: 'assets/images/sightseeing-dal-lake.png', waMsg: "I'm interested in Kashmir Day Tours" }
    ],

    activities: {
      winter: [
        { id: 'aw1', name: 'Skiing & Snowboarding', desc: 'World-class powder runs in Gulmarg' },
        { id: 'aw2', name: 'Sledging & Tobogganing', desc: 'Family-friendly winter fun' },
        { id: 'aw3', name: 'Snow Trekking', desc: 'Guided winter trail expeditions' },
        { id: 'aw4', name: 'Ice Climbing', desc: 'Frozen waterfall ascents' },
        { id: 'aw5', name: 'Heliskiing', desc: 'Exclusive backcountry access by helicopter' }
      ],
      summer: [
        { id: 'as1', name: 'Camping', desc: 'Starlit nights in alpine meadows' },
        { id: 'as2', name: 'River Rafting', desc: 'White-water rapids on the Lidder' },
        { id: 'as3', name: 'Horse Riding', desc: 'Mountain trail rides through meadows' },
        { id: 'as4', name: 'Mountain Biking', desc: 'Scenic Himalayan cycling routes' },
        { id: 'as5', name: 'Trout Fishing', desc: 'Pristine river fishing experiences' }
      ]
    },

    rentals: [
      { id: 'r1', title: 'Ski Rental', desc: 'Premium skis, boots, poles & helmets from top brands.' },
      { id: 'r2', title: 'Snowboard Rental', desc: 'All-mountain & powder boards with bindings and boots.' },
      { id: 'r3', title: 'Trekking Rental', desc: 'Backpacks, tents, sleeping bags & trekking poles.' },
      { id: 'r4', title: 'MTB Rental', desc: 'Mountain bikes for Himalayan trail riding adventures.', comingSoon: true }
    ],

    testimonials: [
      { id: 'tm1', initials: 'AK', name: 'Arjun Kapoor', source: 'Google Review ★ 5.0', text: '"The skiing experience in Gulmarg was absolutely world-class. The Shred Himalayas team made everything seamless — from airport pickup to the final goodbye. Truly premium service."' },
      { id: 'tm2', initials: 'SM', name: 'Sarah Mitchell', source: 'Google Review ★ 5.0', text: '"Our Kashmir Great Lakes trek was the most beautiful experience of my life. The guides knew every trail, every viewpoint. We felt safe and amazed at every turn."' },
      { id: 'tm3', initials: 'RJ', name: 'Raj Johal', source: 'Google Review ★ 5.0', text: '"From the luxury houseboat to the backcountry snowboarding — every single detail was perfect. This team truly understands what premium travel means."' },
      { id: 'tm4', initials: 'PK', name: 'Priya Kapila', source: 'Google Review ★ 5.0', text: '"Booked the Kashmir Offbeat Tour and discovered places I never knew existed. The guides were locals who shared stories, recipes, and genuine hospitality. Unforgettable."' }
    ],

    sightseeing: [
      { id: 'sg1', place: 'gulmarg', label: 'Gulmarg', title: 'Gulmarg', desc: 'The "Meadow of Flowers" — home to Asia\'s highest gondola and world-class skiing terrain at 2,650m altitude.', image: 'assets/images/gallery-gulmarg.png' },
      { id: 'sg2', place: 'srinagar', label: 'Srinagar', title: 'Srinagar', desc: 'The summer capital of Jammu & Kashmir. Experience the iconic Dal Lake, Mughal Gardens, and ancient wooden architecture.', image: 'assets/images/sightseeing-dal-lake.png' },
      { id: 'sg3', place: 'pahalgam', label: 'Pahalgam', title: 'Pahalgam', desc: 'The "Valley of Shepherds" — a stunning green valley where the Lidder River flows through meadows and pine forests.', image: 'assets/images/gallery-pahalgam.png' },
      { id: 'sg4', place: 'sonamarg', label: 'Sonamarg', title: 'Sonamarg', desc: 'The "Meadow of Gold" — gateway to the Himalayan glaciers and the dramatic Thajiwas Glacier valley.', image: 'assets/images/gallery-sonamarg.png' }
    ]
  };

  // ─── STORAGE HELPERS ─────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { }
  }

  function get(section) {
    const stored = load();
    if (stored && stored[section] !== undefined) return stored[section];
    return JSON.parse(JSON.stringify(defaults[section]));
  }

  function set(section, data) {
    const stored = load() || JSON.parse(JSON.stringify(defaults));
    stored[section] = data;
    save(stored);
  }

  function reset() { localStorage.removeItem(KEY); }

  // ─── HELPERS ─────────────────────────────────────────
  function wa(num, msg) {
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }

  function makeTags(csv) {
    return (csv || '').split(',').filter(Boolean).map(t =>
      `<span class="detail-card__include-tag">${t.trim()}</span>`
    ).join('');
  }

  function makeHighlights(csv) {
    return (csv || '').split(',').filter(Boolean).map(t =>
      `<span class="trek-card__highlight">${t.trim()}</span>`
    ).join('');
  }

  // ─── RENDERERS ───────────────────────────────────────

  /* -- Skiing & Snowboarding package card (shared template) -- */
  function renderActivityCard(item, wa_num) {
    return `
      <div class="detail-card reveal">
        <div class="detail-card__image-wrap">
          <img src="${item.image}" alt="${item.title}" class="detail-card__image">
          <span class="detail-card__badge">${item.badge}</span>
        </div>
        <div class="detail-card__body">
          <h3 class="detail-card__title">${item.title}</h3>
          <p class="detail-card__desc">${item.description}</p>
          <div class="detail-card__meta">
            <span class="detail-card__meta-item">${item.meta1}</span>
            <span class="detail-card__meta-item">${item.meta2}</span>
            <span class="detail-card__meta-item">${item.meta3}</span>
          </div>
          <div class="detail-card__includes">${makeTags(item.includes)}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, item.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
          </div>
        </div>
      </div>`;
  }

  /* -- Skiing categories + items -- */
  function renderSkiing(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const cats = get('skiing');
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = cats.map(cat => {
      const visibleItems = cat.items.filter(item => item.enabled !== false);
      if (visibleItems.length === 0) return '';
      return `
      <div class="category-group">
        <div class="category-title">${cat.title}</div>
        <div class="detail-grid">
          ${visibleItems.map(item => renderActivityCard(item, wa_num)).join('')}
        </div>
      </div>`;
    }).join('');
  }

  /* -- Snowboarding categories + items -- */
  function renderSnowboarding(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const cats = get('snowboarding');
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = cats.map(cat => {
      const visibleItems = cat.items.filter(item => item.enabled !== false);
      if (visibleItems.length === 0) return '';
      return `
      <div class="category-group">
        <div class="category-title">${cat.title}</div>
        <div class="detail-grid">
          ${visibleItems.map(item => renderActivityCard(item, wa_num)).join('')}
        </div>
      </div>`;
    }).join('');
  }

  /* -- Trek cards -- */
  function renderTrekking(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const treks = get('trekking').filter(t => t.enabled !== false);
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = treks.map(t => `
      <div class="trek-card reveal">
        <div class="trek-card__image-wrap">
          <img src="${t.image}" alt="${t.title}" class="trek-card__image">
          <span class="trek-card__difficulty trek-card__difficulty--${t.difficultyClass}">${t.difficulty}</span>
        </div>
        <div class="trek-card__body">
          <h3 class="trek-card__title">${t.title}</h3>
          <p class="trek-card__desc">${t.description}</p>
          <div class="trek-card__stats">
            <span class="trek-card__stat">${t.days}</span>
            <span class="trek-card__stat">${t.altitude}</span>
            <span class="trek-card__stat">${t.distance}</span>
            <span class="trek-card__stat">${t.season}</span>
          </div>
          <div class="trek-card__highlights">${makeHighlights(t.highlights)}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, t.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
          </div>
        </div>
      </div>`).join('');
  }

  /* -- Tour packages -- */
  function renderPackages(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const pkgs = get('packages').filter(p => p.enabled !== false);
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = pkgs.map(p => {
      const dests = (p.destinations || '').split(',').filter(Boolean);
      return `
      <div class="detail-card reveal" style="min-height:300px;">
        <div class="detail-card__image-wrap">
          <img src="${p.image}" alt="${p.title}" class="detail-card__image">
          <span class="detail-card__badge">${p.badge}</span>
        </div>
        <div class="detail-card__body">
          <h3 class="detail-card__title">${p.title}</h3>
          <p class="detail-card__desc">${p.description}</p>
          <div class="detail-card__meta">
            <span class="detail-card__meta-item">${p.duration}</span>
            <span class="detail-card__meta-item">${p.accommodation}</span>
            <span class="detail-card__meta-item">${p.transport}</span>
            <span class="detail-card__meta-item">${p.meals}</span>
          </div>
          <div class="tour-card__destinations">
            ${dests.map(d => `<span class="tour-card__dest">${d.trim()}</span>`).join('')}
          </div>
          <div class="detail-card__includes">${makeTags(p.includes)}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, p.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  /* -- Activities -- */
  function renderActivities(winterId, summerId) {
    const acts = get('activities');
    const winter = (acts.winter || []).filter(a => a.enabled !== false);
    const summer = (acts.summer || []).filter(a => a.enabled !== false);
    const wEl = document.getElementById(winterId);
    const sEl = document.getElementById(summerId);
    if (wEl) wEl.innerHTML = winter.map(a => `
      <div class="activities__item reveal">
        <div class="activities__item-icon"></div>
        <div>
          <div class="activities__item-name">${a.name}</div>
          <div class="activities__item-desc">${a.desc}</div>
        </div>
      </div>`).join('');
    if (sEl) sEl.innerHTML = summer.map(a => `
      <div class="activities__item reveal">
        <div class="activities__item-icon"></div>
        <div>
          <div class="activities__item-name">${a.name}</div>
          <div class="activities__item-desc">${a.desc}</div>
        </div>
      </div>`).join('');
  }

  /* -- Rentals -- */
  function renderRentals(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const rentals = get('rentals').filter(r => r.enabled !== false);
    el.innerHTML = rentals.map(r => `
      <div class="rentals__card ${r.comingSoon ? 'rentals__card--coming-soon' : ''} reveal">
        ${r.comingSoon ? '<span class="rentals__card-badge">Coming Soon</span>' : ''}
        <div class="rentals__card-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="2"/><path d="m7 12 2-2 2 2-2 2zm6 0 2-2 2 2-2 2z"/></svg>
        </div>
        <h4 class="rentals__card-title">${r.title}</h4>
        <p class="rentals__card-desc">${r.desc}</p>
      </div>`).join('');
  }

  /* -- Testimonials -- */
  function renderTestimonials(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const testimonials = get('testimonials').filter(t => t.enabled !== false);
    el.innerHTML = testimonials.map(t => `
      <div class="testimonials__card">
        <div class="testimonials__stars">
          <span class="testimonials__star">★</span><span class="testimonials__star">★</span>
          <span class="testimonials__star">★</span><span class="testimonials__star">★</span>
          <span class="testimonials__star">★</span>
        </div>
        <p class="testimonials__text">${t.text}</p>
        <div class="testimonials__author">
          <div class="testimonials__avatar">${t.initials}</div>
          <div>
            <div class="testimonials__author-name">${t.name}</div>
            <div class="testimonials__author-source">${t.source}</div>
          </div>
        </div>
      </div>`).join('');
  }

  /* -- Hero text -- */
  function renderHero() {
    const s = get('settings');
    const el = document.getElementById('heroTitle');
    const sub = document.getElementById('heroSubtitle');
    const vid = document.querySelector('.hero__video');
    if (el) el.textContent = s.heroTitle;
    if (sub) sub.textContent = s.heroSubtitle;
    if (vid && s.heroVideoUrl) {
      const src = vid.querySelector('source');
      if (src) src.setAttribute('src', s.heroVideoUrl);
    }
  }

  /* -- Footer copyright -- */
  function renderFooter() {
    const s = get('settings');
    const el = document.querySelector('.footer__copyright');
    if (el) el.textContent = s.footerCopyright;
  }

  /* -- WhatsApp links -- */
  function updateWhatsApp() {
    const num = get('settings').whatsappNumber;
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const url = new URL(a.href);
      const txt = url.searchParams.get('text') || '';
      a.href = `https://wa.me/${num}${txt ? '?text=' + encodeURIComponent(txt) : ''}`;
    });
  }

  // Public API
  return { get, set, reset, defaults,
    renderSkiing, renderSnowboarding, renderTrekking,
    renderPackages, renderActivities, renderRentals,
    renderTestimonials, renderHero, renderFooter, updateWhatsApp };
})();
