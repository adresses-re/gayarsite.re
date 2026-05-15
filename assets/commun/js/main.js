/* ============================================
   GAYARSITE.RE - SCRIPT PRINCIPAL
   Navigation, thème, interactions globales
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initMenuToggle();
  initActiveLink();
});

/* ============ GESTION DU THÈME ============ */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  if (!themeToggle) return;
  
  // Charger la préférence sauvegardée ou utiliser la préférence système
  const savedTheme = localStorage.getItem('theme');
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemPreference;
  
  // Appliquer le thème
  if (currentTheme === 'dark') {
    html.style.colorScheme = 'dark';
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Passer en mode clair');
  } else {
    html.style.colorScheme = 'light';
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
  }
  
  // Événement du bouton
  themeToggle.addEventListener('click', function() {
    const newTheme = html.style.colorScheme === 'dark' ? 'light' : 'dark';
    html.style.colorScheme = newTheme;
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', 
      newTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
    );
  });
}

/* ============ MENU MOBILE ============ */
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
  });
  
  // Fermer le menu en cliquant sur un lien
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Fermer le menu en cliquant en dehors
  document.addEventListener('click', function(event) {
    const isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInside && nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============ LIEN ACTIF ============ */
function initActiveLink() {
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    // Obtenir le chemin du href
    const linkPath = new URL(link.href, window.location.origin).pathname;
    
    // Comparer les chemins
    if (linkPath === currentLocation || 
        (currentLocation.includes('/izidor') && linkPath.includes('/izidor')) ||
        (currentLocation === '/' && linkPath === '/gayarsite.re/') ||
        (currentLocation === '/gayarsite.re/' && linkPath === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============ UTILITAIRES ============ */

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
