// ====================================================
// SHRED HIMALAYAS — ADMIN PANEL LOGIC
// Login, Navigation, CRUD for all content types
// ====================================================

const ADMIN_USER = 'jammu&kashmir';
const ADMIN_PASS = 'admin@2000';

// ─── AUTH ───────────────────────────────────────────
function doLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem('sh_admin', '1');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    initAdmin();
  } else {
    const err = document.getElementById('loginError');
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 4000);
  }
}

function doLogout() {
  sessionStorage.removeItem('sh_admin');
  location.reload();
}

function confirmReset() {
  if (confirm('⚠️ This will reset ALL content to the original defaults. This cannot be undone.\n\nAre you sure?')) {
    SHData.reset();
    toast('✅ All content reset to defaults!', 'green');
    setTimeout(() => initAdmin(), 500);
  }
}

// ─── NAVIGATION ─────────────────────────────────────
function navigate(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const page = el.dataset.page;
  document.getElementById('page-' + page)?.classList.add('active');
  renderPage(page);
}

// ─── INIT ────────────────────────────────────────────
function initAdmin() {
  if (sessionStorage.getItem('sh_admin') !== '1') return;
  renderDashboard();
  loadSettings();
}

// ─── TOAST ──────────────────────────────────────────
function toast(msg, color = 'green') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  t.style.background = color === 'green'
    ? 'rgba(16,185,129,0.95)'
    : color === 'red' ? 'rgba(239,68,68,0.95)'
    : 'rgba(59,130,246,0.95)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.display = 'none', 3000);
}

// ─── RENDER PAGE ROUTER ─────────────────────────────
function renderPage(page) {
  switch (page) {
    case 'dashboard': renderDashboard(); break;
    case 'skiing': renderSkiingEditor(); break;
    case 'snowboarding': renderSnowboardingEditor(); break;
    case 'trekking': renderTrekkingEditor(); break;
    case 'activities': renderActivitiesEditor(); break;
    case 'sightseeing': renderSightseeingEditor(); break;
    case 'rentals': renderRentalsEditor(); break;
    case 'packages': renderPackagesEditor(); break;
    case 'testimonials': renderTestimonialsEditor(); break;
    case 'settings': loadSettings(); break;
  }
}

