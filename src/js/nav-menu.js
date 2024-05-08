// This JavaScript is to handle the mobile menu
const primaryNav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute('data-visible');
  // note: gets a string, not boolean.
  if (visibility === 'false') {
    primaryNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
  } else if (visibility === 'true') {
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  }
});

let resizeTimer;
window.addEventListener('resize', () => {
  primaryNav.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    primaryNav.classList.remove('resize-animation-stopper');
  }, 3000); // three seconds before reset
});

// Handle the sticky nav bar
const primaryHeader = document.querySelector('.primary-header');
const scrollWatcher = document.createElement('div');

scrollWatcher.setAttribute('data-scroll-watcher', '');
primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    // If it's not intersecting, make it sticky
    primaryHeader.classList.toggle('is-sticking', !entries[0].isIntersecting);
  },
  { rootMargin: '200px 0px 0px 0px' }
  // Apply after scrolling down 200px
);

navObserver.observe(scrollWatcher);
