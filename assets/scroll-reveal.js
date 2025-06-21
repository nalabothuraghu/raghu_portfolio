// (c) 2024 Raghu. 100% original. Free for all use. No copyright/attribution required.

// Scroll Reveal: Adds a class when elements scroll into view for animation.
document.addEventListener("DOMContentLoaded", function() {
  const revealClass = "sr"; // class to trigger on
  const visibleClass = "sr--visible"; // class added when in view

  function revealOnScroll() {
    document.querySelectorAll(`.${revealClass}`).forEach(function(el) {
      const rect = el.getBoundingClientRect();
      // Adjust the trigger point (here: 80px from bottom)
      if (rect.top < window.innerHeight - 80) {
        el.classList.add(visibleClass);
      } else {
        el.classList.remove(visibleClass);
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("resize", revealOnScroll);
  revealOnScroll(); // run on page load
});
// Active nav highlight on scroll
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if(link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // Run on load
});