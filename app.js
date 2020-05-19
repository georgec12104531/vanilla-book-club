// Website Class
class Website {
  constructor(priority, title, website) {
    this.priority = priority;
    this.title = title;
    this.website = website;
  }
}

// Storage
class Storage {
  static getBooks() {
    let booksStored = localStorage.getItem("books");
    let books = booksStored ? JSON.parse(booksStored) : [];

    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(website) {
    const booksStored = JSON.parse(localStorage.getItem("books"));

    for (let i = 0; i < booksStored.length; i++) {
      if (booksStored[i].website === website) {
        booksStored.splice(i, 1);
      }
    }

    localStorage.setItem("books", JSON.stringify(booksStored));
  }
}

// UI Class: Handles UI Tasks
class UI {
  static displayBooks() {
    const books = Storage.getBooks();
    console.log(books);

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    // Get the table row
    const row = document.querySelector("#book-list");
    let newBook = document.createElement("tr");

    let newBookDetails = `
      <th>${book.priority}</th>
      <th>${book.title}</th>
      <th>${book.website}</th>
      <th><a href='#' class='btn btn-danger btn-sm delete'>X</a></th>
    `;

    newBook.innerHTML = newBookDetails;
    row.appendChild(newBook);
  }

  static removeBook(el) {
    console.log(el);
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className}`;
    const text = document.createTextNode(message);
    alertDiv.appendChild(text);

    // Remove after 5 seconds
    document
      .querySelector(".container")
      .insertAdjacentElement("afterend", alertDiv);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 5000);
  }

  static validate(priority, title, website) {
    if (priority === "" || title === "" || website === "") {
      UI.showAlert("Please fill out all forms", "danger");
      return;
    } else {
      UI.showAlert("Your book was successfully added!", "success");
    }
  }

  static clearForms(priority, title, website) {
    document.querySelector("#priority").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#website").value = "";
  }
}

// Get input values

// Event: Display Books;
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add Book
const addBookButton = document.querySelector("#book-form");
addBookButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const priority = document.querySelector("#priority").value;
  const title = document.querySelector("#title").value;
  const website = document.querySelector("#website").value;
  let newWebsite = new Website(priority, title, website);

  // Validate
  UI.validate(priority, title, website);

  // Add book
  UI.addBookToList(newWebsite);

  //Add website to localStorage
  Storage.addBook(newWebsite);

  // Clear forms
  UI.clearForms(priority, title, website);
});

// Remove Book
const bookList = document.querySelector("#book-list");
bookList.addEventListener("click", (e) => {
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.removeBook(e.target);
  UI.showAlert("You book was successfully removed!", "success");
});
