/* =====================================================
   CHITKARA CARPOOL - DASHBOARD
===================================================== */


/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


/* =====================================================
   PAGE PROTECTION
===================================================== */

if (!currentUser) {

    window.location.href =
        "index.html";

}


/* =====================================================
   DOM
===================================================== */

const dashboardUserName =
    document.getElementById(
        "dashboardUserName"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const pickup =
    document.getElementById(
        "pickup"
    );

const destination =
    document.getElementById(
        "destination"
    );

const date =
    document.getElementById(
        "date"
    );

const rideContainer =
    document.getElementById(
        "rideContainer"
    );

const noResults =
    document.getElementById(
        "noResults"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


/* =====================================================
   CURRENT USER
===================================================== */

const loggedUserName =
    currentUser?.name ||
    currentUser?.fullName ||
    "Student";


if (dashboardUserName) {

    dashboardUserName.textContent =
        loggedUserName;

}


if (profileAvatar) {

    profileAvatar.textContent =
        loggedUserName
            .charAt(0)
            .toUpperCase();

}


/* =====================================================
   RIDE DATA
===================================================== */

let allRides = [];


/* =====================================================
   GET POSTED RIDES
===================================================== */

function getPostedRides() {

    try {

        const rides =
            JSON.parse(
                localStorage.getItem(
                    "postedRides"
                )
            );

        return Array.isArray(rides)
            ? rides
            : [];

    } catch {

        return [];

    }

}


/* =====================================================
   SAMPLE RIDES
===================================================== */

function getSampleRides() {

    return [

        {
            id: "sample1",

            driverName: "Aarav Sharma",

            driverEmail:
                "aarav@chitkara.edu.in",

            pickup:
                "Zirakpur",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "08:00",

            seats:
                3,

            seatsLeft:
                3,

            price:
                40,

            carModel:
                "Swift Dzire",

            carColor:
                "White",

            carNumber:
                "PB65AB1234",

            rating:
                4.8,

            reviews:
                24,

            notes:
                "Leaving from Zirakpur Bus Stand."

        },


        {
            id: "sample2",

            driverName: "Simran Kaur",

            driverEmail:
                "simran@chitkara.edu.in",

            pickup:
                "VIP Road",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "08:30",

            seats:
                2,

            seatsLeft:
                2,

            price:
                45,

            carModel:
                "Honda City",

            carColor:
                "Black",

            carNumber:
                "PB12CD4567",

            rating:
                4.9,

            reviews:
                31,

            notes:
                "Pickup near VIP Road."

        },


        {
            id: "sample3",

            driverName: "Rohan Verma",

            driverEmail:
                "rohan@chitkara.edu.in",

            pickup:
                "Mohali",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "07:45",

            seats:
                4,

            seatsLeft:
                4,

            price:
                35,

            carModel:
                "Hyundai i20",

            carColor:
                "Blue",

            carNumber:
                "PB65EF7890",

            rating:
                4.7,

            reviews:
                18,

            notes:
                "Morning ride to campus."

        }

    ];

}


/* =====================================================
   TOMORROW
===================================================== */

function getTomorrow() {

    const d =
        new Date();

    d.setDate(
        d.getDate() + 1
    );

    return d
        .toISOString()
        .split("T")[0];

}


/* =====================================================
   LOAD RIDES
===================================================== */

function loadRides() {

    const postedRides =
        getPostedRides();


    if (
        postedRides.length > 0
    ) {

        allRides =
            postedRides;

    } else {

        allRides =
            getSampleRides();

    }


    displayRides(
        allRides
    );

    loadUpcomingRide();

}


/* =====================================================
   DISPLAY RIDES
===================================================== */

function displayRides(
    rides
) {

    if (!rideContainer) {
        return;
    }

    rideContainer.innerHTML =
        "";


    if (
        rides.length === 0
    ) {

        if (noResults) {

            noResults.style.display =
                "block";

        }

        if (resultCount) {

            resultCount.textContent =
                "No matching rides found.";

        }

        return;

    }


    if (noResults) {

        noResults.style.display =
            "none";

    }


    if (resultCount) {

        resultCount.textContent =
            `Showing ${rides.length} available ride${rides.length === 1 ? "" : "s"}`;

    }


    rides.forEach(
        ride => {

            const card =
                createRideCard(
                    ride
                );

            rideContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   CREATE RIDE CARD
===================================================== */

function createRideCard(
    ride
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "ride-card";


    const initial =
        (
            ride.driverName ||
            "S"
        )
            .charAt(0)
            .toUpperCase();


    const rating =
        ride.rating ||
        4.8;


    const reviews =
        ride.reviews ||
        24;


    const seatsLeft =
        ride.seatsLeft ??
        ride.seats ??
        0;


    const price =
        ride.price ||
        0;


    card.innerHTML = `

        <div class="ride-driver">

            <div class="ride-avatar">
                ${initial}
            </div>

            <div class="ride-driver-info">

                <strong>
                    ${escapeHTML(
                        ride.driverName ||
                        "Chitkara Student"
                    )}
                </strong>

                <span>
                    ★ ${rating}
                    (${reviews} reviews)
                </span>

            </div>

            <div class="verified-small">
                ✓ Verified
            </div>

        </div>


        <div class="ride-route">

            <div class="route-location">

                <div class="route-dot pickup-dot">
                    ●
                </div>

                <div>

                    <small>
                        PICKUP
                    </small>

                    <strong>
                        ${escapeHTML(
                            ride.pickup ||
                            ride.pickupLocation ||
                            "Pickup"
                        )}
                    </strong>

                </div>

            </div>


            <div class="route-line-small"></div>


            <div class="route-location">

                <div class="route-dot destination-dot">
                    ●
                </div>

                <div>

                    <small>
                        DESTINATION
                    </small>

                    <strong>
                        ${escapeHTML(
                            ride.destination ||
                            ride.destinationLocation ||
                            "Chitkara University"
                        )}
                    </strong>

                </div>

            </div>

        </div>


        <div class="ride-meta">

            <span>
                ◷
                ${formatTime(
                    ride.time ||
                    ride.rideTime ||
                    "08:00"
                )}
            </span>

            <span>
                ◉
                ${seatsLeft} seats
            </span>

            <strong>
                ₹${price}
            </strong>

        </div>


        <div class="ride-card-footer">

            <div>

                <small>
                    ${formatDate(
                        ride.date ||
                        ride.rideDate
                    )}
                </small>

                <span>
                    ${escapeHTML(
                        ride.carModel ||
                        ride.carName ||
                        "Car"
                    )}
                    •
                    ${escapeHTML(
                        ride.carColor ||
                        "Car"
                    )}
                </span>

            </div>


            <button
                class="view-ride-button"
                onclick="viewRide('${escapeHTML(ride.id)}')"
            >
                View Ride →
            </button>

        </div>

    `;


    return card;

}


/* =====================================================
   SEARCH RIDES
===================================================== */

function searchRides() {

    const selectedPickup =
        pickup
            ? pickup.value
                .trim()
                .toLowerCase()
            : "";


    const selectedDestination =
        destination
            ? destination.value
                .trim()
                .toLowerCase()
            : "";


    const selectedDate =
        date
            ? date.value
            : "";


    let filtered =
        [...allRides];


    /* PICKUP */

    if (selectedPickup) {

        filtered =
            filtered.filter(
                ride => {

                    const ridePickup =
                        (
                            ride.pickup ||
                            ride.pickupLocation ||
                            ""
                        )
                            .toString()
                            .trim()
                            .toLowerCase();


                    return ridePickup.includes(
                        selectedPickup
                    );

                }
            );

    }


    /* DESTINATION */

    if (selectedDestination) {

        filtered =
            filtered.filter(
                ride => {

                    const rideDestination =
                        (
                            ride.destination ||
                            ride.destinationLocation ||
                            ""
                        )
                            .toString()
                            .trim()
                            .toLowerCase();


                    return rideDestination.includes(
                        selectedDestination
                    );

                }
            );

    }


    /* DATE */

    if (selectedDate) {

        filtered =
            filtered.filter(
                ride => {

                    const rideDate =
                        (
                            ride.date ||
                            ride.rideDate ||
                            ""
                        )
                            .toString()
                            .trim();


                    return rideDate ===
                        selectedDate;

                }
            );

    }


    displayRides(
        filtered
    );


    /* SCROLL TO RESULTS */

    const resultsSection =
        document.querySelector(
            ".results-section"
        );


    if (resultsSection) {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   SEARCH BUTTON
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchButton =
            document.getElementById(
                "searchButton"
            );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    searchRides();

                }
            );

        }

    }
);


/* =====================================================
   SORT RIDES
===================================================== */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            let sorted =
                [...allRides];


            if (
                this.value === "price"
            ) {

                sorted.sort(
                    (a, b) =>
                        Number(
                            a.price || 0
                        ) -
                        Number(
                            b.price || 0
                        )
                );

            }


            else if (
                this.value === "seats"
            ) {

                sorted.sort(
                    (a, b) =>
                        Number(
                            b.seatsLeft ??
                            b.seats ??
                            0
                        ) -
                        Number(
                            a.seatsLeft ??
                            a.seats ??
                            0
                        )
                );

            }


            else {

                sorted.sort(
                    (a, b) =>
                        (
                            a.time ||
                            a.rideTime ||
                            ""
                        ).localeCompare(
                            b.time ||
                            b.rideTime ||
                            ""
                        )
                );

            }


            displayRides(
                sorted
            );

        }
    );

}


