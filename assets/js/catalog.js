import db from "./firebase.mjs";

import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


function callSwiper() {
    const swiper_all_x = new Swiper('.swiper.swiper_catalog', {
        // Optional parameters
        slidesPerView: 5,
        direction: 'horizontal',
        loop: true,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.5,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 640px
            767: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 20
            }
        }
    });
}

setTimeout(callSwiper, 2000);

const swiperWrapper = document.querySelector(".swiper-wrapper");

function downloading() {
    document.querySelector(".swiper").style.display = "block";
    document.querySelector(".downloadingImg").style.display = "none";
}

setTimeout(downloading, 4000)

get(ref(db, `/addedBooks`)).then(
    response => {
        const result = response.val();
        swiperWrapper.innerHTML = "";
        for (let i in result) {
            let bookName = "";
            let authorName = "";
            if (result[i].bookName.length > 22) {
                bookName = result[i].bookName.slice(0, 19) + "...";
            }
            else {
                bookName = result[i].bookName
            }
            if (result[i].authorName.length > 22) {
                authorName = result[i].authorName.slice(0, 19) + "..."
            }
            else {
                authorName = result[i].authorName
            }

            swiperWrapper.innerHTML +=
                `
            <div class="swiper-slide slideDiv">
                <img src="${result[i].bookImage}" class="imageSwiper" />
                <h1 class="bookNameSwiper">${bookName}</h1>
                <p class="authorNameSwiper">${authorName}</p>
                <button class="readMoreBtn">READ MORE</button>
            </div>
            `;

            let category = result[i].bookType;
            var li = document.createElement("li");
            if (category.length < 10 && category !== "undefined") {
                li.innerHTML = category;
                document.querySelector(".categories").appendChild(li);
            }
            else if (category.length > 10 && category !== "undefined") {
                category = category.slice(0, 10);
                li.innerHTML = category;
                document.querySelector(".categories").appendChild(li);
            }

            let readMoreBtnAll = document.querySelectorAll(".readMoreBtn");
        }
    }
);

