document.addEventListener("DOMContentLoaded", function () {

    loadProfile();

    setupProfileImage();

});


/* =====================================================
   GET CURRENT USER
===================================================== */

function getCurrentUser() {

    const keys = [
        "currentUser",
        "loggedInUser",
        "user"
    ];

    for (const key of keys) {

        const data =
            localStorage.getItem(key);

        if (!data) continue;

        try {

            const user =
                JSON.parse(data);

            if (user) {
                return user;
            }

        } catch (error) {

            console.log("Invalid user data");

        }

    }


    const name =
        localStorage.getItem("userName");

    const email =
        localStorage.getItem("userEmail");


    if (name || email) {

        return {

            name: name || "Student",

            email:
                email ||
                "student@chitkara.edu.in"

        };

    }


    return null;

}


/* =====================================================
   SAVE CURRENT USER
===================================================== */

function saveCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "userName",
        user.name || "Student"
    );

    localStorage.setItem(
        "userEmail",
        user.email || ""
    );

}


/* =====================================================
   LOAD PROFILE
===================================================== */

function loadProfile() {

    const user =
        getCurrentUser();


    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profilePhoto =
        document.getElementById("profilePhoto");

    const topUserName =
        document.getElementById("topUserName");

    const topUserAvatar =
        document.getElementById("topUserAvatar");


    if (!user) {

        if (profileName)
            profileName.textContent = "Student";

        if (profileEmail)
            profileEmail.textContent =
                "No account data";

        if (profilePhoto)
            profilePhoto.textContent = "?";

        if (topUserName)
            topUserName.textContent = "Student";

        if (topUserAvatar)
            topUserAvatar.textContent = "?";

        return;
    }


    const name =
        user.name ||
        user.fullName ||
        "Student";

    const email =
        user.email ||
        "No email";


    /* NAME */

    if (profileName)
        profileName.textContent = name;

    if (topUserName)
        topUserName.textContent = name;


    /* EMAIL */

    if (profileEmail)
        profileEmail.textContent = email;


    /* INFORMATION */

    setText(
        "infoName",
        name
    );

    setText(
        "infoEmail",
        email
    );

    setText(
        "infoPhone",
        user.phone ||
        user.phoneNumber ||
        "—"
    );

    setText(
        "infoDepartment",
        user.department ||
        "—"
    );

    setText(
        "infoYear",
        user.year ||
        "—"
    );

    setText(
        "infoGender",
        user.gender ||
        "—"
    );

    setText(
        "infoAddress",
        user.address ||
        "—"
    );

    setText(
        "infoStudentId",
        user.studentId ||
        user.studentID ||
        "—"
    );


    /* PHOTO */

    const photo =
        user.photo ||
        user.profilePhoto;


    if (photo) {

        if (profilePhoto) {

            profilePhoto.innerHTML =
                `
                <img
                    src="${photo}"
                    alt="Profile photo"
                >
                `;

        }


        if (topUserAvatar) {

            topUserAvatar.innerHTML =
                `
                <img
                    src="${photo}"
                    alt="Profile photo"
                >
                `;

        }

    }

    else {

        const initial =
            name.charAt(0).toUpperCase();


        if (profilePhoto) {

            profilePhoto.textContent =
                initial;

        }


        if (topUserAvatar) {

            topUserAvatar.textContent =
                initial;

        }

    }

}


/* =====================================================
   SET TEXT
===================================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =====================================================
   EDIT PROFILE
===================================================== */

function editProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        showMessage("Please login first.");

        return;

    }


    document.getElementById("editName").value =
        user.name ||
        user.fullName ||
        "";


    document.getElementById("editEmail").value =
        user.email ||
        "";


    document.getElementById("editPhone").value =
        user.phone ||
        user.phoneNumber ||
        "";


    document.getElementById("editDepartment").value =
        user.department ||
        "";


    document.getElementById("editYear").value =
        user.year ||
        "";


    document.getElementById("editGender").value =
        user.gender ||
        "";


    document.getElementById("editAddress").value =
        user.address ||
        "";


    document.getElementById("editStudentId").value =
        user.studentId ||
        user.studentID ||
        "";


    updateEditPhotoPreview(
        user.photo ||
        user.profilePhoto ||
        null
    );


    document.getElementById(
        "editProfileError"
    ).textContent = "";


    document.getElementById(
        "editProfileModal"
    ).classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE EDIT PROFILE
===================================================== */

