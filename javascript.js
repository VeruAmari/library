
const myLibrary = [];

const form = document.querySelector("form");

const BOOKSHELF = document.querySelector(".container");


function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages.";
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(book.title + ' has been added to the library.')
}

function staticAddBooks () {
  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310);
  const aGOT = new Book('A Game of Thrones', 'George R.R. Martin', 694);
  const wheelOfTime1 = new Book('The Eye of the World', 'Robert Jordan', 782);
  addBookToLibrary(theHobbit);
  addBookToLibrary(aGOT);
  addBookToLibrary(wheelOfTime1);
}

function displayBooks () {

  for (book of myLibrary) {
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
}

function toggleForm () {
  form.classList.toggle("hidden");
}

function handleForm (event) {
  event.preventDefault();

  toggleForm();
}
form.addEventListener("submit", handleForm);


staticAddBooks();
displayBooks();

displayButton();
const addBookButton = document.querySelector(".add.book");
addBookButton.addEventListener("click", toggleForm);
