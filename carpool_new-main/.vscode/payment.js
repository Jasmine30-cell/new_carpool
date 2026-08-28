/* =====================================================
   PAYMENT PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadUser();

    loadPayments();

    setupCardNumber();

    setupExpiry();

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
            document.getElementById(
                "userName"
            );


        const avatar =
            document.getElementById(
                "profileAvatar"
            );


        if (userName) {

            userName.textContent =
                name;

        }


        if (avatar) {

            if (
                user.photo ||
                user.profilePhoto
            ) {

                avatar.innerHTML =
                    `<img
                        src="${user.photo || user.profilePhoto}"
                        alt="Profile"
                        style="width:100%;height:100%;border-radius:50%;object-fit:cover;"
                    >`;

            }

            else {

                avatar.textContent =
                    name
                        .charAt(0)
                        .toUpperCase();

            }

        }

    }

    catch (error) {

        console.log(
            "Unable to load user."
        );

    }

}


/* =====================================================
   GET PAYMENT METHODS
===================================================== */

function getPayments() {

    const data =
        localStorage.getItem(
            "paymentMethods"
        );


    if (!data) {

        return [];

    }


    try {

        const payments =
            JSON.parse(data);


        if (
            Array.isArray(payments)
        ) {

            return payments;

        }

    }

    catch (error) {

        console.log(
            "Invalid payment data"
        );

    }


    return [];

}


/* =====================================================
   SAVE PAYMENT METHODS
===================================================== */

function savePayments(payments) {

    localStorage.setItem(
        "paymentMethods",
        JSON.stringify(payments)
    );

}


/* =====================================================
   LOAD PAYMENTS
===================================================== */

