// =======================
// HEADER SCROLL BACKGROUND
// =======================
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 60) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

// =======================
// SERVICES MODAL HANDLING
// =======================
const modals = document.querySelectorAll('.modal');
const openModalBtns = document.querySelectorAll('.modal-open-btn');
const closeModalBtns = document.querySelectorAll('.modal-close-btn');

openModalBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    modals[i].classList.add('modal--visible');
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modals.forEach((modal) => modal.classList.remove('modal--visible'));
  });
});

// =======================
// PORTFOLIO FILTERING
// =======================
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.portfolio-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-active'));
    btn.classList.add('filter-active');
    const filter = btn.dataset.filter;
    projects.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// =======================
// SIMPLE SLIDER (TESTIMONIAL)
// =======================
class SimpleSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.slides = this.container?.querySelectorAll('.slide');
    this.current = 0;
    this.init();
  }
  showSlide(i) {
    this.slides.forEach((slide, idx) => {
      slide.style.display = (idx === i) ? 'block' : 'none';
    });
  }
  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.showSlide(this.current);
  }
  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.current);
  }
  init() {
    if (!this.container || !this.slides.length) return;
    this.showSlide(this.current);
    const nextBtn = this.container.querySelector('.slider-next');
    const prevBtn = this.container.querySelector('.slider-prev');
    nextBtn?.addEventListener('click', () => this.next());
    prevBtn?.addEventListener('click', () => this.prev());
  }
}
new SimpleSlider('.testimonials-slider');

// =======================
// ACTIVE NAVIGATION LINK ON SCROLL
// =======================
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let currentPos = window.scrollY + 70;
  sections.forEach(section => {
    if (
      currentPos >= section.offsetTop &&
      currentPos <= section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove('nav__link--active'));
      const activeLink = document.querySelector(
        `.nav__link[href*=${section.id}]`
      );
      activeLink?.classList.add('nav__link--active');
    }
  });
});

// =======================
// LIGHT/DARK THEME TOGGLE
// =======================
const themeToggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'site-theme';

function setTheme(theme) {
  document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
  localStorage.setItem(THEME_KEY, theme);
}
themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('theme-light')
    ? 'light'
    : 'dark';
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
});
window.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem(THEME_KEY) || 'dark');
});

// =======================
// FADE-IN ANIMATION ON SCROLL (VANILLA, ORIGINAL)
// =======================
const fadeEls = document.querySelectorAll('.fade-in');
function handleFadeIn() {
  const triggerPoint = window.innerHeight * 0.9;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerPoint) {
      el.classList.add('fade-in--visible');
    }
  });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('DOMContentLoaded', handleFadeIn);

// ===== Scroll Spy for Navigation Highlight =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // offset for header/navbar
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add('active-link');
      } else {
        navLink.classList.remove('active-link');
      }
    }
  });
});

// Put this in main.js (no <script> tags)

document.addEventListener('DOMContentLoaded', function () {
  const themeButton = document.getElementById('theme-button');
  const body = document.body;
  const LIGHT_THEME = 'light-theme';
  const ICON_THEME = 'bx-sun';
  const DARK_ICON = 'bx-moon';

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  if (selectedTheme) {
    body.classList.toggle(LIGHT_THEME, selectedTheme === 'light');
    themeButton.classList.toggle(ICON_THEME, selectedIcon === ICON_THEME);
    themeButton.classList.toggle(DARK_ICON, selectedIcon === DARK_ICON);
  } else {
    body.classList.remove(LIGHT_THEME);
    themeButton.classList.add(DARK_ICON);
  }

  themeButton.addEventListener('click', function () {
    const isLight = body.classList.toggle(LIGHT_THEME);
    themeButton.classList.toggle(ICON_THEME, isLight);
    themeButton.classList.toggle(DARK_ICON, !isLight);
    localStorage.setItem('selected-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('selected-icon', isLight ? ICON_THEME : DARK_ICON);
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      alert('Thank you for your message!'); // Or show a custom message on the page
    } else {
      alert('Oops! There was a problem. Please try again.');
    }
  });
});