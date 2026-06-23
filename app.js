// Raag filter
function filterRaags(time, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.raag-card').forEach(card => {
    card.style.display = (time === 'all' || card.dataset.time === time) ? 'block' : 'none';
  });
}

// Smooth scroll for theory nav
document.querySelectorAll('.theory-nav a, a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active theory nav on scroll
const sections = document.querySelectorAll('.theory-section[id]');
if (sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.theory-nav a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}
