import db from "./firebase.mjs";

import { onValue, ref, get, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

function callSwiper() {
    const swiper_search = new Swiper('.swiper-search', {
        slidesPerView: 1,
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.rightArrow',
            prevEl: '.leftArrow',
        },
        autoplay: {
            delay: 2000,
        },
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
    });


}

setTimeout(callSwiper, 1000);


document.querySelector(".joinUsBtn").addEventListener("click", function () {
    document.querySelector(".joinUsSection").style.display = "flex";
    document.querySelector(".header").style.position = "absolute";
    document.body.style.overflow = "hidden";
});

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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name.value.trim() !== "" && emailPattern.test(email.value)) {
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

const searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", async function () {
    // console.log(inputSearch.value + " inp2");
    document.querySelector(".rightSideSearchSection").style.opacity = "1";
    document.querySelector(".wrapper-search").innerHTML = "";
    let imageClass;
    let bookName;
    let authorName;
    let description;
    await get(ref(db, `/addedBooks`)).then(response => {
        const result = response.val();
        const inputSearch = document.querySelector(".searchBookInp");
        for (let i in result) {
            if (result[i].bookName.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                console.log(result[i].bookName.toLowerCase() + " book");
                console.log(inputSearch.value.toLowerCase() + " inp");
                document.querySelector(".bookNotFound").style.display = "none";
                document.querySelector(".leftArrow").style.display = "block";
                document.querySelector(".rightArrow").style.display = "block";
                bookName = result[i].bookName;
                authorName = result[i].authorName;
                description = result[i].bookDescription;
                if (Number(result[i].yearOfBook) > 2020) {
                    imageClass = "span";
                } else {
                    imageClass = "newBook";
                }
                document.querySelector(".wrapper-search").innerHTML +=
                    `<div class="swiper-slide slideDiv">
                <div class="imageSwiperDiv">
                    <img src="${result[i].bookImage}" class="imageSwiper" />
                </div>
                    <div class="infoBookDiv">
                <h1 class="bookNameSwiper">${bookName}</h1>
                <h2 class="authorNameSwiper">${authorName}</h2>
                <p class="descriptionSwiper">${description}</p>
                    </div>
                </div>`;
            }
            else if (!result[i].bookName.toLowerCase().includes(inputSearch.value.toLowerCase()) && document.querySelector(".wrapper-search").innerHTML === "") {
                document.querySelector(".bookNotFound").style.display = "block";
                document.querySelector(".leftArrow").style.display = "none";
                document.querySelector(".rightArrow").style.display = "none";
            }
        }

    })
    document.querySelector(".searchBookInp").value = "";
})