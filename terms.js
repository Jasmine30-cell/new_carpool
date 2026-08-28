/* =====================================================
   CHITKARA CARPOOL - GLOBAL THEME
===================================================== */

(function () {

    const savedTheme =
        localStorage.getItem("carpoolTheme") || "light";


    if (savedTheme === "dark") {

        document.documentElement.classList.add("dark-mode");

    }

})();