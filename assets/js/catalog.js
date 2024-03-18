import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
    const swiperWrapperAll = document.querySelector(".wrapper-all");
    const swiperWrapperBesteller = document.querySelector(".wrapper-besteller");
    const swiperWrapperNewReleases = document.querySelector(".wrapper-newReleases");

    function callSwiper() {
        // Your Swiper initialization code
    }

    setTimeout(callSwiper, 1000);

    function downloading() {
        // Your downloading function
    }

    setTimeout(downloading, 2000);

    function clickReadMore() {
        // Your clickReadMore function
    }

    function clickType() {
        // Your clickType function
    }

    setTimeout(clickType, 2000);

    // Rest of your code...
});

function sendJoinUsToDatabase() {
    document.querySelector(".joinSubmitBtn").addEventListener("click", function () {
        const successAlert = document.querySelector(".alert-success");
        successAlert.style.opacity = "1";

        let name = document.querySelector(".nameInpJoinUs");
        let email = document.querySelector(".emailInpJoinUs");
        let message = document.querySelector(".messageInpJoinUs");

        if (name.value.trim() !== "" && email.value.trim() !== "") {
            // Show Bootstrap success alert
            const info = {
                email: email.value,
                fullname: name.value,
                message: message.value
            };

            let snapshot = push(ref(db, `/joinUs`), info);
            set(ref(db, `/joinUs/${snapshot.key}`), info);

            successAlert.style.display = "block";
            name.value = "";
            email.value = "";
            message.value = "";

            // Hide the alert after a certain time
            setTimeout(() => {
                successAlert.style.opacity = "0";
                document.querySelector(".joinUsSection").style.display = "none";
            }, 3000);
        } else {
            alert("Please write fullname and email!");
        }
    });
};

sendJoinUsToDatabase();

document.querySelector(".joinUsBtn").addEventListener("click", function () {
    document.querySelector(".joinUsSection").style.display = "flex";
    document.querySelector(".header").style.position = "absolute";
    document.body.style.overflow = "hidden";
});

document.addEventListener("click", function (e) {
    const joinUsSection = document.querySelector(".joinUsSection");
    const joinUs = document.querySelector(".joinUs");
    const joinUsBtn = document.querySelector(".joinUsBtn");

    // Check if the clicked element is not the joinUsBtn or its children
    if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
        joinUsSection.style.display = "none";
        document.body.style.overflow = "auto";
        document.querySelector(".header").style.position = "fixed";
    };
});
