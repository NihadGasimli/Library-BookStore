import db from "./firebase.mjs";

import { ref, set, get, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
            `<tr class="contactUsTableRow">
         <td class="contactUsTableIdRow"><button class="removeContactBtn">X</button>${idCounter + 1}</td>
         <td>${result[i].fullname}</td>
         <td>${result[i].address}</td>
         <td class="contactUsEmail">${result[i].email}</td>
         <td>${result[i].phone}</td>
            </tr>`;
        idCounter++;
    }
    deleteContact();
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
            `<tr class="booksTableRow">
         <td>${idCounter + 1}</td>
         <td class="booksTableDataName">${result[i].bookName}</td>
         <td class="booksTableDataDescription">${result[i].bookDescription}</td>
         <td class="booksTableDataType">${result[i].bookType}</td>
         <td class="booksTableDataAuthor">${result[i].authorName}</td>
            </tr>`;
        idCounter++;
    }

    editingBook();
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


addBookBtn.addEventListener("click", function () {
    let bookName = document.querySelector(".bookNameInp");
    let authorName = document.querySelector(".authorNameInp");
    let bookImage = document.querySelector(".bookImgUrlInp");
    let yearOfBook = document.querySelector(".yearOfBookInp");
    let bookDescription = document.querySelector(".descriptionInp");
    let bookType = document.querySelector(".bookTypeSelect");


    if (bookName.value.trim() !== "" && authorName.value.trim() !== "" && bookImage.value.trim() !== "" && bookDescription.value.trim() !== "") {
        document.querySelector(".aboutBook").style.backgroundColor = "rgb(26, 198, 26)"
        const bookInfo = {
            bookName: bookName.value,
            authorName: authorName.value,
            bookImage: bookImage.value,
            yearOfBook: yearOfBook.value,
            bookDescription: bookDescription.value,
            bookType: bookType.value,
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
    document.querySelector(".leftSide").style.width = "0px";
    document.querySelector(".hamburgerMenu").style.display = "block";
    setTimeout(function () {
        document.querySelector(".rightSide").style.zIndex = "999999";
    }, 300);
}

document.querySelector(".hamburgerMenu").onclick = function () {
    document.querySelector(".leftSide").style.width = "247px";
    document.querySelector(".rightSide").style.zIndex = "1";
    document.querySelector(".hamburgerMenu").style.display = "none"
}

function closeHamburgerMenuOnclick() {
    let menuBtnAll = document.querySelectorAll(".menuBtn");
    menuBtnAll.forEach(function (menuBtn) {
        menuBtn.onclick = function () {
            if (document.querySelector(".hamburgerMenu").style.display === "none") {
                document.querySelector(".leftSide").style.width = "0px";
                setTimeout(function () {
                    document.querySelector(".rightSide").style.zIndex = "999999";
                }, 300);
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
                    if (!document.querySelector(".searchHistory").innerHTML.includes(response.items[i].volumeInfo.title) && response.items[i].volumeInfo.title.trim() !== "") {
                        let bookName;

                        if (response.items[i].volumeInfo.title.length > 46) {
                            bookName = response.items[i].volumeInfo.title.slice(0, 46) + "...";
                        }
                        else {
                            bookName = response.items[i].volumeInfo.title;
                        }
                        document.querySelector(".searchHistory").innerHTML +=
                            `<div class="historyDiv">
                            <img src="../images/clock.svg" />
                            <p>${bookName}</p>
                            </div>`;

                        let historyDivAll = document.querySelectorAll(".historyDiv");
                        historyDivAll.forEach(function (historyDivAll) {
                            historyDivAll.onclick = function () {
                                let bookName = document.querySelector(".bookNameInp");
                                let authorName = document.querySelector(".authorNameInp");
                                let bookImage = document.querySelector(".bookImgUrlInp");
                                let yearOfBook = document.querySelector(".yearOfBookInp");
                                let bookDescription = document.querySelector(".descriptionInp");

                                for (let j in response.items) {

                                    if (response.items[j].volumeInfo.title === historyDivAll.querySelector("p").innerHTML) {
                                        bookName.value = "";
                                        authorName.value = "";
                                        bookImage.value = "";
                                        yearOfBook.value = "";
                                        bookDescription.value = "";

                                        try {
                                            if (response.items[j].volumeInfo.title !== undefined) {
                                                bookName.value = response.items[j].volumeInfo.title;
                                            }
                                        }
                                        catch {
                                            console.log("error");
                                        }

                                        try {
                                            if (response.items[j].volumeInfo.authors !== undefined) {
                                                authorName.value = response.items[j].volumeInfo.authors;
                                            }
                                        }
                                        catch {
                                            console.log("error");
                                        }

                                        try {
                                            if (response.items[j].volumeInfo.imageLinks.thumbnail !== undefined) {
                                                bookImage.value = response.items[j].volumeInfo.imageLinks.thumbnail;
                                            }
                                        }
                                        catch {
                                            console.log("error");
                                        }

                                        try {
                                            if (response.items[j].volumeInfo.publishedDate !== undefined) {
                                                yearOfBook.value = response.items[j].volumeInfo.publishedDate;
                                            }
                                        }
                                        catch {
                                            console.log("error");
                                        }

                                        try {

                                            if (response.items[j].volumeInfo.subtitle !== undefined) {
                                                bookDescription.value = response.items[j].volumeInfo.subtitle;
                                            }
                                        }
                                        catch {
                                            console.log("error")
                                        }

                                        searchBookInp.value = "";
                                        document.querySelector(".searchHistory").style.display = "none";
                                    }
                                }
                            }
                        })
                    }
                }
            }
        );
    }
    else {
        document.querySelector(".searchHistory").style.display = "none"
    }
});


document.querySelector(".addTypeDivBtn").addEventListener("click", function () {
    if (document.querySelector(".addModal").style.display === "flex") {
        document.querySelector(".addModal").style.display = "none";
    }
    else {
        document.querySelector(".addModal").style.display = "flex";
    }
})

document.querySelector(".addTypeBtn").addEventListener("click", function () {
    let bookType = document.querySelector(".bookTypeInp");

    let snapshot = push(ref(db, `/bookTypes`));

    set(ref(db, `/bookTypes/${snapshot.key}`), bookType.value);

    bookType.value = "";
    document.querySelector(".addModal").style.display = "none";
});

onValue(ref(db, `/bookTypes`), response => {
    const result = response.val();
    document.querySelector(".bookTypeSelect").innerHTML = "";
    for (let j in result) {
        document.querySelector(".bookTypeSelect").innerHTML +=
            `<option>${result[j]}</option>`
    }
});

function editingBook() {
    let booksTableRowAll = document.querySelectorAll(".booksTableRow");

    booksTableRowAll.forEach(function (booksTableRow) {
        booksTableRow.onmouseenter = function () {
            booksTableRow.style = "box-shadow: 0px 0px 10px rgba(21, 86, 224, 0.918)";
            booksTableRow.style.cursor = "pointer"
        }

        booksTableRow.onclick = function () {
            closeEditBookSectionOnClickOutside();
            setTimeout(function () {
                document.querySelector(".editBookSection").style.display = "flex";
                setTimeout(function () {
                    document.querySelector(".editBookSection").style.opacity = "1";
                }, 1)

            }, 1)

            let bookName = booksTableRow.querySelector(".booksTableDataName").innerHTML;

            get(ref(db, `/addedBooks`)).then(response => {
                const result = response.val();

                for (let i in result) {
                    if (result[i].bookName === bookName) {
                        localStorage.setItem("key", i);
                        document.querySelector(".bookNameEditInp").value = bookName;
                        document.querySelector(".authorNameEditInp").value = result[i].authorName;
                        document.querySelector(".bookCategoryEditInp").value = result[i].bookType;
                        document.querySelector(".bookYearEditInp").value = result[i].yearOfBook;
                        document.querySelector(".bookImageEditInp").value = result[i].bookImage;
                        document.querySelector(".bookDescriptionEditInp").value = result[i].bookDescription;
                    }
                }
            })

            document.querySelector(".saveEditBtn").onclick = function () {
                if (document.querySelector(".bookNameEditInp").value.trim() !== "" && document.querySelector(".authorNameEditInp").value.trim() !== "" && document.querySelector(".bookCategoryEditInp").value.trim() !== "" && document.querySelector(".bookYearEditInp").value.trim() !== "" && document.querySelector(".bookImageEditInp").value.trim() !== "" && document.querySelector(".bookDescriptionEditInp").value.trim() !== "") {
                    get(ref(db, `/addedBooks`)).then(
                        response => {
                            const result = response.val();

                            for (let j in result) {
                                if (j === localStorage.getItem("key")) {
                                    set(ref(db, `/addedBooks/${j}/bookName`), document.querySelector(".bookNameEditInp").value);
                                    set(ref(db, `/addedBooks/${j}/authorName`), document.querySelector(".authorNameEditInp").value);
                                    set(ref(db, `/addedBooks/${j}/bookType`), document.querySelector(".bookCategoryEditInp").value);
                                    set(ref(db, `/addedBooks/${j}/yearOfBook`), document.querySelector(".bookYearEditInp").value);
                                    set(ref(db, `/addedBooks/${j}/bookImage`), document.querySelector(".bookImageEditInp").value);
                                    set(ref(db, `/addedBooks/${j}/bookDescription`), document.querySelector(".bookDescriptionEditInp").value);
                                }
                            }
                        }
                    )
                    document.querySelector(".saveEditBtn").style.display = "none";
                    document.querySelector(".succesfullySaved").style.display = "flex";
                    document.querySelector(".removeBookBtn").style.display = "none";
                    setTimeout(function () {
                        document.querySelector(".succesfullySaved").style.display = "none";
                        document.querySelector(".saveEditBtn").style.display = "block";
                        document.querySelector(".removeBookBtn").style.display = "block";
                    }, 2000)
                }
                else {
                    document.querySelector(".saveEditBtn").style.display = "none";
                    document.querySelector(".errorSaved").style.display = "flex";
                    document.querySelector(".removeBookBtn").style.display = "none";
                    if (document.querySelector(".bookNameEditInp").value.trim() === "") {
                        document.querySelector(".bookNameEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".bookNameEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }
                    if (document.querySelector(".authorNameEditInp").value.trim() === "") {
                        document.querySelector(".authorNameEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".authorNameEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }
                    if (document.querySelector(".bookCategoryEditInp").value.trim() === "") {
                        document.querySelector(".bookCategoryEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".bookCategoryEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }
                    if (document.querySelector(".bookYearEditInp").value.trim() === "") {
                        document.querySelector(".bookYearEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".bookYearEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }
                    if (document.querySelector(".bookImageEditInp").value.trim() === "") {
                        document.querySelector(".bookImageEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".bookImageEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }
                    if (document.querySelector(".bookDescriptionEditInp").value.trim() === "") {
                        document.querySelector(".bookDescriptionEditInp").style.backgroundColor = "red";
                        setTimeout(function () {
                            document.querySelector(".bookDescriptionEditInp").style.backgroundColor = "#fff"
                        }, 2000);
                    }

                    setTimeout(function () {
                        document.querySelector(".saveEditBtn").style.display = "block";
                        document.querySelector(".errorSaved").style.display = "none";
                        document.querySelector(".removeBookBtn").style.display = "block";
                    }, 2000)
                }
            }

            document.querySelector(".removeBookBtn").onclick = function () {
                get(ref(db, `/addedBooks`)).then(response => {
                    const result = response.val();
                    for (let j in result) {
                        if (j === localStorage.getItem("key")) {
                            remove(ref(db, `/addedBooks/${j}`));
                        }
                    }
                })
                document.querySelector(".removeBookBtn").style.display = "none";
                document.querySelector(".saveEditBtn").style.display = "none";
                document.querySelector(".succesfullyDeleted").style.display = "flex";

                setTimeout(function () {
                    document.querySelector(".succesfullyDeleted").style.display = "none";
                    document.querySelector(".editBookSection").style.display = "none";
                    document.querySelector(".removeBookBtn").style.display = "block";
                    document.querySelector(".saveEditBtn").style.display = "block";
                }, 2000);
            }
        }

        booksTableRow.onmouseleave = function () {
            booksTableRow.style = "box-shadow: 0px";

        }
    })
}

function deleteContact() {
    let contactUsTableRowAll = document.querySelectorAll(".contactUsTableRow");
    contactUsTableRowAll.forEach(function (contactUsTableRow) {
        contactUsTableRow.querySelector(".removeContactBtn").onclick = function () {
            let email = contactUsTableRow.querySelector(".contactUsEmail").innerHTML;
            get(ref(db, `/contactUs`)).then(
                response => {
                    const result = response.val();
                    for (let i in result) {
                        if (result[i].email === email) {
                            remove(ref(db, `/contactUs/${i}`));
                        }
                    }
                }
            )
        }
    });
}

document.querySelector(".closeEditSectionBtn").onclick = function () {
    document.querySelector(".editBookSection").style.opacity = "0";
    setTimeout(function () {
        editBookSection.style.display = "none";
    }, 500);
}

document.addEventListener("click", function (event) {
    const addModal = document.querySelector(".addModal");
    if (!addModal.contains(event.target) && event.target !== document.querySelector(".addTypeDivBtn")) {
        addModal.style.display = "none";
    }
});

function closeEditBookSectionOnClickOutside() {
    document.addEventListener("click", function (event) {
        const editBookSection = document.querySelector(".editBookSection");
        const editBookDiv = document.querySelector(".editBookDiv");

        if (!editBookDiv.contains(event.target) && editBookSection.style.display === "flex") {
            document.querySelector(".editBookSection").style.opacity = "0";
            setTimeout(function () {
                editBookSection.style.display = "none";
            }, 500);
            localStorage.removeItem("key");
        }
    });

}


