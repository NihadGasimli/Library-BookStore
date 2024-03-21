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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            767: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 1,
                spaceBetween: 20
            }
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

const inputSearch = document.querySelector(".searchBookInp");
const searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", function () {
    document.querySelector(".wrapper-search").innerHTML = "";
    let imageClass;
    let bookName;
    let authorName;
    let description;
    get(ref(db, `/addedBooks`)).then(response => {
        const result = response.val();
        for (let i in result) {
            if (result[i].bookName.includes(inputSearch.value)) {
                bookName = result[i].bookName;
                authorName = result[i].authorName;
                description = result[i].description;
                if (Number(result[i].yearOfBook) > 2020) {
                    imageClass = "span";
                } else {
                    imageClass = "newBook";
                }
                document.querySelector(".wrapper-search").innerHTML +=
                `<div class="swiper-slide slideDiv">
                <div class="imageSwiperDiv">
                    <span class=${imageClass}>New</span>
                    <img src="${result[i].bookImage}" class="imageSwiper" />
                </div>
                <h1 class="bookNameSwiper">${bookName}</h1>
                <h2 class="authorNameSwiper">${authorName}</h2>
                <p class="descriptionSwiper">${description}</p>
                </div>`;
            }
        }
    })
})