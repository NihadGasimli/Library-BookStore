import db from "./firebase.mjs";

import { onValue, ref, get, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

document.querySelector(".joinUsBtn").addEventListener("click", function () {
    document.querySelector(".joinUsSection").style.display = "flex";
    document.body.style.overflow = "hidden";
})

document.addEventListener("click", function (e) {
    const joinUsSection = document.querySelector(".joinUsSection");
    const joinUs = document.querySelector(".joinUs");
    const joinUsBtn = document.querySelector(".joinUsBtn")

    // Check if the clicked element is not the joinUsBtn or its children
    if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
        joinUsSection.style.display = "none";
        document.body.style.overflow = "auto";
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
            // Show Bootstrap success alert
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

            // Hide the alert after a certain time
            setTimeout(() => {
                successAlert.style.opacity = "0";
                document.querySelector(".joinUsSection").style.display = "none";
            }, 3000);
        }
        else {
            alert("Please write fullname and email!")
        }
    })
}

sendJoinUsToDatabase();

get(ref(db, `/bookTypes`)).then(
    response => {
        const result = response.val();
        document.querySelector(".catalogChoose").innerHTML = "";
        for (let i in result) {
            document.querySelector(".catalogChoose").innerHTML +=
                `<a class="choose" href="./assets/pages/catalog.html">
            ${result[i]}
            </a>`
        }
    }
)