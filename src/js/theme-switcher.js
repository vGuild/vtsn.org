const themeToggle = document.querySelector('#theme-toggle');

/**
 * Make <picture> <source> elements with media="(prefers-color-scheme:)"
 * respect custom theme preference overrides.
 * Otherwise the `media` preference will only respond to the OS-level setting
 */
const updateSourceMedia = colorPreference => {
  const pictures = document.querySelectorAll("picture")

  pictures.forEach(picture => {
    const sources = picture.querySelectorAll(`
        source[media*="prefers-color-scheme"], 
        source[data-media*="prefers-color-scheme"]
      `)

    sources.forEach(source => {
      // Preserve the source `media` as a data-attribute
      // to be able to switch between preferences
      if (source?.media.includes("prefers-color-scheme")) {
        source.dataset.media = source.media
      }

      // If the source element `media` target is the `preference`,
      // override it to 'all' to show
      // or set it to 'none' to hide
      if (source?.dataset.media.includes(colorPreference)) {
        source.media = "all"
      } else if (source) {
        source.media = "none"
      }
    })
  })
}


themeToggle.addEventListener('click', () => {
  document.body.classList.contains('light-theme-mode')
    ? enableDarkMode()
    : enableLightMode();
});

function enableDarkMode() {
  document.body.classList.remove('light-theme-mode');
  document.body.classList.add('dark-theme-mode');
  document.documentElement.setAttribute('data-theme-mode', 'dark');
  themeToggle.setAttribute('aria-label', 'switch to light theme');
  localStorage.setItem('themeMode', 'dark');
  updateSourceMedia('dark');
}

function enableLightMode() {
  document.body.classList.remove('dark-theme-mode');
  document.body.classList.add('light-theme-mode');
  document.documentElement.setAttribute('data-theme-mode', 'light');
  themeToggle.setAttribute('aria-label', 'switch to dark theme mode');
  localStorage.setItem('themeMode', 'light');
  updateSourceMedia('light');
}

function setThemePreference() {
  const persistedTheme = localStorage.getItem('themeMode');
  if (persistedTheme) {
    // restore from previous visit
    if (persistedTheme === 'dark') {
      enableDarkMode();
      return;
    } else if (persistedTheme === 'light') {
      enableLightMode();
      return;
    }
  } else {
    // execute default behavior since no persisted theme was found
    console.log('no persisted theme found');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDarkMode();
      return;
    }
    enableLightMode();
  }
}

document.onload = setThemePreference();
