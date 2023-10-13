
const myLibrary = [];

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

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310);
let aGOT = new Book('A Game of Thrones', 'George R.R. Martin', 694);
addBookToLibrary(theHobbit);
addBookToLibrary(aGOT);

console.log(myLibrary);

function displayBooks () {
  const bookshelve = document.querySelector(".container");

  for (book of myLibrary) {
    console.log(book.info());
    const addBook = document.createElement('div');
    addBook.setAttribute('class', 'book');
    
    const info = document.createElement('p');
    info.textContent = book.info();

    addBook.appendChild(info);
    bookshelve.appendChild(addBook);
  }
}

displayBooks();