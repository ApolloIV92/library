let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if(read) {
        this.read = "Yes.";
    } else {
        this.read = "No.";
    }
}

Book.prototype.changeRead = function() {
    if(this.read === "Yes.") {
        this.read = "No.";
    } else {
        this.read = "Yes.";
    }
}

function addBookToLibrary() {
    let titleText = document.getElementById("title");
    let authorText = document.getElementById("author");
    let pagesText = document.getElementById("pages");
    let read = document.querySelector("input[type=checkbox");
    let newBook = new Book(titleText.value, authorText.value, pagesText.value, read.value);
    titleText.value = "";
    authorText.value = "";
    pagesText.value = "";
    read.value = "";
    return newBook;
}

function createBookElement(book, arrNum) {
    let newBook = document.createElement("div");
    let title = document.createElement("h1");
    let author = document.createElement("h2");
    let bodyText = document.createElement("p");
    let deleteButton = document.createElement("button");
    let readButton = document.createElement("button");
    title.textContent = `${book.title}`;
    author.textContent = `By: ${book.author}`;
    bodyText.textContent = `Pages: ${book.pages}. Read: ${book.read}`;
    deleteButton.textContent = "Remove";
    readButton.textContent = "Change read?";
    
    newBook.setAttribute("class", "bookCard");
    newBook.setAttribute("id", arrNum);
    bodyText.setAttribute("id", arrNum);
    deleteButton.setAttribute("id", arrNum);
    readButton.setAttribute("id", arrNum);
    deleteButton.setAttribute("class", "delete");
    readButton.setAttribute("class", "read");
    cardArea.appendChild(newBook);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(bodyText);
    newBook.appendChild(deleteButton);
    newBook.appendChild(readButton);
}

function displayBooks() {
    while (cardArea.firstChild) {
        cardArea.removeChild(cardArea.firstChild);
    }
    for(i=0;i<myLibrary.length;i++) {
        let arrNum = i;
        createBookElement(myLibrary[i], arrNum);
    }
    armButtons();
}

function submitClicked(e) {
    e.preventDefault();
    myLibrary.push(addBookToLibrary());
    displayBooks();
    toggleOverlay();
};

function deleteCard(id) {
    let card = document.getElementById(id);
    card.remove();
    myLibrary.splice(id, 1);
    displayBooks();
}

function changeReadCard(id) {
    myLibrary[id].changeRead();
   createBookElement(myLibrary[id], id)
   displayBooks();
}

function armButtons() {
    let deleteButtons = document.querySelectorAll("button.delete");
    deleteButtons.forEach(button =>
        button.addEventListener("click", (event) => deleteCard(event.target.parentElement.id)));
    let readButtons = document.querySelectorAll("button.read");
    readButtons.forEach(button =>
        button.addEventListener("click", (event) => changeReadCard(event.target.parentElement.id)));
}

function toggleOverlay() {
    const elementsHidden = document.getElementsByClassName('hidden')
    if(elementsHidden.length>0) {
        overlay.setAttribute("class", "shadow");
        document.body.classList.add("stopScrolling");
    } else {
        overlay.setAttribute("class", "shadow hidden");
        document.body.classList.remove("stopScrolling");
    }
}


let testBook = new Book("Test Book", "Fake Author", "420", "true");

myLibrary.push(testBook);

console.log(myLibrary[0]);


// HTML manipulation

const form = document.querySelector("form");
const cardArea = document.getElementById("cards");
const addBooks = document.getElementById("addBook");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeWindow");
addBooks.addEventListener('click', () => toggleOverlay());
closeButton.addEventListener('click', () => toggleOverlay());
form.addEventListener('submit', (e) => submitClicked(e));

displayBooks();



