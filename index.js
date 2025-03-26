const baseURL = "http://localhost:3000/books";
const bookList = document.getElementById('book-list');
const form = document.getElementById('add-book-form');
fetchBooks()
// READ (GET)
function fetchBooks() {
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {renderBooks(data)
            console.log(data)
        });
}

function renderBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Review:</strong> ${book.review}</p>
            <button onclick="deleteBook(${book.id})">Delete</button>
            <button onclick="editReview(${book.id}, '${book.review}')">Edit Review</button>
        `;
        bookList.appendChild(bookCard);
    });
}

// CREATE (POST)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        image: document.getElementById('image').value,
        review: document.getElementById('review').value,
    };
    fetch(`${baseURL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBook)
    })
    .then(res => res.json())
    .then((data) => { 
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${data.image}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p><strong>Author:</strong> ${data.author}</p>
            <p><strong>Review:</strong> ${data.review}</p>
            <button onclick="deleteBook(${data.id})">Delete</button>
            <button onclick="editReview(${data.id}, '${data.review}')">Edit Review</button>
        `;
        bookList.appendChild(bookCard);
    });

    form.reset();
});


// UPDATE (PATCH)
function editReview(id, currentReview) {
    const newReview = prompt("it's a guide unlocking your potential and discovering you path meant for you.:", currentReview);
    if (newReview) {
        fetch(`${baseURL}/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ review: newReview })
        })
        .then(() => fetchBooks());
    }
}

// Initial Fetch
 function fetchBooks() {
    fetch(baseURL)
      .then((res) => res.json())
      .then((books) => {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = ''; // Clear previous content
        books.forEach((book) => {
          const bookDiv = document.createElement('div');
          bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <img src="${book.image}" width="150" />
            <p>${book.review}</p>
            <button onclick="deleteBook(${book.id})">Delete</button>
            <hr>
          `;
          bookList.appendChild(bookDiv);
        });
      });
  }
  
  
