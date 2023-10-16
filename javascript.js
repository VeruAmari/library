
const myLibrary = [];

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
  const buttonSurface = document.createElement('div');
  buttonSurface.setAttribute('class', 'add book');
  BOOKSHELF.appendChild(buttonSurface);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310);
const aGOT = new Book('A Game of Thrones', 'George R.R. Martin', 694);
addBookToLibrary(theHobbit);
addBookToLibrary(aGOT);


console.log(myLibrary);


displayBooks();
displayButton();