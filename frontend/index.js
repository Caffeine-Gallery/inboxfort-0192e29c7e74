import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const msgDiv = document.getElementById('msg');

    loginButton.addEventListener('click', async () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        try {
            loginButton.disabled = true;
            const result = await backend.login(username, password);
            msgDiv.textContent = result;
            loginButton.disabled = false;
        } catch (e) {
            msgDiv.textContent = e.message;
            loginButton.disabled = false;
        }
    });
});

window.toggle_locales = function(show) {
    const localesList = document.getElementById('locales_list');
    const moreLocale = document.getElementById('morelocale');
    
    if (show) {
        localesList.classList.add('show-all');
        moreLocale.style.display = 'none';
    } else {
        localesList.classList.remove('show-all');
        moreLocale.style.display = 'inline';
    }
};
