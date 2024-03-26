import db from "./firebase.mjs";

import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const joinBtn = document.querySelector(".joinBtn");
const nameInp = document.querySelector(".nameInp");
const passInp = document.querySelector(".passInp");

var rightClickEnabled = false;


joinBtn.addEventListener("click", function () {
    checkLogin();
});

window.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        checkLogin();
    }
})

function checkLogin() {
    if (nameInp.value.trim() !== "" && passInp.value.trim() !== "") {
        joinBtn.style.display = "none";
        get(ref(db, `/admins`)).then(
            response => {
                const result = response.val();
                for (let i in result) {
                    if (result[i].username === nameInp.value && result[i].pass === passInp.value) {
                        document.querySelector(".succesfulLogin").style.display = "flex";
                        setTimeout(function () {
                            document.querySelector(".adminPanel").style.display = "flex";
                            document.querySelector(".loginPanel").style.display = "none";
                            document.querySelector(".adminUsername").innerHTML = nameInp.value;
                            enableRightClick();
                        }, 3000)
                        return;
                    }
                }
                document.querySelector(".invalidLogin").style.display = "flex";

                setTimeout(function () {
                    nameInp.value = "";
                    passInp.value = "";
                    joinBtn.style.display = "block";
                    document.querySelector(".invalidLogin").style.display = "none";
                    document.querySelector(".succesfulLogin").style.display = "none";
                }, 3000)
            }
        )
    }
    else {
        alert("Please write username and pass!")
    }
};

function enableRightClick() {
    document.removeEventListener('contextmenu', preventRightClick);
    rightClickEnabled = true;
};

function preventRightClick(event) {
    event.preventDefault();
};

document.addEventListener('contextmenu', preventRightClick);

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === "C") {
        event.preventDefault();
    }
});


