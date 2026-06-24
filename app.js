// ── Init Lucide icons everywhere ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// ── Raag filter ──
function filterRaags(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.raag-card').forEach(card => {
    const matchTime  = card.dataset.time  === type;
    const matchLevel = card.dataset.level === type;
    card.style.display = (type === 'all' || matchTime || matchLevel) ? '' : 'none';
  });
}

// ── FAQ toggle ──
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon   = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    if (icon) icon.classList.add('open');
  }
}

// ── Smooth scroll for anchor links ──
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href === '#') return;
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    const navH = document.querySelector('.site-nav')?.offsetHeight || 60;
    const tabH = document.querySelector('.theory-tabs')?.offsetHeight || 0;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - tabH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

// ── Theory tabs: active on scroll ──
const theorySections = document.querySelectorAll('.theory-section[id]');
if (theorySections.length) {
  const tabLinks = document.querySelectorAll('.theory-tabs a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -55% 0px' });
  theorySections.forEach(s => io.observe(s));
}

// ── Week block collapse (practice page) ──
document.querySelectorAll('.week-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    if (body && body.classList.contains('week-body')) {
      body.style.display = body.style.display === 'none' ? '' : 'none';
    }
  });
});
