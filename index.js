const API_URL = "http://localhost:3005/reviews";

document.addEventListener("DOMContentLoaded", fetchReviews);
document.getElementById("review-form").addEventListener("submit", addReview);

async function fetchReviews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviews = await response.json();
        console.log("Fetched Data:", reviews); // Debugging

        if (!Array.isArray(reviews)) {
            throw new Error("Invalid response format: Not an array");
        }

        const reviewList = document.getElementById("review-list");
        reviewList.innerHTML = "";

        reviews.forEach(review => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center flex-column text-start";
            li.innerHTML = `
                <div>
                    <h5>${review.title} <span class="badge bg-success">${review.rating}/5</span></h5>
                    <p>${review.review}</p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id})">Delete</button>
            `;
            reviewList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
    }
}

async function addReview(event) {
    event.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const review = document.getElementById("book-review").value.trim();
    const rating = document.getElementById("book-rating").value.trim();

    if (!title || !review || !rating) return;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, review, rating: parseInt(rating) }),
    });

    if (response.ok) {
        document.getElementById("review-form").reset();
        fetchReviews(); // Refresh list
    }
}

async function deleteReview(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchReviews(); // Refresh list
}
