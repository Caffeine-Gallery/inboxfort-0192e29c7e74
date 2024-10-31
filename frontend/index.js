import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login_form');
    const loginStatus = document.getElementById('login-status');
    const loginStatusMessage = document.getElementById('login-status-message');
    const submitBtn = document.getElementById('submit-btn');
    const msg = document.getElementById('msg');

    // Prevent right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Prevent ctrl + s
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
        }
    });

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        loginStatus.style.visibility = 'hidden';
        msg.style.display = 'none';
        
        try {
            const result = await backend.login(email, password);
            
            if (result) {
                // Show success message
                showSuccess('Login successful. Redirecting...');
                
                // Redirect after successful login
                const gotoUri = document.getElementById('goto_uri').value;
                setTimeout(() => {
                    window.location.href = gotoUri;
                }, 1500);
            } else {
                throw new Error('Invalid login credentials');
            }
        } catch (error) {
            showError(error.message || 'Login failed. Please try again.');
        } finally {
            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log in';
        }
    });

    function showError(message) {
        loginStatus.className = 'error-notice error';
        loginStatus.style.visibility = 'visible';
        loginStatusMessage.textContent = message;
        msg.style.display = 'block';
    }

    function showSuccess(message) {
        loginStatus.className = 'error-notice success';
        loginStatus.style.visibility = 'visible';
        loginStatusMessage.textContent = message;
        msg.style.display = 'none';
    }
});
