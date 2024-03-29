
const myLibrary = [];
let BOOKSCOUNT = 0;

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

function removeParent (button) {
  const removeId = "#" + button.target.id.split("remove-")[1];
  const remove = document.querySelector(removeId);
  document.querySelector(".container").removeChild(remove);
}

function toggleReadStatus (event) {
  //console.table(myLibrary);
  let togBook = event.target.id.split("toggle-")[1];
  let getBookTitle = document.getElementById(togBook).firstChild.lastChild.textContent;


  let arrayIndex = myLibrary.findIndex((b)=> b["title"] === getBookTitle);
  console.log("Current status: " + myLibrary[arrayIndex].status);
  if (myLibrary[arrayIndex].status === "Read") {
    myLibrary[arrayIndex].status = "Unread";
    event.target.textContent = myLibrary[arrayIndex].status;
    console.log("Changing " + myLibrary[arrayIndex].title + " status to " + myLibrary[arrayIndex].status);
  } else {
    myLibrary[arrayIndex].status = "Read";
    event.target.textContent = myLibrary[arrayIndex].status;
    console.log("Changing " + myLibrary[arrayIndex].title + " status to " + myLibrary[arrayIndex].status);
  }
}

function updateBooks (aLibrary) {

  /*
  Takes in an array of Book objects and adds each
  to the DOM, generating all elements required for
  the book-card.

  Returns undefined.
  */
  for (book of aLibrary) {
    const addBook = document.createElement('div');
    addBook.setAttribute('class', 'book');

    for (element in book) {
      if (typeof book[element] != 'function') {
        const info = document.createElement('p');
        info.setAttribute('class', 'info')
        const infoTitle = document.createElement('span');
        infoTitle.textContent = element[0].toUpperCase() + element.substring(1) + ": ";

        let infoContent;
        if (element === 'status') {
          infoContent = document.createElement('button');
          infoContent.setAttribute("id", "toggle-book-" + BOOKSCOUNT);
          infoContent.addEventListener("click", toggleReadStatus);
        } else {
          infoContent = document.createElement('span');
        }

        infoContent.textContent = book[element];
        info.appendChild(infoTitle);
        info.appendChild(infoContent);

        addBook.appendChild(info);
      }
    }
    addBook.setAttribute('id', "book-" + BOOKSCOUNT)
    console.log(addBook)
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.setAttribute("class", "remove-book");
    closeButton.setAttribute("id", "remove-book-" + BOOKSCOUNT);
    closeButton.addEventListener("click", removeParent);

    addBook.appendChild(closeButton);
    BOOKSCOUNT += 1;
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
  const newTitle = document.querySelector("#title");
  const newAuthor = document.querySelector('#author');
  const newPages = document.querySelector('#pages');
  const newRead = document.querySelector('#status');

  function read(stat) {return stat ? "Read" : "Unread"}

  const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, read(newRead.checked));

  newTitle.value = '';
  newAuthor.value = '';
  newPages.value = '';
  newRead.checked = false;

  addBookToLibrary(newBook);
  moveButton();
  updateBooks([newBook]);
  displayButton();
  toggleForm();
}
form.addEventListener("submit", handleForm);

staticAddBooks();
updateBooks(myLibrary);

displayButton();
