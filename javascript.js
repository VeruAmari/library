
const myLibrary = [];

const form = document.querySelector("form");
const formClose = document.querySelector(".close");
formClose.addEventListener("click", toggleForm);

const BOOKSHELF = document.querySelector(".container");


function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages. Status: " + this.status + ".";
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(book.title + ' has been added to the library.')
}

function staticAddBooks () {
  //const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, "Unread");
  const aGOT = new Book('A Game of Thrones', 'George R.R. Martin', 694, "Read");
  const wheelOfTime1 = new Book('The Eye of the World', 'Robert Jordan', 782, "Read");
  //addBookToLibrary(theHobbit);
  addBookToLibrary(aGOT);
  addBookToLibrary(wheelOfTime1);
}

function displayAllBooks (aLibrary) {

  for (book of aLibrary) {
    const addBook = document.createElement('div');
    addBook.setAttribute('class', 'book');

    for (element in book) {
      if (typeof book[element] != 'function') {

        const info = document.createElement('p');
        info.setAttribute('class', 'info')
        const infoTitle = document.createElement('span');
        infoTitle.textContent = element[0].toUpperCase() + element.substring(1) + ": ";
        const infoContent = document.createElement('span');
        infoContent.textContent = book[element];
        info.appendChild(infoTitle);
        info.appendChild(infoContent);

        addBook.appendChild(info);
      }
    }

    BOOKSHELF.appendChild(addBook);
  }
}

function displayButton () {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'add book');

  const button = document.createElement('button');
  button.textContent = '+ ADD BOOK';

  buttonContainer.appendChild(button);

  BOOKSHELF.appendChild(buttonContainer);

  const addBookButton = document.querySelector(".add.book");
  addBookButton.addEventListener("click", toggleForm);
}

function moveButton () {
  const addBookButton = document.querySelector(".add.book");
  const container = document.querySelector(".container");
  container.removeChild(addBookButton);
}

function toggleForm () {
  form.classList.toggle("hidden");
}

function handleForm (event) {
  event.preventDefault();
  const newTitle = document.querySelector("#title").value;
  const newAuthor = document.querySelector('#author').value;
  const newPages = document.querySelector('#pages').value;
  const newRead = document.querySelector('#status').checked;

  function read(stat) {return stat ? "Read" : "Unread"}
  
  const newBook = new Book(newTitle, newAuthor, newPages, read(newRead));

  addBookToLibrary(newBook);
  moveButton();
  displayAllBooks([newBook]);
  displayButton();
}
form.addEventListener("submit", handleForm);

staticAddBooks();
displayAllBooks(myLibrary);

displayButton();
