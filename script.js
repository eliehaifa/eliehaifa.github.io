document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this[0].value;
    const password = this[1].value;

    // Send login request to server
    fetch('http://localhost:3000/login', {  // Change this if your server is hosted elsewhere
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect or show success message
            window.location.href = 'index.html'; // Redirect on successful login
        } else {
            // Show error message
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});