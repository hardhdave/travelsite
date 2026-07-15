// ====================================================
// SHRED HIMALAYAS — SITE DATA MANAGER
// Manages all dynamic content via localStorage.
// Public pages read from this; admin panel writes to it.
// ====================================================

const SHData = (function () {
  const KEY = 'sh_site_data_v3';

  // ─── DEFAULT DATA ────────────────────────────────────
  const defaults = {
    settings: {
      whatsappNumber: '919999999999',
      heroTitle: 'Himalayas, by locals.',
      heroSubtitle: 'Premium private journeys across Ladakh, Zanskar, Spiti, Himachal and Bhutan.',
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-peak-under-blue-sky-41584-large.mp4',
      footerCopyright: '© 2024 Shred Himalayas. All rights reserved. Crafted with love in Kashmir.'
    },

    skiing: [
      {
        id: 'cat-learn-ski', title: 'Learn to Ski',
        items: [
          { id: 's1', title: 'Basic Skiing Package', price: '₹14,999', description: 'Perfect for first-timers. Learn the fundamentals of skiing with our certified instructors on gentle slopes. Includes all equipment and personalized coaching.', badge: 'Beginner', meta1: '3 Days', meta2: 'Private Instructor', meta3: 'All Equipment', includes: 'Equipment Rental,Instructor,Gondola Pass,Safety Gear', image: 'assets/images/skiing-action.png', waMsg: "I'm interested in the Basic Skiing Package" },
          { id: 's2', title: 'Intermediate Skiing Package', price: '₹19,999', description: 'Take your skiing to the next level. Master parallel turns, tackle blue runs, and build confidence on varied terrain with expert guidance.', badge: 'Intermediate', meta1: '4 Days', meta2: 'Private Instructor', meta3: 'Blue & Red Runs', includes: 'Equipment Rental,Instructor,Gondola Pass,Video Analysis', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Intermediate Skiing Package" },
          { id: 's3', title: 'Advanced Skiing Package', price: '₹24,999', description: "For experienced skiers looking to conquer Gulmarg's legendary terrain. Off-piste runs, steep chutes, and deep powder coaching with expert local guides.", badge: 'Advanced', meta1: '5 Days', meta2: 'Expert Guide', meta3: 'Off-Piste Access', includes: 'Premium Equipment,Expert Guide,Avalanche Kit,Gondola Pass', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Advanced Skiing Package" }
        ]
      },
      {
        id: 'cat-ski-holidays', title: 'Ski Holidays',
        items: [
          { id: 's4', title: 'Essential Gulmarg Ski Holiday', price: '₹34,999', description: "A complete ski holiday experience with comfortable accommodation, daily skiing, equipment, and airport transfers. Everything you need for an unforgettable Gulmarg trip.", badge: '5 Nights', meta1: '5N / 6D', meta2: '3-Star Hotel', meta3: 'Transfers Included', includes: 'Accommodation,Meals,Equipment,Instructor,Transfers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Essential Gulmarg Ski Holiday" },
          { id: 's5', title: 'Premium Gulmarg Ski Holiday', price: '₹49,999', description: "Elevated ski holiday with premium accommodation, daily instructor-led sessions, après-ski experiences, and a day trip to Srinagar's iconic Dal Lake.", badge: '7 Nights', meta1: '7N / 8D', meta2: '4-Star Hotel', meta3: 'All Meals', includes: 'Premium Stay,All Meals,Equipment,Instructor,Srinagar Day Trip', image: 'assets/images/kashmir-package.png', waMsg: "I'm interested in the Premium Gulmarg Ski Holiday" },
          { id: 's6', title: 'Luxury Gulmarg Skiing Retreat', price: '₹89,999', description: "The ultimate Gulmarg experience. Stay at Kashmir's finest resort, enjoy private ski coaching, gourmet dining, spa treatments, and curated cultural experiences.", badge: 'Luxury', meta1: '7N / 8D', meta2: '5-Star Resort', meta3: 'VIP Experience', includes: '5-Star Resort,Gourmet Meals,Private Coach,Spa Access,Luxury SUV', image: 'assets/images/gallery-luxury-stay.png', waMsg: "I'm interested in the Luxury Gulmarg Skiing Retreat" }
        ]
      },
      {
        id: 'cat-elite-ski', title: 'Elite Experiences',
        items: [
          { id: 's7', title: 'Gulmarg Backcountry Ski Adventure', price: '₹59,999', description: "Venture beyond the groomed runs into Gulmarg's legendary backcountry. Guided by local experts through untouched powder bowls, pristine tree runs, and open faces with 360° Himalayan panoramas.", badge: 'Elite', meta1: '5 Days', meta2: 'Backcountry Access', meta3: 'Advanced Level', includes: 'Expert Guide,Avalanche Safety Kit,Premium Equipment,Accommodation', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Backcountry Ski Adventure" },
          { id: 's8', title: 'Gulmarg Heliskiing Experience', price: '₹1,49,999', description: "The pinnacle of skiing. Fly by helicopter to untouched Himalayan peaks and ski pristine powder runs that no gondola can reach. Limited availability — the most exclusive skiing experience in Asia.", badge: 'Exclusive', meta1: '3–5 Days', meta2: 'Helicopter Access', meta3: 'Expert Level', includes: 'Helicopter Drops,Certified Guide,Premium Equipment,Luxury Stay,Full Safety Team', image: 'assets/images/gallery-helicopter.png', waMsg: "I'm interested in the Heliskiing Experience" }
        ]
      }
    ],

    snowboarding: [
      {
        id: 'cat-learn-sb', title: 'Learn to Snowboard',
        items: [
          { id: 'sb1', title: 'Beginner Snowboard Package', price: '₹15,499', description: "Start your snowboarding journey on Gulmarg's gentle slopes. Learn balance, edge control, and basic turns with patient, certified instructors.", badge: 'Beginner', meta1: '3 Days', meta2: 'Private Coach', meta3: 'All Equipment', includes: 'Board & Boots,Instructor,Gondola Pass,Helmet', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Beginner Snowboard Package" },
          { id: 'sb2', title: 'Intermediate Snowboard Package', price: '₹20,499', description: 'Progress to carving, switch riding, and tackling varied terrain. Gain confidence on blue and red runs with expert technique coaching.', badge: 'Intermediate', meta1: '4 Days', meta2: 'Expert Coach', meta3: 'Blue & Red Runs', includes: 'Board & Boots,Coach,Gondola Pass,Video Analysis', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Intermediate Snowboard Package" },
          { id: 'sb3', title: 'Advanced Snowboard Package', price: '₹25,499', description: "Push your limits on Gulmarg's steepest terrain. Master powder riding, cliff drops, and tree runs with world-class local guides.", badge: 'Advanced', meta1: '5 Days', meta2: 'Expert Guide', meta3: 'Off-Piste', includes: 'Premium Board,Expert Guide,Avalanche Kit,Gondola Pass', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Advanced Snowboard Package" }
        ]
      },
      {
        id: 'cat-sb-holidays', title: 'Snowboard Holidays',
        items: [
          { id: 'sb4', title: 'Essential Gulmarg Snowboard Holiday', price: '₹35,499', description: "Complete snowboard holiday with accommodation, daily sessions, full equipment, and transfers. The perfect hassle-free Gulmarg snowboarding trip.", badge: '5 Nights', meta1: '5N / 6D', meta2: '3-Star Hotel', meta3: 'Transfers', includes: 'Accommodation,Meals,Equipment,Coach,Transfers', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Essential Snowboard Holiday" },
          { id: 'sb5', title: 'Premium Gulmarg Snowboard Holiday', price: '₹50,499', description: "The ultimate snowboard holiday with premium stays, all meals, daily coaching, cultural excursions, and après-snowboarding experiences.", badge: '7 Nights', meta1: '7N / 8D', meta2: '4-Star Hotel', meta3: 'All Meals', includes: 'Premium Stay,All Meals,Equipment,Coach,Srinagar Trip', image: 'assets/images/gallery-luxury-stay.png', waMsg: "I'm interested in the Premium Snowboard Holiday" }
        ]
      },
      {
        id: 'cat-elite-sb', title: 'Elite Snowboard Experiences',
        items: [
          { id: 'sb6', title: 'Backcountry Snowboard Adventure', price: '₹60,499', description: "Leave the groomed runs behind and explore Gulmarg's endless backcountry powder. Guided splitboard tours through pristine terrain with avalanche-certified guides.", badge: 'Elite', meta1: '5 Days', meta2: 'Backcountry', meta3: 'Advanced', includes: 'Expert Guide,Splitboard,Avalanche Kit,Accommodation', image: 'assets/images/snowboarding-action.png', waMsg: "I'm interested in the Backcountry Snowboard Adventure" },
          { id: 'sb7', title: 'Heli-Snowboarding Experience', price: '₹1,50,499', description: "The ultimate ride. Helicopter access to virgin peaks, bottomless powder, and runs that defy imagination. The most exclusive snowboarding experience in the Himalayas.", badge: 'Exclusive', meta1: '3–5 Days', meta2: 'Helicopter', meta3: 'Expert', includes: 'Heli Drops,Certified Guide,Premium Gear,Luxury Stay,Safety Team', image: 'assets/images/gallery-helicopter.png', waMsg: "I'm interested in the Heli-Snowboarding Experience" }
        ]
      }
    ],

    trekking: [
      { id: 't1', title: 'Kashmir Great Lakes Trek', price: '₹16,500', description: "One of India's most beautiful treks. Walk through seven stunning alpine lakes set amidst flower-carpeted meadows and snow-capped peaks. A life-changing Himalayan journey.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '7 Days / 6 Nights', altitude: '3,800m Max Altitude', distance: '72 km Distance', season: 'Jun – Sep', highlights: '7 pristine alpine lakes,Flower-carpeted meadows at Nichnai Pass,Stunning views of Kolahoi Glacier,Camping beside crystal-clear Vishansar Lake', image: 'assets/images/trekking-landscape.png', waMsg: "I'm interested in the Kashmir Great Lakes Trek" },
      { id: 't2', title: 'Tarsar Marsar Trek', price: '₹14,800', description: "A twin-lake odyssey through the Aru Valley. Two dramatically different alpine lakes — the green Tarsar and the blue Marsar — connected by a stunning high-altitude ridge walk.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '6 Days / 5 Nights', altitude: '3,600m Max Altitude', distance: '48 km Distance', season: 'Jun – Sep', highlights: 'Twin alpine lakes with contrasting colors,Lush Aru Valley base camp,Dramatic Sundersar Pass crossing,Wildflower meadows and shepherd camps', image: 'assets/images/gallery-sonamarg.png', waMsg: "I'm interested in the Tarsar Marsar Trek" },
      { id: 't3', title: 'Gangbal Lake Trek', price: '₹12,500', description: "The sacred Harmukh-Gangbal circuit. Camp beside the twin Gangbal lakes at the foot of Mount Harmukh (4,724m) — one of Kashmir's most revered peaks. A trek of spiritual and natural beauty.", difficulty: 'Challenging', difficultyClass: 'challenging', days: '5 Days / 4 Nights', altitude: '3,570m Max Altitude', distance: '38 km Distance', season: 'Jun – Oct', highlights: 'Sacred Harmukh peak views,Twin glacial Gangbal lakes,Nundkol Lake camping,Rich Kashmiri cultural immersion', image: 'assets/images/gallery-pahalgam.png', waMsg: "I'm interested in the Gangbal Lake Trek" },
      { id: 't4', title: 'Gurez Valley Trek', price: '₹11,000', description: "One of India's most remote and untouched valleys. Trek through the Habba Khatoon range alongside the Kishanganga River to discover villages frozen in time and landscapes of raw beauty.", difficulty: 'Moderate', difficultyClass: 'moderate', days: '4 Days / 3 Nights', altitude: '3,200m Max Altitude', distance: '32 km Distance', season: 'Jun – Sep', highlights: 'Untouched Habba Khatoon peaks,Ancient Dard Shin villages,Kishanganga River valley,One of India\'s last frontiers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Gurez Valley Trek" },
      { id: 't5', title: 'Pir Panjal Trek', price: '₹22,000', description: "A high-altitude expedition crossing the mighty Pir Panjal range. Traverse glaciers, high passes above 4,000m, and experience the raw grandeur of the western Himalayas. For seasoned trekkers only.", difficulty: 'Challenging', difficultyClass: 'challenging', days: '8 Days / 7 Nights', altitude: '4,100m Max Altitude', distance: '65 km Distance', season: 'Jul – Sep', highlights: 'Cross the mighty Pir Panjal range,Glacier traversing experience,360° panoramic Himalayan views,Remote wilderness camping', image: 'assets/images/hero-mountains.png', waMsg: "I'm interested in the Pir Panjal Trek" }
    ],

    packages: [
      { id: 'p1', title: 'Luxury Kashmir Tour Package', price: '₹65,000', description: "Our signature 7-night luxury experience. Stay at Kashmir's finest hotels and houseboats, explore with private guides, enjoy gourmet Kashmiri cuisine, and experience exclusive cultural encounters. The ultimate way to discover Kashmir.", badge: 'Bestseller', duration: '7N / 8D', accommodation: '5-Star Hotels', transport: 'Luxury SUV', meals: 'All Meals', destinations: 'Srinagar,Gulmarg,Pahalgam,Sonamarg,Dal Lake', includes: '5-Star Accommodation,All Meals,Private Guide,Luxury SUV,Houseboat Night,Shikara Ride,Gondola Tickets,Airport Transfers', image: 'assets/images/kashmir-package.png', waMsg: "I'm interested in the Luxury Kashmir Tour Package" },
      { id: 'p2', title: 'Premium Kashmir Tour', price: '₹45,000', description: "A 5-night carefully curated journey through Kashmir's most iconic destinations. Premium accommodation, experienced guides, and a balanced mix of adventure and relaxation. Perfect for first-time visitors who want the best of Kashmir.", badge: 'Popular', duration: '5N / 6D', accommodation: '4-Star Hotels', transport: 'Private Cab', meals: 'Breakfast + Dinner', destinations: 'Srinagar,Gulmarg,Pahalgam,Dal Lake', includes: '4-Star Accommodation,Breakfast & Dinner,Private Guide,Private Cab,Shikara Ride,Gondola Tickets,Airport Transfers', image: 'assets/images/gallery-gulmarg.png', waMsg: "I'm interested in the Premium Kashmir Tour" },
      { id: 'p3', title: 'Kashmir Offbeat Tour', price: '₹38,000', description: "Explore Kashmir's hidden gems far from the tourist trail. Discover untouched villages, secret valleys, pristine meadows, and authentic Kashmiri culture that most visitors never see. For the true explorer who seeks the extraordinary.", badge: 'Unique', duration: '6N / 7D', accommodation: 'Boutique Stays', transport: '4x4 Vehicle', meals: 'All Meals', destinations: 'Doodhpathri,Yusmarg,Lolab Valley,Bangus Valley,Gurez Valley', includes: 'Boutique Accommodation,All Meals,Local Expert Guide,4x4 Vehicle,Cultural Experiences,Homestay Night', image: 'assets/images/gallery-sonamarg.png', waMsg: "I'm interested in the Kashmir Offbeat Tour" },
      { id: 'p4', title: 'Gurez Valley Tour Package', price: '₹28,000', description: "Journey to one of India's most remote and beautiful valleys. Cross the Razdan Pass at 3,500m, explore ancient Dard Shin villages, and discover landscapes that feel like another world. A true frontier adventure.", badge: 'Adventure', duration: '4N / 5D', accommodation: 'Guesthouses', transport: '4x4 Vehicle', meals: 'All Meals', destinations: 'Srinagar,Razdan Pass,Dawar,Habba Khatoon Peak,Tulail Valley', includes: 'Accommodation,All Meals,Local Guide,4x4 Vehicle,Permits,Airport Transfers', image: 'assets/images/gallery-pahalgam.png', waMsg: "I'm interested in the Gurez Valley Tour" },
      { id: 'p5', title: 'Kashmir Day Tours', price: '₹4,500', description: "Perfect single-day excursions for those short on time or wanting to add a day adventure to their itinerary. Choose from Gulmarg, Pahalgam, Sonamarg, or Srinagar city — each a curated full-day experience.", badge: 'Day Trip', duration: '1 Day', accommodation: '', transport: 'Private Cab', meals: 'Lunch Included', destinations: 'Gulmarg Day Trip,Pahalgam Day Trip,Sonamarg Day Trip,Srinagar City Tour', includes: 'Private Cab,Local Guide,Lunch,Entry Tickets,Hotel Pickup', image: 'assets/images/sightseeing-dal-lake.png', waMsg: "I'm interested in Kashmir Day Tours" }
    ],

    activities: {
      winter: [
        { id: 'aw1', name: 'Skiing & Snowboarding', desc: 'World-class powder runs in Gulmarg', image: 'assets/images/skiing-action.png' },
        { id: 'aw2', name: 'Sledging & Tobogganing', desc: 'Family-friendly winter fun', image: 'assets/images/activities-winter.png' },
        { id: 'aw3', name: 'Snow Trekking', desc: 'Guided winter trail expeditions', image: 'assets/images/gallery-gulmarg.png' },
        { id: 'aw4', name: 'Ice Climbing', desc: 'Frozen waterfall ascents', image: 'assets/images/hero-mountains.png' },
        { id: 'aw5', name: 'Heliskiing', desc: 'Exclusive backcountry access by helicopter', image: 'assets/images/gallery-helicopter.png' }
      ],
      summer: [
        { id: 'as1', name: 'Camping', desc: 'Starlit nights in alpine meadows', image: 'assets/images/trekking-landscape.png' },
        { id: 'as2', name: 'River Rafting', desc: 'White-water rapids on the Lidder', image: 'assets/images/gallery-sonamarg.png' },
        { id: 'as3', name: 'Horse Riding', desc: 'Mountain trail rides through meadows', image: 'assets/images/gallery-pahalgam.png' },
        { id: 'as4', name: 'Mountain Biking', desc: 'Scenic Himalayan cycling routes', image: 'assets/images/sightseeing-dal-lake.png' },
        { id: 'as5', name: 'Trout Fishing', desc: 'Pristine river fishing experiences', image: 'assets/images/gallery-luxury-stay.png' }
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

  // ─── RENDERERS ───────────────────────────────────────

  /* -- Skiing & Snowboarding package card (clean first look) -- */
  function renderActivityCard(item, wa_num) {
    const safeData = encodeURIComponent(JSON.stringify(item)).replace(/'/g, "%27");
    return `
      <div class="detail-card reveal">
        <div class="detail-card__image-wrap">
          <img src="${item.image}" alt="${item.title}" class="detail-card__image">
          <span class="detail-card__badge">${item.badge}</span>
        </div>
        <div class="detail-card__body">
          <h3 class="detail-card__title">${item.title}</h3>
          <p class="detail-card__desc">${item.description}</p>
          <div class="detail-card__price">Starting from ${item.price || 'Contact for Price'}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, item.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
            <button class="btn btn--outline sh-more-info-btn" data-item-type="activity" data-item='${safeData}'><span>More Info</span></button>
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

  /* -- Trek cards (clean first look) -- */
  function renderTrekking(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const treks = get('trekking').filter(t => t.enabled !== false);
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = treks.map(t => {
      const safeData = encodeURIComponent(JSON.stringify(t)).replace(/'/g, "%27");
      return `
      <div class="trek-card reveal">
        <div class="trek-card__image-wrap">
          <img src="${t.image}" alt="${t.title}" class="trek-card__image">
          <span class="trek-card__difficulty trek-card__difficulty--${t.difficultyClass}">${t.difficulty}</span>
        </div>
        <div class="trek-card__body">
          <h3 class="trek-card__title">${t.title}</h3>
          <p class="trek-card__desc">${t.description}</p>
          <div class="trek-card__price">Starting from ${t.price || 'Contact for Price'}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, t.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
            <button class="btn btn--outline sh-more-info-btn" data-item-type="trek" data-item='${safeData}'><span>More Info</span></button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  /* -- Tour packages (clean first look) -- */
  function renderPackages(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const pkgs = get('packages').filter(p => p.enabled !== false);
    const wa_num = get('settings').whatsappNumber;
    el.innerHTML = pkgs.map(p => {
      // Strip heavy PDF data from DOM attribute to keep HTML light
      const leanPkg = Object.assign({}, p);
      delete leanPkg.itineraryPdf;
      const safeData = encodeURIComponent(JSON.stringify(leanPkg)).replace(/'/g, "%27");
      return `
      <div class="detail-card reveal" style="min-height:300px;">
        <div class="detail-card__image-wrap">
          <img src="${p.image}" alt="${p.title}" class="detail-card__image">
          <span class="detail-card__badge">${p.badge}</span>
        </div>
        <div class="detail-card__body">
          <h3 class="detail-card__title">${p.title}</h3>
          <p class="detail-card__desc">${p.description}</p>
          <div class="detail-card__price">Starting from ${p.price || 'Contact for Price'}</div>
          <div class="detail-card__cta">
            <a href="${wa(wa_num, p.waMsg)}" class="btn btn--primary"><span>Enquire Now</span></a>
            <button class="btn btn--outline sh-more-info-btn" data-item-type="package" data-item='${safeData}'><span>More Info</span></button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  /* -- Activities -- */
  function renderActivities(winterId, summerId) {
    const acts = get('activities');
    const defaultImages = {
      aw1: 'assets/images/skiing-action.png',
      aw2: 'assets/images/activities-winter.png',
      aw3: 'assets/images/gallery-gulmarg.png',
      aw4: 'assets/images/hero-mountains.png',
      aw5: 'assets/images/gallery-helicopter.png',
      as1: 'assets/images/trekking-landscape.png',
      as2: 'assets/images/gallery-sonamarg.png',
      as3: 'assets/images/gallery-pahalgam.png',
      as4: 'assets/images/sightseeing-dal-lake.png',
      as5: 'assets/images/gallery-luxury-stay.png'
    };
    const winter = (acts.winter || []).filter(a => a.enabled !== false);
    const summer = (acts.summer || []).filter(a => a.enabled !== false);
    const wEl = document.getElementById(winterId);
    const sEl = document.getElementById(summerId);

    if (wEl) wEl.innerHTML = winter.map(a => `
      <div class="activities__item reveal">
        <div class="activities__item-img-wrap">
          <img src="${a.image || defaultImages[a.id] || 'assets/images/skiing-action.png'}" alt="${a.name}" class="activities__item-img">
        </div>
        <div class="activities__item-body">
          <div class="activities__item-name">${a.name}</div>
          <div class="activities__item-desc">${a.desc}</div>
        </div>
      </div>`).join('');

    if (sEl) sEl.innerHTML = summer.map(a => `
      <div class="activities__item reveal">
        <div class="activities__item-img-wrap">
          <img src="${a.image || defaultImages[a.id] || 'assets/images/trekking-landscape.png'}" alt="${a.name}" class="activities__item-img">
        </div>
        <div class="activities__item-body">
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

  // ─── SH-MODAL SYSTEM AUTOMATION ──────────────────────────────────
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      // 1. Inject modal overlay html if it is not already in page
      if (!document.getElementById('shModalOverlay')) {
        const modalHtml = `
          <div class="sh-modal-overlay" id="shModalOverlay">
            <div class="sh-modal" id="shModal">
              <button class="sh-modal__close" id="shModalClose" aria-label="Close modal">×</button>
              <div class="sh-modal__grid" id="shModalContent">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
      }

      const overlay = document.getElementById('shModalOverlay');
      const closeBtn = document.getElementById('shModalClose');
      const contentEl = document.getElementById('shModalContent');

      function closeModal() {
        if (overlay) {
          overlay.classList.remove('is-active');
          document.body.style.overflow = '';
        }
      }

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (overlay) {
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) closeModal();
        });
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });

      // Delegate "More Info" click events on any page
      document.addEventListener('click', function (e) {
        const btn = e.target.closest('.sh-more-info-btn');
        if (!btn) return;
        e.preventDefault();
        try {
          const itemData = JSON.parse(decodeURIComponent(btn.getAttribute('data-item')));
          const itemType = btn.getAttribute('data-item-type') || 'activity';
          openModal(itemData, itemType);
        } catch (err) {
          console.error('Modal data parse error:', err);
        }
      });

      function openModal(itemData, itemType) {
        const wa_num = get('settings').whatsappNumber;
        let html = '';

        if (itemType === 'trek') {
          const highlights = (itemData.highlights || '').split(',').filter(Boolean);
          html = `
            <div class="sh-modal__image-side">
              <img src="${itemData.image}" alt="${itemData.title}" class="sh-modal__img">
              <span class="sh-modal__badge">${itemData.difficulty}</span>
            </div>
            <div class="sh-modal__content-side">
              <h2 class="sh-modal__title">${itemData.title}</h2>
              <div class="sh-modal__price-tag" style="font-size: 1.35rem; font-weight: 700; color: var(--gold, #c7965a); margin-bottom: 16px; font-family: 'Satoshi', sans-serif;">
                Starting from ${itemData.price || 'Contact for Price'}
              </div>
              <div class="sh-modal__meta-grid">
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Duration</span>
                  <span class="sh-modal__meta-value">${itemData.days}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Max Altitude</span>
                  <span class="sh-modal__meta-value">${itemData.altitude}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Distance</span>
                  <span class="sh-modal__meta-value">${itemData.distance}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Best Season</span>
                  <span class="sh-modal__meta-value">${itemData.season}</span>
                </div>
              </div>
              <p class="sh-modal__desc">${itemData.description}</p>
              <div class="sh-modal__extra">
                <h4 class="sh-modal__extra-title">Trek Highlights</h4>
                <div class="sh-modal__tags-container">
                  ${highlights.map(h => `<span class="sh-modal__tag">${h.trim()}</span>`).join('')}
                </div>
              </div>
              <div class="sh-modal__cta" style="margin-top: 24px;">
                <a href="https://wa.me/${wa_num}?text=${encodeURIComponent(itemData.waMsg || '')}" class="btn btn--primary sh-modal__enquire" target="_blank" style="padding: 12px 28px;"><span>Enquire Now</span></a>
                <button class="btn sh-modal__pdf-btn" data-pdf-title="${itemData.title}" style="padding: 12px 20px; background: transparent; border: 1px solid rgba(196,168,108,0.45); color: #c4a86c; display:flex; align-items:center; justify-content:center; gap:8px; border-radius:8px; font-size:13px; cursor:pointer; transition: all 0.25s ease; width:100%; margin-top:10px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>`;
        } else if (itemType === 'package') {
          // Look up latest package data from storage to access the PDF itinerary
          const latestPkgs = get('packages') || [];
          const matchedPkg = latestPkgs.find(p => p.id === itemData.id) || itemData;

          const includes = (matchedPkg.includes || '').split(',').filter(Boolean);
          const dests = (matchedPkg.destinations || '').split(',').filter(Boolean);
          
          const hasItinerary = matchedPkg.itineraryPdf && matchedPkg.itineraryPdf.length > 0;
          const itineraryBtnHtml = hasItinerary
            ? `<button class="btn sh-modal__itinerary-btn" data-pdf-url="${matchedPkg.itineraryPdf}" style="padding: 12px 20px; background: transparent; border: 1px solid rgba(196,168,108,0.45); color: #c4a86c; display:flex; align-items:center; justify-content:center; gap:8px; border-radius:8px; font-size:13px; cursor:pointer; transition: all 0.25s ease; width:100%; margin-top:10px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Show Itinerary</span>
              </button>`
            : `<div class="sh-modal__itinerary-status" style="margin-top: 10px; text-align: center; font-size: 13px; color: rgba(255,255,255,0.5); border: 1px dashed rgba(196,168,108,0.25); padding: 12px; border-radius: 8px; font-family:'Satoshi',sans-serif;">
                No itinerary has been added for this package yet.
              </div>`;

          html = `
            <div class="sh-modal__image-side">
              <img src="${matchedPkg.image}" alt="${matchedPkg.title}" class="sh-modal__img">
              <span class="sh-modal__badge">${matchedPkg.badge || 'Tour'}</span>
            </div>
            <div class="sh-modal__content-side">
              <h2 class="sh-modal__title">${matchedPkg.title}</h2>
              <div class="sh-modal__price-tag" style="font-size: 1.35rem; font-weight: 700; color: var(--gold, #c7965a); margin-bottom: 16px; font-family: 'Satoshi', sans-serif;">
                Starting from ${matchedPkg.price || 'Contact for Price'}
              </div>
              <div class="sh-modal__meta-grid">
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Duration</span>
                  <span class="sh-modal__meta-value">${matchedPkg.duration}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Accommodation</span>
                  <span class="sh-modal__meta-value">${matchedPkg.accommodation}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Transport</span>
                  <span class="sh-modal__meta-value">${matchedPkg.transport}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Meals</span>
                  <span class="sh-modal__meta-value">${matchedPkg.meals}</span>
                </div>
              </div>
              <p class="sh-modal__desc">${matchedPkg.description}</p>
              
              <div class="sh-modal__extra" style="margin-bottom: 16px;">
                <h4 class="sh-modal__extra-title">Destinations</h4>
                <div class="sh-modal__tags-container" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                  ${dests.map(d => `<span class="sh-modal__tag" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 6px; font-size: 11px;">${d.trim()}</span>`).join('')}
                </div>
              </div>

              <div class="sh-modal__extra">
                <h4 class="sh-modal__extra-title">What's Included</h4>
                <div class="sh-modal__tags-container">
                  ${includes.map(inc => `<span class="sh-modal__tag">${inc.trim()}</span>`).join('')}
                </div>
              </div>
              <div class="sh-modal__cta" style="margin-top: 24px;">
                <a href="https://wa.me/${wa_num}?text=${encodeURIComponent(matchedPkg.waMsg || '')}" class="btn btn--primary sh-modal__enquire" target="_blank" style="padding: 12px 28px;"><span>Enquire Now</span></a>
                ${itineraryBtnHtml}
              </div>
            </div>`;
        } else {
          // Activity (skiing/snowboarding) modal layout
          const includes = (itemData.includes || '').split(',').filter(Boolean);
          html = `
            <div class="sh-modal__image-side">
              <img src="${itemData.image}" alt="${itemData.title}" class="sh-modal__img">
              <span class="sh-modal__badge">${itemData.badge}</span>
            </div>
            <div class="sh-modal__content-side">
              <h2 class="sh-modal__title">${itemData.title}</h2>
              <div class="sh-modal__price-tag" style="font-size: 1.35rem; font-weight: 700; color: var(--gold, #c7965a); margin-bottom: 16px; font-family: 'Satoshi', sans-serif;">
                Starting from ${itemData.price || 'Contact for Price'}
              </div>
              <div class="sh-modal__meta-grid">
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Duration</span>
                  <span class="sh-modal__meta-value">${itemData.meta1}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Guide</span>
                  <span class="sh-modal__meta-value">${itemData.meta2}</span>
                </div>
                <div class="sh-modal__meta-item">
                  <span class="sh-modal__meta-label">Terrain</span>
                  <span class="sh-modal__meta-value">${itemData.meta3}</span>
                </div>
              </div>
              <p class="sh-modal__desc">${itemData.description}</p>
              <div class="sh-modal__extra">
                <h4 class="sh-modal__extra-title">What's Included</h4>
                <div class="sh-modal__tags-container">
                  ${includes.map(inc => `<span class="sh-modal__tag">${inc.trim()}</span>`).join('')}
                </div>
              </div>
              <div class="sh-modal__cta" style="margin-top: 24px;">
                <a href="https://wa.me/${wa_num}?text=${encodeURIComponent(itemData.waMsg || '')}" class="btn btn--primary sh-modal__enquire" target="_blank" style="padding: 12px 28px;"><span>Enquire Now</span></a>
                <button class="btn sh-modal__pdf-btn" data-pdf-title="${itemData.title}" style="padding: 12px 20px; background: transparent; border: 1px solid rgba(196,168,108,0.45); color: #c4a86c; display:flex; align-items:center; justify-content:center; gap:8px; border-radius:8px; font-size:13px; cursor:pointer; transition: all 0.25s ease; width:100%; margin-top:10px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>`;
        }


        if (contentEl && overlay) {
          contentEl.innerHTML = html;
          overlay.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    // ── PDF Download Handler (single reusable listener for all popups) ──
    function loadScript(src) {
      return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + src + '"]')) { resolve(); return; }
        var s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sh-modal__itinerary-btn');
      if (!btn) return;
      var pdfUrl = btn.getAttribute('data-pdf-url');
      if (pdfUrl) {
        window.open(pdfUrl, '_blank');
      }
    });

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sh-modal__pdf-btn');
      if (!btn) return;
      if (btn.disabled) return;

      var title = (btn.getAttribute('data-pdf-title') || 'Shred-Himalayas').trim();
      var filename = title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-') + '.pdf';
      var modal = document.getElementById('shModal');
      if (!modal) return;

      // Loading state
      btn.disabled = true;
      var origHTML = btn.innerHTML;
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><span>Generating…</span>';

      // Inject spinner keyframe once
      if (!document.getElementById('sh-pdf-spin-style')) {
        var st = document.createElement('style');
        st.id = 'sh-pdf-spin-style';
        st.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(st);
      }

      // Hide UI-only elements during capture
      var closeBtn = document.getElementById('shModalClose');
      var pdfBtns = modal.querySelectorAll('.sh-modal__pdf-btn');
      if (closeBtn) closeBtn.style.opacity = '0';
      pdfBtns.forEach(function(b){ b.style.opacity = '0'; });

      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
        .then(function () {
          var opt = {
            margin:        [10, 10, 10, 10],
            filename:      filename,
            image:         { type: 'jpeg', quality: 0.96 },
            html2canvas:   { scale: 2, useCORS: true, logging: false, backgroundColor: '#12160F' },
            jsPDF:         { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:     { mode: ['avoid-all', 'css', 'legacy'] }
          };
          return html2pdf().set(opt).from(modal).save();
        })
        .then(function () {
          if (closeBtn) closeBtn.style.opacity = '';
          pdfBtns.forEach(function(b){ b.style.opacity = ''; });
          btn.innerHTML = origHTML;
          btn.disabled = false;
        })
        .catch(function (err) {
          console.error('PDF generation failed:', err);
          if (closeBtn) closeBtn.style.opacity = '';
          pdfBtns.forEach(function(b){ b.style.opacity = ''; });
          btn.innerHTML = origHTML;
          btn.disabled = false;
        });
    });
  }

  // Public API
  return {
    get, set, reset, defaults,
    renderSkiing, renderSnowboarding, renderTrekking,
    renderPackages, renderActivities, renderRentals,
    renderTestimonials, renderHero, renderFooter, updateWhatsApp
  };
})();
