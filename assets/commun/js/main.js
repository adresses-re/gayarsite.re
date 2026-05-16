import os
os.makedirs('/root/output', exist_ok=True)
js = r'''/* ============================================
   GAYARSITE.RE - SCRIPT PRINCIPAL
   Navigation, thème, interactions globales
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenuToggle();
  initActiveLink();
  initSmoothAnchors();
});

function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemTheme;

  applyTheme(currentTheme, themeToggle, root);

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, themeToggle, root);
    localStorage.setItem('theme', nextTheme);
  });
}

function applyTheme(theme, toggle, root) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
}

function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (!menuToggle || !nav) return;

  const setMenuState = (open) => {
    nav.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };

  setMenuState(false);
  menuToggle.addEventListener('click', () => setMenuState(!nav.classList.contains('active')));

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('active')) return;
    if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
    setMenuState(false);
  });
}

function initActiveLink() {
  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  document.querySelectorAll('nav a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    const isActive = linkPath === currentPath || (currentPath.includes('/izidor') && linkPath.includes('/izidor'));
    link.classList.toggle('active', isActive);
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}'''
path='/root/output/gayarsite_main_rectifie.js'
with open(path,'w',encoding='utf-8') as f:f.write(js)
print(path)