// ─── DASHBOARD ──────────────────────────────────────
function renderDashboard() {
  const skiing = SHData.get('skiing');
  const snowboarding = SHData.get('snowboarding');
  const trekking = SHData.get('trekking');
  const packages = SHData.get('packages');
  const testimonials = SHData.get('testimonials');
  const activities = SHData.get('activities');
  const rentals = SHData.get('rentals');

  const skiCount = skiing.reduce((a, c) => a + c.items.length, 0);
  const sbCount = snowboarding.reduce((a, c) => a + c.items.length, 0);

  const stats = [
    { icon: '⛷️', label: 'Skiing Packages', count: skiCount, color: '#3b82f6' },
    { icon: '🏂', label: 'Snowboarding', count: sbCount, color: '#06b6d4' },
    { icon: '🥾', label: 'Treks', count: trekking.length, color: '#10b981' },
    { icon: '📦', label: 'Tour Packages', count: packages.length, color: '#f59e0b' },
    { icon: '💬', label: 'Testimonials', count: testimonials.length, color: '#8b5cf6' },
    { icon: '🎯', label: 'Activities', count: (activities.winter?.length || 0) + (activities.summer?.length || 0), color: '#ef4444' },
  ];

  document.getElementById('dashStats').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon" style="background:${s.color}22">${s.icon}</div>
      <div>
        <div class="stat-count">${s.count}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    </div>`).join('');

  const quicks = [
    { icon: '⛷️', title: 'Skiing', page: 'skiing', count: `${skiCount} packages` },
    { icon: '🏂', title: 'Snowboarding', page: 'snowboarding', count: `${sbCount} packages` },
    { icon: '🥾', title: 'Trekking', page: 'trekking', count: `${trekking.length} treks` },
    { icon: '🎯', title: 'Activities', page: 'activities', count: 'Winter & Summer' },
    { icon: '📍', title: 'Sightseeing', page: 'sightseeing', count: `${SHData.get('sightseeing').length} destinations` },
    { icon: '🎿', title: 'Rentals', page: 'rentals', count: `${rentals.length} items` },
    { icon: '📦', title: 'Packages', page: 'packages', count: `${packages.length} tours` },
    { icon: '💬', title: 'Testimonials', page: 'testimonials', count: `${testimonials.length} reviews` },
    { icon: '⚙️', title: 'Settings', page: 'settings', count: 'Site config' },
  ];

  document.getElementById('quickNav').innerHTML = quicks.map(q => `
    <div class="quick-card" onclick="navigate(document.querySelector('[data-page=${q.page}]'))">
      <div class="quick-card-icon">${q.icon}</div>
      <div class="quick-card-title">${q.title}</div>
      <div class="quick-card-count">${q.count}</div>
    </div>`).join('');
}

// ─── ENABLE/DISABLE TOGGLE HELPER ───────────────────
function toggleBtn(enabled, onclickStr) {
  const isOn = enabled !== false;
  return `<button class="icon-btn ${isOn ? 'icon-btn--disable' : 'icon-btn--enable'}"
    title="${isOn ? 'Disable (hide from site)' : 'Enable (show on site)'}"
    onclick="${onclickStr}">${isOn ? '👁️' : '🚫'}</button>`;
}

// ─── SKIING EDITOR ───────────────────────────────────
function renderSkiingEditor() {
  const cats = SHData.get('skiing');
  const el = document.getElementById('skiing-editor');
  el.innerHTML = cats.map((cat, ci) => `
    <div class="admin-category">
      <div class="admin-cat-header">
        <h3>${cat.title}</h3>
        <button class="add-btn" onclick="openFormModal('ski-item', ${ci}, null)">＋ Add Package</button>
      </div>
      <div class="admin-items-grid">
        ${cat.items.map((item, ii) => `
          <div class="admin-item-card ${item.enabled === false ? 'disabled' : ''}">
            <div class="admin-item-img"><img src="${item.image}" alt=""></div>
            <div class="admin-item-info">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
              <div class="admin-item-meta">
                <span>💰 ${item.price || 'No Price'}</span>
                <span>🏷️ ${item.badge}</span>
                <span>⏱️ ${item.meta1}</span>
              </div>
            </div>
            <div class="admin-item-actions">
              ${toggleBtn(item.enabled, `toggleItem('skiing', ${ci}, ${ii})`)}
              <button class="icon-btn" onclick="openFormModal('ski-item', ${ci}, ${ii})">✏️</button>
              <button class="icon-btn icon-btn--danger" onclick="deleteItem('skiing', ${ci}, ${ii})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

// ─── SNOWBOARDING EDITOR ──────────────────────────────
function renderSnowboardingEditor() {
  const cats = SHData.get('snowboarding');
  const el = document.getElementById('snowboarding-editor');
  el.innerHTML = cats.map((cat, ci) => `
    <div class="admin-category">
      <div class="admin-cat-header">
        <h3>${cat.title}</h3>
        <button class="add-btn" onclick="openFormModal('sb-item', ${ci}, null)">＋ Add Package</button>
      </div>
      <div class="admin-items-grid">
        ${cat.items.map((item, ii) => `
          <div class="admin-item-card ${item.enabled === false ? 'disabled' : ''}">
            <div class="admin-item-img"><img src="${item.image}" alt=""></div>
            <div class="admin-item-info">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
              <div class="admin-item-meta">
                <span>💰 ${item.price || 'No Price'}</span>
                <span>🏷️ ${item.badge}</span>
                <span>⏱️ ${item.meta1}</span>
              </div>
            </div>
            <div class="admin-item-actions">
              ${toggleBtn(item.enabled, `toggleItem('snowboarding', ${ci}, ${ii})`)}
              <button class="icon-btn" onclick="openFormModal('sb-item', ${ci}, ${ii})">✏️</button>
              <button class="icon-btn icon-btn--danger" onclick="deleteItem('snowboarding', ${ci}, ${ii})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

// ─── TREKKING EDITOR ──────────────────────────────────
function renderTrekkingEditor() {
  const treks = SHData.get('trekking');
  const el = document.getElementById('trekking-editor');
  el.innerHTML = `
    <div class="admin-cat-header">
      <h3>Manage Treks</h3>
      <button class="add-btn" onclick="openFormModal('trek', null, null)">＋ Add New Trek</button>
    </div>
    <div class="admin-items-grid">
      ${treks.map((t, ti) => `
        <div class="admin-item-card ${t.enabled === false ? 'disabled' : ''}">
          <div class="admin-item-img"><img src="${t.image}" alt=""></div>
          <div class="admin-item-info">
            <h4>${t.title}</h4>
            <p>${t.description}</p>
            <div class="admin-item-meta">
              <span>💰 ${t.price || 'No Price'}</span>
              <span>⛰️ ${t.difficulty}</span>
              <span>⏱️ ${t.days}</span>
              <span>📍 ${t.distance}</span>
            </div>
          </div>
          <div class="admin-item-actions">
            ${toggleBtn(t.enabled, `toggleTrek(${ti})`)}
            <button class="icon-btn" onclick="openFormModal('trek', null, ${ti})">✏️</button>
            <button class="icon-btn icon-btn--danger" onclick="deleteTrek(${ti})">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── ACTIVITIES EDITOR ────────────────────────────────
function renderActivitiesEditor() {
  const acts = SHData.get('activities');
  const el = document.getElementById('activities-editor');

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

  el.innerHTML = `
    <div class="admin-category" style="margin-bottom:30px;">
      <div class="admin-cat-header">
        <h3>Winter Activities</h3>
        <button class="add-btn" onclick="openFormModal('activity', 'winter', null)">＋ Add Winter Activity</button>
      </div>
      <div class="admin-items-grid">
        ${(acts.winter || []).map((a, ai) => `
          <div class="admin-item-card ${a.enabled === false ? 'disabled' : ''}">
            <div class="admin-item-img"><img src="${a.image || defaultImages[a.id] || 'assets/images/skiing-action.png'}" alt=""></div>
            <div class="admin-item-info">
              <h4>${a.name}</h4>
              <p>${a.desc}</p>
            </div>
            <div class="admin-item-actions">
              ${toggleBtn(a.enabled, `toggleActivity('winter', ${ai})`)}
              <button class="icon-btn" onclick="openFormModal('activity', 'winter', ${ai})">✏️</button>
              <button class="icon-btn icon-btn--danger" onclick="deleteActivity('winter', ${ai})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="admin-category">
      <div class="admin-cat-header">
        <h3>Summer Activities</h3>
        <button class="add-btn" onclick="openFormModal('activity', 'summer', null)">＋ Add Summer Activity</button>
      </div>
      <div class="admin-items-grid">
        ${(acts.summer || []).map((a, ai) => `
          <div class="admin-item-card ${a.enabled === false ? 'disabled' : ''}">
            <div class="admin-item-img"><img src="${a.image || defaultImages[a.id] || 'assets/images/trekking-landscape.png'}" alt=""></div>
            <div class="admin-item-info">
              <h4>${a.name}</h4>
              <p>${a.desc}</p>
            </div>
            <div class="admin-item-actions">
              ${toggleBtn(a.enabled, `toggleActivity('summer', ${ai})`)}
              <button class="icon-btn" onclick="openFormModal('activity', 'summer', ${ai})">✏️</button>
              <button class="icon-btn icon-btn--danger" onclick="deleteActivity('summer', ${ai})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ─── SIGHTSEEING EDITOR ──────────────────────────────
function renderSightseeingEditor() {
  const items = SHData.get('sightseeing');
  const el = document.getElementById('sightseeing-editor');
  el.innerHTML = `
    <div class="admin-cat-header">
      <h3>Sightseeing Destinations</h3>
      <button class="add-btn" onclick="openFormModal('sightseeing', null, null)">＋ Add Destination</button>
    </div>
    <div class="admin-items-grid">
      ${items.map((s, si) => `
        <div class="admin-item-card ${s.enabled === false ? 'disabled' : ''}">
          <div class="admin-item-img"><img src="${s.image}" alt=""></div>
          <div class="admin-item-info">
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
            <div class="admin-item-meta">
              <span>🆔 Code: ${s.place}</span>
              <span>📍 Map Label: ${s.label}</span>
            </div>
          </div>
          <div class="admin-item-actions">
            ${toggleBtn(s.enabled, `toggleSight(${si})`)}
            <button class="icon-btn" onclick="openFormModal('sightseeing', null, ${si})">✏️</button>
            <button class="icon-btn icon-btn--danger" onclick="deleteSight(${si})">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── RENTALS EDITOR ──────────────────────────────────
function renderRentalsEditor() {
  const rentals = SHData.get('rentals');
  const el = document.getElementById('rentals-editor');
  el.innerHTML = `
    <div class="admin-cat-header">
      <h3>Gear Rentals</h3>
      <button class="add-btn" onclick="openFormModal('rental', null, null)">＋ Add Rental Item</button>
    </div>
    <div class="admin-items-grid">
      ${rentals.map((r, ri) => `
        <div class="admin-item-card ${r.enabled === false ? 'disabled' : ''}">
          <div class="admin-item-info" style="padding-left:15px;">
            <h4>${r.title} ${r.comingSoon ? '<span style="font-size:10px; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:100px; color:#f59e0b;">Coming Soon</span>' : ''}</h4>
            <p>${r.desc}</p>
          </div>
          <div class="admin-item-actions">
            ${toggleBtn(r.enabled, `toggleRental(${ri})`)}
            <button class="icon-btn" onclick="openFormModal('rental', null, ${ri})">✏️</button>
            <button class="icon-btn icon-btn--danger" onclick="deleteRental(${ri})">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── TOUR PACKAGES EDITOR ─────────────────────────────
function renderPackagesEditor() {
  const pkgs = SHData.get('packages');
  const el = document.getElementById('packages-editor');
  el.innerHTML = `
    <div class="admin-cat-header">
      <h3>Tour Packages</h3>
      <button class="add-btn" onclick="openFormModal('package', null, null)">＋ Add Tour Package</button>
    </div>
    <div class="admin-items-grid">
      ${pkgs.map((p, pi) => `
        <div class="admin-item-card ${p.enabled === false ? 'disabled' : ''}">
          <div class="admin-item-img"><img src="${p.image}" alt=""></div>
          <div class="admin-item-info">
            <h4>${p.title}</h4>
            <p>${p.description}</p>
            <div class="admin-item-meta">
              <span>💰 ${p.price || 'No Price'}</span>
              <span>🏷️ Badge: ${p.badge}</span>
              <span>⏱️ Duration: ${p.duration}</span>
              <span>🛏️ Stay: ${p.accommodation}</span>
            </div>
          </div>
          <div class="admin-item-actions">
            ${toggleBtn(p.enabled, `togglePackage(${pi})`)}
            <button class="icon-btn" onclick="openFormModal('package', null, ${pi})">✏️</button>
            <button class="icon-btn icon-btn--danger" onclick="deletePackage(${pi})">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── TESTIMONIALS EDITOR ─────────────────────────────
function renderTestimonialsEditor() {
  const tms = SHData.get('testimonials');
  const el = document.getElementById('testimonials-editor');
  el.innerHTML = `
    <div class="admin-cat-header">
      <h3>Reviews & Testimonials</h3>
      <button class="add-btn" onclick="openFormModal('testimonial', null, null)">＋ Add Review</button>
    </div>
    <div class="admin-items-grid">
      ${tms.map((t, ti) => `
        <div class="admin-item-card ${t.enabled === false ? 'disabled' : ''}">
          <div class="admin-item-info" style="padding-left:15px;">
            <h4 style="margin-bottom:6px;">${t.name} <span style="font-size:11px; font-weight:normal; color:#888;">(${t.source})</span></h4>
            <p>${t.text}</p>
          </div>
          <div class="admin-item-actions">
            ${toggleBtn(t.enabled, `toggleTestimonial(${ti})`)}
            <button class="icon-btn" onclick="openFormModal('testimonial', null, ${ti})">✏️</button>
            <button class="icon-btn icon-btn--danger" onclick="deleteTestimonial(${ti})">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── TOGGLE AND DELETE IMPLEMENTATIONS ────────────────
function toggleItem(key, ci, ii) {
  const cats = SHData.get(key);
  cats[ci].items[ii].enabled = cats[ci].items[ii].enabled === false ? true : false;
  SHData.set(key, cats);
  if (key === 'skiing') renderSkiingEditor(); else renderSnowboardingEditor();
  toast('Updated status!');
}
function deleteItem(key, ci, ii) {
  if (!confirm('Are you sure you want to delete this package?')) return;
  const cats = SHData.get(key);
  cats[ci].items.splice(ii, 1);
  SHData.set(key, cats);
  if (key === 'skiing') renderSkiingEditor(); else renderSnowboardingEditor();
  toast('Deleted package!', 'red');
}

function toggleTrek(ti) {
  const treks = SHData.get('trekking');
  treks[ti].enabled = treks[ti].enabled === false ? true : false;
  SHData.set('trekking', treks);
  renderTrekkingEditor();
  toast('Updated status!');
}
function deleteTrek(ti) {
  if (!confirm('Are you sure you want to delete this trek?')) return;
  const treks = SHData.get('trekking');
  treks.splice(ti, 1);
  SHData.set('trekking', treks);
  renderTrekkingEditor();
  toast('Deleted trek!', 'red');
}

function toggleActivity(type, ai) {
  const acts = SHData.get('activities');
  acts[type][ai].enabled = acts[type][ai].enabled === false ? true : false;
  SHData.set('activities', acts);
  renderActivitiesEditor();
  toast('Updated status!');
}
function deleteActivity(type, ai) {
  if (!confirm('Are you sure you want to delete this activity?')) return;
  const acts = SHData.get('activities');
  acts[type].splice(ai, 1);
  SHData.set('activities', acts);
  renderActivitiesEditor();
  toast('Deleted activity!', 'red');
}

function toggleSight(si) {
  const items = SHData.get('sightseeing');
  items[si].enabled = items[si].enabled === false ? true : false;
  SHData.set('sightseeing', items);
  renderSightseeingEditor();
  toast('Updated status!');
}
function deleteSight(si) {
  if (!confirm('Are you sure you want to delete this destination?')) return;
  const items = SHData.get('sightseeing');
  items.splice(si, 1);
  SHData.set('sightseeing', items);
  renderSightseeingEditor();
  toast('Deleted destination!', 'red');
}

function toggleRental(ri) {
  const rentals = SHData.get('rentals');
  rentals[ri].enabled = rentals[ri].enabled === false ? true : false;
  SHData.set('rentals', rentals);
  renderRentalsEditor();
  toast('Updated status!');
}
function deleteRental(ri) {
  if (!confirm('Are you sure?')) return;
  const rentals = SHData.get('rentals');
  rentals.splice(ri, 1);
  SHData.set('rentals', rentals);
  renderRentalsEditor();
  toast('Deleted item!', 'red');
}

function togglePackage(pi) {
  const pkgs = SHData.get('packages');
  pkgs[pi].enabled = pkgs[pi].enabled === false ? true : false;
  SHData.set('packages', pkgs);
  renderPackagesEditor();
  toast('Updated status!');
}
function deletePackage(pi) {
  if (!confirm('Are you sure?')) return;
  const pkgs = SHData.get('packages');
  pkgs.splice(pi, 1);
  SHData.set('packages', pkgs);
  renderPackagesEditor();
  toast('Deleted tour package!', 'red');
}

function toggleTestimonial(ti) {
  const tms = SHData.get('testimonials');
  tms[ti].enabled = tms[ti].enabled === false ? true : false;
  SHData.set('testimonials', tms);
  renderTestimonialsEditor();
  toast('Updated status!');
}
function deleteTestimonial(ti) {
  if (!confirm('Are you sure?')) return;
  const tms = SHData.get('testimonials');
  tms.splice(ti, 1);
  SHData.set('testimonials', tms);
  renderTestimonialsEditor();
  toast('Deleted review!', 'red');
}

// ─── SETTINGS EDITOR ──────────────────────────────────
function loadSettings() {
  const s = SHData.get('settings');
  const wa = document.getElementById('s-whatsapp');
  const title = document.getElementById('s-heroTitle');
  const sub = document.getElementById('s-heroSubtitle');
  const video = document.getElementById('s-heroVideo');
  const copy = document.getElementById('s-copyright');

  if (wa) wa.value = s.whatsappNumber || '';
  if (title) title.value = s.heroTitle || '';
  if (sub) sub.value = s.heroSubtitle || '';
  if (video) video.value = s.heroVideoUrl || '';
  if (copy) copy.value = s.footerCopyright || '';
}

function saveSettings(e) {
  if (e) e.preventDefault();
  const s = {
    whatsappNumber: document.getElementById('s-whatsapp')?.value?.trim() || '',
    heroTitle: document.getElementById('s-heroTitle')?.value?.trim() || '',
    heroSubtitle: document.getElementById('s-heroSubtitle')?.value?.trim() || '',
    heroVideoUrl: document.getElementById('s-heroVideo')?.value?.trim() || '',
    footerCopyright: document.getElementById('s-copyright')?.value?.trim() || ''
  };
  SHData.set('settings', s);
  toast('✅ Settings saved successfully!');
}

// ─── MODAL CONTROLLER ─────────────────────────────────
let _modalCtx = null;
function openFormModal(type, ctx1, ctx2) {
  _modalCtx = { type, ctx1, ctx2 };
  const body = document.getElementById('modal-body');
  const title = document.getElementById('modal-title');

  let html = '';
  let item = null;

  if (type === 'ski-item' || type === 'sb-item') {
    const dataKey = type === 'ski-item' ? 'skiing' : 'snowboarding';
    const cats = SHData.get(dataKey);
    const cat = cats[ctx1];
    item = ctx2 !== null ? cat.items[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit: ${item.title}` : `Add to "${cat.title}"`;
    html = packageForm(item);
  } else if (type === 'trek') {
    const treks = SHData.get('trekking');
    item = ctx2 !== null ? treks[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit: ${item.title}` : 'Add New Trek';
    html = trekForm(item);
  } else if (type === 'activity') {
    const acts = SHData.get('activities');
    item = ctx2 !== null ? acts[ctx1][ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit Activity` : `Add ${ctx1 === 'winter' ? 'Winter' : 'Summer'} Activity`;
    html = activityForm(item);
  } else if (type === 'sightseeing') {
    const items = SHData.get('sightseeing');
    item = ctx2 !== null ? items[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit: ${item.title}` : 'Add Destination';
    html = sightseeingForm(item);
  } else if (type === 'rental') {
    const rentals = SHData.get('rentals');
    item = ctx2 !== null ? rentals[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit: ${item.title}` : 'Add Rental Item';
    html = rentalForm(item);
  } else if (type === 'package') {
    const pkgs = SHData.get('packages');
    item = ctx2 !== null ? pkgs[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit: ${item.title}` : 'Add Tour Package';
    html = tourPackageForm(item);
  } else if (type === 'testimonial') {
    const tms = SHData.get('testimonials');
    item = ctx2 !== null ? tms[ctx2] : {};
    title.textContent = ctx2 !== null ? `Edit Review` : 'Add Review';
    html = testimonialForm(item);
  }

  body.innerHTML = html;
  document.getElementById('modalBackdrop').classList.add('open');
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  _modalCtx = null;
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'modalBackdrop') closeModal();
}

function v(id) { return document.getElementById(id)?.value?.trim() || ''; }
function vc(id) { return document.getElementById(id)?.checked || false; }

function saveModal() {
  const { type, ctx1, ctx2 } = _modalCtx;

  if (type === 'ski-item' || type === 'sb-item') {
    const dataKey = type === 'ski-item' ? 'skiing' : 'snowboarding';
    const cats = SHData.get(dataKey);
    const existing = ctx2 !== null ? cats[ctx1].items[ctx2] : {};
    const newItem = {
      id: ctx2 !== null ? existing.id : 'item-' + Date.now(),
      enabled: existing.enabled !== false,
      title: v('f-title'), description: v('f-desc'), badge: v('f-badge'),
      price: v('f-price'),
      meta1: v('f-meta1'), meta2: v('f-meta2'), meta3: v('f-meta3'),
      includes: v('f-includes'), image: v('f-image'), waMsg: v('f-wamsg')
    };
    if (!newItem.title) { toast('Title is required!', 'red'); return; }
    if (ctx2 !== null) cats[ctx1].items[ctx2] = newItem;
    else cats[ctx1].items.push(newItem);
    SHData.set(dataKey, cats);
    if (type === 'ski-item') renderSkiingEditor(); else renderSnowboardingEditor();
  }

  else if (type === 'trek') {
    const treks = SHData.get('trekking');
    const existing = ctx2 !== null ? treks[ctx2] : {};
    const newT = {
      id: ctx2 !== null ? existing.id : 'trek-' + Date.now(),
      enabled: existing.enabled !== false,
      title: v('f-title'), description: v('f-desc'),
      price: v('f-price'),
      difficulty: v('f-difficulty'), difficultyClass: v('f-difficulty').toLowerCase(),
      days: v('f-days'), altitude: v('f-altitude'), distance: v('f-distance'),
      season: v('f-season'), highlights: v('f-highlights'),
      image: v('f-image'), waMsg: v('f-wamsg')
    };
    if (!newT.title) { toast('Title is required!', 'red'); return; }
    if (ctx2 !== null) treks[ctx2] = newT; else treks.push(newT);
    SHData.set('trekking', treks);
    renderTrekkingEditor();
  }

  else if (type === 'activity') {
    const acts = SHData.get('activities');
    const existing = ctx2 !== null ? acts[ctx1][ctx2] : {};
    const newA = {
      id: ctx2 !== null ? existing.id : 'act-' + Date.now(),
      enabled: existing.enabled !== false,
      name: v('f-name'), desc: v('f-desc'), image: v('f-image')
    };
    if (!newA.name) { toast('Name is required!', 'red'); return; }
    if (ctx2 !== null) acts[ctx1][ctx2] = newA; else acts[ctx1].push(newA);
    SHData.set('activities', acts);
    renderActivitiesEditor();
  }

  else if (type === 'sightseeing') {
    const items = SHData.get('sightseeing');
    const existing = ctx2 !== null ? items[ctx2] : {};
    const newS = {
      id: ctx2 !== null ? existing.id : 'sg-' + Date.now(),
      enabled: existing.enabled !== false,
      place: v('f-place'), label: v('f-label'), title: v('f-title'),
      desc: v('f-desc'), image: v('f-image')
    };
    if (!newS.title) { toast('Title is required!', 'red'); return; }
    if (ctx2 !== null) items[ctx2] = newS; else items.push(newS);
    SHData.set('sightseeing', items);
    renderSightseeingEditor();
  }

  else if (type === 'rental') {
    const rentals = SHData.get('rentals');
    const existing = ctx2 !== null ? rentals[ctx2] : {};
    const newR = {
      id: ctx2 !== null ? existing.id : 'ren-' + Date.now(),
      enabled: existing.enabled !== false,
      title: v('f-title'), desc: v('f-desc'),
      comingSoon: vc('f-coming-soon')
    };
    if (!newR.title) { toast('Title is required!', 'red'); return; }
    if (ctx2 !== null) rentals[ctx2] = newR; else rentals.push(newR);
    SHData.set('rentals', rentals);
    renderRentalsEditor();
  }

  else if (type === 'package') {
    const pkgs = SHData.get('packages');
    const existing = ctx2 !== null ? pkgs[ctx2] : {};
    const newP = {
      id: ctx2 !== null ? existing.id : 'pkg-' + Date.now(),
      enabled: existing.enabled !== false,
      title: v('f-title'), description: v('f-desc'), badge: v('f-badge'),
      price: v('f-price'),
      duration: v('f-duration'), accommodation: v('f-accommodation'),
      transport: v('f-transport'), meals: v('f-meals'),
      destinations: v('f-destinations'), includes: v('f-includes'),
      image: v('f-image'), waMsg: v('f-wamsg')
    };
    if (!newP.title) { toast('Title is required!', 'red'); return; }
    if (ctx2 !== null) pkgs[ctx2] = newP; else pkgs.push(newP);
    SHData.set('packages', pkgs);
    renderPackagesEditor();
  }

  else if (type === 'testimonial') {
    const tms = SHData.get('testimonials');
    const existing = ctx2 !== null ? tms[ctx2] : {};
    const newTm = {
      id: ctx2 !== null ? existing.id : 'tm-' + Date.now(),
      enabled: existing.enabled !== false,
      initials: v('f-initials'), name: v('f-name'),
      source: v('f-source'), text: v('f-text')
    };
    if (!newTm.name || !newTm.text) { toast('Name and review text are required!', 'red'); return; }
    if (ctx2 !== null) tms[ctx2] = newTm; else tms.push(newTm);
    SHData.set('testimonials', tms);
    renderTestimonialsEditor();
  }

  toast('✅ Saved successfully!');
  closeModal();
  renderDashboard();
}

// ─── FORM TEMPLATES ──────────────────────────────────
function f(label, id, val = '', type = 'text', placeholder = '') {
  return `<div class="field"><label>${label}</label><input type="${type}" id="${id}" value="${escHtml(val)}" placeholder="${placeholder}"></div>`;
}
function ft(label, id, val = '', rows = 3) {
  return `<div class="field"><label>${label}</label><textarea id="${id}" rows="${rows}">${escHtml(val)}</textarea></div>`;
}
function escHtml(s) { return String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ─── IMAGE UPLOAD FIELD ──────────────────────────────
function imageUploadField(fieldId, val) {
  const hasVal = val && val.length > 0;
  return `<div class="field">
    <label>Image</label>
    <div class="img-upload-row">
      <input type="text" id="${fieldId}" value="${escHtml(val || '')}" placeholder="assets/images/... or click 📁 Import" oninput="updateImgPreview('${fieldId}')">
      <button type="button" class="import-btn" onclick="triggerImageUpload('${fieldId}')">📁 Import from PC</button>
      <input type="file" id="${fieldId}-file" accept="image/*" style="display:none" onchange="handleImageUpload('${fieldId}')">
    </div>
    <div class="img-preview" id="${fieldId}-preview" style="${hasVal ? '' : 'display:none'}">
      <img src="${escHtml(val || '')}" alt="Preview" onerror="this.parentElement.style.display='none'">
    </div>
  </div>`;
}

function triggerImageUpload(fieldId) {
  document.getElementById(fieldId + '-file')?.click();
}

function handleImageUpload(fieldId) {
  const file = document.getElementById(fieldId + '-file')?.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) {
    toast('⚠️ Image is large (>3MB). It will be stored as base64.', 'blue');
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const input = document.getElementById(fieldId);
    if (input) input.value = dataUrl;
    const preview = document.getElementById(fieldId + '-preview');
    if (preview) {
      preview.style.display = 'block';
      const img = preview.querySelector('img');
      if (img) img.src = dataUrl;
    }
    toast('✅ Image imported from PC!', 'green');
  };
  reader.readAsDataURL(file);
}

function updateImgPreview(fieldId) {
  const val = document.getElementById(fieldId)?.value || '';
  const preview = document.getElementById(fieldId + '-preview');
  if (!preview) return;
  if (val) {
    preview.style.display = 'block';
    const img = preview.querySelector('img');
    if (img) img.src = val;
  } else {
    preview.style.display = 'none';
  }
}

// ─── TAG MANAGER (type & press Enter) ──────────────────────
function tagManagerField(fieldId, val, labelText = 'Includes / Tags') {
  const tags = (val || '').split(',').filter(Boolean).map(t => t.trim());
  const pillsHtml = tags.map(t =>
    `<span class="tag-pill">${escHtml(t)}<button type="button" onclick="removeTag('${fieldId}','${escHtml(t).replace(/'/g, '\\&apos;')}')">×</button></span>`
  ).join('');
  return `<div class="field">
    <label>${labelText}</label>
    <input type="hidden" id="${fieldId}" value="${escHtml(val || '')}">
    <div class="tag-container" id="${fieldId}-tags">${pillsHtml || '<span class="tag-placeholder">Type a tag below and press Enter to add...</span>'}</div>
    <div class="tag-add-row">
      <input type="text" id="${fieldId}-custom" placeholder="Type tag name and press Enter..." class="tag-custom-input"
        onkeydown="if(event.key==='Enter'||event.key===','){event.preventDefault();addCustomTag('${fieldId}');}">
      <button type="button" class="tag-add-btn" onclick="addCustomTag('${fieldId}')">＋ Add</button>
    </div>
  </div>`;
}

function _getTags(id) {
  const val = document.getElementById(id)?.value || '';
  return val.split(',').filter(Boolean).map(t => t.trim());
}

function _setTags(id, tags) {
  const input = document.getElementById(id);
  if (input) input.value = tags.join(',');
  const container = document.getElementById(id + '-tags');
  if (!container) return;
  if (tags.length === 0) {
    container.innerHTML = '<span class="tag-placeholder">Type a tag below and press Enter to add...</span>';
    return;
  }
  container.innerHTML = tags.map(t =>
    `<span class="tag-pill">${escHtml(t)}<button type="button" onclick="removeTag('${id}','${escHtml(t).replace(/'/g, '\\&apos;')}')">×</button></span>`
  ).join('');
}

function addCustomTag(id) {
  const input = document.getElementById(id + '-custom');
  const val = input?.value?.trim();
  if (!val) return;
  const tags = _getTags(id);
  if (!tags.includes(val)) { tags.push(val); _setTags(id, tags); }
  if (input) input.value = '';
}

function removeTag(id, tag) {
  const tags = _getTags(id).filter(t => t !== tag);
  _setTags(id, tags);
}

// ─── FORM BUILDERS ───────────────────────────────────
function packageForm(item) {
  return `
    <div class="form-row">${f('Package Title *','f-title', item.title)}<div class="field"><label>Badge (e.g. Beginner, Elite)</label><input type="text" id="f-badge" value="${escHtml(item.badge||'')}"></div></div>
    ${ft('Description *','f-desc', item.description, 4)}
    <div class="form-row">${f('Price (e.g. ₹15,000)','f-price', item.price || '')}${f('Duration (meta 1)','f-meta1',item.meta1)}</div>
    <div class="form-row">${f('Level/Type (meta 2)','f-meta2',item.meta2)}${f('Extra Info (meta 3)','f-meta3',item.meta3)}</div>
    ${tagManagerField('f-includes', item.includes)}
    ${imageUploadField('f-image', item.image)}
    ${f('WhatsApp Message','f-wamsg', item.waMsg,'text',"I'm interested in...")}`;
}

function trekForm(item) {
  return `
    ${f('Trek Name *','f-title', item.title)}
    ${ft('Description *','f-desc', item.description, 4)}
    <div class="form-row">
      ${f('Price (e.g. ₹16,500)','f-price', item.price || '')}
      ${f('Season (e.g. Jun – Sep)','f-season', item.season)}
    </div>
    <div class="form-row">
      <div class="field"><label>Difficulty *</label><select id="f-difficulty" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;padding:11px 14px;width:100%;font-size:14px;outline:none;">
        <option value="Easy" ${item.difficulty==='Easy'?'selected':''}>Easy</option>
        <option value="Moderate" ${item.difficulty==='Moderate'?'selected':''}>Moderate</option>
        <option value="Challenging" ${item.difficulty==='Challenging'?'selected':''}>Challenging</option>
      </select></div>
      ${f('Duration (e.g. 7 Days / 6 Nights)','f-days', item.days)}
    </div>
    <div class="form-row">
      ${f('Max Altitude (e.g. 3,800m Max Altitude)','f-altitude', item.altitude)}
      ${f('Distance (e.g. 72 km Distance)','f-distance', item.distance)}
    </div>
    ${tagManagerField('f-highlights', item.highlights, 'Trek Highlights')}
    ${imageUploadField('f-image', item.image)}
    ${f('WhatsApp Message','f-wamsg', item.waMsg,'text',"I'm interested in...")}`;
}

function activityForm(item) {
  return `
    ${f('Activity Name *','f-name', item.name)}
    ${f('Short Description','f-desc', item.desc)}
    ${imageUploadField('f-image', item.image)}`;
}

function sightseeingForm(item) {
  return `
    ${f('Place ID (e.g. gulmarg)','f-place', item.place)}
    ${f('Map Label','f-label', item.label)}
    ${f('Display Title *','f-title', item.title)}
    ${ft('Description','f-desc', item.desc, 3)}
    ${imageUploadField('f-image', item.image)}`;
}

function rentalForm(item) {
  return `
    ${f('Rental Item Title *','f-title', item.title)}
    ${f('Description','f-desc', item.desc)}
    <div class="field">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
        <input type="checkbox" id="f-coming-soon" ${item.comingSoon?'checked':''} style="width:auto;accent-color:#3b82f6;">
        Mark as "Coming Soon"
      </label>
    </div>`;
}

function tourPackageForm(item) {
  return `
    <div class="form-row">${f('Package Title *','f-title', item.title)}<div class="field"><label>Badge</label><input type="text" id="f-badge" value="${escHtml(item.badge||'')}"></div></div>
    ${ft('Description *','f-desc', item.description, 4)}
    <div class="form-row">
      ${f('Price (e.g. ₹65,000)','f-price', item.price || '')}
      ${f('Duration (e.g. 7N / 8D)','f-duration', item.duration)}
    </div>
    <div class="form-row">
      ${f('Accommodation (e.g. 5-Star Hotels)','f-accommodation', item.accommodation)}
      ${f('Transport (e.g. Luxury SUV)','f-transport', item.transport)}
    </div>
    <div class="form-row">
      ${f('Meals (e.g. All Meals)','f-meals', item.meals)}
      ${f('Destinations (comma-separated)','f-destinations', item.destinations,'text','e.g. Srinagar,Gulmarg,Pahalgam')}
    </div>
    ${tagManagerField('f-includes', item.includes)}
    ${imageUploadField('f-image', item.image)}
    ${f('WhatsApp Message','f-wamsg', item.waMsg,'text',"I'm interested in...")}`;
}

function testimonialForm(item) {
  return `
    <div class="form-row">
      ${f('Reviewer Name *','f-name', item.name)}
      ${f('Initials (e.g. AK)','f-initials', item.initials,'text','AK')}
    </div>
    ${f('Source (e.g. Google Review ★ 5.0)','f-source', item.source)}
    ${ft('Review Text *','f-text', item.text, 5)}`;
}

// ─── BOOT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('sh_admin') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    initAdmin();
  }
});
