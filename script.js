const myLibrary = []; 

function Book(title, author, pages, read) {
    // Book constructor logic
    this.id = crypto.randomUUID(); 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const addBookToLibrary = (title, author, pages, read) => {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};


const libraryContainer = document.getElementById('library');

function displayBooks() {

    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = book.id;

        card.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        `;

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.addEventListener('click', () => {
            toggleRealStatus(book.id);
        });

        card.appendChild(toggleReadButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeBook(book.id);
        });



        card.appendChild(removeButton);
        libraryContainer.appendChild(card);
    });
}

function removeBook(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    bookForm.reset();
});

function toggleRealStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

// console.log(myLibrary); 
// displayBooks();
