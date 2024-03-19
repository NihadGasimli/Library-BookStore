import db from "./firebase.mjs";
import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
    const swiperWrapperAll = document.querySelector(".wrapper-all");
    const swiperWrapperBesteller = document.querySelector(".wrapper-besteller");
    const swiperWrapperNewReleases = document.querySelector(".wrapper-newReleases");

    function callSwiper() {
        const swiper_all = new Swiper('.swiper-all', {
            slidesPerView: 5,
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
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 20
                }
            },
            observer: true,
            observeParents: true,
            watchSlidesProgress: true
        });

        const swiper_new_releases = new Swiper('.swiper-newReleases', {
            slidesPerView: 5,
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: '.rightArrowSec3',
                prevEl: '.leftArrowSec3',
            },
            autoplay: {
                delay: 2000,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
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

        const swiper_besteller = new Swiper('.swiper-besteller', {
            slidesPerView: 5,
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: '.rightArrowSec2',
                prevEl: '.leftArrowSec2',
            },
            autoplay: {
                delay: 2000,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
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
        document.querySelector(".swiper-newReleases").style.opacity = "1";
        document.querySelector(".downloadingImg").style.display = "none";
        document.querySelector(".downloadingImgSec2").style.display = "none";
        document.querySelector(".downloadingImgSec3").style.display = "none";
    }

    setTimeout(downloading, 2000);

    get(ref(db, `/addedBooks`)).then(response => {
        const result = response.val();
        swiperWrapperAll.innerHTML = "";
        for (let i in result) {
            let bookName = "";
            let authorName = "";
            let sellCounts = "";
            let imageClass = "";
            bookName = result[i].bookName
            authorName = result[i].authorName
            sellCounts = result[i].sellCounter
            if (Number(result[i].yearOfBook) > 2020) {
                imageClass = "span";
                swiperWrapperNewReleases.innerHTML += `
                    <div class="swiper-slide slideDiv">
                        <div class="imageSwiperDiv">
                            <span class=${imageClass}>New</span>
                            <img src="${result[i].bookImage}" class="imageSwiper" />
                        </div>
                        <h1 class="bookNameSwiper">${bookName}</h1>
                        <p class="authorNameSwiper">${authorName}</p>
                        <button class="readMoreBtn">READ MORE</button>
                    </div>
                `;
            } else {
                imageClass = "newBook";
            }
            swiperWrapperAll.innerHTML += `
                <div class="swiper-slide slideDiv">
                    <div class="imageSwiperDiv">
                        <span class=${imageClass}>New</span>
                        <img src="${result[i].bookImage}" class="imageSwiper" />
                    </div>
                    <h1 class="bookNameSwiper">${bookName}</h1>
                    <p class="authorNameSwiper">${authorName}</p>
                    <button class="readMoreBtn">READ MORE</button>
                </div>
            `;
            if (sellCounts > 10) {
                swiperWrapperBesteller.innerHTML += `
                    <div class="swiper-slide slideDiv">
                        <div class="imageSwiperDiv">
                            <span class=${imageClass}>New</span>
                            <img src="${result[i].bookImage}" class="imageSwiper" />
                        </div>
                        <h1 class="bookNameSwiper">${bookName}</h1>
                        <p class="authorNameSwiper">${authorName}</p>
                        <button class="readMoreBtn">READ MORE</button>
                    </div>
                `;
            }
            clickReadMore();
        }
    });

    get(ref(db, `/bookTypes`)).then(response => {
        const result = response.val();
        let categories = document.querySelector(".categories");
        for (let i in result) {
            categories.innerHTML += `<li class="typeOfBook">${result[i]}</li>`;
        }
    });

    setTimeout(clickType, 2000);
});

function clickReadMore() {
    let readMoreBtnAll = document.querySelectorAll(".readMoreBtn");
    readMoreBtnAll.forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelector(".allBooksSection").style.opacity = "0";
            document.querySelector(".bestellerSection").style.opacity = "0";
            document.querySelector(".newReleasesSection").style.opacity = "0";
            document.querySelector(".allBooksSection").style.display = "none";
            document.querySelector(".bestellerSection").style.display = "none";
            document.querySelector(".newReleasesSection").style.display = "none";
            document.querySelector(".moreInfo").style.opacity = "1";
            document.querySelector(".moreInfo").style.display = "flex";
            let parentDiv = btn.closest(".swiper-slide");
            let bookName = parentDiv.querySelector(".bookNameSwiper").innerHTML;
            get(ref(db, `/addedBooks`)).then(response => {
                const result = response.val();
                for (let i in result) {
                    if (result[i].bookName === bookName) {
                        document.querySelector(".infoAboutBook").innerHTML = `
                            <h5 class="yearOfBookMoreInfo">${result[i].yearOfBook}</h5>
                            <h1 class="nameOfBookMoreInfo">${result[i].bookName}</h1>
                            <h3 class="authorOfBookMoreInfo">${result[i].authorName}</h3>
                            <p class="descriptionOfBookMoreInfo">${result[i].bookDescription}</p>
                        `;
                        document.querySelector(".rightSideMoreInfo").innerHTML = `<img src="${result[i].bookImage}" class="bookImageMoreInfo" />`;
                        let allComments = result[i].comments;
                        document.querySelector(".comments").innerHTML = "";
                        for (let j in allComments) {
                            document.querySelector(".comments").style.display = "flex";
                            document.querySelector(".comments").innerHTML += `
                                <div class="comment">
                                    <h3>Anonim</h3>
                                    <p class="anonimComment">${allComments[j]}</p>
                                </div>
                            `;
                        }
                        document.querySelector(".sendAnonimCommentBtn").onclick = function () {
                            addAndShowComments(i);
                        }
                        return;
                    }
                }
            });
        });
    });
};

