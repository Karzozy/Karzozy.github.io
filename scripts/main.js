// === Menú móvil ===
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('active'));

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// === Modo oscuro ===
const themeToggle = document.getElementById('theme-toggle');
const preferredTheme = 'dark';

document.documentElement.setAttribute('data-theme', preferredTheme);
localStorage.setItem('theme', preferredTheme);

if (themeToggle) {
  themeToggle.textContent = '☀️';
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// === Efecto de escritura ===
const typed = document.getElementById('typed');
const words = ['Sistemas', 'Software'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = words[wordIndex];
  typed.textContent = current.substring(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// === Filtro de proyectos ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

function updateProjectMode(filter) {
  projects.forEach(p => {
    p.classList.remove('is-hobby-mode', 'is-mini-mode');

    if (filter === 'hobby' && p.dataset.category === 'hobby') {
      p.classList.add('is-hobby-mode');
    }

    if (filter === 'mini' && p.dataset.category === 'mini') {
      p.classList.add('is-mini-mode');
    }
  });
}

function applyProjectFilter(filter) {
  filterBtns.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  projects.forEach(p => {
    const shouldShow = filter === 'all' || p.dataset.category === filter;
    p.style.display = shouldShow ? '' : 'none';
  });

  updateProjectMode(filter);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyProjectFilter(btn.dataset.filter);
  });
});

projects.forEach(card => {
  card.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.project-code-toggle') || target.closest('a')) {
      return;
    }

    const filter = card.dataset.category;
    applyProjectFilter(filter);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const filter = card.dataset.category;
      applyProjectFilter(filter);
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

const codeButtons = document.querySelectorAll('.project-code-toggle');
codeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const panel = button.closest('.project-card').querySelector('.project-code-panel');
    const isHidden = panel.hasAttribute('hidden');

    if (isHidden) {
      panel.removeAttribute('hidden');
      button.textContent = 'Ocultar';
    } else {
      panel.setAttribute('hidden', 'hidden');
      button.textContent = 'Código';
    }
  });
});

applyProjectFilter('all');

// === Animación al hacer scroll ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'all 0.8s ease';
  observer.observe(sec);
});