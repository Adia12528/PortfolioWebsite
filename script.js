/**
 * ADITYA SONI — EXPANDED PORTFOLIO SCROLL & INTERACTION ENGINE
 * Parallax background layers, sticky scroll timeline, and text reveals
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var themeLabel = document.getElementById('themeLabel');

  /* ==========================================================================
     1. THEME SWITCHER WITH LOCALSTORAGE & SYSTEM SYNC
     ========================================================================== */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (themeLabel) {
      themeLabel.textContent = nextTheme;
    }
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + nextTheme + ' theme');
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {}

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var initialTheme = savedTheme || (systemDark.matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  systemDark.addEventListener('change', function (e) {
    var userOverride = null;
    try {
      userOverride = localStorage.getItem('theme');
    } catch (err) {}
    if (!userOverride) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeMenu() {
    if (mainNav && navToggle) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (mainNav.classList.contains('open') && !mainNav.contains(event.target) && event.target !== navToggle) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mainNav.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ==========================================================================
     3. PROFILE PHOTO LIGHTBOX MODAL
     ========================================================================== */
  var photoTrigger = document.getElementById('photoTrigger');
  var photoModal = document.getElementById('photoModal');
  var photoModalClose = document.getElementById('photoModalClose');
  var expandedPhoto = document.getElementById('expandedPhoto');
  var previousFocus;

  function openPhoto() {
    if (!photoModal) return;
    previousFocus = document.activeElement;
    if (expandedPhoto) {
      var currentTheme = root.getAttribute('data-theme') || 'light';
      expandedPhoto.src = currentTheme === 'dark' ? 'resources/img2.jpeg' : 'resources/img1.jpeg';
    }
    photoModal.hidden = false;
    document.body.classList.add('modal-open');
    if (photoModalClose) photoModalClose.focus();
  }

  function closePhoto() {
    if (!photoModal) return;
    photoModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  if (photoTrigger) photoTrigger.addEventListener('click', openPhoto);
  if (photoModalClose) photoModalClose.addEventListener('click', closePhoto);
  if (photoModal) {
    photoModal.addEventListener('click', function (event) {
      if (event.target === photoModal) {
        closePhoto();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && photoModal && !photoModal.hidden) {
      closePhoto();
    }
  });

  /* ==========================================================================
     4. PARALLAX BACKGROUND LAYERS (FLUID & PERFORMANCE-OPTIMIZED)
     ========================================================================== */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var orb1 = document.getElementById('orb1');
  var orb2 = document.getElementById('orb2');
  var orb3 = document.getElementById('orb3');

  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // 1. Parallax Orbs
        if (!reduceMotion) {
          if (orb1) orb1.style.transform = 'translate3d(0, ' + (scrollY * 0.12).toFixed(1) + 'px, 0)';
          if (orb2) orb2.style.transform = 'translate3d(0, ' + (-scrollY * 0.10).toFixed(1) + 'px, 0)';
          if (orb3) orb3.style.transform = 'translate3d(0, ' + (scrollY * 0.08).toFixed(1) + 'px, 0)';
        }

        // 2. Scroll-Linked Journey Steps & Timeline Progress
        updateJourneyProgress();

        // 3. Parallax Card Preview Shift
        if (!reduceMotion) {
          updateProjectParallax();
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ==========================================================================
     5. STEP-BY-STEP SCROLL TIMELINE ("HOW I GOT HERE")
     ========================================================================== */
  var journeyStepsContainer = document.getElementById('journeyStepsContainer');
  var journeyCards = document.querySelectorAll('.journey-card-step');
  var spineFill = document.getElementById('spineFill');
  var timelineBarFill = document.getElementById('timelineBarFill');
  var activeStepNum = document.getElementById('activeStepNum');

  function updateJourneyProgress() {
    if (!journeyStepsContainer || !journeyCards.length) return;

    var containerRect = journeyStepsContainer.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Trigger zone in middle of screen
    var triggerY = windowHeight * 0.55;
    var activeIndex = 0;

    journeyCards.forEach(function (card, index) {
      var cardRect = card.getBoundingClientRect();
      if (cardRect.top <= triggerY) {
        activeIndex = index;
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Keep at least the first step active if we are scrolled past the hero
    if (activeIndex === 0 && containerRect.top > windowHeight * 0.7) {
      // not yet in journey
    } else {
      journeyCards[0].classList.add('active');
    }

    // Calculate vertical progress percentage
    var totalHeight = containerRect.height;
    var currentProgressPx = triggerY - containerRect.top;
    var progressPct = Math.min(Math.max((currentProgressPx / totalHeight) * 100, 0), 100);

    if (spineFill) {
      spineFill.style.height = progressPct.toFixed(1) + '%';
    }

    var stepProgressPct = ((activeIndex + 1) / journeyCards.length) * 100;
    if (timelineBarFill) {
      timelineBarFill.style.width = stepProgressPct.toFixed(1) + '%';
    }

    if (activeStepNum) {
      var formatted = (activeIndex + 1) < 10 ? '0' + (activeIndex + 1) : (activeIndex + 1);
      activeStepNum.textContent = formatted;
    }
  }

  /* ==========================================================================
     6. PROJECT CARD PARALLAX ELEVATION
     ========================================================================== */
  var parallaxCards = document.querySelectorAll('[data-parallax-card]');

  function updateProjectParallax() {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    parallaxCards.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        var progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
        var lensImg = card.querySelector('.project-lens-image');
        if (lensImg) {
          var yOffset = progress * 14; // smooth subtle 14px parallax shift
          lensImg.style.transform = 'translate3d(0, ' + yOffset.toFixed(1) + 'px, 0) scale(1.03)';
        }
      }
    });
  }

  /* ==========================================================================
     7. TEXT REVEAL & INTERSECTION OBSERVER
     ========================================================================== */
  var heroSection = document.getElementById('hero');
  if (heroSection) {
    // Initial hero text reveal
    setTimeout(function () {
      heroSection.classList.add('revealed');
    }, 100);
  }

  var revealElements = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          var revealLines = entry.target.querySelectorAll('.reveal-line');
          revealLines.forEach(function (line) {
            line.classList.add('revealed');
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* ==========================================================================
     8. ACTIVE NAVIGATION LINK SPY ON SCROLL
     ========================================================================== */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('#mainNav a');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.style.background = 'var(--accent-soft)';
              link.style.color = 'var(--accent)';
            } else {
              link.style.background = '';
              link.style.color = '';
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // Trigger initial progress check
  updateJourneyProgress();

})();
