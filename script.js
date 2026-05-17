// Scroll reveal animations
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => obs.observe(el));

// Active nav link based on current page
// Special case: essay pages inside /insights/ should highlight the Insights link
const pathname = window.location.pathname;
const currentPath = pathname.split('/').pop() || 'index.html';
const isInsightsSection = pathname.includes('/insights/') || currentPath === 'insights.html';
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
  const href = link.getAttribute('href');
  const hrefFile = href.split('/').pop();
  if (hrefFile === currentPath) {
    link.classList.add('active');
  } else if (isInsightsSection && hrefFile === 'insights.html') {
    link.classList.add('active');
  }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
