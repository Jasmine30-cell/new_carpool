/* =====================================================
   RIDE DETAILS JAVASCRIPT
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

    window.location.href = "index.html";

}


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


function saveArray(key, array) {

    localStorage.setItem(
        key,
        JSON.stringify(array)
    );

}


/* =====================================================
   GET SELECTED RIDE
===================================================== */

let selectedRide =
    JSON.parse(
        localStorage.getItem("selectedRide")
    );


/*
   Some versions of the project may use
   currentRide instead.
*/

if (!selectedRide) {

    selectedRide =
        JSON.parse(
            localStorage.getItem("currentRide")
        );

}


/* =====================================================
   IF NO RIDE FOUND
===================================================== */

if (!selectedRide) {

    console.warn(
        "No selected ride found."
    );

}


/* =====================================================
   HELPER
===================================================== */

function valueFromRide(
    ride,
    properties,
    fallback = ""
) {

    if (!ride) {
        return fallback;
    }


    for (const property of properties) {

        if (
            ride[property] !== undefined &&
            ride[property] !== null &&
            ride[property] !== ""
        ) {

            return ride[property];

        }

    }


    return fallback;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}


/* =====================================================
   LOAD RIDE
===================================================== */

function loadRide() {

    if (!selectedRide) {

        return;

    }


    /* ================================================
       DRIVER
    ================================================ */

    const driverName =
        valueFromRide(
            selectedRide,
            [
                "driverName",
                "name",
                "driver",
                "ownerName"
            ],
            "Chitkara Student"
        );


    const driverRating =
        valueFromRide(
            selectedRide,
            [
                "rating",
                "driverRating"
            ],
            "4.8"
        );


    const reviewCount =
        valueFromRide(
            selectedRide,
            [
                "reviewCount",
                "reviews",
                "totalReviews"
            ],
            "24"
        );


    const rideCount =
        valueFromRide(
            selectedRide,
            [
                "rideCount",
                "rides",
                "totalRides"
            ],
            "24"
        );


    setText(
        "driverName",
        driverName
    );


    setText(
        "contactDriverName",
        driverName
    );


    setText(
        "driverRating",
        `★ ${driverRating}`
    );


    setText(
        "reviewCount",
        `(${reviewCount} reviews)`
    );


    setText(
        "rideCount",
        rideCount
    );


    setText(
        "bigRating",
        driverRating
    );


    setText(
        "ratingTotal",
        reviewCount
    );


    /* ================================================
       DRIVER PHOTO
    ================================================ */

    const driverPhoto =
        valueFromRide(
            selectedRide,
            [
                "driverPhoto",
                "photo",
                "image",
                "profileImage"
            ],
            ""
        );


    const photoElement =
        document.getElementById(
            "driverPhoto"
        );


    if (photoElement) {

        if (driverPhoto) {

            photoElement.src =
                driverPhoto;

        } else {

            /*
               Default student image from
               your local images folder.
            */

            photoElement.src =
                "images/student1.jpg";

        }


        photoElement.onerror =
            function () {

                this.src =
                    createAvatar(
                        driverName
                    );

            };

    }


    /* ================================================
       ROUTE
    ================================================ */

    const pickup =
        valueFromRide(
            selectedRide,
            [
                "pickup",
                "pickupLocation",
                "from",
                "start"
            ],
            "Zirakpur Bus Stand"
        );


    const pickupDetail =
        valueFromRide(
            selectedRide,
            [
                "pickupDetail",
                "pickupDetails"
            ],
            "Near Domino's, Chandigarh Road"
        );


    const destination =
        valueFromRide(
            selectedRide,
            [
                "destination",
                "destinationLocation",
                "to",
                "drop"
            ],
            "Chitkara University"
        );


    const destinationDetail =
        valueFromRide(
            selectedRide,
            [
                "destinationDetail",
                "destinationDetails"
            ],
            "Rajpura, Punjab"
        );


    setText(
        "pickupLocation",
        pickup
    );


    setText(
        "pickupDetail",
        pickupDetail
    );


    setText(
        "destinationLocation",
        destination
    );


    setText(
        "destinationDetail",
        destinationDetail
    );


    /* ================================================
       TIME
    ================================================ */

    const time =
        valueFromRide(
            selectedRide,
            [
                "time",
                "rideTime",
                "departureTime"
            ],
            "08:00 AM"
        );


    setText(
        "rideTime",
        time
    );


    /* ================================================
       DATE
    ================================================ */

    const date =
        valueFromRide(
            selectedRide,
            [
                "date",
                "rideDate"
            ],
            "18 August 2026"
        );


    setText(
        "rideDate",
        formatDate(date)
    );


    /* ================================================
       SEATS
    ================================================ */

    const seats =
        valueFromRide(
            selectedRide,
            [
                "seats",
                "seatsLeft",
                "availableSeats",
                "seatAvailable"
            ],
            4
        );


    setText(
        "rideSeats",
        `${seats} Seats`
    );


    setText(
        "sidebarSeats",
        seats
    );


    /* ================================================
       PRICE
    ================================================ */

    const price =
        valueFromRide(
            selectedRide,
            [
                "price",
                "pricePerSeat",
                "fare"
            ],
            40
        );


    setText(
        "ridePrice",
        `₹${price}`
    );


    setText(
        "sidebarPrice",
        `₹${price}`
    );


    /* ================================================
       CAR
    ================================================ */

    const carName =
        valueFromRide(
            selectedRide,
            [
                "carName",
                "car",
                "vehicle"
            ],
            "Swift Dzire"
        );


    const carColor =
        valueFromRide(
            selectedRide,
            [
                "carColor",
                "color",
                "vehicleColor"
            ],
            "White"
        );


    const carNumber =
        valueFromRide(
            selectedRide,
            [
                "carNumber",
                "vehicleNumber",
                "numberPlate"
            ],
            "PB65XX1234"
        );


    setText(
        "carName",
        carName
    );


    setText(
        "carColor",
        carColor
    );


    setText(
        "carNumber",
        carNumber
    );


    /* ================================================
       PHONE
    ================================================ */

    const phone =
        valueFromRide(
            selectedRide,
            [
                "phone",
                "driverPhone",
                "contact",
                "contactNumber"
            ],
            ""
        );


    const callButton =
        document.getElementById(
            "callButton"
        );


    if (callButton) {

        if (phone) {

            callButton.href =
                `tel:${phone}`;

        } else {

            callButton.href =
                "#";

            callButton.onclick =
                function (event) {

                    event.preventDefault();

                    showMessage(
                        "Driver contact number is not available."
                    );

                };

        }

    }


    /* ================================================
       REVIEWS
    ================================================ */

    loadReviews(
        selectedRide
    );


    /* ================================================
       REQUEST BUTTON
    ================================================ */

    updateRequestButton();

}


