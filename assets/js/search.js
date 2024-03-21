function callSwiper() {
    const swiper_search = new Swiper('.swiper-search', {
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