/* =====================================================
   QUICK SEARCH
===================================================== */

function quickSearch(
    location
) {

    if (pickup) {

        pickup.value =
            location;

    }


    if (destination) {

        destination.value =
            "Chitkara University";

    }


    searchRides();

}


/* =====================================================
   VIEW RIDE
===================================================== */

function viewRide(
    rideId
) {

    const ride =
        allRides.find(
            item =>
                String(item.id) ===
                String(rideId)
        );


    if (!ride) {

        showMessage(
            "Ride details could not be found."
        );

        return;

    }


    localStorage.setItem(
        "selectedRide",
        JSON.stringify(ride)
    );


    localStorage.setItem(
        "selectedRideId",
        ride.id
    );


    window.location.href =
        "ride.html";

}


/* =====================================================
   UPCOMING RIDE
===================================================== */

function loadUpcomingRide() {

    const container =
        document.getElementById(
            "upcomingRide"
        );


    if (!container) {
        return;
    }


    let myRides = [];


    try {

        myRides =
            JSON.parse(
                localStorage.getItem(
                    "myRides"
                )
            ) || [];

    } catch {

        myRides = [];

    }


    const upcoming =
        myRides.find(
            ride =>
                ride.status === "upcoming" ||
                ride.status === "pending"
        );


    if (!upcoming) {

        container.innerHTML = `

            <div class="empty-upcoming">

                <div>
                    🚗
                </div>

                <p>
                    No upcoming rides yet.
                </p>

                <button
                    onclick="scrollToFindRide()"
                >
                    Find a Ride
                </button>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="upcoming-ride-card">

            <div>

                <span>
                    ${formatDate(
                        upcoming.date ||
                        upcoming.rideDate
                    )}
                </span>

                <h3>

                    ${escapeHTML(
                        upcoming.pickup ||
                        "Pickup"
                    )}

                    →

                    ${escapeHTML(
                        upcoming.destination ||
                        "Destination"
                    )}

                </h3>

                <p>
                    ${formatTime(
                        upcoming.time ||
                        upcoming.rideTime ||
                        "08:00"
                    )}
                </p>

            </div>

            <span class="upcoming-status">
                ${escapeHTML(
                    upcoming.status ||
                    "upcoming"
                )}
            </span>

        </div>

    `;

}


/* =====================================================
   SCROLL TO FIND RIDE
===================================================== */

function scrollToFindRide() {

    const section =
        document.getElementById(
            "findRide"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   POST RIDE
===================================================== */

function goToOfferRide() {

    window.location.href =
        "postride.html";

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (sidebar) {

        sidebar.classList.toggle(
            "open"
        );

    }

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    message
) {

    /*
       If your dashboard already has a custom
       message modal, this function can be
       replaced with that modal.
    */

    alert(message);

}


/* =====================================================
   NAVIGATION
===================================================== */

function openMessages() {

    showMessage(
        "Messages feature coming soon."
    );

}


function openNotifications() {

    showMessage(
        "Notifications will be added shortly."
    );

}


function openProfile() {

    window.location.href =
        "profile.html";

}


function openSettings() {

    window.location.href =
        "setting.html";

}


/* =====================================================
   SAFETY MODAL
===================================================== */

function createSafetyModal() {

    if (
        document.getElementById(
            "safetyModal"
        )
    ) {

        return;

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "safetyModal";


    modal.className =
        "safety-modal";


    modal.innerHTML = `

        <div class="safety-modal-box">

            <button
                type="button"
                class="safety-close"
                id="safetyCloseBtn"
                aria-label="Close"
            >
                ×
            </button>


            <div class="safety-modal-icon">

                <div class="shield-icon">
                    ✓
                </div>

            </div>


            <div class="safety-modal-header">

                <span>
                    CHITKARA CARPOOL
                </span>

                <h2>
                    Travel Safe
                </h2>

                <p>
                    Your safety comes first.
                    Follow these simple guidelines
                    for a comfortable and secure journey.
                </p>

            </div>


            <div class="safety-tips">

                <div class="safety-tip">

                    <div class="tip-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            Travel with verified students
                        </h3>

                        <p>
                            Prefer rides from verified
                            Chitkara students.
                        </p>

                    </div>

                </div>


                <div class="safety-tip">

                    <div class="tip-icon">
                        🚗
                    </div>

                    <div>

                        <h3>
                            Confirm vehicle details
                        </h3>

                        <p>
                            Check the vehicle and driver
                            details before starting your ride.
                        </p>

                    </div>

                </div>


                <div class="safety-tip">

                    <div class="tip-icon">
                        📍
                    </div>

                    <div>

                        <h3>
                            Meet at a safe pickup point
                        </h3>

                        <p>
                            Always meet at the selected
                            and known pickup location.
                        </p>

                    </div>

                </div>


                <div class="safety-tip">

                    <div class="tip-icon">
                        ⏰
                    </div>

                    <div>

                        <h3>
                            Be punctual
                        </h3>

                        <p>
                            Arrive on time so everyone
                            can travel comfortably.
                        </p>

                    </div>

                </div>


                <div class="safety-tip">

                    <div class="tip-icon warning">
                        !
                    </div>

                    <div>

                        <h3>
                            Report suspicious activity
                        </h3>

                        <p>
                            If something feels unsafe,
                            report it immediately.
                        </p>

                    </div>

                </div>

            </div>


            <div class="safety-modal-footer">

                <span>
                    🛡️ Safe rides. Trusted students.
                </span>

                <button
                    type="button"
                    id="safetyGotItBtn"
                >
                    Got it
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document
        .getElementById(
            "safetyCloseBtn"
        )
        .addEventListener(
            "click",
            closeSafety
        );


    document
        .getElementById(
            "safetyGotItBtn"
        )
        .addEventListener(
            "click",
            closeSafety
        );


    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeSafety();

            }

        }
    );

}


/* =====================================================
   OPEN SAFETY
===================================================== */

function showSafety() {

    createSafetyModal();


    const modal =
        document.getElementById(
            "safetyModal"
        );


    if (!modal) {
        return;
    }


    document.body.classList.add(
        "modal-open"
    );


    requestAnimationFrame(
        function () {

            modal.classList.add(
                "show"
            );

        }
    );

}


/* =====================================================
   CLOSE SAFETY
===================================================== */

function closeSafety() {

    const modal =
        document.getElementById(
            "safetyModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );


    setTimeout(
        function () {

            if (
                modal.parentNode
            ) {

                modal.remove();

            }

        },
        300
    );

}


/* =====================================================
   KNOW MORE BUTTON
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const knowMoreBtn =
            document.getElementById(
                "knowMoreBtn"
            );


        if (knowMoreBtn) {

            knowMoreBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showSafety();

                }
            );

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeSafety();

        }

    }
);


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    value
) {

    if (!value) {

        return "Date not set";

    }


    const d =
        new Date(
            value + "T00:00:00"
        );


    if (
        Number.isNaN(
            d.getTime()
        )
    ) {

        return value;

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
   TIME FORMAT
===================================================== */

function formatTime(
    value
) {

    if (!value) {

        return "Time not set";

    }


    const parts =
        value.split(":");


    if (
        parts.length < 2
    ) {

        return value;

    }


    let hour =
        Number(
            parts[0]
        );


    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 ||
        12;


    return `${hour}:${minute} ${period}`;

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

loadRides();