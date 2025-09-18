
// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

// Smooth scroll with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#top') { // special case
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
        const navH = parseInt(cssVar) || 64; // fallback if the CSS var isn't set
        const y = el.getBoundingClientRect().top + window.pageYOffset - (navH + 12);
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});


// Activate ScrollSpy
const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
dataSpyList.forEach(function (dataSpyEl) {
  bootstrap.ScrollSpy.getInstance(dataSpyEl) || new bootstrap.ScrollSpy(dataSpyEl, { target: '#mainNav', offset: 120 })
})


// AUTO-CLOSE MOBILE NAVBAR ON LINK CLICK
(function () {
  const collapseEl = document.getElementById('nav'); // <nav id="nav" class="collapse navbar-collapse">
  if (!collapseEl) return;

  const links = collapseEl.querySelectorAll('a.nav-link, .dropdown-item');
  const toggler = document.querySelector('.navbar-toggler');

  function closeIfMobile() {
    if (!toggler) return;
    // Toggler is visible => we are in mobile mode
    const isMobile = getComputedStyle(toggler).display !== 'none';
    if (isMobile) {
      const bs = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
      bs.hide();
    }
  }
  links.forEach(a => a.addEventListener('click', closeIfMobile));
})(); 

// Match CSS --nav-h to real navbar height and sync ScrollSpy
(function () {
  const nav = document.querySelector('header.navbar');
  const main = document.querySelector('main');
  if (!nav) return;

  const h = nav.offsetHeight; // actual pixels
  document.documentElement.style.setProperty('--nav-h', h + 'px');

  if (main) {
    bootstrap.ScrollSpy.getOrCreateInstance(main, { target: '#mainNav', offset: h + 12 });
  }
})();

// Make "#top" always scroll to page top (works even with a fixed navbar)
document.querySelectorAll('a[href="#top"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
