const API_URL = 'http://localhost:5000/api/login';

export function initLogin() {
    const loginForm = document.querySelector('#login-form');
    const loginButton = document.querySelector('#login-button');
    const messageElement = document.querySelector('#login-message');

    if (loginForm) {
        loginButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const username = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            console.log(username, password); // Debugging line
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log(response); // Debugging line

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store the token in local storage
                messageElement.textContent = 'Login successful! Redirecting...';
                window.location.href = '/students'; // Redirect to students page after successful login
            } else {
                messageElement.textContent = data.message || 'Login failed. Please try again.';
                messageElement.style.color = 'red';
            }
        });

        const registerLink = document.querySelector('#register-button');

        if (registerLink) {
            registerLink.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = '/register'; // Redirect to register page
            });
        }
    }
};

