import { backend } from "declarations/backend";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginButton = document.getElementById('loginButton');
    const loginSpinner = document.getElementById('loginSpinner');
    const loginText = document.getElementById('loginText');
    const errorMessage = document.getElementById('errorMessage');
    
    // Show loading state
    loginButton.disabled = true;
    loginSpinner.classList.remove('d-none');
    loginText.textContent = 'Signing in...';
    errorMessage.classList.add('d-none');
    
    try {
        const result = await backend.login(email, password.value);
        
        if (result) {
            // Successful login
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }
            // Redirect or show success message
            errorMessage.textContent = 'Login successful!';
            errorMessage.classList.remove('alert-danger');
            errorMessage.classList.add('alert-success');
            errorMessage.classList.remove('d-none');
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        errorMessage.textContent = error.message || 'Login failed. Please try again.';
        errorMessage.classList.add('alert-danger');
        errorMessage.classList.remove('d-none');
    } finally {
        // Reset button state
        loginButton.disabled = false;
        loginSpinner.classList.add('d-none');
        loginText.textContent = 'Sign In';
    }
});

// Check for remembered email
const rememberedEmail = localStorage.getItem('email');
if (rememberedEmail) {
    document.getElementById('email').value = rememberedEmail;
    document.getElementById('rememberMe').checked = true;
}
