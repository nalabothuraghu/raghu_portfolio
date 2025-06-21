// (c) 2024 Raghu, no license issues - original code.

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
  // Button click event
  document.querySelectorAll('.work__item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Remove 'active-work' from all, add to clicked
      document.querySelectorAll('.work__item').forEach(b => b.classList.remove('active-work'));
      this.classList.add('active-work');
      const filter = this.getAttribute('data-filter'); // e.g. ".web", ".app", ".ml", "all"
      document.querySelectorAll('.work__card').forEach(card => {
        // If 'all', show everything
        if (filter === 'all') {
          card.style.display = '';
        } else {
          // Check if card has the filter class
          if (card.classList.contains(filter.replace('.', ''))) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});