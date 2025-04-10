export async function renderWithTemplate(
    templateString,
    parentElement,
    data = null,
    callback = null,
    position = 'beforeend',
    clear = false
) {
    if (clear) {
        parentElement.innerHTML = ''; // Clear existing content
    }

    // Ensure templateString is correctly processed
    const htmlString = typeof templateString === 'function' ? await templateString(data) : templateString;
    parentElement.insertAdjacentHTML(position, htmlString);


    if (callback) {
        callback(data);
    }
}

export function loadTemplate(path) {
    return async function () {
        const response = await fetch(path);
        if (response.ok) {
            return await response.text();
        } else {
            console.error(`Failed to load template: ${path}`);
            return `<p style="color: red;">Error loading ${path}</p>`;
        }
    }
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/partials/header.html')(); // Fetch the actual HTML
    const footerTemplate = await loadTemplate('/partials/footer.html')(); // Fetch the actual HTML

    const headerElement = document.querySelector('#main-header');
    const footerElement = document.querySelector('#main-footer');
    const logoElement = document.querySelector('#header-logo');

    addImg('/images/logo-color.svg', 'Logo of the website', logoElement, 'logo', 'logo', 'afterbegin' );

    if (headerElement) {
        await renderWithTemplate(headerTemplate, headerElement);
    }
    if (footerElement) {
        await renderWithTemplate(footerTemplate, footerElement);
        updateFooterYear(); // Update the year in the footer
    }
}

export function updateFooterYear() {
    const yearSpan = document.querySelector('#year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

export async function loadPageContent(page) {
    const contentElement = document.querySelector('#main-content');
    if (!contentElement) {
        console.error('Main content element not found');
        return;
    };

    const cleanPath = page.replace(/[^a-z0-9]/gi, '');

    if (cleanPath === '/students' && !localStorage.getItem('token')) {
        contentElement.innerHTML = `<p style="color: red;">You need to be logged in to access this page</p>`;
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    try {
        const response = await fetch(`/partials/${cleanPath}.html`); // Fetch the actual HTML

        if (response.ok) {
            contentElement.innerHTML = await response.text();
        }
        else {
            contentElement.innerHTML = `<p style="color: red;">Page: ${page}.html not found</p>`;
            console.error(`Failed to load content: ${page}.html`);
        }
    }
    catch (error) {
        console.error(`Error loading ${page} content: ${error}`);
        contentElement.innerHTML = `<p style="color: red;">Error loading ${page}.html</p>`;

    }   
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

  // save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function updateNavVisibility() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    console.log('User is logged in:', isLoggedIn);

    const loginLink = document.querySelector('#nav-login');
    const logoutLink = document.querySelector('#nav-logout');
    const studentLink = document.querySelector('#nav-students');

    if (studentLink) studentLink.classList.toggle('hidden', !isLoggedIn);
    if (loginLink) loginLink.classList.toggle('hidden', isLoggedIn);
    if (logoutLink) logoutLink.classList.toggle('hidden', !isLoggedIn);

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const welcomeMessage = document.querySelector('#welcome-message');
            if (welcomeMessage) {
                welcomeMessage.textContent = `Welcome, ${user.username}`;
            }
        }
    }

    logoutLink.addEventListener('click', (event) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        updateNavVisibility(); // Update navigation visibility after logout
        window.location.href = '/login'; // Redirect to login page
    });
}

export function loadGapiScript(callback) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
}

export function initializeGapi() {
    loadGapiScript(() => {
        console.log('GAPI script loaded');
        gapi.load('client:auth2', () => {
            console.log("GAPI client loaded");
        });
    });
}

/**
 * @param {string} src - path to img
 * @param {string} [alt=''] - alt text for img
 * @param {HTMLElement} [parentElement] - parent element to append img to
 * @param {string} [className=''] - class name for img
 * @param {string} [id=''] - id for img
 * @param {string} [position='beforeend'] - position to insert img
 * @returns {HTMLImageElement} - created img element
 * 
 */

export function addImg(src, alt = '', parentElement = null, className = '', id = '', position='beforeend') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    if (className) img.className = className;
    if (id) img.id = id;

    if (parentElement) {
        parentElement.insertAdjacentElement(position, img);
    }

    return img;
}

