import db from "./firebase.mjs";

import { get, set, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


document.querySelector(".joinUsBtn").addEventListener("click", function () {
    document.querySelector(".joinUsSection").style.display = "flex";
    document.querySelector(".header").style.position = "absolute";
    document.body.style.overflow = "hidden";
})

document.addEventListener("click", function (e) {
    const joinUsSection = document.querySelector(".joinUsSection");
    const joinUs = document.querySelector(".joinUs");
    const joinUsBtn = document.querySelector(".joinUsBtn")
    if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
        joinUsSection.style.display = "none";
        document.body.style.overflow = "auto";
        document.querySelector(".header").style.position = "fixed"
    }
});

function sendJoinUsToDatabase() {

    document.querySelector(".joinSubmitBtn").addEventListener("click", function () {
        const successAlert = document.querySelector(".alert-success");
        successAlert.style.opacity = "1";
        let name = document.querySelector(".nameInpJoinUs");
        let email = document.querySelector(".emailInpJoinUs");
        let message = document.querySelector(".messageInpJoinUs");
        if (name.value.trim() !== "" && email.value.trim() !== "") {
            const info = {
                email: email.value,
                fullname: name.value,
                message: message.value
            }
            let snapshot = push(ref(db, `/joinUs`), info);
            set(ref(db, `/joinUs/${snapshot.key}`), info);
            successAlert.style.display = "block";
            name.value = "";
            email.value = "";
            message.value = "";
            setTimeout(() => {
                successAlert.style.opacity = "0";
                document.querySelector(".joinUsSection").style.display = "none";
            }, 3000);
        } else {
            alert("Please write fullname and email!")
        }
    })
}

sendJoinUsToDatabase();

const nameContact = document.querySelector("#name-contact");
const emailContact = document.querySelector("#email-contact");
const addressContact = document.querySelector("#address-contact");
const phoneContact = document.querySelector("#phone-contact");
const sendButton = document.querySelector(".Send-button");
const errorAlert = document.querySelector(".error-alert");
const successALert = document.querySelector(".success-alert");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

sendButton.addEventListener("click", function () {
    if (
        !nameContact.value.trim() ||
        !emailContact.value.trim() ||
        !addressContact.value.trim() ||
        !phoneContact.value.trim() ||
        !emailPattern.test(emailContact.value)
    ) {
        errorAlert.style.display = "block";
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 3500);
        return;
    }

    const information = {
        fullname: nameContact.value,
        email: emailContact.value,
        address: addressContact.value,
        phone: phoneContact.value
    };

    let snapshot = push(ref(db, `/contactUs`), information);
    set(ref(db, `/contactUs/${snapshot.key}`), information);

    successALert.style.display = "block";

    setTimeout(() => {
        successALert.style.display = "none";
        nameContact.value = "";
        emailContact.value = "";
        phoneContact.value = "";
        addressContact.value = "";
    }, 3500);
});

document.querySelector("#phone-contact").addEventListener("change", function () {
    let inputValue = parseInt(this.value);

    if (inputValue < 0) {
        this.value = Math.abs(inputValue);
    }
});


