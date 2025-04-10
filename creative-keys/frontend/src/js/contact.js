export function initContact() {
    const contactButton = document.querySelector('#contact-button');

    if (contactButton) {
        contactButton.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent("Contact Form Message from " + name);
            const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

            const mailtoLink = `mailto:jaliep15@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
        });
    }
}