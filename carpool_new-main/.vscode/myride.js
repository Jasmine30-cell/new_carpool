/* =====================================================
   CHITKARA CARPOOL - MY RIDES
===================================================== */


/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


/* =====================================================
   PROTECT PAGE
===================================================== */

if (!currentUser) {

    window.location.href =
        "dashboard.html";

}


/* =====================================================
   DOM
===================================================== */

const ridesContainer =
    document.getElementById(
        "ridesContainer"
    );

const emptyState =
    document.getElementById(
        "emptyState"
    );

const cancelModal =
    document.getElementById(
        "cancelModal"
    );

const keepRideButton =
    document.getElementById(
        "keepRideButton"
    );

const confirmCancelButton =
    document.getElementById(
        "confirmCancelButton"
    );

const modalCloseButton =
    document.getElementById(
        "modalCloseButton"
    );


/* =====================================================
   STATE
===================================================== */

let currentTab =
    "upcoming";

let rideToCancel =
    null;


/* =====================================================
   STORAGE HELPERS
===================================================== */

function getArray(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Storage error:",
            error
        );

        return [];

    }

}


function saveArray(
    key,
    value
) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(
            value ?? ""
        );

    return div.innerHTML;

}


/* =====================================================
   USER DISPLAY
===================================================== */

function displayUser() {

    const name =
        currentUser?.name ||
        currentUser?.fullName ||
        "Student";


    const userName =
        document.getElementById(
            "userName"
        );


    const avatar =
        document.getElementById(
            "userAvatar"
        );


    if (userName) {

        userName.textContent =
            name;

    }


    if (avatar) {

        avatar.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


displayUser();


/* =====================================================
   GET USER EMAIL
===================================================== */

function getCurrentEmail() {

    return String(
        currentUser?.email ||
        ""
    ).trim().toLowerCase();

}


/* =====================================================
   GET ALL USER RIDES
===================================================== */

function getUserRides() {

    const email =
        getCurrentEmail();


    /*
       These are the Local Storage
       keys used by the project.
    */

    const requestedRides =
        getArray(
            "requestedRides"
        );


    const myRides =
        getArray(
            "myRides"
        );


    const cancelledRides =
        getArray(
            "cancelledRides"
        );


    /*
       Combine everything.
    */

    const combined = [

        ...requestedRides,

        ...myRides,

        ...cancelledRides

    ];


    /*
       Remove duplicates.
    */

    const unique =
        new Map();


    combined.forEach(
        ride => {

            if (!ride) {
                return;
            }


            const rideId =
                ride.id ||
                ride.rideId ||
                (
                    ride.driverName +
                    "-" +
                    ride.date +
                    "-" +
                    ride.time
                );


            /*
               User-specific ride.

               Some old ride objects may not
               contain email. Keep them because
               they were already saved in the
               user's ride storage.
            */

            const rideEmail =
                String(
                    ride.email ||
                    ride.userEmail ||
                    ride.requestedBy ||
                    ride.passengerEmail ||
                    ""
                ).trim().toLowerCase();


            if (
                rideEmail &&
                email &&
                rideEmail !== email
            ) {

                return;

            }


            unique.set(
                String(rideId),
                ride
            );

        }
    );


    return Array.from(
        unique.values()
    );

}


/* =====================================================
   NORMALIZE STATUS
===================================================== */

function getRideStatus(
    ride
) {

    const raw =
        String(
            ride.status ||
            ride.rideStatus ||
            "pending"
        ).toLowerCase();


    if (
        raw === "cancelled" ||
        raw === "canceled"
    ) {

        return "cancelled";

    }


    if (
        raw === "completed" ||
        raw === "past"
    ) {

        return "completed";

    }


    if (
        raw === "accepted" ||
        raw === "confirmed" ||
        raw === "approved" ||
        raw === "upcoming"
    ) {

        return "upcoming";

    }


    return "pending";

}


/* =====================================================
   DATE HELPERS
===================================================== */

function getRideDate(
    ride
) {

    return (
        ride.date ||
        ride.rideDate ||
        ""
    );

}


function isPastDate(
    ride
) {

    const date =
        getRideDate(
            ride
        );


    if (!date) {
        return false;
    }


    const rideDate =
        new Date(
            date
        );


    if (
        Number.isNaN(
            rideDate.getTime()
        )
    ) {

        return false;

    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    rideDate.setHours(
        0,
        0,
        0,
        0
    );


    return (
        rideDate < today
    );

}


/* =====================================================
   FILTER RIDES
===================================================== */

function getRidesForTab(
    tab
) {

    const rides =
        getUserRides();


    return rides.filter(
        ride => {

            const status =
                getRideStatus(
                    ride
                );


            /*
               Cancelled rides are kept in
               Local Storage but don't appear
               in Upcoming/Pending.
            */

            if (
                status ===
                "cancelled"
            ) {

                return tab === "past";

            }


            if (
                status ===
                "completed"
            ) {

                return tab === "past";

            }


            /*
               Automatically consider old dates
               as past.
            */

            if (
                isPastDate(
                    ride
                )
            ) {

                return tab === "past";

            }


            if (
                tab === "upcoming"
            ) {

                return (
                    status ===
                    "upcoming"
                );

            }


            if (
                tab === "pending"
            ) {

                return (
                    status ===
                    "pending"
                );

            }


            return false;

        }
    );

}


/* =====================================================
   SHOW RIDES
===================================================== */

function showRides(
    tab
) {

    currentTab =
        tab;


    /*
       Update tabs.
    */

    document
        .querySelectorAll(
            ".tab"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


    const tabs =
        document.querySelectorAll(
            ".tab"
        );


    if (
        tab === "upcoming" &&
        tabs[0]
    ) {

        tabs[0].classList.add(
            "active"
        );

    }


    if (
        tab === "pending" &&
        tabs[1]
    ) {

        tabs[1].classList.add(
            "active"
        );

    }


    if (
        tab === "past" &&
        tabs[2]
    ) {

        tabs[2].classList.add(
            "active"
        );

    }


    const rides =
        getRidesForTab(
            tab
        );


    displayRides(
        rides
    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
    date
) {

    if (!date) {

        return "Date not available";

    }


    const d =
        new Date(
            date
        );


    if (
        Number.isNaN(
            d.getTime()
        )
    ) {

        return String(
            date
        );

    }


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   AVATAR FALLBACK
===================================================== */

function avatarFallback(
    name
) {

    const letter =
        String(
            name ||
            "S"
        )
            .charAt(0)
            .toUpperCase();


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
        >

            <rect
                width="100"
                height="100"
                fill="#e3f1e6"
            />

            <circle
                cx="50"
                cy="36"
                r="18"
                fill="#07883f"
            />

            <path
                d="
                    M18 100
                    C21 72 37 60 50 60
                    C63 60 79 72 82 100
                "
                fill="#07883f"
            />

            <text
                x="50"
                y="42"
                text-anchor="middle"
                fill="white"
                font-size="16"
                font-family="Arial"
                font-weight="bold"
            >
                ${letter}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
            svg
        )
    );

}


/* =====================================================
   DISPLAY RIDES
===================================================== */

function displayRides(
    rides
) {

    if (!ridesContainer) {
        return;
    }


    ridesContainer.innerHTML =
        "";


    if (
        !rides ||
        rides.length === 0
    ) {

        if (emptyState) {

            emptyState.style.display =
                "flex";

        }

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    rides.forEach(
        (ride, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "my-ride-card";


            card.style.animationDelay =
                `${index * 0.05}s`;


            const driver =
                ride.driverName ||
                ride.driver ||
                ride.name ||
                "Chitkara Student";


            const photo =
                ride.driverPhoto ||
                ride.photo ||
                ride.image ||
                avatarFallback(
                    driver
                );


            const pickup =
                ride.pickup ||
                ride.pickupLocation ||
                ride.from ||
                "Pickup";


            const destination =
                ride.destination ||
                ride.destinationLocation ||
                ride.to ||
                "Chitkara University";


            const date =
                getRideDate(
                    ride
                );


            const time =
                ride.time ||
                ride.rideTime ||
                "Time not available";


            const price =
                ride.price ??
                ride.pricePerSeat ??
                ride.fare ??
                0;


            const status =
                getRideStatus(
                    ride
                );


            const statusText =
                status === "upcoming"
                    ? "Confirmed"
                    : status === "pending"
                        ? "Pending"
                        : status === "cancelled"
                            ? "Cancelled"
                            : "Completed";


            const canCancel =
                status === "pending" ||
                status === "upcoming";


            const rideId =
                ride.id ||
                ride.rideId ||
                (
                    driver +
                    "-" +
                    date +
                    "-" +
                    time
                );


            card.innerHTML = `

                <img
                    class="ride-photo"
                    src="${escapeHTML(photo)}"
                    alt="${escapeHTML(driver)}"
                >


                <div class="ride-info">

                    <h3>
                        ${escapeHTML(driver)}
                    </h3>


                    <div class="ride-driver">

                        <i class="fa-solid fa-circle-check"></i>

                        Chitkara Verified Student

                    </div>


                    <div class="ride-route">

                        <i class="fa-solid fa-location-dot"></i>

                        <strong>
                            ${escapeHTML(pickup)}
                        </strong>


                        <span class="arrow">
                            →
                        </span>


                        <i class="fa-solid fa-location-dot"></i>

                        <strong>
                            ${escapeHTML(destination)}
                        </strong>

                    </div>


                    <div class="ride-details">

                        <span>

                            <i class="fa-regular fa-calendar"></i>

                            ${escapeHTML(
                                formatDate(date)
                            )}

                        </span>


                        <span>

                            <i class="fa-regular fa-clock"></i>

                            ${escapeHTML(time)}

                        </span>


                        <span>

                            <i class="fa-solid fa-user-group"></i>

                            ${
                                ride.seats ||
                                ride.seatsLeft ||
                                1
                            }
                            seat${
                                (
                                    ride.seats ||
                                    ride.seatsLeft ||
                                    1
                                ) !== 1
                                    ? "s"
                                    : ""
                            }

                        </span>

                    </div>

                </div>


                <div class="ride-right">


                    <div
                        class="ride-status ${status}"
                    >

                        <i class="fa-solid fa-circle"></i>

                        ${statusText}

                    </div>


                    <div class="ride-price">

                        ₹${escapeHTML(price)}

                        <span>
                            / seat
                        </span>

                    </div>


                    ${
                        canCancel
                            ? `
                                <button
                                    class="cancel-ride-button"
                                    data-id="${escapeHTML(rideId)}"
                                    type="button"
                                >

                                    <i class="fa-solid fa-ban"></i>

                                    Cancel Ride

                                </button>
                              `
                            : ""
                    }


                    ${
                        status !== "cancelled"
                            ? `
                                <button
                                    class="view-my-ride"
                                    data-id="${escapeHTML(rideId)}"
                                    type="button"
                                >

                                    View Ride

                                </button>
                              `
                            : ""
                    }

                </div>

            `;


            /*
               Image fallback
            */

            const image =
                card.querySelector(
                    ".ride-photo"
                );


            if (image) {

                image.onerror =
                    function () {

                        this.src =
                            avatarFallback(
                                driver
                            );

                    };

            }


            /*
               Cancel button
            */

            const cancelButton =
                card.querySelector(
                    ".cancel-ride-button"
                );


            if (cancelButton) {

                cancelButton.addEventListener(
                    "click",
                    function () {

                        openCancelModal(
                            rideId
                        );

                    }
                );

            }


            /*
               View button
            */

            const viewButton =
                card.querySelector(
                    ".view-my-ride"
                );


            if (viewButton) {

                viewButton.addEventListener(
                    "click",
                    function () {

                        openRide(
                            rideId
                        );

                    }
                );

            }


            ridesContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   OPEN RIDE
===================================================== */

function openRide(
    rideId
) {

    const ride =
        getUserRides().find(
            item => {

                const id =
                    item.id ||
                    item.rideId ||
                    (
                        item.driverName +
                        "-" +
                        item.date +
                        "-" +
                        item.time
                    );


                return String(id) ===
                    String(rideId);

            }
        );


    if (!ride) {

        return;

    }


    localStorage.setItem(
        "selectedRide",
        JSON.stringify(
            ride
        )
    );


    localStorage.setItem(
        "currentRide",
        JSON.stringify(
            ride
        )
    );


    window.location.href =
        "ride.html";

}


/* =====================================================
   CANCEL MODAL
===================================================== */

function openCancelModal(
    rideId
) {

    rideToCancel =
        rideId;


    if (!cancelModal) {
        return;
    }


    cancelModal.classList.add(
        "show"
    );

}


function closeCancelModal() {

    rideToCancel =
        null;


    if (cancelModal) {

        cancelModal.classList.remove(
            "show"
        );

    }

}


/* =====================================================
   CONFIRM CANCEL
===================================================== */

function confirmCancel() {

    if (!rideToCancel) {

        closeCancelModal();

        return;

    }


    const rideId =
        String(
            rideToCancel
        );


    /*
       Find ride from every storage collection.
    */

    const requested =
        getArray(
            "requestedRides"
        );


    const myRides =
        getArray(
            "myRides"
        );


    const cancelled =
        getArray(
            "cancelledRides"
        );


    let cancelledRide =
        null;


    /*
       Search requested rides.
    */

    let index =
        requested.findIndex(
            ride => {

                const id =
                    ride.id ||
                    ride.rideId ||
                    (
                        ride.driverName +
                        "-" +
                        ride.date +
                        "-" +
                        ride.time
                    );


                return String(id) ===
                    rideId;

            }
        );


    if (index !== -1) {

        cancelledRide =
            requested[index];

        requested.splice(
            index,
            1
        );

    }


    /*
       Search my rides.
    */

    if (!cancelledRide) {

        index =
            myRides.findIndex(
                ride => {

                    const id =
                        ride.id ||
                        ride.rideId ||
                        (
                            ride.driverName +
                            "-" +
                            ride.date +
                            "-" +
                            ride.time
                        );


                    return String(id) ===
                        rideId;

                }
            );


        if (index !== -1) {

            cancelledRide =
                myRides[index];

            myRides.splice(
                index,
                1
            );

        }

    }


    if (!cancelledRide) {

        closeCancelModal();

        return;

    }


    /*
       Update status.
    */

    cancelledRide.status =
        "cancelled";


    cancelledRide.cancelledAt =
        new Date().toISOString();


    cancelledRide.cancelledBy =
        getCurrentEmail();


    /*
       Store in cancelled history.
    */

    const alreadyCancelled =
        cancelled.some(
            ride => {

                const id =
                    ride.id ||
                    ride.rideId ||
                    (
                        ride.driverName +
                        "-" +
                        ride.date +
                        "-" +
                        ride.time
                    );


                return String(id) ===
                    rideId;

            }
        );


    if (!alreadyCancelled) {

        cancelled.push(
            cancelledRide
        );

    }


    /*
       Save everything.
    */

    saveArray(
        "requestedRides",
        requested
    );


    saveArray(
        "myRides",
        myRides
    );


    saveArray(
        "cancelledRides",
        cancelled
    );


    closeCancelModal();


    /*
       Refresh current tab.
    */

    updateSummary();


    showRides(
        currentTab
    );

}


/* =====================================================
   MODAL EVENTS
===================================================== */

if (keepRideButton) {

    keepRideButton.addEventListener(
        "click",
        closeCancelModal
    );

}


if (confirmCancelButton) {

    confirmCancelButton.addEventListener(
        "click",
        confirmCancel
    );

}


if (modalCloseButton) {

    modalCloseButton.addEventListener(
        "click",
        closeCancelModal
    );

}


if (cancelModal) {

    cancelModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                cancelModal
            ) {

                closeCancelModal();

            }

        }
    );

}


/* =====================================================
   SUMMARY COUNTS
===================================================== */

function updateSummary() {

    const rides =
        getUserRides();


    let upcoming = 0;

    let pending = 0;

    let past = 0;


    rides.forEach(
        ride => {

            const status =
                getRideStatus(
                    ride
                );


            if (
                status ===
                "cancelled" ||
                status ===
                "completed" ||
                isPastDate(
                    ride
                )
            ) {

                past++;

            }


            else if (
                status ===
                "upcoming"
            ) {

                upcoming++;

            }


            else {

                pending++;

            }

        }
    );


    const upcomingCount =
        document.getElementById(
            "upcomingCount"
        );


    const pendingCount =
        document.getElementById(
            "pendingCount"
        );


    const pastCount =
        document.getElementById(
            "pastCount"
        );


    const totalCount =
        document.getElementById(
            "totalCount"
        );


    if (upcomingCount) {

        upcomingCount.textContent =
            upcoming;

    }


    if (pendingCount) {

        pendingCount.textContent =
            pending;

    }


    if (pastCount) {

        pastCount.textContent =
            past;

    }


    if (totalCount) {

        totalCount.textContent =
            rides.length;

    }

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function updateNotifications() {

    const requested =
        getArray(
            "requestedRides"
        );


    const email =
        getCurrentEmail();


    const pending =
        requested.filter(
            ride => {

                const rideEmail =
                    String(
                        ride.email ||
                        ride.userEmail ||
                        ride.requestedBy ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                const status =
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase();


                return (
                    rideEmail === email &&
                    status === "pending"
                );

            }
        );


    const count =
        pending.length;


    document
        .querySelectorAll(
            ".notification-dot"
        )
        .forEach(
            dot => {

                dot.textContent =
                    count;

                dot.style.display =
                    count > 0
                        ? "flex"
                        : "none";

            }
        );


    const headerNotification =
        document.querySelector(
            ".header-icon span"
        );


    if (headerNotification) {

        headerNotification.textContent =
            count;

        headerNotification.style.display =
            count > 0
                ? "flex"
                : "none";

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    /*
       Remove only current logged-in user.

       Do NOT delete:
       - registeredUsers
       - rides
       - requestedRides
       - myRides
       - cancelledRides
    */

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const sidebar =
    document.querySelector(
        ".sidebar"
    );

const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );

            sidebarOverlay.classList.toggle(
                "show"
            );

        }
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        function () {

            sidebar.classList.remove(
                "open"
            );

            sidebarOverlay.classList.remove(
                "show"
            );

        }
    );

}


/* =====================================================
   NAVIGATION HELPERS
===================================================== */

const messagesNav =
    document.getElementById(
        "messagesNav"
    );


if (messagesNav) {

    messagesNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showMessagge(
                "Messages feature is coming soon."
            )
            
        }
    );

}


const notificationsNav =
    document.getElementById(
        "notificationsNav"
    );


if (notificationsNav) {

    notificationsNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const rides =
                getArray(
                    "requestedRides"
                );


            if (
                rides.length === 0
            ) {

                showMessage(
                    "You don't have any ride notifications yet."
                );

            }

            else {

                showMessage(
                    `You have ${rides.length} ride request${
                        rides.length === 1
                            ? ""
                            : "s"
                    }.`
                );

            }

        }
    );

}


const profileNav =
    document.getElementById(
        "profileNav"
    );


if (profileNav) {

    profileNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showMessage(
                "Profile page is coming soon."
            );

        }
    );

}


const settingsNav =
    document.getElementById(
        "settingsNav"
    );


if (settingsNav) {

    settingsNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showMessage(
                "Settings page is coming soon."
            );

        }
    );

}


/* =====================================================
   SAFETY GUIDELINES
===================================================== */

const safetyLink =
    document.querySelector(
        ".safety-card a"
    );


if (safetyLink) {

    safetyLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            showMessage(

                "CHITKARA CARPOOL SAFETY\n\n" +

                "✓ Travel with verified students\n" +

                "✓ Confirm the vehicle details\n" +

                "✓ Meet at the selected pickup point\n" +

                "✓ Share ride details with someone you trust\n" +

                "✓ Report suspicious activity"

            );

        }
    );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSummary();

        updateNotifications();

        showRides(
            "upcoming"
        );

    }
);