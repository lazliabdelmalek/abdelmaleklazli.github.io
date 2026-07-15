/* =============================================================
   PORTFOLIO PREMIUM — JAVASCRIPT
   Abdelmalek Lazli
============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio Premium chargé.');

  initHeaderScroll();
  initMobileMenu();
  initTypingEffect();
  initCvDropdown();
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
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* =============================================================
   MENU MOBILE
============================================================= */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCta = document.querySelector('.mobile-cta');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }
}

/* =============================================================
   EFFET TYPING
============================================================= */
function initTypingEffect() {
  const el = document.getElementById('typing-role');
  if (!el) return;

  const roles = [
    '.NET Full Stack Developer',
    'SAP S/4HANA Consultant (PS/PPM)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* =============================================================
   CV DROPDOWN
============================================================= */
function initCvDropdown() {
  const btn = document.getElementById('cv-dropdown-btn');
  const menu = document.getElementById('cv-dropdown-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          // Desktop
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
          // Mobile
          mobileLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
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

  reveals.forEach((el) => observer.observe(el));
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