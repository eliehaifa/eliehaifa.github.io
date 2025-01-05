const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const subMenuButton = document.querySelector('.sub-menu-button');
const subMenuList = document.querySelector('.sub-menu-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

subMenuButton.addEventListener('click', () => {
    subMenuList.classList.toggle('active');
});

// Display username or guest
const usernameDisplay = document.getElementById('userGreeting');
if (usernameDisplay) { // Check if element exists
    const username = localStorage.getItem('username') || 'Guest';
    usernameDisplay.innerText = username;
}

// Modal functionality
const signupModal = document.getElementById("signupModal");
if (signupModal) { // Check if modal exists
    const signupModalContent = signupModal.querySelector(".modal-content");
    const closeButton = signupModal.querySelector(".close");
    const skipButton = document.getElementById("skipButton");

    window.addEventListener('load', () => {
        signupModal.classList.add('show');
        signupModalContent.classList.add('show');
    });

    closeButton.addEventListener('click', () => {
        signupModal.classList.remove('show');
        signupModalContent.classList.remove('show');
    });

    skipButton.addEventListener('click', () => {
        signupModal.classList.remove('show');
        signupModalContent.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.classList.remove('show');
            signupModalContent.classList.remove('show');
        }
    });
}


// Settings Modal
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
if(settingsModal){
    const settingsModalContent = settingsModal.querySelector('.modal-content');
    const settingsClose = document.getElementById('settingsClose');
    const lightModeButton = document.getElementById('lightModeButton');
    const darkModeButton = document.getElementById('darkModeButton');

    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('show');
        settingsModalContent.classList.add('show');
    });

    settingsClose.addEventListener('click', () => {
        settingsModal.classList.remove('show');
        settingsModalContent.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.classList.remove('show');
            settingsModalContent.classList.remove('show');
        }
    });

    // Theme Functionality
    const body = document.body;
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const features = document.querySelector('.features');
    const subMenuListDarkMode = document.querySelector('.sub-menu-list');
    const navListA = document.querySelectorAll('.nav-list a')
    const btn = document.querySelectorAll('.btn')
    const modalContentDarkMode = document.querySelector('.modal-content')

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    lightModeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'light-mode');
        applyTheme('light-mode');
        settingsModal.classList.remove('show');
        settingsModalContent.classList.remove('show');
    });

    darkModeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'dark-mode');
        applyTheme('dark-mode');
        settingsModal.classList.remove('show');
        settingsModalContent.classList.remove('show');
    });

    function applyTheme(theme) {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
            header.classList.add('dark-mode');
            hero.classList.add('dark-mode');
            features.classList.add('dark-mode');
            subMenuListDarkMode.classList.add('dark-mode');
            modalContentDarkMode.classList.add('dark-mode');
            btn.forEach(element => element.classList.add('dark-mode'));
            navListA.forEach(element => element.classList.add('dark-mode'));
        } else {
            body.classList.remove('dark-mode');
            header.classList.remove('dark-mode');
            hero.classList.remove('dark-mode');
            features.classList.remove('dark-mode');
            subMenuListDarkMode.classList.remove('dark-mode');
            modalContentDarkMode.classList.remove('dark-mode');
            btn.forEach(element => element.classList.remove('dark-mode'));
            navListA.forEach(element => element.classList.remove('dark-mode'));
        }
    }
}


// Logout Functionality
const logoutLink = document.querySelector('.sub-menu-list li:last-child a');
if (logoutLink) { // Check if the element exists
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('username');
        location.reload();
    });
}


// ... (All other JavaScript code - menu, modals, theme, logout)

// Signup Form Handling (Corrected)
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);

        fetch('signup.php', { // Replace with your server-side script URL
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (data.username) {
                    localStorage.setItem('username', data.username);
                }
                window.location.href = 'index.html'; // Redirect IMMEDIATELY on success
            } else {
                // Display error message WITHOUT using alert()
                const errorContainer = document.createElement('div'); // Create a div for errors
                errorContainer.className = 'error-message'; // Add a class for styling (see CSS below)
                errorContainer.textContent = data.message || 'Signup failed.'; // Set the error message
                signupForm.parentNode.insertBefore(errorContainer, signupForm); // Insert error before the form

                //Optional: remove the error message after a few seconds
                setTimeout(() => {
                    errorContainer.remove();
                }, 3000)
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.textContent = 'An error occurred during signup.';
            signupForm.parentNode.insertBefore(errorContainer, signupForm);
            setTimeout(() => {
                errorContainer.remove();
            }, 3000)
        });
    });
}