const booksContainer = document.getElementById("books-container")

async function onFetchBooksClick() {
    const response = await fetch("http://localhost:3000/books")
    const bookList = await response.json()

    booksContainer.innerHTML = bookList.map(
        book => `<div class="bg-light rounded mt-5">
            <h3>${book.title}</h3>
            <p>${book.genreId}</p>
        </div>`
    ).join("")
}

let lastCreatedItem = null

async function onCreateBookClick() {
    const testBook = { title: "Test", genreId: 1 }
    const response = await fetch("http://localhost:3000/books", {
        method: "POST", // create
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(testBook) 
    })
    
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
}

async function onDeleteBookClick() {
    if(lastCreatedItem === null) {
        console.log("No item created yet to delete")
        return
    }
    await fetch("http://localhost:3000/books/${lastCreatedItem.id}", {
        method: "DELETE", 
    });

    lastCreatedItem = null; //Reset after deletion
}

/***** GENRES *****/

const genresContainer = document.getElementById("genres-container")
const genreIdTextbox = document.getElementById("genre-id-textbox")

async function onFetchGenresClick() {
    const response = await fetch("http://localhost:3000/genres")
    const genreList = await response.json()

    genresContainer.innerHTML = genreList.map(
        genre => `<div class="bg-light rounded mt-5">
            <h3>${genre.title}</h3>
            <p>id: ${genre.id}</p>
        </div>`
    ).join("")
}

async function onCreateGenreClick() {
    const newGenre = { title: "New Genre" }
    const response = await fetch("http://localhost:3000/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGenre)
    });

    const createdGenre = await response.json();
    console.log("Created Genre:", createdGenre);
    
}

async function onDeleteGenreClick() {
    const idToDelete = genreIdTextbox.value;
    if (!idToDelete) {
        console.log("Enter a genre ID to delete");
        return;
    }

    await fetch(`http://localhost:3000/genres/${idToDelete}`, {
        method: "DELETE"
    });

    genreIdTextbox.value = "";
}

/***** Reviews *****/

const reviewsContainer = document.getElementById("reviews-container")
const reviewsIdTextbox = document.getElementById("reviews-id-textbox")

async function onFetchReviewsClick() {
    const response = await fetch("http://localhost:3000/reviews");
    const reviewsList = await response.json();

    console.log("Fetched Reviews:", reviewsList); // Debugging log

    reviewsContainer.innerHTML = reviewsList.map(review => `
        <div class="card p-3 shadow-sm mt-3">
            <h4>⭐ ${review.stars}/5</h4>
            <p><strong>${review.author} says:</strong> ${review.text}</p>
            <p><small>Book ID: ${review.bookId}</small></p>
        </div>
    `).join("");
}

async function onCreateReviewClick() {
    const newReview = { 
        title: "New Review",
        content: "This is a test review.",
        rating: 5,
        bookId: 1
     };

    const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
    });

    const createdReview = await response.json();
    console.log("Created Review:", createdReview);
    
}

async function onDeleteReviewClick() {
    const idToDelete = reviewIdTextbox.value;
    if (!idToDelete) {
        console.log("Enter a review ID to delete");
        return;
    }

    await fetch(`http://localhost:3000/reviews/${idToDelete}`, {
        method: "DELETE"
    });

    reviewIdTextbox.value = "";
}