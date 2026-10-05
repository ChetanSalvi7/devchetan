// Fiveman Developer Portfolio & Policy Suite JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Auto-update copyright year
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // Copy Email Functionality
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'fiveman.developer@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Copied: ' + email);
      });
    });
  });

  // Category Filter for Wallpaper Gallery (if on anime_wallpaper.html)
  const categoryChips = document.querySelectorAll('.category-chip');
  const wallpaperCards = document.querySelectorAll('.wallpaper-card');

  if (categoryChips.length > 0 && wallpaperCards.length > 0) {
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-category');

        wallpaperCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
