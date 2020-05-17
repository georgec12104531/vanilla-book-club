// Website Class
class Website {
  constructor(priority, title, website) {
    this.priority = priority;
    this.title = title;
    this.website = website;
  }
}

// UI Class: Handles UI Tasks
class UI {
  static displayBooks() {
    const books = [
      {
        priority: "high",
        title: "FreeCodeCamp Data Structures",
        website: "www.freecodecamp.com",
      },
      {
        priority: "medium",
        title: "Udemy React 2020 Course",
        website: "www.udemy.com/react-2020",
      },
    ];

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
      <th><div class='delete'>X</div></th>
    `;

    newBook.innerHTML = newBookDetails;
    row.appendChild(newBook);
  }

  static removeBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearForms(priority, title, website) {
    document.querySelector("#priority").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#website").value = "";
  }
}

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

  if (priority === "" || title === "" || website === "") {
    alert("Please fill out all forms");
    return;
  }

  // Add book
  UI.addBookToList(newWebsite);

  // Clear forms
  UI.clearForms(priority, title, website);
});

// Remove Book
const bookList = document.querySelector("#book-list");
bookList.addEventListener("click", (e) => {
  UI.removeBook(e.target);
});
