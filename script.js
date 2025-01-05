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