function closeEditProfile() {

    const modal =
        document.getElementById(
            "editProfileModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    document.body.style.overflow = "";

}


/* =====================================================
   SAVE PROFILE CHANGES
===================================================== */

function saveProfileChanges(event) {

    event.preventDefault();


    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();


    const department =
        document.getElementById(
            "editDepartment"
        ).value.trim();


    const year =
        document.getElementById(
            "editYear"
        ).value;


    const gender =
        document.getElementById(
            "editGender"
        ).value;


    const address =
        document.getElementById(
            "editAddress"
        ).value.trim();


    const studentId =
        document.getElementById(
            "editStudentId"
        ).value.trim();


    const errorElement =
        document.getElementById(
            "editProfileError"
        );


    /* VALIDATION */

    if (!name) {

        errorElement.textContent =
            "Please enter your full name.";

        return;

    }


    if (
        phone &&
        !/^[0-9]{10}$/.test(phone)
    ) {

        errorElement.textContent =
            "Phone number must contain 10 digits.";

        return;

    }


    if (!department) {

        errorElement.textContent =
            "Please enter your department.";

        return;

    }


    if (!year) {

        errorElement.textContent =
            "Please select your year.";

        return;

    }


    if (!gender) {

        errorElement.textContent =
            "Please select your gender.";

        return;

    }


    if (!address) {

        errorElement.textContent =
            "Please enter your address.";

        return;

    }


    if (!studentId) {

        errorElement.textContent =
            "Please enter your student ID.";

        return;

    }


    /* UPDATE USER */

    user.name =
        name;

    user.fullName =
        name;

    user.phone =
        phone;

    user.phoneNumber =
        phone;

    user.department =
        department;

    user.year =
        year;

    user.gender =
        gender;

    user.address =
        address;

    user.studentId =
        studentId;

    user.studentID =
        studentId;


    /* SAVE */

    saveCurrentUser(user);


    /* REFRESH */

    loadProfile();


    /* CLOSE */

    closeEditProfile();


    showMessage(
        "Profile updated successfully!"
    );

}


/* =====================================================
   PROFILE PHOTO
===================================================== */

function setupProfileImage() {

    const input =
        document.getElementById(
            "profileImageInput"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            if (
                !file.type.startsWith("image/")
            ) {

                showMessage(
                    "Please select an image file."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const image =
                        event.target.result;


                    const user =
                        getCurrentUser();


                    if (!user) {
                        return;
                    }


                    user.photo =
                        image;

                    user.profilePhoto =
                        image;


                    saveCurrentUser(
                        user
                    );


                    updateEditPhotoPreview(
                        image
                    );


                    loadProfile();

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   UPDATE PHOTO PREVIEW
===================================================== */

function updateEditPhotoPreview(photo) {

    const preview =
        document.getElementById(
            "editPhotoPreview"
        );


    if (!preview) {
        return;
    }


    const user =
        getCurrentUser();


    const name =
        user &&
        (
            user.name ||
            user.fullName
        )
            ? (
                user.name ||
                user.fullName
            )
            : "Student";


    if (photo) {

        preview.innerHTML =
            `
            <img
                src="${photo}"
                alt="Profile photo"
            >
            `;

    }

    else {

        preview.textContent =
            name.charAt(0).toUpperCase();

    }

}


/* =====================================================
   DELETE PROFILE PHOTO
===================================================== */

function deleteProfilePicture() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    delete user.photo;

    delete user.profilePhoto;


    saveCurrentUser(user);


    updateEditPhotoPreview(null);

    loadProfile();

}


/* =====================================================
   TRUSTED CONTACTS
===================================================== */

function openTrustedContacts() {

    const modal =
        document.getElementById(
            "trustedContactsModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


function closeTrustedContacts() {

    const modal =
        document.getElementById(
            "trustedContactsModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    document.body.style.overflow = "";

}


/* =====================================================
   HELP & SUPPORT
===================================================== */

function openHelpSupport() {

    const modal =
        document.getElementById(
            "helpSupportModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


function closeHelpSupport() {

    const modal =
        document.getElementById(
            "helpSupportModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    document.body.style.overflow = "";

}


/* =====================================================
   FAQ
===================================================== */

function showFAQ() {

    showMessage(
        "Frequently Asked Questions\n\n" +

        "1. How do I find a ride?\n" +
        "Go to Find a Ride from the dashboard.\n\n" +

        "2. How do I post a ride?\n" +
        "Select Post a Ride and enter your journey details.\n\n" +

        "3. Where can I see my rides?\n" +
        "Open My Rides from the sidebar.\n\n" +

        "4. How do I cancel a ride?\n" +
        "Open My Rides and select the cancel option."
    );

}


/* =====================================================
   MESSAGES
===================================================== */

function openMessages(event) {

    if (event) {
        event.preventDefault();
    }

    showMessage(
        "Messages will be connected here."
    );

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function openNotifications(event) {

    if (event) {
        event.preventDefault();
    }

    showMessage(
        "Notifications will be connected here."
    );

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const editModal =
            document.getElementById(
                "editProfileModal"
            );

        const trustedModal =
            document.getElementById(
                "trustedContactsModal"
            );

        const helpModal =
            document.getElementById(
                "helpSupportModal"
            );


        if (
            editModal &&
            event.target === editModal
        ) {

            closeEditProfile();

        }


        if (
            trustedModal &&
            event.target === trustedModal
        ) {

            closeTrustedContacts();

        }


        if (
            helpModal &&
            event.target === helpModal
        ) {

            closeHelpSupport();

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

            closeEditProfile();

            closeTrustedContacts();

            closeHelpSupport();

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