const myLibrary = [];
const libraryList = document.querySelector('#library');

function Book(name, author) {
    this.name = name;
    this.author = author;
    this.read = false; // Initialize read property
}

Book.prototype.remove = function() {
    const index = myLibrary.indexOf(this);
    if (index > -1) {
        myLibrary.splice(index, 1); // Remove book from array
    }
    showLibrary(); // Update library display
}

Book.prototype.toggleRead = function() {
    this.read = !this.read; // Toggle read status
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary() {
    // Clear the library list before displaying new entries
    libraryList.innerHTML = '';

    myLibrary.forEach(book => {
        var bookCard = document.createElement('div');
        bookCard.classList.add('card');
        
        var cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        var bookCardName = document.createElement('h3');
        bookCardName.textContent = book.name;

        var bookCardAuthor = document.createElement('h4');
        bookCardAuthor.textContent = book.author;

        // Create a checkbox for read status
        var bookCardToggleRead = document.createElement('input');
        bookCardToggleRead.type = 'checkbox';
        bookCardToggleRead.checked = book.read; // Set checkbox based on book's read status
        bookCardToggleRead.classList.add('read-checkbox');
        bookCardToggleRead.addEventListener('change', function() {
            book.toggleRead(); // Toggle read status when checkbox changes
        });

        // Create a label for the checkbox
        var readLabel = document.createElement('label');
        readLabel.classList.add('read-label');
        readLabel.textContent = 'Read';
        readLabel.prepend(bookCardToggleRead); // Prepend the checkbox to the label

        // Create a button to remove the book
        var bookCardRemove = document.createElement('button');
        bookCardRemove.textContent = 'Remove';
        bookCardRemove.addEventListener('click', function() {
            book.remove(); // Remove the book
        });

        // Append elements to the card content
        cardContent.appendChild(bookCardName);
        cardContent.appendChild(bookCardAuthor);
        cardContent.appendChild(readLabel); // Append the read checkbox label

        // Append elements to the card
        bookCard.appendChild(cardContent);
        bookCard.appendChild(bookCardRemove); // Append the remove button
        libraryList.appendChild(bookCard);
    });
}

document.querySelector('#book-entry').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get book name and author
    const name = document.querySelector('#name').value;
    const author = document.querySelector('#author').value;

    const newBook = new Book(name, author);

    addBookToLibrary(newBook);

    this.reset(); // Clear the form fields
    showLibrary(); // Call to display the updated library

    console.log(myLibrary); // Log the library to the console
});