function clickType() {
    const swiperWrapperAll = document.querySelector(".wrapper-all");
    const typesOfBooks = document.querySelectorAll(".typeOfBook");
    typesOfBooks.forEach(btn => {
        btn.addEventListener("click", async function () {
            swiperWrapperAll.innerHTML = "";
            document.querySelector(".bestellerSection").style.display = "none";
            document.querySelector(".newReleasesSection").style.display = "none";
            await get(ref(db, `/addedBooks`)).then(response => {
                const result = response.val();
                for (let i in result) {
                    if (result[i].bookType === btn.innerHTML) {
                        let bookName = "";
                        let authorName = "";
                        let imageClass = "";
                        bookName = result[i].bookName
                        authorName = result[i].authorName
                        if (Number(result[i].yearOfBook) > 2020) {
                            imageClass = "span";
                        } else {
                            imageClass = "newBook";
                        }
                        swiperWrapperAll.innerHTML += `
                            <div class="swiper-slide slideDiv">
                                <div class="imageSwiperDiv">
                                    <span class=${imageClass}>New</span>
                                    <img src="${result[i].bookImage}" class="imageSwiper" />
                                </div>
                                <h1 class="bookNameSwiper">${bookName}</h1>
                                <p class="authorNameSwiper">${authorName}</p>
                                <button class="readMoreBtn">READ MORE</button>
                            </div>
                        `;
                        swiperWrapperAll.style.justifyContent = "center";
                    }
                    clickReadMore()
                }
            })
        })
    })
};

function addAndShowComments(key) {
    document.querySelector(".comments").style.display = "flex";
    const comment = document.querySelector(".anonimCommentInp");
    let snapshot = push(ref(db, `/addedBooks/${key}/comments`));
    set(ref(db, `/addedBooks/${key}/comments/${snapshot.key}`), comment.value);
    document.querySelector(".comments").innerHTML = "";
    get(ref(db, `/addedBooks/${key}/comments`)).then(response => {
        const result = response.val();
        for (let i in result) {
            document.querySelector(".comments").innerHTML += `
                <div class="comment">
                    <h3>Anonim</h3>
                    <p>${result[i]}</p>
                </div>
            `;
        }
    });
    comment.value = "";
}

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
