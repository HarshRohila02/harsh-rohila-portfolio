/* ============================================================
   HARSH ROHILA — PORTFOLIO SCRIPTS
   Handles: typing effect, scroll reveal, navbar, smooth nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // 1. TYPING EFFECT for hero tagline
  // ----------------------------------------------------------
  const taglineEl = document.getElementById('typed-tagline');
  const phrases = [
    'Computer Science Student',
    'AI & Automation Enthusiast',
    'Backend Developer',
    'Problem Solver',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      taglineEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, pauseStart);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      taglineEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }
  type();

  // ----------------------------------------------------------
  // 2. NAVBAR — scroll class & active link highlighting
  // ----------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  function onScroll() {
    // Add "scrolled" class after scrolling down
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight the nav link for the current section in view
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial call

  // ----------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // ----------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ----------------------------------------------------------
  // 4. SCROLL REVEAL — IntersectionObserver
  // ----------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  // ----------------------------------------------------------
  // 5. SMOOTH SCROLL for anchor links (fallback for Safari <15)
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
