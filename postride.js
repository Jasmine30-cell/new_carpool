/* =====================================================
   CHITKARA CARPOOL - POST A RIDE
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
        "index.html";

}


/* =====================================================
   DOM ELEMENTS
===================================================== */

const form =
    document.getElementById(
        "postRideForm"
    );

const userName =
    document.getElementById(
        "userName"
    );

const userAvatar =
    document.getElementById(
        "userAvatar"
    );

const previewAvatar =
    document.getElementById(
        "previewAvatar"
    );

const previewDriver =
    document.getElementById(
        "previewDriver"
    );

const previewPickup =
    document.getElementById(
        "previewPickup"
    );

const previewDestination =
    document.getElementById(
        "previewDestination"
    );

const previewDate =
    document.getElementById(
        "previewDate"
    );

const previewTime =
    document.getElementById(
        "previewTime"
    );

const previewSeats =
    document.getElementById(
        "previewSeats"
    );

const previewPrice =
    document.getElementById(
        "previewPrice"
    );

const previewCar =
    document.getElementById(
        "previewCar"
    );

const successModal =
    document.getElementById(
        "successModal"
    );


/* =====================================================
   DISPLAY USER
===================================================== */

const name =
    currentUser?.name ||
    currentUser?.fullName ||
    "Student";


if (userName) {

    userName.textContent =
        name;

}


if (userAvatar) {

    userAvatar.textContent =
        name
            .charAt(0)
            .toUpperCase();

}


if (previewAvatar) {

    previewAvatar.textContent =
        name
            .charAt(0)
            .toUpperCase();

}


if (previewDriver) {

    previewDriver.textContent =
        name;

}


/* =====================================================
   INPUTS
===================================================== */

const pickup =
    document.getElementById(
        "pickup"
    );

const destination =
    document.getElementById(
        "destination"
    );

const rideDate =
    document.getElementById(
        "rideDate"
    );

const rideTime =
    document.getElementById(
        "rideTime"
    );

const seats =
    document.getElementById(
        "seats"
    );

const price =
    document.getElementById(
        "price"
    );

const carModel =
    document.getElementById(
        "carModel"
    );

const carColor =
    document.getElementById(
        "carColor"
    );

const carNumber =
    document.getElementById(
        "carNumber"
    );

const notes =
    document.getElementById(
        "notes"
    );


/* =====================================================
   SET MINIMUM DATE
===================================================== */

function setMinimumDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );

    const todayString =
        `${year}-${month}-${day}`;


    rideDate.min =
        todayString;

}


setMinimumDate();


/* =====================================================
   PREVIEW UPDATE
===================================================== */

function updatePreview() {

    previewPickup.textContent =
        pickup.value ||
        "Select pickup";


    previewDestination.textContent =
        destination.value ||
        "Chitkara University";


    previewDate.textContent =
        rideDate.value
            ? formatDate(
                rideDate.value
            )
            : "Select date";


    previewTime.textContent =
        rideTime.value
            ? formatTime(
                rideTime.value
            )
            : "Select time";


    previewSeats.textContent =
        seats.value
            ? `${seats.value} seat${
                Number(
                    seats.value
                ) > 1
                    ? "s"
                    : ""
            }`
            : "0 seats";


    previewPrice.textContent =
        price.value
            ? `₹${price.value}`
            : "₹0";


    previewCar.textContent =
        carModel.value ||
        "Your car";

}


