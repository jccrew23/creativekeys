export function initAbout() {
    const aboutButton = document.querySelector('#contact-button');

    if (aboutButton) {
        aboutButton.addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.href = '/contact'; // Redirect to contact page
            console.log('About button clicked!');
        });
    }
}