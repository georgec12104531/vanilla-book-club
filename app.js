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
      <th><div>X</div></th>
    `;

    newBook.innerHTML = newBookDetails;
    row.appendChild(newBook);
  }
}

// Event: Display Books;
document.addEventListener("DOMContentLoaded", UI.displayBooks);


const button = document.querySelector('#click')
button.addEventListener('click', () => alert('I was clicked!'))