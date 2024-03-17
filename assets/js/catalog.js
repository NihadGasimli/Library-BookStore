import db from "./firebase.mjs";

import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


const swiperWrapperAll = document.querySelector(".wrapper-all");
const swiperWrapperBesteller = document.querySelector(".wrapper-besteller");


function callSwiper() {
    const swiper_all_x = new Swiper('.swiper-all', {
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

function callSwiper2() {
    const swiper_besteller = new Swiper('.swiper-besteller', {
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

setTimeout(callSwiper, 1000);


function downloading() {
    document.querySelector(".swiper-all").style.opacity = "1";
    document.querySelector(".swiper-besteller").style.opacity = "1";
    document.querySelector(".downloadingImg").style.display = "none";
    document.querySelector(".downloadingImgSec2").style.display = "none";
}

setTimeout(downloading, 2000);


function date() {
    let date = new Date();

    // Get the year, month, and day from the date object
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let day = date.getDate().toString().padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    let formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
}

get(ref(db, `/addedBooks`)).then(
    response => {
        const result = response.val();
        swiperWrapperAll.innerHTML = "";
        for (let i in result) {
            let bookName = "";
            let authorName = "";
            let sellCounts = "";
            bookName = result[i].bookName
            authorName = result[i].authorName
            sellCounts = result[i].sellCounter

            swiperWrapperAll.innerHTML +=
                `
                <div class="swiper-slide slideDiv">
                <img src="${result[i].bookImage}" class="imageSwiper" />
                <h1 class="bookNameSwiper">${bookName}</h1>
                <p class="authorNameSwiper">${authorName}</p>
                <button class="readMoreBtn">READ MORE</button>
                </div>
                `;
            if (sellCounts > 10) {
                swiperWrapperBesteller.innerHTML +=
                    `
                <div class="swiper-slide slideDiv">
                <img src="${result[i].bookImage}" class="imageSwiper" />
                <h1 class="bookNameSwiper">${bookName}</h1>
                <p class="authorNameSwiper">${authorName}</p>
                <button class="readMoreBtn">READ MORE</button>
                </div>
                `;
            }

            let readMoreBtnAll = document.querySelectorAll(".readMoreBtn");
            readMoreBtnAll.forEach(btn => {
                btn.addEventListener("click", function () {
                    document.querySelector(".allBooksSection").style.opacity = "0";
                    document.querySelector(".bestellerSection").style.opacity = "0";
                    document.querySelector(".allBooksSection").style.display = "none";
                    document.querySelector(".bestellerSection").style.display = "none";
                    document.querySelector(".moreInfo").style.opacity = "1";
                    document.querySelector(".moreInfo").style.display = "flex";
                    let parentDiv = btn.closest(".swiper-slide");
                    let bookName = parentDiv.querySelector(".bookNameSwiper").innerHTML;
                    get(ref(db, `/addedBooks`)).then(
                        response => {
                            const result = response.val();
                            for (let i in result) {
                                if (result[i].bookName === bookName) {
                                    document.querySelector(".infoAboutBook").innerHTML +=
                                        `<h5 class="yearOfBookMoreInfo">${result[i].yearOfBook}</h5>
                                <h1 class="nameOfBookMoreInfo">${result[i].bookName}</h1>
                                <h3 class="authorOfBookMoreInfo">${result[i].authorName}</h3>
                                <p class="descriptionOfBookMoreInfo">${result[i].bookDescription}</p>
                                `;
                                    document.querySelector(".rightSideMoreInfo").innerHTML +=
                                        `<img src="${result[i].bookImage}" class="bookImageMoreInfo" />`;

                                    let allComments = result[i].comments;

                                    for (let j in allComments) {
                                        document.querySelector(".comments").style.display = "flex";
                                        document.querySelector(".comments").innerHTML +=
                                            `<div class="comment">
                                            <h3>Anonim</h3>
                                            <p class="anonimComment">${allComments[j]}</p>
                                            </div>`
                                    }
                                    document.querySelector(".sendAnonimCommentBtn").onclick = function () {
                                        addAndShowComments(i);
                                    }
                                    continue;
                                }
                            }
                        }
                    )
                });
            });
        }
    }
);



get(ref(db, `/bookTypes`)).then(
    response => {
        const result = response.val();
        let categories = document.querySelector(".categories");

        for (let i in result) {
            categories.innerHTML +=
                `<li class="typeOfBook">${result[i]}</li>`
        }
    }
);


function addAndShowComments(key) {
    document.querySelector(".comments").style.display = "flex";
    const comment = document.querySelector(".anonimCommentInp");
    let snapshot = push(ref(db, `/addedBooks/${key}/comments`));
    set(ref(db, `/addedBooks/${key}/comments/${snapshot.key}`), comment.value);
    document.querySelector(".comments").innerHTML = "";
    get(ref(db, `/addedBooks/${key}/comments`)).then(
        response => {
            const result = response.val();
            for (let i in result) {
                document.querySelector(".comments").innerHTML +=
                    `<div class="comment">
                <h3>Anonim</h3>
                <p>${result[i]}</p>
                </div>`;
            }
        }
    )
    comment.value = "";
}


