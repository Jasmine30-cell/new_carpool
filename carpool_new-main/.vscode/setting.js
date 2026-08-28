document.addEventListener("DOMContentLoaded", function () {

    loadUser();

    loadTheme();

    setupThemeButtons();

});



/* =====================================================
   USER
===================================================== */

function loadUser() {

    const storedUser =
        localStorage.getItem("currentUser") ||
        localStorage.getItem("loggedInUser") ||
        localStorage.getItem("user");


    if (!storedUser) {
        return;
    }


    try {

        const user =
            JSON.parse(storedUser);


        const name =
            user.name ||
            user.fullName ||
            "Student";


        const userName =
            document.getElementById("userName");


        if (userName) {

            userName.textContent =
                name;

        }


        const avatar =
            document.getElementById("profileAvatar");


        if (avatar) {

            avatar.textContent =
                name.charAt(0).toUpperCase();

        }

    }


    catch (error) {

        console.log(
            "Unable to load user."
        );

    }

}



/* =====================================================
   THEME BUTTONS
===================================================== */

function setupThemeButtons() {

    document
        .querySelectorAll(".appearance-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const theme =
                        this.dataset.theme;

                    localStorage.setItem(
                        "carpoolTheme",
                        theme
                    );

                    applyTheme(theme);

                }
            );

        });

}


/* =====================================================
   LOAD SAVED THEME
===================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "carpoolTheme"
        ) || "light";

    applyTheme(theme);

}


/* =====================================================
   APPLY GLOBAL THEME
===================================================== */

function applyTheme(theme) {

    /* Save */

    localStorage.setItem(
        "carpoolTheme",
        theme
    );


    /* BODY */

    if (theme === "dark") {

        document.body.classList.add("dark");

        document.documentElement
            .classList.add("dark-mode");

    }

    else {

        document.body.classList.remove("dark");

        document.documentElement
            .classList.remove("dark-mode");

    }


    /* Highlight selected theme */

    document
        .querySelectorAll(".appearance-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.theme === theme
            );

        });

}

/* =====================================================
   LOAD SAVED THEME
===================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "carpoolTheme"
        ) || "light";


    applyTheme(theme);

}



/* =====================================================
   APPLY GLOBAL THEME
===================================================== */

function applyTheme(theme) {

    if (theme === "dark") {

        document.documentElement
            .classList.add("dark-mode");

    }

    else {

        document.documentElement
            .classList.remove("dark-mode");

    }


    /* Highlight selected button */

    document
        .querySelectorAll(".appearance-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.theme === theme
            );

        });

}



/* =====================================================
   FAQ
===================================================== */

function showFAQ() {

    const modal =
        document.getElementById("faqModal");


    if (!modal) {
        return;
    }


    modal.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );

}



/* =====================================================
   CLOSE FAQ
===================================================== */

function closeFAQ() {

    const modal =
        document.getElementById("faqModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );

}



/* =====================================================
   CLOSE FAQ WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("faqModal");


        if (
            modal &&
            event.target === modal
        ) {

            closeFAQ();

        }

    }
);



/* =====================================================
   CLOSE FAQ WITH ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeFAQ();

        }

    }
);



/* =====================================================
   CONTACT SUPPORT
===================================================== */

function contactSupport() {

    window.location.href =
        "mailto:support@chitkaracarpool.com?subject=Chitkara%20Carpool%20Support";

}



/* =====================================================
   REPORT PROBLEM
===================================================== */

function reportProblem() {

    window.location.href =
        "mailto:support@chitkaracarpool.com?subject=Report%20a%20Problem";

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    localStorage.removeItem(
        "loggedInUser"
    );


    localStorage.removeItem(
        "user"
    );


    localStorage.removeItem(
        "userName"
    );


    localStorage.removeItem(
        "userEmail"
    );


    window.location.href =
        "index.html";

}