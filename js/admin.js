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
  const isOn = enabled !== false; // default to enabled if undefined
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
        <span class="admin-cat-title">📁 ${cat.title}</span>
        <button class="cat-add-btn" onclick="openModal('ski-item', ${ci}, null)">+ Add Package</button>
      </div>
      <div class="items-list">
        ${cat.items.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📭</div>No packages yet. Click "Add Package" to get started.</div>' : ''}
        ${cat.items.map((item, ii) => `
          <div class="item-row ${item.enabled === false ? 'item-row--disabled' : ''}" id="ski-row-${ci}-${ii}">
            <img class="item-thumb" src="${item.image}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 70\\'%3E%3Crect width=\\'100\\' height=\\'70\\' fill=\\'%23161e35\\'/%3E%3C/svg%3E'" alt="">
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-meta">${item.meta1} · ${item.meta2}</div>
            </div>
            <span class="item-badge">${item.badge}</span>
            ${item.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}
            <div class="item-actions">
              <button class="icon-btn icon-btn--up" title="Move Up" onclick="moveSki(${ci},${ii},-1)">↑</button>
              <button class="icon-btn icon-btn--down" title="Move Down" onclick="moveSki(${ci},${ii},1)">↓</button>
              ${toggleBtn(item.enabled, `toggleSki(${ci},${ii})`)}
              <button class="icon-btn icon-btn--edit" title="Edit" onclick="openModal('ski-item', ${ci}, ${ii})">✏️</button>
              <button class="icon-btn icon-btn--delete" title="Delete" onclick="deleteSki(${ci},${ii})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function toggleSki(ci, ii) {
  const cats = SHData.get('skiing');
  const item = cats[ci].items[ii];
  item.enabled = item.enabled === false ? true : false;
  SHData.set('skiing', cats);
  renderSkiingEditor();
  toast(item.enabled ? '✅ Package enabled — showing on site' : '🚫 Package disabled — hidden from site', item.enabled ? 'green' : 'blue');
}

function moveSki(ci, ii, dir) {
  const cats = SHData.get('skiing');
  const items = cats[ci].items;
  const ni = ii + dir;
  if (ni < 0 || ni >= items.length) return;
  [items[ii], items[ni]] = [items[ni], items[ii]];
  SHData.set('skiing', cats);
  renderSkiingEditor();
  toast('Reordered ✓');
}

function deleteSki(ci, ii) {
  if (!confirm('Delete this skiing package?')) return;
  const cats = SHData.get('skiing');
  cats[ci].items.splice(ii, 1);
  SHData.set('skiing', cats);
  renderSkiingEditor();
  toast('Deleted ✓', 'red');
}

// ─── SNOWBOARDING EDITOR ─────────────────────────────
function renderSnowboardingEditor() {
  const cats = SHData.get('snowboarding');
  const el = document.getElementById('snowboarding-editor');
  el.innerHTML = cats.map((cat, ci) => `
    <div class="admin-category">
      <div class="admin-cat-header">
        <span class="admin-cat-title">📁 ${cat.title}</span>
        <button class="cat-add-btn" onclick="openModal('sb-item', ${ci}, null)">+ Add Package</button>
      </div>
      <div class="items-list">
        ${cat.items.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📭</div>No packages yet.</div>' : ''}
        ${cat.items.map((item, ii) => `
          <div class="item-row ${item.enabled === false ? 'item-row--disabled' : ''}">
            <img class="item-thumb" src="${item.image}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 70\\'%3E%3Crect width=\\'100\\' height=\\'70\\' fill=\\'%23161e35\\'/%3E%3C/svg%3E'" alt="">
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-meta">${item.meta1} · ${item.meta2}</div>
            </div>
            <span class="item-badge">${item.badge}</span>
            ${item.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}
            <div class="item-actions">
              <button class="icon-btn icon-btn--up" onclick="moveSb(${ci},${ii},-1)">↑</button>
              <button class="icon-btn icon-btn--down" onclick="moveSb(${ci},${ii},1)">↓</button>
              ${toggleBtn(item.enabled, `toggleSb(${ci},${ii})`)}
              <button class="icon-btn icon-btn--edit" onclick="openModal('sb-item', ${ci}, ${ii})">✏️</button>
              <button class="icon-btn icon-btn--delete" onclick="deleteSb(${ci},${ii})">🗑️</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function toggleSb(ci, ii) {
  const cats = SHData.get('snowboarding');
  const item = cats[ci].items[ii];
  item.enabled = item.enabled === false ? true : false;
  SHData.set('snowboarding', cats);
  renderSnowboardingEditor();
  toast(item.enabled ? '✅ Package enabled — showing on site' : '🚫 Package disabled — hidden from site', item.enabled ? 'green' : 'blue');
}

function moveSb(ci, ii, dir) {
  const cats = SHData.get('snowboarding');
  const items = cats[ci].items;
  const ni = ii + dir;
  if (ni < 0 || ni >= items.length) return;
  [items[ii], items[ni]] = [items[ni], items[ii]];
  SHData.set('snowboarding', cats);
  renderSnowboardingEditor();
  toast('Reordered ✓');
}

function deleteSb(ci, ii) {
  if (!confirm('Delete this snowboarding package?')) return;
  const cats = SHData.get('snowboarding');
  cats[ci].items.splice(ii, 1);
  SHData.set('snowboarding', cats);
  renderSnowboardingEditor();
  toast('Deleted ✓', 'red');
}

// ─── TREKKING EDITOR ─────────────────────────────────
function renderTrekkingEditor() {
  const treks = SHData.get('trekking');
  const el = document.getElementById('trekking-editor');
  if (treks.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🥾</div>No treks yet. Click "Add Trek" to get started.</div>'; return;
  }
  el.innerHTML = treks.map((t, i) => `
    <div class="simple-row ${t.enabled === false ? 'item-row--disabled' : ''}">
      <img class="item-thumb" src="${t.image}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 70\\'%3E%3Crect width=\\'100\\' height=\\'70\\' fill=\\'%23161e35\\'/%3E%3C/svg%3E'" alt="">
      <div class="simple-row-info">
        <div class="simple-row-title">${t.title} ${t.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}</div>
        <div class="simple-row-desc">${t.days} · ${t.altitude} · ${t.distance}</div>
      </div>
      <span class="diff-tag diff-tag--${t.difficultyClass}">${t.difficulty}</span>
      <div class="item-actions">
        <button class="icon-btn icon-btn--up" onclick="moveTrek(${i},-1)">↑</button>
        <button class="icon-btn icon-btn--down" onclick="moveTrek(${i},1)">↓</button>
        ${toggleBtn(t.enabled, `toggleTrek(${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('trek',null,${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deleteTrek(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleTrek(i) {
  const treks = SHData.get('trekking');
  treks[i].enabled = treks[i].enabled === false ? true : false;
  SHData.set('trekking', treks);
  renderTrekkingEditor();
  toast(treks[i].enabled ? '✅ Trek enabled — showing on site' : '🚫 Trek disabled — hidden from site', treks[i].enabled ? 'green' : 'blue');
}

function moveTrek(i, dir) {
  const treks = SHData.get('trekking');
  const ni = i + dir;
  if (ni < 0 || ni >= treks.length) return;
  [treks[i], treks[ni]] = [treks[ni], treks[i]];
  SHData.set('trekking', treks);
  renderTrekkingEditor();
  toast('Reordered ✓');
}

function deleteTrek(i) {
  if (!confirm('Delete this trek?')) return;
  const treks = SHData.get('trekking');
  treks.splice(i, 1);
  SHData.set('trekking', treks);
  renderTrekkingEditor();
  toast('Deleted ✓', 'red');
}

// ─── ACTIVITIES EDITOR ───────────────────────────────
function renderActivitiesEditor() {
  const { winter, summer } = SHData.get('activities');
  renderActivityList('winter-activities-editor', winter, 'winter');
  renderActivityList('summer-activities-editor', summer, 'summer');
}

function renderActivityList(elId, items, season) {
  const el = document.getElementById(elId);
  if (!items || items.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎯</div>No activities yet.</div>'; return;
  }
  el.innerHTML = items.map((a, i) => `
    <div class="simple-row ${a.enabled === false ? 'item-row--disabled' : ''}">
      <div class="simple-row-info">
        <div class="simple-row-title">${a.name} ${a.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}</div>
        <div class="simple-row-desc">${a.desc}</div>
      </div>
      <div class="item-actions">
        <button class="icon-btn icon-btn--up" onclick="moveActivity('${season}',${i},-1)">↑</button>
        <button class="icon-btn icon-btn--down" onclick="moveActivity('${season}',${i},1)">↓</button>
        ${toggleBtn(a.enabled, `toggleActivity('${season}',${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('activity','${season}',${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deleteActivity('${season}',${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleActivity(season, i) {
  const acts = SHData.get('activities');
  const item = acts[season][i];
  item.enabled = item.enabled === false ? true : false;
  SHData.set('activities', acts);
  renderActivitiesEditor();
  toast(item.enabled ? '✅ Activity enabled — showing on site' : '🚫 Activity disabled — hidden from site', item.enabled ? 'green' : 'blue');
}

function moveActivity(season, i, dir) {
  const acts = SHData.get('activities');
  const arr = acts[season];
  const ni = i + dir;
  if (ni < 0 || ni >= arr.length) return;
  [arr[i], arr[ni]] = [arr[ni], arr[i]];
  SHData.set('activities', acts);
  renderActivitiesEditor();
  toast('Reordered ✓');
}

function deleteActivity(season, i) {
  if (!confirm('Delete this activity?')) return;
  const acts = SHData.get('activities');
  acts[season].splice(i, 1);
  SHData.set('activities', acts);
  renderActivitiesEditor();
  toast('Deleted ✓', 'red');
}

// ─── SIGHTSEEING EDITOR ──────────────────────────────
function renderSightseeingEditor() {
  const items = SHData.get('sightseeing');
  const el = document.getElementById('sightseeing-editor');
  if (items.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📍</div>No destinations yet.</div>'; return;
  }
  el.innerHTML = items.map((s, i) => `
    <div class="simple-row ${s.enabled === false ? 'item-row--disabled' : ''}">
      <img class="item-thumb" src="${s.image}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 70\\'%3E%3Crect width=\\'100\\' height=\\'70\\' fill=\\'%23161e35\\'/%3E%3C/svg%3E'" alt="">
      <div class="simple-row-info">
        <div class="simple-row-title">${s.title} ${s.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}</div>
        <div class="simple-row-desc">${s.desc.substring(0, 80)}...</div>
      </div>
      <div class="item-actions">
        ${toggleBtn(s.enabled, `toggleSightseeing(${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('sightseeing',null,${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deleteSightseeing(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleSightseeing(i) {
  const items = SHData.get('sightseeing');
  items[i].enabled = items[i].enabled === false ? true : false;
  SHData.set('sightseeing', items);
  renderSightseeingEditor();
  toast(items[i].enabled ? '✅ Destination enabled' : '🚫 Destination hidden from site', items[i].enabled ? 'green' : 'blue');
}

function deleteSightseeing(i) {
  if (!confirm('Delete this destination?')) return;
  const items = SHData.get('sightseeing');
  items.splice(i, 1);
  SHData.set('sightseeing', items);
  renderSightseeingEditor();
  toast('Deleted ✓', 'red');
}

// ─── RENTALS EDITOR ──────────────────────────────────
function renderRentalsEditor() {
  const rentals = SHData.get('rentals');
  const el = document.getElementById('rentals-editor');
  if (rentals.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎿</div>No rentals yet.</div>'; return;
  }
  el.innerHTML = rentals.map((r, i) => `
    <div class="simple-row ${r.enabled === false ? 'item-row--disabled' : ''}">
      <div class="simple-row-info">
        <div class="simple-row-title">${r.title} ${r.comingSoon ? '<span class="item-badge" style="background:rgba(245,158,11,0.15);color:#fbbf24">Coming Soon</span>' : ''} ${r.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}</div>
        <div class="simple-row-desc">${r.desc}</div>
      </div>
      <div class="item-actions">
        <button class="icon-btn icon-btn--up" onclick="moveRental(${i},-1)">↑</button>
        <button class="icon-btn icon-btn--down" onclick="moveRental(${i},1)">↓</button>
        ${toggleBtn(r.enabled, `toggleRental(${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('rental',null,${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deleteRental(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleRental(i) {
  const rentals = SHData.get('rentals');
  rentals[i].enabled = rentals[i].enabled === false ? true : false;
  SHData.set('rentals', rentals);
  renderRentalsEditor();
  toast(rentals[i].enabled ? '✅ Rental enabled — showing on site' : '🚫 Rental disabled — hidden from site', rentals[i].enabled ? 'green' : 'blue');
}

function moveRental(i, dir) {
  const rentals = SHData.get('rentals');
  const ni = i + dir;
  if (ni < 0 || ni >= rentals.length) return;
  [rentals[i], rentals[ni]] = [rentals[ni], rentals[i]];
  SHData.set('rentals', rentals);
  renderRentalsEditor();
  toast('Reordered ✓');
}

function deleteRental(i) {
  if (!confirm('Delete this rental item?')) return;
  const rentals = SHData.get('rentals');
  rentals.splice(i, 1);
  SHData.set('rentals', rentals);
  renderRentalsEditor();
  toast('Deleted ✓', 'red');
}

// ─── PACKAGES EDITOR ─────────────────────────────────
function renderPackagesEditor() {
  const pkgs = SHData.get('packages');
  const el = document.getElementById('packages-editor');
  if (pkgs.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div>No packages yet.</div>'; return;
  }
  el.innerHTML = pkgs.map((p, i) => `
    <div class="item-row ${p.enabled === false ? 'item-row--disabled' : ''}">
      <img class="item-thumb" src="${p.image}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 70\\'%3E%3Crect width=\\'100\\' height=\\'70\\' fill=\\'%23161e35\\'/%3E%3C/svg%3E'" alt="">
      <div class="item-info">
        <div class="item-title">${p.title}</div>
        <div class="item-meta">${p.duration} · ${p.accommodation}</div>
      </div>
      <span class="item-badge">${p.badge}</span>
      ${p.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}
      <div class="item-actions">
        <button class="icon-btn icon-btn--up" onclick="movePackage(${i},-1)">↑</button>
        <button class="icon-btn icon-btn--down" onclick="movePackage(${i},1)">↓</button>
        ${toggleBtn(p.enabled, `togglePackage(${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('package',null,${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deletePackage(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function togglePackage(i) {
  const pkgs = SHData.get('packages');
  pkgs[i].enabled = pkgs[i].enabled === false ? true : false;
  SHData.set('packages', pkgs);
  renderPackagesEditor();
  toast(pkgs[i].enabled ? '✅ Package enabled — showing on site' : '🚫 Package disabled — hidden from site', pkgs[i].enabled ? 'green' : 'blue');
}

function movePackage(i, dir) {
  const pkgs = SHData.get('packages');
  const ni = i + dir;
  if (ni < 0 || ni >= pkgs.length) return;
  [pkgs[i], pkgs[ni]] = [pkgs[ni], pkgs[i]];
  SHData.set('packages', pkgs);
  renderPackagesEditor();
  toast('Reordered ✓');
}

function deletePackage(i) {
  if (!confirm('Delete this package?')) return;
  const pkgs = SHData.get('packages');
  pkgs.splice(i, 1);
  SHData.set('packages', pkgs);
  renderPackagesEditor();
  toast('Deleted ✓', 'red');
}

// ─── TESTIMONIALS EDITOR ─────────────────────────────
function renderTestimonialsEditor() {
  const tms = SHData.get('testimonials');
  const el = document.getElementById('testimonials-editor');
  if (tms.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💬</div>No testimonials yet.</div>'; return;
  }
  el.innerHTML = tms.map((t, i) => `
    <div class="simple-row ${t.enabled === false ? 'item-row--disabled' : ''}">
      <div class="simple-row-info" style="display:flex;align-items:center;gap:12px">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0">${t.initials}</div>
        <div>
          <div class="simple-row-title">${t.name} — <span style="color:#fbbf24;font-size:12px">★★★★★</span> ${t.enabled === false ? '<span class="disabled-badge">Hidden</span>' : ''}</div>
          <div class="simple-row-desc">${t.text.substring(0,80)}...</div>
        </div>
      </div>
      <div class="item-actions">
        <button class="icon-btn icon-btn--up" onclick="moveTestimonial(${i},-1)">↑</button>
        <button class="icon-btn icon-btn--down" onclick="moveTestimonial(${i},1)">↓</button>
        ${toggleBtn(t.enabled, `toggleTestimonial(${i})`)}
        <button class="icon-btn icon-btn--edit" onclick="openModal('testimonial',null,${i})">✏️</button>
        <button class="icon-btn icon-btn--delete" onclick="deleteTestimonial(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleTestimonial(i) {
  const tms = SHData.get('testimonials');
  tms[i].enabled = tms[i].enabled === false ? true : false;
  SHData.set('testimonials', tms);
  renderTestimonialsEditor();
  toast(tms[i].enabled ? '✅ Review enabled — showing on site' : '🚫 Review disabled — hidden from site', tms[i].enabled ? 'green' : 'blue');
}

function moveTestimonial(i, dir) {
  const tms = SHData.get('testimonials');
  const ni = i + dir;
  if (ni < 0 || ni >= tms.length) return;
  [tms[i], tms[ni]] = [tms[ni], tms[i]];
  SHData.set('testimonials', tms);
  renderTestimonialsEditor();
  toast('Reordered ✓');
}

function deleteTestimonial(i) {
  if (!confirm('Delete this testimonial?')) return;
  const tms = SHData.get('testimonials');
  tms.splice(i, 1);
  SHData.set('testimonials', tms);
  renderTestimonialsEditor();
  toast('Deleted ✓', 'red');
}

// ─── SETTINGS ────────────────────────────────────────
function loadSettings() {
  const s = SHData.get('settings');
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('s-whatsapp', s.whatsappNumber);
  set('s-heroTitle', s.heroTitle);
  set('s-heroSubtitle', s.heroSubtitle);
  set('s-heroVideo', s.heroVideoUrl);
  set('s-copyright', s.footerCopyright);
}

function saveSettings() {
  const g = id => document.getElementById(id)?.value || '';
  const s = SHData.get('settings');
  s.whatsappNumber = g('s-whatsapp');
  s.heroTitle = g('s-heroTitle');
  s.heroSubtitle = g('s-heroSubtitle');
  s.heroVideoUrl = g('s-heroVideo');
  s.footerCopyright = g('s-copyright');
  SHData.set('settings', s);
  toast('✅ Settings saved!');
}

// ─── MODAL SYSTEM ─────────────────────────────────────
let _modalCtx = null;

function openModal(type, ctx1, ctx2) {
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
    <div class="form-row">${f('Duration (meta 1)','f-meta1',item.meta1)}${f('Level/Type (meta 2)','f-meta2',item.meta2)}</div>
    <div class="form-row full">${f('Extra Info (meta 3)','f-meta3',item.meta3)}</div>
    ${tagManagerField('f-includes', item.includes)}
    ${imageUploadField('f-image', item.image)}
    ${f('WhatsApp Message','f-wamsg', item.waMsg,'text',"I'm interested in...")}`;
}

function trekForm(item) {
  return `
    ${f('Trek Name *','f-title', item.title)}
    ${ft('Description *','f-desc', item.description, 4)}
    <div class="form-row">
      <div class="field"><label>Difficulty *</label><select id="f-difficulty" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;padding:11px 14px;width:100%;font-size:14px;outline:none;">
        <option value="Easy" ${item.difficulty==='Easy'?'selected':''}>Easy</option>
        <option value="Moderate" ${item.difficulty==='Moderate'?'selected':''}>Moderate</option>
        <option value="Challenging" ${item.difficulty==='Challenging'?'selected':''}>Challenging</option>
      </select></div>
      ${f('Season (e.g. Jun – Sep)','f-season', item.season)}
    </div>
    <div class="form-row">
      ${f('Duration (e.g. 7 Days / 6 Nights)','f-days', item.days)}
      ${f('Max Altitude (e.g. 3,800m Max Altitude)','f-altitude', item.altitude)}
    </div>
    ${f('Distance (e.g. 72 km Distance)','f-distance', item.distance)}
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
      ${f('Duration (e.g. 7N / 8D)','f-duration', item.duration)}
      ${f('Accommodation (e.g. 5-Star Hotels)','f-accommodation', item.accommodation)}
    </div>
    <div class="form-row">
      ${f('Transport (e.g. Luxury SUV)','f-transport', item.transport)}
      ${f('Meals (e.g. All Meals)','f-meals', item.meals)}
    </div>
    ${f('Destinations (comma-separated)','f-destinations', item.destinations,'text','e.g. Srinagar,Gulmarg,Pahalgam')}
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
