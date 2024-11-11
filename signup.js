
    // Import the functions you need from the Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
        authDomain: "ott-platform-cf43e.firebaseapp.com",
        projectId: "ott-platform-cf43e",
        storageBucket: "ott-platform-cf43e.firebasestorage.app",
        messagingSenderId: "844526974291",
        appId: "1:844526974291:web:11268d750d39062db85da6"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Wait for the DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('form');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const usernameError = usernameInput.nextElementSibling;
        const emailError = emailInput.nextElementSibling;
        const passwordError = passwordInput.nextElementSibling;

        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission to handle validation

            // Clear previous error messages
            usernameError.style.display = 'none';
            emailError.style.display = 'none';
            passwordError.style.display = 'none';

            let valid = true;

            // Check if the username is empty
            if (!usernameInput.value) {
                usernameError.textContent = 'Username is required.';
                usernameError.style.display = 'block';
                valid = false;
            }

            // Check if the email is empty or not in correct format
            if (!emailInput.value) {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                valid = false;
            } else if (!validateEmail(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                valid = false;
            }

            // Check if the password is empty
            if (!passwordInput.value) {
                passwordError.textContent = 'Password is required.';
                passwordError.style.display = 'block';
                valid = false;
            }

            // If form is valid, proceed to create a Firebase user account
            if (valid) {
                createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
                    .then((userCredential) => {
                        // Signed up successfully
                        const user = userCredential.user;
                        console.log('User created successfully:', user.email);
                        // Redirect to another page or show a success message
                        window.location.href = '/main.html'; // Example redirection
                    })
                    .catch((error) => {
                        // Handle errors here, such as weak password or invalid email
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        // Example of error handling
                        if (errorCode === 'auth/email-already-in-use') {
                            emailError.textContent = 'This email is already in use.';
                            emailError.style.display = 'block';
                        } else if (errorCode === 'auth/weak-password') {
                            passwordError.textContent = 'Password should be at least 6 characters.';
                            passwordError.style.display = 'block';
                        } else {
                            console.error("Error:", errorMessage);
                        }
                    });
            }
        });

        // Function to validate email format using regular expression
        function validateEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailPattern.test(email);
        }
    });

