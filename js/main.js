/* =============================================================
   PORTFOLIO PREMIUM — JAVASCRIPT v4.0
   Abdelmalek Lazli
   Enterprise Solutions with .NET & SAP S/4HANA
   MENU MOBILE CORRIGÉ — 2026
============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio Premium v4.0 — Enterprise Solutions');

  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initSmoothScroll();
  initFooterYear();
});

/* =============================================================
   HEADER SCROLL EFFECT
============================================================= */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* =============================================================
   MENU MOBILE — REFORÉ POUR FONCTIONNER HORS DU HEADER
   Le menu est maintenant dans <body> directement, plus dans <header>
============================================================= */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCta = document.querySelector('.mobile-cta');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  // Toggle au clic sur le hamburger
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Fermeture au clic sur un lien de navigation
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fermeture au clic sur le bouton CTA du menu
  if (mobileCta) {
    mobileCta.addEventListener('click', () => {
      closeMenu();
    });
  }

  // Fermeture au clic en dehors du menu (sur le fond blanc)
  mobileMenu.addEventListener('click', (e) => {
    // Si on clique directement sur le fond (pas sur un lien)
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });
}

/* =============================================================
   SCROLL SPY — Navigation active
============================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-h');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
          mobileLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* =============================================================
   SMOOTH SCROLL
============================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });
}

/* =============================================================
   SCROLL REVEAL
============================================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* =============================================================
   FOOTER YEAR
============================================================= */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
