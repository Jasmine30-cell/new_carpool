// =====================================================
// GET ELEMENTS
// =====================================================

const signupForm =
    document.getElementById("signupForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const errorMessage =
    document.getElementById("errorMessage");

const successMessage =
    document.getElementById("successMessage");


// =====================================================
// SHOW / HIDE PASSWORD
// =====================================================

togglePassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

        } else {

            passwordInput.type = "password";

        }

    }
);


// =====================================================
// SHOW / HIDE CONFIRM PASSWORD
// =====================================================

toggleConfirmPassword.addEventListener(
    "click",
    function () {

        if (
            confirmPasswordInput.type === "password"
        ) {

            confirmPasswordInput.type = "text";

        } else {

            confirmPasswordInput.type = "password";

        }

    }
);


// =====================================================
// EMAIL VALIDATION
// =====================================================

function validateEmail(email) {

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/;

    return emailPattern.test(email);

}


// =====================================================
// NAME VALIDATION
// =====================================================

function validateName(name) {

    /*
       Name should contain at least
       two characters.
    */

    return name.length >= 2;

}


// =====================================================
// PASSWORD VALIDATION
// =====================================================

function validatePassword(password) {

    return password.length >= 6;

}


// =====================================================
// SHOW ERROR
// =====================================================

function showError(message) {

    errorMessage.textContent =
        message;

    successMessage.textContent = "";

}


// =====================================================
// SHOW SUCCESS
// =====================================================

function showSuccess(message) {

    successMessage.textContent =
        message;

    errorMessage.textContent = "";

}


// =====================================================
// CLEAR ERROR WHILE TYPING
// =====================================================

nameInput.addEventListener(
    "input",
    function () {

        errorMessage.textContent = "";

    }
);


emailInput.addEventListener(
    "input",
    function () {

        errorMessage.textContent = "";

    }
);


passwordInput.addEventListener(
    "input",
    function () {

        errorMessage.textContent = "";

    }
);


confirmPasswordInput.addEventListener(
    "input",
    function () {

        errorMessage.textContent = "";

    }
);


// =====================================================
// EMAIL LIVE VALIDATION
// =====================================================

emailInput.addEventListener(
    "blur",
    function () {

        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        if (email === "") {

            emailInput.classList.remove(
                "valid",
                "invalid"
            );

            return;

        }


        if (validateEmail(email)) {

            emailInput.classList.add("valid");

            emailInput.classList.remove("invalid");

        } else {

            emailInput.classList.add("invalid");

            emailInput.classList.remove("valid");

        }

    }
);


// =====================================================
// PASSWORD LIVE VALIDATION
// =====================================================

passwordInput.addEventListener(
    "blur",
    function () {

        const password =
            passwordInput.value.trim();


        if (password === "") {

            passwordInput.classList.remove(
                "valid",
                "invalid"
            );

            return;

        }


        if (validatePassword(password)) {

            passwordInput.classList.add("valid");

            passwordInput.classList.remove(
                "invalid"
            );

        } else {

            passwordInput.classList.add("invalid");

            passwordInput.classList.remove(
                "valid"
            );

        }

    }
);


// =====================================================
// SIGNUP FORM
// =====================================================

signupForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh

        event.preventDefault();


        // Clear messages

        errorMessage.textContent = "";

        successMessage.textContent = "";


        // =================================================
        // GET VALUES
        // =================================================

        const name =
            nameInput.value.trim();


        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        const password =
            passwordInput.value.trim();


        const confirmPassword =
            confirmPasswordInput.value.trim();


        // =================================================
        // NAME CHECK
        // =================================================

        if (name === "") {

            showError(
                "Please enter your full name."
            );

            nameInput.focus();

            return;

        }


        if (!validateName(name)) {

            showError(
                "Please enter a valid name."
            );

            nameInput.focus();

            return;

        }


        // =================================================
        // EMAIL EMPTY
        // =================================================

        if (email === "") {

            showError(
                "Please enter your Chitkara email."
            );

            emailInput.focus();

            return;

        }


        // =================================================
        // CHITKARA EMAIL
        // =================================================

        if (!validateEmail(email)) {

            showError(
                "Please use a valid Chitkara email ending with @chitkara.edu.in"
            );

            emailInput.focus();

            return;

        }


        // =================================================
        // PASSWORD
        // =================================================

        if (password === "") {

            showError(
                "Please create a password."
            );

            passwordInput.focus();

            return;

        }


        if (!validatePassword(password)) {

            showError(
                "Password must contain at least 6 characters."
            );

            passwordInput.focus();

            return;

        }


        // =================================================
        // CONFIRM PASSWORD
        // =================================================

        if (confirmPassword === "") {

            showError(
                "Please confirm your password."
            );

            confirmPasswordInput.focus();

            return;

        }


        if (password !== confirmPassword) {

            showError(
                "Passwords do not match."
            );

            confirmPasswordInput.focus();

            return;

        }


        // =================================================
        // GET EXISTING USERS
        // =================================================

        const users =
            JSON.parse(
                localStorage.getItem(
                    "carpoolUsers"
                )
            ) || [];


        // =================================================
        // CHECK DUPLICATE EMAIL
        // =================================================

        const existingUser =
            users.find(
                function (user) {

                    return (
                        user.email.toLowerCase() ===
                        email
                    );

                }
            );


        if (existingUser) {

            showError(
                "An account with this email already exists. Please login."
            );

            return;

        }


        // =================================================
        // CREATE USER
        // =================================================

        const newUser = {

            id:
                Date.now(),

            name:
                name,

            email:
                email,

            password:
                password,

            createdAt:
                new Date().toISOString()

        };


        // =================================================
        // ADD USER TO ARRAY
        // =================================================

        users.push(newUser);


        // =================================================
        // SAVE TO LOCAL STORAGE
        // =================================================

        localStorage.setItem(
            "carpoolUsers",
            JSON.stringify(users)
        );


        // =================================================
        // SUCCESS
        // =================================================

        showSuccess(
            "Account created successfully! Redirecting to login..."
        );


        // =================================================
        // CLEAR FORM
        // =================================================

        signupForm.reset();


        // =================================================
        // REDIRECT
        // =================================================

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            1000
        );

    }
);