function loadPayments() {

    const payments =
        getPayments();


    const container =
        document.getElementById(
            "paymentMethods"
        );


    const empty =
        document.getElementById(
            "emptyPayment"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (
        payments.length === 0
    ) {

        if (empty) {

            empty.style.display =
                "block";

        }

        return;

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    payments.forEach(
        function (payment, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "payment-method";


            let icon =
                "₹";


            let title =
                "";


            let subtitle =
                "";


            /* UPI */

            if (
                payment.type ===
                "upi"
            ) {

                icon =
                    "₹";

                title =
                    "UPI";

                subtitle =
                    payment.upi;

            }


            /* CARD */

            else {

                icon =
                    "💳";

                title =
                    "Debit / Credit Card";

                subtitle =
                    "•••• •••• •••• " +
                    payment.last4;

            }


            item.innerHTML = `

                <div class="payment-method-icon">
                    ${icon}
                </div>

                <div class="payment-details">

                    <strong>
                        ${title}
                    </strong>

                    <span>
                        ${subtitle}
                    </span>

                </div>

                <button
                    class="delete-payment"
                    onclick="deletePayment(${index})"
                >
                    Remove
                </button>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   OPEN MODAL
===================================================== */

function openPaymentModal() {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    selectPaymentType(
        "upi"
    );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closePaymentModal() {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";


    clearForms();

}


/* =====================================================
   SELECT PAYMENT TYPE
===================================================== */

function selectPaymentType(type) {

    const upiButton =
        document.getElementById(
            "upiButton"
        );


    const cardButton =
        document.getElementById(
            "cardButton"
        );


    const upiForm =
        document.getElementById(
            "upiForm"
        );


    const cardForm =
        document.getElementById(
            "cardForm"
        );


    if (type === "upi") {

        upiButton.classList.add(
            "active"
        );

        cardButton.classList.remove(
            "active"
        );


        upiForm.classList.remove(
            "hidden"
        );

        cardForm.classList.add(
            "hidden"
        );

    }

    else {

        cardButton.classList.add(
            "active"
        );

        upiButton.classList.remove(
            "active"
        );


        cardForm.classList.remove(
            "hidden"
        );

        upiForm.classList.add(
            "hidden"
        );

    }

}


/* =====================================================
   SAVE UPI
===================================================== */

function saveUPI(event) {

    event.preventDefault();


    const upi =
        document.getElementById(
            "upiId"
        ).value.trim();


    /* BASIC UPI VALIDATION */

    const upiPattern =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;


    if (
        !upiPattern.test(upi)
    ) {

        showMessage(
            "Please enter a valid UPI ID."
        );

        return;

    }


    const payments =
        getPayments();


    payments.push({

        type: "upi",

        upi: upi

    });


    savePayments(
        payments
    );


    closePaymentModal();

    loadPayments();


    showMessage(
        "UPI payment method added successfully!"
    );

}


/* =====================================================
   SAVE CARD
===================================================== */

function saveCard(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "cardName"
        ).value.trim();


    const number =
        document.getElementById(
            "cardNumber"
        ).value.replace(
            /\s/g,
            ""
        );


    const expiry =
        document.getElementById(
            "cardExpiry"
        ).value.trim();


    const cvv =
        document.getElementById(
            "cardCVV"
        ).value.trim();


    /* CARD NUMBER */

    if (
        !/^[0-9]{16}$/.test(
            number
        )
    ) {

        showMessage(
            "Please enter a valid 16-digit card number."
        );

        return;

    }


    /* EXPIRY */

    if (
        !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(
            expiry
        )
    ) {

        showMessage(
            "Enter expiry in MM/YY format."
        );

        return;

    }


    /* CVV */

    if (
        !/^[0-9]{3}$/.test(
            cvv
        )
    ) {

        showMessage(
            "CVV must contain 3 digits."
        );

        return;

    }


    const payments =
        getPayments();


    payments.push({

        type: "card",

        name: name,

        last4:
            number.slice(-4),

        expiry: expiry

    });


    savePayments(
        payments
    );


    closePaymentModal();

    loadPayments();


    showMessage(
        "Card added successfully!"
    );

}


/* =====================================================
   DELETE PAYMENT
===================================================== */

function deletePayment(index) {

    const payments =
        getPayments();


    if (
        index < 0 ||
        index >= payments.length
    ) {

        return;

    }


    const confirmDelete =
        confirm(
            "Remove this payment method?"
        );


    if (!confirmDelete) {

        return;

    }


    payments.splice(
        index,
        1
    );


    savePayments(
        payments
    );


    loadPayments();

}


/* =====================================================
   CLEAR FORMS
===================================================== */

function clearForms() {

    const upi =
        document.getElementById(
            "upiId"
        );


    const cardName =
        document.getElementById(
            "cardName"
        );


    const cardNumber =
        document.getElementById(
            "cardNumber"
        );


    const cardExpiry =
        document.getElementById(
            "cardExpiry"
        );


    const cardCVV =
        document.getElementById(
            "cardCVV"
        );


    if (upi)
        upi.value = "";


    if (cardName)
        cardName.value = "";


    if (cardNumber)
        cardNumber.value = "";


    if (cardExpiry)
        cardExpiry.value = "";


    if (cardCVV)
        cardCVV.value = "";

}


/* =====================================================
   CARD NUMBER FORMATTING
===================================================== */

function setupCardNumber() {

    const input =
        document.getElementById(
            "cardNumber"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(
                    /\D/g,
                    ""
                );


            value =
                value.substring(
                    0,
                    16
                );


            let formatted =
                value.match(
                    /.{1,4}/g
                );


            this.value =
                formatted
                    ? formatted.join(" ")
                    : "";

        }
    );

}


/* =====================================================
   EXPIRY FORMATTING
===================================================== */

function setupExpiry() {

    const input =
        document.getElementById(
            "cardExpiry"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(
                    /\D/g,
                    ""
                );


            value =
                value.substring(
                    0,
                    4
                );


            if (
                value.length >= 3
            ) {

                value =
                    value.substring(
                        0,
                        2
                    ) +
                    "/" +
                    value.substring(
                        2
                    );

            }


            this.value =
                value;

        }
    );

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "paymentModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closePaymentModal();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closePaymentModal();

        }

    }
);


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