var toggle = document.getElementById('themeToggle');
var root = document.documentElement;

  function apply(theme){
    root.setAttribute('data-theme', theme);
    var nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.getElementById('themeLabel').textContent = nextTheme;
    toggle.setAttribute('aria-label', 'Switch to ' + nextTheme + ' theme');
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch(e){}
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  apply(saved || systemTheme);
  toggle.addEventListener('click', function(){
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch(e){}
  });

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  function closeMenu(){
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', function(){
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      closeMenu();
    });
  });
  document.addEventListener('click', function(event){
    if(mainNav.classList.contains('open') && !mainNav.contains(event.target) && event.target !== navToggle){ closeMenu(); }
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && mainNav.classList.contains('open')){ closeMenu(); navToggle.focus(); }
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:0.1 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  var photoTrigger = document.getElementById('photoTrigger');
  var photoModal = document.getElementById('photoModal');
  var photoModalClose = document.getElementById('photoModalClose');
  var expandedPhoto = document.getElementById('expandedPhoto');
  var previousFocus;

  function openPhoto(){
    previousFocus = document.activeElement;
    expandedPhoto.src = root.getAttribute('data-theme') === 'dark' ? 'resources/img2.jpeg' : 'resources/img1.jpeg';
    photoModal.hidden = false;
    document.body.classList.add('modal-open');
    photoModalClose.focus();
  }
  function closePhoto(){
    photoModal.hidden = true;
    document.body.classList.remove('modal-open');
    if(previousFocus){ previousFocus.focus(); }
  }
  photoTrigger.addEventListener('click', openPhoto);
  photoModalClose.addEventListener('click', closePhoto);
  photoModal.addEventListener('click', function(event){
    if(event.target === photoModal){ closePhoto(); }
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && !photoModal.hidden){ closePhoto(); }
  });
