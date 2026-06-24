// ── Raag filter ──
function filterRaags(type, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.querySelectorAll('.raag-card').forEach(card => {
    const matchTime  = card.dataset.time  === type;
    const matchLevel = card.dataset.level === type;
    card.style.display = (type === 'all' || matchTime || matchLevel) ? '' : 'none';
  });
}

// ── Smooth scroll for in-page links ──
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (target) {
    e.preventDefault();
    const offset = 110; // sticky nav + theory tab bar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

// ── Theory tabs: highlight active section on scroll ──
const theorySections = document.querySelectorAll('.theory-section[id]');
if (theorySections.length) {
  const tabLinks = document.querySelectorAll('.theory-tabs a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-100px 0px -50% 0px' });
  theorySections.forEach(s => observer.observe(s));
}

// ── Practice day expand/collapse (optional progressive disclosure) ──
document.querySelectorAll('.practice-day-header').forEach(header => {
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    if (body && body.classList.contains('practice-day-body')) {
      body.style.display = body.style.display === 'none' ? '' : 'none';
    }
  });
});
