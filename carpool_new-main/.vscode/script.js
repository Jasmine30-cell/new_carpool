// =====================================================
// GET ELEMENTS
// =====================================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "◉";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "◉";

    }

});


// =====================================================
// EMAIL VALIDATION
// =====================================================

function validateEmail(email) {

    // Check whether email ends with Chitkara domain
    if (!email.endsWith("@chitkara.edu.in")) {
        return false;
    }

    // Basic email format
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/;

    return emailPattern.test(email);
}


// =====================================================
// PASSWORD VALIDATION
// =====================================================

function validatePassword(password) {

    // Minimum 6 characters
    if (password.length < 6) {
        return false;
    }

    return true;
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
// REMOVE ERROR WHEN USER STARTS TYPING
// =====================================================

emailInput.addEventListener("input", function () {

    errorMessage.textContent = "";

});


passwordInput.addEventListener("input", function () {

    errorMessage.textContent = "";

});


// =====================================================
// LOGIN FORM
// =====================================================

loginForm.addEventListener("submit", function (event) {

    // Stop page from refreshing
    event.preventDefault();


    // Clear previous messages

    errorMessage.textContent = "";
    successMessage.textContent = "";


    // Get values

    const email =
        emailInput.value.trim().toLowerCase();

    const password =
        passwordInput.value.trim();


    // =================================================
    // 1. EMPTY EMAIL
    // =================================================

    if (email === "") {

        showError("Please enter your Chitkara email address.");

        emailInput.focus();

        return;
    }


    // =================================================
    // 2. EMAIL FORMAT
    // =================================================

    if (!validateEmail(email)) {

        showError(
            "Please enter a valid Chitkara email ending with @chitkara.edu.in"
        );

        emailInput.focus();

        return;
    }


    // =================================================
    // 3. EMPTY PASSWORD
    // =================================================

    if (password === "") {

        showError("Please enter your password.");

        passwordInput.focus();

        return;
    }


    // =================================================
    // 4. PASSWORD LENGTH
    // =================================================

    if (!validatePassword(password)) {

        showError(
            "Password must contain at least 6 characters."
        );

        passwordInput.focus();

        return;
    }


    // =================================================
    // GET REGISTERED USERS
    // =================================================

    const users =
        JSON.parse(
            localStorage.getItem("carpoolUsers")
        ) || [];


    // =================================================
    // FIND USER
    // =================================================

    const user =
        users.find(function (item) {

            return (
                item.email.toLowerCase() === email
            );

        });


    // =================================================
    // USER DOES NOT EXIST
    // =================================================

    if (!user) {

        showError(
            "No account found with this Chitkara ID. Please sign up first."
        );

        return;
    }


    // =================================================
    // WRONG PASSWORD
    // =================================================

    if (user.password !== password) {

        showError(
            "Incorrect password. Please check your password."
        );

        passwordInput.focus();

        return;
    }


    // =================================================
    // LOGIN SUCCESS
    // =================================================

    const currentUser = {

        name: user.name,

        email: user.email,

        loginTime: new Date().toISOString()

    };


    // Save currently logged-in user

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    // =================================================
    // REMEMBER ME
    // =================================================

    const rememberMe =
        document.getElementById("rememberMe");


    if (rememberMe.checked) {

        localStorage.setItem(
            "rememberedEmail",
            email
        );

    } else {

        localStorage.removeItem(
            "rememberedEmail"
        );

    }


    // =================================================
    // SUCCESS MESSAGE
    // =================================================

    showSuccess(
        "Login successful! Redirecting..."
    );


    // =================================================
    // REDIRECT TO DASHBOARD
    // =================================================

    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 800);

});


// =====================================================
// LOAD REMEMBERED EMAIL
// =====================================================

const rememberedEmail =
    localStorage.getItem("rememberedEmail");


if (rememberedEmail) {

    emailInput.value = rememberedEmail;

    document.getElementById("rememberMe").checked = true;

}