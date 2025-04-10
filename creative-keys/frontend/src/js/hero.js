import { addImg } from './utils.mjs';

export function initHero() {
    const heroElement = document.querySelector('#main-hero');
    const heroButton = document.querySelector('#get-started');

    addImg('/images/hero.png', 'Hero Image of hands playing piano', heroElement, 'hero-image', 'hero-image', 'afterbegin' );



    if (heroElement) {
        heroButton.addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.href = '/contact'; // Redirect to contact page
            console.log('Hero button clicked!');
        });
    }
}