[
    pickup,
    destination,
    rideDate,
    rideTime,
    seats,
    price,
    carModel,
    carColor,
    carNumber,
    notes
].forEach(
    input => {

        input.addEventListener(
            "input",
            updatePreview
        );

        input.addEventListener(
            "change",
            updatePreview
        );

    }
);


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    value
) {

    const date =
        new Date(
            value + "T00:00:00"
        );


    return date.toLocaleDateString(
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

    const [
        hours,
        minutes
    ] =
        value.split(
            ":"
        );


    let hour =
        Number(
            hours
        );

    const ampm =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 ||
        12;


    return `${hour}:${minutes} ${ampm}`;

}


/* =====================================================
   ERROR HELPERS
===================================================== */

function setError(
    input,
    errorId,
    message
) {

    const error =
        document.getElementById(
            errorId
        );


    input.classList.add(
        "input-error"
    );


    if (error) {

        error.textContent =
            message;

    }

}


function clearError(
    input,
    errorId
) {

    const error =
        document.getElementById(
            errorId
        );


    input.classList.remove(
        "input-error"
    );


    if (error) {

        error.textContent =
            "";

    }

}


/* =====================================================
   VALIDATION
===================================================== */

function validateForm() {

    let valid =
        true;


    /* PICKUP */

    if (!pickup.value) {

        setError(
            pickup,
            "pickupError",
            "Please select a pickup location."
        );

        valid = false;

    } else {

        clearError(
            pickup,
            "pickupError"
        );

    }


    /* DESTINATION */

    if (!destination.value) {

        setError(
            destination,
            "destinationError",
            "Please select your destination."
        );

        valid = false;

    } else {

        clearError(
            destination,
            "destinationError"
        );

    }


    /* SAME LOCATION */

    if (
        pickup.value &&
        destination.value &&
        pickup.value === destination.value
    ) {

        setError(
            pickup,
            "pickupError",
            "Pickup and destination cannot be the same."
        );

        valid = false;

    }


    /* DATE */

    if (!rideDate.value) {

        setError(
            rideDate,
            "dateError",
            "Please select the ride date."
        );

        valid = false;

    } else {

        const selected =
            new Date(
                rideDate.value +
                "T00:00:00"
            );

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        if (
            selected < today
        ) {

            setError(
                rideDate,
                "dateError",
                "Ride date cannot be in the past."
            );

            valid = false;

        } else {

            clearError(
                rideDate,
                "dateError"
            );

        }

    }


    /* TIME */

    if (!rideTime.value) {

        setError(
            rideTime,
            "timeError",
            "Please select departure time."
        );

        valid = false;

    } else {

        clearError(
            rideTime,
            "timeError"
        );

    }


    /* SEATS */

    if (!seats.value) {

        setError(
            seats,
            "seatsError",
            "Please select available seats."
        );

        valid = false;

    } else {

        clearError(
            seats,
            "seatsError"
        );

    }


    /* PRICE */

    const priceValue =
        Number(
            price.value
        );


    if (
        !price.value ||
        priceValue <= 0
    ) {

        setError(
            price,
            "priceError",
            "Please enter a valid price."
        );

        valid = false;

    } else if (
        priceValue > 1000
    ) {

        setError(
            price,
            "priceError",
            "Price cannot exceed ₹1000."
        );

        valid = false;

    } else {

        clearError(
            price,
            "priceError"
        );

    }


    /* CAR MODEL */

    if (
        carModel.value.trim().length < 2
    ) {

        setError(
            carModel,
            "carModelError",
            "Enter your car model."
        );

        valid = false;

    } else {

        clearError(
            carModel,
            "carModelError"
        );

    }


    /* CAR COLOR */

    if (
        carColor.value.trim().length < 2
    ) {

        setError(
            carColor,
            "carColorError",
            "Enter your car color."
        );

        valid = false;

    } else {

        clearError(
            carColor,
            "carColorError"
        );

    }


    /* VEHICLE NUMBER */

    const vehicle =
        carNumber.value
            .trim()
            .toUpperCase();


    const vehiclePattern =
        /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{3,4}$/;


    if (
        !vehicle
    ) {

        setError(
            carNumber,
            "carNumberError",
            "Enter your vehicle number."
        );

        valid = false;

    } else if (
        !vehiclePattern.test(
            vehicle
        )
    ) {

        setError(
            carNumber,
            "carNumberError",
            "Enter a valid vehicle number, e.g. PB65AB1234."
        );

        valid = false;

    } else {

        clearError(
            carNumber,
            "carNumberError"
        );

    }


    return valid;

}


/* =====================================================
   FORM SUBMIT
===================================================== */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const formError =
            document.getElementById(
                "formError"
            );


        formError.style.display =
            "none";


        if (
            !validateForm()
        ) {

            formError.textContent =
                "Please fix the highlighted fields before posting your ride.";

            formError.style.display =
                "block";


            formError.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            return;

        }


        /*
           Prevent double submission.
        */

        const button =
            form.querySelector(
                ".post-button"
            );


        button.classList.add(
            "loading"
        );


        button.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            Posting your ride...

        `;


        setTimeout(
            saveRide,
            500
        );

    }
);


/* =====================================================
   SAVE RIDE
===================================================== */

function saveRide() {

    const rides =
        getArray(
            "postedRides"
        );


    const rideId =
        "ride_" +
        Date.now();


    const ride = {

        id:
            rideId,

        type:
            "offered",

        status:
            "upcoming",

        driverName:
            currentUser?.name ||
            currentUser?.fullName ||
            "Student",

        driverEmail:
            currentUser?.email ||
            "",

        email:
            currentUser?.email ||
            "",

        pickup:
            pickup.value,

        pickupLocation:
            pickup.value,

        destination:
            destination.value,

        destinationLocation:
            destination.value,

        date:
            rideDate.value,

        rideDate:
            rideDate.value,

        time:
            rideTime.value,

        rideTime:
            rideTime.value,

        seats:
            Number(
                seats.value
            ),

        seatsLeft:
            Number(
                seats.value
            ),

        price:
            Number(
                price.value
            ),

        carModel:
            carModel.value.trim(),

        carName:
            carModel.value.trim(),

        carColor:
            carColor.value.trim(),

        carNumber:
            carNumber.value
                .trim()
                .toUpperCase(),

        notes:
            notes.value.trim(),

        createdAt:
            new Date()
                .toISOString()

    };


    /*
       Save to postedRides.
    */

    rides.push(
        ride
    );


    localStorage.setItem(
        "postedRides",
        JSON.stringify(
            rides
        )
    );


    /*
       Also save in myRides so it
       appears in user's rides.
    */

    const myRides =
        getArray(
            "myRides"
        );


    myRides.push(
        ride
    );


    localStorage.setItem(
        "myRides",
        JSON.stringify(
            myRides
        )
    );


    /*
       Save selected ride.
    */

    localStorage.setItem(
        "selectedRide",
        JSON.stringify(
            ride
        )
    );


    /*
       Show success.
    */

    successModal.classList.add(
        "show"
    );


    /*
       Reset button.
    */

    const button =
        form.querySelector(
            ".post-button"
        );


    button.classList.remove(
        "loading"
    );


    button.innerHTML = `

        <span>
            Post My Ride
        </span>

        <i class="fa-solid fa-arrow-right"></i>

    `;

}


/* =====================================================
   STORAGE HELPER
===================================================== */

function getArray(
    key
) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    key
                )
            );


        return Array.isArray(data)
            ? data
            : [];

    } catch {

        return [];

    }

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
   SUCCESS BUTTONS
===================================================== */

document
    .getElementById(
        "viewRidesButton"
    )
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "myride.html";

        }
    );


document
    .getElementById(
        "findRideButton"
    )
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "home.html";

        }
    );


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
                "✓ Confirm vehicle details\n" +
                "✓ Meet at the selected pickup point\n" +
                "✓ Share ride details with someone you trust\n" +
                "✓ Report suspicious activity"
            );

        }
    );

}


/* =====================================================
   INITIAL PREVIEW
===================================================== */

updatePreview();