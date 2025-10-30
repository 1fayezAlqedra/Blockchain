// Function to validate forms (Login and Signup)

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Login Form Validation ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!validateEmail(email)) {
                alert('Error: Please enter a valid email address.');
                return;
            }
            if (password.length < 6) {
                alert('Error: Password must be at least 6 characters.');
                return;
            }

            // Mock login successful (in a real app, you'd check server credentials)
            localStorage.setItem('userEmail', email); // Store user state
            alert('Login Successful! Redirecting to products...');
            window.location.href = 'products.html'; 
        });
    }

    // --- Signup Form Validation ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!validateEmail(email)) {
                 alert('Error: Please enter a valid email address!');
                return;
            }
            if (password.length < 6) {
                alert('Error: Password must be at least 6 characters.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Error: Passwords do not match!');
                return;
            }

            alert('Signup Successful! Redirecting to Login...');
            window.location.href = 'index.html'; 
        });
    }
});