// Theme toggle
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const sun = document.getElementById('iconSun');
const moon = document.getElementById('iconMoon');

const saved = localStorage.getItem('k2alpha-theme') || 'dark';
setTheme(saved);

btn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('k2alpha-theme', next);
});

function setTheme(t) {
  root.dataset.theme = t;
  sun.style.display = t === 'light' ? 'block' : 'none';
  moon.style.display = t === 'dark' ? 'block' : 'none';
}

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileOverlay.classList.toggle('open');
  document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Generic path animator
function animatePath(pathId, duration, onComplete) {
  const path = document.getElementById(pathId);
  if (!path) return;
  const len = path.getTotalLength ? path.getTotalLength() : 1000;
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    path.style.strokeDashoffset = len * (1 - ease);
    if (progress < 1) requestAnimationFrame(step);
    else if (onComplete) onComplete();
  }
  requestAnimationFrame(step);
}

function fadeIn(id, delay = 0) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) { el.style.transition = 'opacity 0.4s'; el.style.opacity = '1'; }
  }, delay);
}

// Scaling chart
const chartObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(() => animatePath('legacyPath', 1800, () => fadeIn('legacyLabel')), 200);
    setTimeout(() => animatePath('aiPath', 2000, () => fadeIn('aiLabel')), 600);
    setTimeout(() => fadeIn('callout'), 2800);
    chartObs.disconnect();
  }
}, { threshold: 0.3 });
const chart = document.getElementById('scalingChart');
if (chart) chartObs.observe(chart);

// Trajectory arc
const trajObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animatePath('trajPath', 2000, () => {
      fadeIn('dot1'); fadeIn('tl1');
      setTimeout(() => { fadeIn('dot2'); fadeIn('tl2'); }, 200);
      setTimeout(() => { fadeIn('dot3'); fadeIn('tl3'); }, 400);
    });
    trajObs.disconnect();
  }
}, { threshold: 0.3 });
const traj = document.getElementById('trajPath');
if (traj) trajObs.observe(traj);

// Stats counter
function animateCounter(el, target, suffix) {
  let start = null;
  const duration = 1500;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 2);
    const val = Math.round(ease * target);
    el.innerHTML = `<span>${val}</span>${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    const cards = document.querySelectorAll('.stat-card');
    const targets = [[40, '%'], [25, '%'], [5, '×'], [60, '%']];
    const prefixes = ['', '', '3–', ''];
    cards.forEach((card, i) => {
      const num = card.querySelector('.stat-number');
      if (!num || !targets[i]) return;
      const [target, suffix] = targets[i];
      setTimeout(() => {
        num.innerHTML = `<span>0</span>${suffix}`;
        animateCounter(num, target, suffix);
        if (prefixes[i]) num.innerHTML = `${prefixes[i]}<span>${target}</span>${suffix}`;
      }, i * 150);
    });
    statsObs.disconnect();
  }
}, { threshold: 0.3 });
const resultsSection = document.getElementById('results');
if (resultsSection) statsObs.observe(resultsSection);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Ask K2Alpha
const askForm = document.getElementById('askForm');
if (askForm) {
  const askInput = document.getElementById('askInput');
  const askSubmit = document.getElementById('askSubmit');
  const askResult = document.getElementById('askResult');
  const askAnswer = document.getElementById('askAnswer');
  const askError = document.getElementById('askError');

  askForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = askInput.value.trim();
    if (!message) return;

    askSubmit.disabled = true;
    askSubmit.textContent = 'Thinking…';
    askResult.hidden = true;
    askError.hidden = true;

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok || !data.answer) {
        askError.textContent = data.error || 'Something went wrong. Talk to us: founders@k2alpha.ai';
        askError.hidden = false;
      } else {
        askAnswer.textContent = data.answer;
        askResult.hidden = false;
      }
    } catch (err) {
      askError.textContent = 'Could not reach the AI right now. Talk to us: founders@k2alpha.ai';
      askError.hidden = false;
    } finally {
      askSubmit.disabled = false;
      askSubmit.textContent = "See how we'd approach it";
    }
  });
}

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.3)' : 'none';
});
