// Functionality that applies globally across the site
document.addEventListener('DOMContentLoaded', () => {
    console.log('E-commerce Store Loaded. Enjoy shopping!');

    // Example of a simple interaction, like showing a welcome message on login
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        // You could update a welcome banner here if the user is logged in
        // Example: document.getElementById('welcomeMessage').textContent = `Welcome, ${userEmail}!`;
    }
});


