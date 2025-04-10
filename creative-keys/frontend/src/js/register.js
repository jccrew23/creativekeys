const REGISTER_API = 'http://localhost:5000/api/register';

export function initRegister() {
    const registerForm = document.querySelector('#register-form');
    const registerButton = document.querySelector('#register-button');
    const messageElement = document.querySelector('#register-message');

    if (registerForm) {
        registerButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const username = document.querySelector('#register-email').value;
            const password = document.querySelector('#register-password').value;
            const confirmPassword = document.querySelector('#confirm-password').value;

            if (password !== confirmPassword) {
                messageElement.textContent = 'Passwords do not match!';
                messageElement.style.color = 'red';
                return;
            }

            const response = await fetch(REGISTER_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                messageElement.textContent = 'Registration successful! Redirecting...';
                window.location.href = '/login'; // Redirect to login page after successful registration
            } else {
                messageElement.textContent = data.message || 'Registration failed. Please try again.';
                messageElement.style.color = 'red';
            }
        });

        
    }
}