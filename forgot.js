// =====================================================
// GET ELEMENTS
// =====================================================

const forgotForm = document.getElementById("forgotForm");

const emailInput = document.getElementById("email");

const newPasswordInput =
    document.getElementById("newPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const toggleNewPassword =
    document.getElementById("toggleNewPassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const errorMessage =
    document.getElementById("errorMessage");

const successMessage =
    document.getElementById("successMessage");


// =====================================================
// SHOW / HIDE NEW PASSWORD
// =====================================================

toggleNewPassword.addEventListener(
    "click",
    function () {

        if (newPasswordInput.type === "password") {

            newPasswordInput.type = "text";

        } else {

            newPasswordInput.type = "password";

        }

    }
);


// =====================================================
// SHOW / HIDE CONFIRM PASSWORD
// =====================================================

toggleConfirmPassword.addEventListener(
    "click",
    function () {

        if (confirmPasswordInput.type === "password") {

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
// PASSWORD VALIDATION
// =====================================================

function validatePassword(password) {

    return password.length >= 6;

}


// =====================================================
// SHOW ERROR
// =====================================================

function showError(message) {

    errorMessage.textContent = message;

    successMessage.textContent = "";

}


// =====================================================
// SHOW SUCCESS
// =====================================================

function showSuccess(message) {

    successMessage.textContent = message;

    errorMessage.textContent = "";

}


// =====================================================
// CLEAR ERROR WHILE TYPING
// =====================================================

emailInput.addEventListener(
    "input",
    function () {

        errorMessage.textContent = "";

    }
);


newPasswordInput.addEventListener(
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

newPasswordInput.addEventListener(
    "blur",
    function () {

        const password =
            newPasswordInput.value.trim();


        if (password === "") {

            newPasswordInput.classList.remove(
                "valid",
                "invalid"
            );

            return;
        }


        if (validatePassword(password)) {

            newPasswordInput.classList.add("valid");

            newPasswordInput.classList.remove(
                "invalid"
            );

        } else {

            newPasswordInput.classList.add("invalid");

            newPasswordInput.classList.remove(
                "valid"
            );

        }

    }
);


// =====================================================
// FORM SUBMIT
// =====================================================

forgotForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh

        event.preventDefault();


        // Clear old messages

        errorMessage.textContent = "";

        successMessage.textContent = "";


        // =================================================
        // GET VALUES
        // =================================================

        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        const newPassword =
            newPasswordInput.value.trim();


        const confirmPassword =
            confirmPasswordInput.value.trim();


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
        // EMAIL FORMAT
        // =================================================

        if (!validateEmail(email)) {

            showError(
                "Please use a valid Chitkara email ending with @chitkara.edu.in"
            );

            emailInput.focus();

            return;
        }


        // =================================================
        // PASSWORD EMPTY
        // =================================================

        if (newPassword === "") {

            showError(
                "Please enter your new password."
            );

            newPasswordInput.focus();

            return;
        }


        // =================================================
        // PASSWORD LENGTH
        // =================================================

        if (!validatePassword(newPassword)) {

            showError(
                "Password must contain at least 6 characters."
            );

            newPasswordInput.focus();

            return;
        }


        // =================================================
        // CONFIRM PASSWORD
        // =================================================

        if (confirmPassword === "") {

            showError(
                "Please confirm your new password."
            );

            confirmPasswordInput.focus();

            return;
        }


        // =================================================
        // PASSWORD MATCH
        // =================================================

        if (newPassword !== confirmPassword) {

            showError(
                "Passwords do not match."
            );

            confirmPasswordInput.focus();

            return;
        }


        // =================================================
        // GET USERS FROM LOCAL STORAGE
        // =================================================

        const users =
            JSON.parse(
                localStorage.getItem(
                    "carpoolUsers"
                )
            ) || [];


        // =================================================
        // FIND USER
        // =================================================

        const userIndex =
            users.findIndex(
                function (user) {

                    return (
                        user.email
                            .toLowerCase() ===
                        email
                    );

                }
            );


        // =================================================
        // USER NOT FOUND
        // =================================================

        if (userIndex === -1) {

            showError(
                "No account found with this Chitkara ID. Please sign up first."
            );

            return;
        }


        // =================================================
        // UPDATE PASSWORD
        // =================================================

        users[userIndex].password =
            newPassword;


        // Save reset time

        users[userIndex].passwordUpdatedAt =
            new Date().toISOString();


        // =================================================
        // SAVE UPDATED USERS
        // =================================================

        localStorage.setItem(
            "carpoolUsers",
            JSON.stringify(users)
        );


        // =================================================
        // UPDATE STEP UI
        // =================================================

        const steps =
            document.querySelectorAll(".step");


        if (steps.length >= 3) {

            steps[0].classList.remove("active");

            steps[1].classList.add("active");

            steps[2].classList.add("active");

        }


        // =================================================
        // SUCCESS
        // =================================================

        showSuccess(
            "Password reset successfully!"
        );


        // =================================================
        // DISABLE BUTTON
        // =================================================

        const resetButton =
            document.querySelector(".reset-button");


        resetButton.disabled = true;

        resetButton.style.opacity = "0.7";


        // =================================================
        // REDIRECT TO LOGIN
        // =================================================

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            1500
        );

    }
);