/* =====================================================
   SET TEXT
===================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

    if (!date) {

        return "Upcoming";

    }


    /*
       Already formatted text
    */

    if (
        typeof date === "string" &&
        date.includes(" ")
    ) {

        return date;

    }


    const dateObject =
        new Date(date);


    if (
        isNaN(
            dateObject.getTime()
        )
    ) {

        return date;

    }


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   CREATE AVATAR
===================================================== */

function createAvatar(name) {

    const firstLetter =
        String(name)
            .charAt(0)
            .toUpperCase();


    /*
       SVG generated locally.
       No external image required.
    */

    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 150 150"
        >

            <rect
                width="150"
                height="150"
                fill="#e3f2e6"
            />

            <circle
                cx="75"
                cy="58"
                r="28"
                fill="#07883f"
            />

            <path
                d="
                    M25 145
                    C30 105 55 92 75 92
                    C95 92 120 105 125 145
                "
                fill="#07883f"
            />

            <text
                x="75"
                y="78"
                text-anchor="middle"
                fill="white"
                font-size="24"
                font-family="Arial"
                font-weight="bold"
            >
                ${firstLetter}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


/* =====================================================
   LOAD REVIEWS
===================================================== */

function loadReviews(ride) {

    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {
        return;
    }


    let reviews =
        ride.recentReviews ||
        ride.reviewList ||
        ride.reviewsData ||
        ride.userReviews ||
        [];


    /*
       If reviews is a number/string,
       create demo reviews.
    */

    if (!Array.isArray(reviews)) {

        reviews = [];

    }


    if (reviews.length === 0) {

        reviews = [

            {
                name: "Ankush Verma",
                rating: 5,
                text:
                    "Great ride! Very punctual and comfortable.",
                date:
                    "2 days ago"
            },

            {
                name: "Neha Singh",
                rating: 5,
                text:
                    "Smooth ride and friendly driver.",
                date:
                    "1 week ago"
            }

        ];

    }


    container.innerHTML =
        reviews
            .slice(0, 4)
            .map(
                review => {

                    const name =
                        review.name ||
                        "Chitkara Student";


                    const rating =
                        review.rating ||
                        5;


                    const text =
                        review.text ||
                        review.comment ||
                        "Good ride experience.";


                    const date =
                        review.date ||
                        "Recently";


                    return `

                        <div class="review">

                            <div class="review-header">

                                <div class="review-user">

                                    <div class="review-avatar">

                                        ${escapeHTML(
                                            name
                                                .charAt(0)
                                                .toUpperCase()
                                        )}

                                    </div>

                                    <div>

                                        <strong>
                                            ${escapeHTML(name)}
                                        </strong>

                                        <span>
                                            ${escapeHTML(date)}
                                        </span>

                                    </div>

                                </div>


                                <div class="review-rating">

                                    ${"★".repeat(
                                        Math.min(
                                            5,
                                            Number(rating)
                                        )
                                    )}

                                </div>

                            </div>


                            <p>
                                ${escapeHTML(text)}
                            </p>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =====================================================
   REQUEST SEAT
===================================================== */

function requestSeat() {

    if (!selectedRide) {

        showMessage(
            "Ride details could not be found."
        );

        return;

    }


    if (!currentUser) {

        window.location.href =
            "index.html";

        return;

    }


    /* ================================================
       CHECK AVAILABLE SEATS
    ================================================ */

    let seats =
        Number(
            valueFromRide(
                selectedRide,
                [
                    "seats",
                    "seatsLeft",
                    "availableSeats"
                ],
                0
            )
        );


    if (seats <= 0) {

        showMessage(
            "Sorry, no seats are available."
        );

        return;

    }


    /* ================================================
       IDENTIFY RIDE
    ================================================ */

    const rideId =
        selectedRide.id ||
        selectedRide.rideId ||
        selectedRide._id ||
        createRideId(
            selectedRide
        );


    /* ================================================
       GET REQUESTED RIDES
    ================================================ */

    const requestedRides =
        getArray(
            "requestedRides"
        );


    /* ================================================
       CHECK DUPLICATE
    ================================================ */

    const alreadyRequested =
        requestedRides.some(
            ride => {

                const existingId =
                    ride.id ||
                    ride.rideId ||
                    ride._id;


                const email =
                    String(
                        ride.email ||
                        ride.userEmail ||
                        ride.requestedBy ||
                        ""
                    ).toLowerCase();


                return (
                    String(existingId) ===
                    String(rideId)
                )
                &&
                email ===
                    String(
                        currentUser.email
                    ).toLowerCase();

            }
        );


    if (alreadyRequested) {

        showMessage(
            "You have already requested this ride."
        );

        updateRequestButton();

        return;

    }


    /* ================================================
       CREATE REQUEST
    ================================================ */

    const request = {

        id:
            rideId,

        rideId:
            rideId,

        requestId:
            "REQ-" +
            Date.now(),

        driverName:
            valueFromRide(
                selectedRide,
                [
                    "driverName",
                    "name",
                    "driver"
                ],
                "Chitkara Student"
            ),

        driverPhoto:
            valueFromRide(
                selectedRide,
                [
                    "driverPhoto",
                    "photo",
                    "image"
                ],
                ""
            ),

        pickup:
            valueFromRide(
                selectedRide,
                [
                    "pickup",
                    "pickupLocation",
                    "from"
                ],
                ""
            ),

        destination:
            valueFromRide(
                selectedRide,
                [
                    "destination",
                    "destinationLocation",
                    "to"
                ],
                ""
            ),

        date:
            valueFromRide(
                selectedRide,
                [
                    "date",
                    "rideDate"
                ],
                ""
            ),

        time:
            valueFromRide(
                selectedRide,
                [
                    "time",
                    "rideTime"
                ],
                ""
            ),

        price:
            valueFromRide(
                selectedRide,
                [
                    "price",
                    "pricePerSeat"
                ],
                0
            ),

        email:
            currentUser.email,

        passengerName:
            currentUser.name ||
            currentUser.fullName ||
            "Student",

        userEmail:
            currentUser.email,

        status:
            "pending",

        requestedAt:
            new Date().toISOString()

    };


    requestedRides.push(
        request
    );


    saveArray(
        "requestedRides",
        requestedRides
    );


    /* ================================================
       ALSO ADD TO MY RIDES
    ================================================ */

    const myRides =
        getArray(
            "myRides"
        );


    const myRide =
        {
            ...request,

            type:
                "requested",

            status:
                "pending"

        };


    myRides.push(
        myRide
    );


    saveArray(
        "myRides",
        myRides
    );


    /* ================================================
       UPDATE SEATS
    ================================================ */

    seats =
        Math.max(
            0,
            seats - 1
        );


    selectedRide.seats =
        seats;

    selectedRide.seatsLeft =
        seats;

    selectedRide.availableSeats =
        seats;


    localStorage.setItem(
        "selectedRide",
        JSON.stringify(
            selectedRide
        )
    );


    /*
       Also update the original ride
       in available rides.
    */

    updateRideInStorage(
        selectedRide
    );


    /* ================================================
       SUCCESS
    ================================================ */

    showRequestSuccess();

}


/* =====================================================
   CREATE RIDE ID
===================================================== */

function createRideId(ride) {

    const raw =
        [
            ride.driverName ||
            ride.name ||
            "",

            ride.pickup ||
            ride.from ||
            "",

            ride.destination ||
            ride.to ||
            "",

            ride.date ||
            "",

            ride.time ||
            ""

        ]
        .join("|")
        .toLowerCase();


    /*
       Simple deterministic hash.
    */

    let hash = 0;


    for (
        let i = 0;
        i < raw.length;
        i++
    ) {

        hash =
            (
                hash * 31 +
                raw.charCodeAt(i)
            )
            | 0;

    }


    return (
        "ride-" +
        Math.abs(hash)
    );

}


/* =====================================================
   UPDATE RIDE IN AVAILABLE RIDES
===================================================== */

function updateRideInStorage(
    updatedRide
) {

    const possibleKeys = [

        "rides",
        "availableRides",
        "carpools"

    ];


    possibleKeys.forEach(
        key => {

            const rides =
                getArray(key);


            if (
                rides.length === 0
            ) {

                return;

            }


            const updatedId =
                updatedRide.id ||
                updatedRide.rideId ||
                createRideId(
                    updatedRide
                );


            let changed = false;


            const newRides =
                rides.map(
                    ride => {

                        const id =
                            ride.id ||
                            ride.rideId ||
                            createRideId(
                                ride
                            );


                        if (
                            String(id) ===
                            String(updatedId)
                        ) {

                            changed = true;

                            return {
                                ...ride,
                                ...updatedRide
                            };

                        }


                        return ride;

                    }
                );


            if (changed) {

                saveArray(
                    key,
                    newRides
                );

            }

        }
    );

}


/* =====================================================
   REQUEST SUCCESS
===================================================== */

function showRequestSuccess() {

    const button =
        document.querySelector(
            ".request-button"
        );


    if (!button) {

        return;

    }


    button.innerHTML =
        `
            <span>✓</span>
            Seat Requested
        `;


    button.classList.add(
        "requested-state"
    );


    button.disabled =
        true;


    /*
       Give the user a clear
       next step.
    */

    setTimeout(
        function () {

            const go =
                confirm(
                    "Seat request sent successfully! Would you like to view it in My Rides?"
                );


            if (go) {

                window.location.href =
                    "myride.html";

            }

        },
        400
    );

}


/* =====================================================
   CHECK REQUEST BUTTON
===================================================== */

function updateRequestButton() {

    if (!selectedRide) {
        return;
    }


    const button =
        document.querySelector(
            ".request-button"
        );


    if (!button) {
        return;
    }


    const requestedRides =
        getArray(
            "requestedRides"
        );


    const rideId =
        selectedRide.id ||
        selectedRide.rideId ||
        createRideId(
            selectedRide
        );


    const email =
        String(
            currentUser?.email ||
            ""
        ).toLowerCase();


    const exists =
        requestedRides.some(
            ride => {

                const id =
                    ride.id ||
                    ride.rideId ||
                    ride._id;


                const requestEmail =
                    String(
                        ride.email ||
                        ride.userEmail ||
                        ride.requestedBy ||
                        ""
                    ).toLowerCase();


                return (
                    String(id) ===
                    String(rideId)
                )
                &&
                requestEmail ===
                    email;

            }
        );


    if (exists) {

        button.innerHTML =
            `
                <span>✓</span>
                Seat Requested
            `;


        button.disabled =
            true;


        button.classList.add(
            "requested-state"
        );

    }

}


/* =====================================================
   CHAT
===================================================== */

function startChat() {

    if (!selectedRide) {

        showMessage(
            "Ride information is unavailable."
        );

        return;

    }


    const driverName =
        valueFromRide(
            selectedRide,
            [
                "driverName",
                "name",
                "driver"
            ],
            "Driver"
        );


    /*
       If you already have messages.html,
       change this to:

       window.location.href = "messages.html";
    */

    localStorage.setItem(
        "chatDriver",
        JSON.stringify({

            name:
                driverName,

            rideId:
                selectedRide.id ||
                selectedRide.rideId ||
                createRideId(
                    selectedRide
                )

        })
    );


    /*
       Your current project has a
       Messages section.

       If messages.html exists:
    */

    if (
        window.location.pathname.includes(
            "ride.html"
        )
    ) {

        

        showMessage(
            `Chat with ${driverName} will open here.`
        );

    }

}


/* =====================================================
   GO BACK
===================================================== */

function goBack() {

    /*
       Prefer browser history.
    */

    if (
        document.referrer &&
        document.referrer !==
            window.location.href
    ) {

        history.back();

        return;

    }


    window.location.href =
        "dashboard.html";

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadRide();

    }
);