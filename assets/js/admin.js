import db from "./firebase.mjs";

import { ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const addBookBtn = document.querySelector(".addBookBtn");
const aboutInfoAddBtn = document.querySelector(".aboutInfoAddBtn");
const searchBookInp = document.querySelector(".searchBookInp");

onValue(ref(db, `/aboutStore`), response => {
    const result = response.val();
    document.querySelector(".aboutTitleInp").value = result.titlee;
    document.querySelector(".aboutImgUrlInp").value = result.aboutImage;
    document.querySelector(".aboutDescriptionInp").value = result.description;
})

onValue(ref(db, `/contactUs`), response => {
    let idCounter = 0;
    document.querySelector(".contactUsTable").innerHTML = "";
    const result = response.val();
    document.querySelector(".contactUsTable").innerHTML +=
        `<tr class="firstChildOfContactTable">
    <td>#</td>
    <td>Full Name</td>
    <td>Address</td>
    <td>Email Address</td>
    <td>Phone Number</td>
        </tr>`;
    for (let i in result) {
        document.querySelector(".contactUsTable").innerHTML +=
            `<tr>
         <td>${idCounter + 1}</td>
         <td>${result[i].fullname}</td>
         <td>${result[i].address}</td>
         <td>${result[i].email}</td>
         <td>${result[i].phone}</td>
            </tr>`;
        idCounter++;
    }
});

onValue(ref(db, `/addedBooks`), response => {
    const result = response.val();
    document.querySelector(".booksTable").innerHTML = "";
    let idCounter = 0;
    document.querySelector(".booksTable").innerHTML +=
        `<tr class="firstChildOfBooksTable">
        <td>#</td>
        <td>Title</td>
        <td>Description</td>
        <td>Category</td>
        <td>Author</td>
        </tr>`;
    for (let i in result) {
        document.querySelector(".booksTable").innerHTML +=
            `<tr>
         <td>${idCounter + 1}</td>
         <td>${result[i].bookName}</td>
         <td>${result[i].bookDescription}</td>
         <td>${result[i].bookType}</td>
         <td>${result[i].authorName}</td>
            </tr>`;
        idCounter++;
    }
});


onValue(ref(db, `/joinUs`), response => {
    const result = response.val();
    document.querySelector(".joinUsTable").innerHTML = "";
    let idCounter = 0;
    document.querySelector(".joinUsTable").innerHTML +=
        `<tr class="firstChildOfJoinTable">
    <td>#</td>
    <td>Full Name</td>
    <td>Email Address</td>
    <td>Message</td>
    </tr>`;
    for (let i in result) {
        document.querySelector(".joinUsTable").innerHTML +=
            `<tr>
         <td>${idCounter + 1}</td>
         <td>${result[i].fullname}</td>
         <td>${result[i].email}</td>
         <td>${result[i].message}</td>
            </tr>`;
        idCounter++;
    }
});


addBookBtn.addEventListener("click", async function () {
    let bookName = document.querySelector(".bookNameInp");
    let authorName = document.querySelector(".authorNameInp");
    let bookImage = document.querySelector(".bookImgUrlInp");
    let yearOfBook = document.querySelector(".yearOfBookInp");
    let bookDescription = document.querySelector(".descriptionInp");
    let bookType = document.querySelector(".bookTypeInp");

    if (bookName.value.trim() !== "" && authorName.value.trim() !== "" && bookImage.value.trim() !== "" && bookDescription.value.trim() !== "") {
        document.querySelector(".aboutBook").style.backgroundColor = "rgb(26, 198, 26)"
        const bookInfo = {
            bookName: bookName.value,
            authorName: authorName.value,
            bookImage: bookImage.value,
            yearOfBook: yearOfBook.value,
            bookDescription: bookDescription.value,
            bookType: bookType.value
        }

        let snapshot = push(ref(db, `/addedBooks`), bookInfo);
        set(ref(db, `/addedBooks/${snapshot.key}`), bookInfo);

        bookName.value = "";
        authorName.value = "";
        bookImage.value = "";
        yearOfBook.value = "";
        bookDescription.value = "";

        setTimeout(function () {
            document.querySelector(".aboutBook").style.backgroundColor = "#fff"
        }, 1500);
    }
    else {
        alert("Please write book informations!")
    }
});

aboutInfoAddBtn.addEventListener("click", function () {
    let title = document.querySelector(".aboutTitleInp");
    let aboutImage = document.querySelector(".aboutImgUrlInp");
    let description = document.querySelector(".aboutDescriptionInp");

    if (title.value.trim() !== "" && aboutImage.value.trim() !== "" && description.value.trim() !== "") {
        document.querySelector(".aboutStore").style.backgroundColor = "rgb(26, 198, 26)"
        const aboutInfo = {
            titlee: title.value,
            aboutImage: aboutImage.value,
            description: description.value
        }

        set(ref(db, `/aboutStore`), aboutInfo);

        setTimeout(function () {
            document.querySelector(".aboutStore").style.backgroundColor = "#fff"
        }, 1500);
    }
    else {
        alert("Please write informations about store!")
    }
});

document.querySelector(".closeHamburger").onclick = function () {
    document.querySelector(".leftSide").style.display = "none";
    document.querySelector(".hamburgerMenu").style.display = "block"
}

document.querySelector(".hamburgerMenu").onclick = function () {
    document.querySelector(".leftSide").style.display = "flex";
    document.querySelector(".hamburgerMenu").style.display = "none"
}

function closeHamburgerMenuOnclick() {
    let menuBtnAll = document.querySelectorAll(".menuBtn");
    menuBtnAll.forEach(function (menuBtn) {
        menuBtn.onclick = function () {
            if (document.querySelector(".hamburgerMenu").style.display === "none") {
                document.querySelector(".leftSide").style.display = "none";
                document.querySelector(".hamburgerMenu").style.display = "block";
            }
            else {
            }
        };
    });
};

closeHamburgerMenuOnclick();

window.addEventListener("keyup", function () {
    if (searchBookInp.value.trim() !== "" && searchBookInp.value.length > 2) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBookInp.value}`).then(result => {
            return result.json();
        }).then(
            response => {
                document.querySelector(".searchHistory").style.display = "flex";
                document.querySelector(".searchHistory").innerHTML = "";
                for (let i in response.items) {
                    // console.log(response.items[i].volumeInfo.pageCount)
                    document.querySelector(".searchHistory").innerHTML +=
                        `<div class="historyDiv">
                    <img src="../images/clock.svg" />
                    <p>${response.items[i].volumeInfo.title}</p>
                    </div>`;

                    let historyDivAll = document.querySelectorAll(".historyDiv");
                    historyDivAll.forEach(function (historyDivAll) {
                        historyDivAll.onclick = function () {
                            let bookName = document.querySelector(".bookNameInp");
                            let authorName = document.querySelector(".authorNameInp");
                            let bookImage = document.querySelector(".bookImgUrlInp");
                            let yearOfBook = document.querySelector(".yearOfBookInp");
                            let bookDescription = document.querySelector(".descriptionInp");
                            let bookType = document.querySelector(".bookTypeInp");

                            bookName.value = "";
                            authorName.value = "";
                            bookImage.value = "";
                            yearOfBook.value = "";
                            bookDescription.value = "";

                            console.log(response.items[i].volumeInfo.subtitle)

                            if (response.items[i].volumeInfo.title !== undefined) {
                                bookName.value = response.items[i].volumeInfo.title;
                            }
                            if (response.items[i].volumeInfo.authors[0] !== undefined) {
                                authorName.value = response.items[i].volumeInfo.authors[0];
                            }
                            if (response.items[i].volumeInfo.imageLinks.thumbnail !== undefined) {
                                bookImage.value = response.items[i].volumeInfo.imageLinks.thumbnail;
                            }
                            if (response.items[i].volumeInfo.publishedDate !== undefined) {
                                yearOfBook.value = response.items[i].volumeInfo.publishedDate;
                            }
                            if (response.items[i].volumeInfo.subtitle !== undefined) {
                                bookDescription.value = response.items[i].volumeInfo.subtitle;
                            }
                            if (response.items[i].volumeInfo.categories !== undefined) {
                                let bookTypeOption = document.querySelectorAll(".bookTypeOption");
                                for (let j in bookTypeOption) {
                                    if (bookTypeOption[j].value !== response.items[i].volumeInfo.categories) {
                                        var option = document.createElement("option");
                                        option.innerHTML = response.items[i].volumeInfo.categories;
                                        bookType.append(option);
                                        bookType.value = response.items[i].volumeInfo.categories;
                                        break;
                                    }
                                    else {
                                        bookType.innerHTML = response.items[i].volumeInfo.categories;
                                    }
                                }
                            }
                            searchBookInp.value = "";
                            document.querySelector(".searchHistory").style.display = "none";
                        }
                    })
                }
            }
        );
    }
    else if (searchBookInp.value.trim() === "") {
        document.querySelector(".searchHistory").style.display = "none"
    }
});