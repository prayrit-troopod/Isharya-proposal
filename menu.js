/* Offerings menu, shared by every proposal page.
   To add an offering: add an entry below (group is the small label it sits under) and create its page in this folder.
   From 981px wide the menu is a permanent sidebar; below that it opens from the hamburger. */
const OFFERINGS = [
  { group: 'Conversion', title: 'PDP Redesign', href: 'index.html' },
  { group: 'Conversion', title: '3D Product View', href: '3d-view.html' },
  { group: 'Performance', title: 'Site Speed', href: 'site-speed.html' },
];

(() => {
  const here = location.pathname.split('/').pop() || 'index.html';
  const brand = document.querySelector('nav .brand');
  const firstSection = document.querySelector('section[id]');

  // hamburger, left of the brand
  const btn = document.createElement('button');
  btn.className = 'menu-btn';
  btn.setAttribute('aria-label', 'Open offerings menu');
  btn.setAttribute('aria-controls', 'drawer');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<i></i><i></i><i></i>';
  brand.before(btn);

  let lastGroup = '';
  const items = OFFERINGS.map((o, i) => {
    const current = o.href === here;
    const label = o.group !== lastGroup ? `<div class="sb-group">${o.group}</div>` : '';
    lastGroup = o.group;
    return label + `<a class="sb-item${current ? ' active' : ''}" href="${current ? '#' + (firstSection ? firstSection.id : '') : o.href}"${current ? ' aria-current="page"' : ''}>`
      + `<span class="sb-num">${String(i + 1).padStart(2, '0')}</span>${o.title}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <div class="drawer-bg" id="drawerBg"></div>
    <aside class="drawer" id="drawer" aria-label="Troopod offerings for Isharya" aria-hidden="true">
      <div class="sb-logo">
        <div class="sb-icon">T</div>
        <div><div class="sb-name">Troopod</div><div class="sb-sub">Isharya · Proposals</div></div>
        <button class="drawer-x" id="drawerX" aria-label="Close menu">×</button>
      </div>
      <div class="sb-body">${items}</div>
      <div class="sb-foot"><div class="sb-pill"><span></span>Prepared for Isharya</div></div>
    </aside>`);

  const drawer = document.getElementById('drawer');
  const desktop = matchMedia('(min-width:981px)');
  const setMenu = open => {
    if (desktop.matches) return;
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    drawer.setAttribute('aria-hidden', !open);
    (open ? document.getElementById('drawerX') : btn).focus();
  };
  // the sidebar is always visible on desktop, so it's only hidden from screen readers on smaller screens
  const syncAria = () => { if (desktop.matches) document.body.classList.remove('menu-open'); drawer.setAttribute('aria-hidden', !desktop.matches && !document.body.classList.contains('menu-open')); };
  desktop.addEventListener('change', syncAria);
  syncAria();
  btn.addEventListener('click', () => setMenu(true));
  document.getElementById('drawerX').addEventListener('click', () => setMenu(false));
  document.getElementById('drawerBg').addEventListener('click', () => setMenu(false));
  drawer.addEventListener('click', e => { if (e.target.closest('a[href^="#"]')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });
})();
