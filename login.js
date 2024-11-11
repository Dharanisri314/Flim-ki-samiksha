
    // Import the functions you need from the Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

    // Login form functionality
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('signup-form');
        const emailInput = document.getElementById('signup-email');
        const passwordInput = document.getElementById('signup-password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        // Form submission handler
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form submission to handle validation

            // Clear previous error messages
            emailError.style.display = 'none';
            passwordError.style.display = 'none';

            let valid = true;

            // Check if the email is empty
            if (!emailInput.value) {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                valid = false;
            }

            // Check if the password is empty
            if (!passwordInput.value) {
                passwordError.textContent = 'Password is required.';
                passwordError.style.display = 'block';
                valid = false;
            }

            // If valid, proceed to login
            if (valid) {
                signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
                    .then((userCredential) => {
                        // Signed in successfully
                        const user = userCredential.user;
                        console.log("Logged in as:", user.email);
                        alert("login Successful");
                        // Redirect or show a success message
                        window.location.href = '/main.html'; // Example redirection after login
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorCode === 'auth/invalid-credential') {
                            emailError.textContent = 'Email or password is wrong not found.';
                            emailError.style.display = 'block';
                        } else if (errorCode === 'auth/wrong-password'){
                            passwordError.textContent = 'Incorrect password.';
                            passwordError.style.display = 'block';
                        } else {
                            console.error("Error:", errorMessage);
                        }
                    });
            }
        });
    });

