import { loadHeaderFooter, loadPageContent, updateNavVisibility } from "./utils.mjs";
import { initRegister } from "./register.js";
import { updateFooterYear } from "./utils.mjs";
import { initHero } from "./hero.js";


// Load header and footer templates
// and render them in the main header and footer elements
async function init() {
  await loadHeaderFooter();
  handleRoute();
  updateNavVisibility();
}

// Navigation changes
async function handleRoute() {
  const path = window.location.pathname || 'home';
  
  await loadPageContent(path);
  initHero();

  if (path ==='/login') {
    const module = await import('./auth.js');

    if (module.initLogin) {
      module.initLogin();
    }
  }

  if (path ==='/register') {
    const module = await import('./register.js');

    if (module.initRegister) {
      module.initRegister();
    }
  }

  if (path ==='/about') {
    const module = await import('./about.js');

    if (module.initAbout) {
      module.initAbout();
    }
  }
  if (path ==='/contact') {
    const module = await import('./contact.js');

    if (module.initContact) {
      module.initContact();
    }
  }

}


window.addEventListener('popstate', handleRoute);

document.body.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.getAttribute('href').startsWith('/')) {
    event.preventDefault();
    window.history.pushState(null, '', link.getAttribute('href'));
    handleRoute();
  }
});


init();