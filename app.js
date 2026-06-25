// ── Init Lucide icons + lang preference ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  const saved = localStorage.getItem('tsaLang');
  if (saved === 'hi') applyLang('hi');
  updateLangBtn();
});

// ── Language toggle ──
function toggleLang() {
  const isHindi = document.body.classList.contains('lang-hindi');
  applyLang(isHindi ? 'en' : 'hi');
}
function applyLang(lang) {
  if (lang === 'hi') {
    document.body.classList.add('lang-hindi');
    localStorage.setItem('tsaLang', 'hi');
  } else {
    document.body.classList.remove('lang-hindi');
    localStorage.setItem('tsaLang', 'en');
  }
  updateLangBtn();
}
function updateLangBtn() {
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = document.body.classList.contains('lang-hindi') ? 'English' : 'हिंदी';
    btn.title = document.body.classList.contains('lang-hindi') ? 'Switch to English' : 'हिंदी में पढ़ें';
  });
}

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
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    if (icon) icon.classList.add('open');
  }
}

// ── Riyaz week expand/collapse ──
function toggleRiyazWeek(header) {
  const body = header.nextElementSibling;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : '';
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
    const navH  = document.querySelector('.site-nav')?.offsetHeight || 60;
    const tabH  = document.querySelector('.theory-tabs, .raag-tabs')?.offsetHeight || 0;
    const top   = target.getBoundingClientRect().top + window.scrollY - navH - tabH - 8;
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

// ── Raag detail tabs: active on scroll ──
const raagSections = document.querySelectorAll('.raag-section[id]');
if (raagSections.length) {
  const tabLinks = document.querySelectorAll('.raag-tabs-inner a');
  const io2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '-80px 0px -55% 0px' });
  raagSections.forEach(s => io2.observe(s));
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
