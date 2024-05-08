const themeToggle = document.querySelector('#theme-toggle');

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
}

function enableLightMode() {
  document.body.classList.remove('dark-theme-mode');
  document.body.classList.add('light-theme-mode');
  document.documentElement.setAttribute('data-theme-mode', 'light');
  themeToggle.setAttribute('aria-label', 'switch to dark theme mode');
  localStorage.setItem('themeMode', 'light');
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
