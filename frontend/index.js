import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login_form');
    const loginStatus = document.getElementById('login-status');
    const loginStatusMessage = document.getElementById('login-status-message');
    const loginSubmit = document.getElementById('login_submit');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('user').value;
        const password = document.getElementById('pass').value;
        
        // Disable submit button and show loading state
        loginSubmit.disabled = true;
        loginSubmit.textContent = 'Logging in...';
        
        try {
            const result = await backend.login(username, password);
            
            if (result) {
                // Show success message
                loginStatus.style.visibility = 'visible';
                loginStatus.style.backgroundColor = '#dff0d8';
                loginStatus.style.borderColor = '#d6e9c6';
                loginStatusMessage.textContent = 'Login successful. Redirecting...';
                
                // Redirect after successful login
                const gotoUri = document.getElementById('goto_uri').value;
                setTimeout(() => {
                    window.location.href = gotoUri;
                }, 1500);
            } else {
                throw new Error('Invalid login credentials');
            }
        } catch (error) {
            // Show error message
            loginStatus.style.visibility = 'visible';
            loginStatus.style.backgroundColor = '#f2dede';
            loginStatus.style.borderColor = '#ebccd1';
            loginStatusMessage.textContent = error.message || 'Login failed. Please try again.';
        } finally {
            // Reset submit button
            loginSubmit.disabled = false;
            loginSubmit.textContent = 'Log in';
        }
    });

    // Handle locale selection
    document.getElementById('morelocale')?.addEventListener('click', function() {
        const localeContainer = document.getElementById('locale-container');
        if (localeContainer) {
            localeContainer.style.visibility = 'visible';
        }
    });

    // Close locale selection
    window.toggle_locales = function(show) {
        const localeContainer = document.getElementById('locale-container');
        if (localeContainer) {
            localeContainer.style.visibility = show ? 'visible' : 'hidden';
        }
    };
});
