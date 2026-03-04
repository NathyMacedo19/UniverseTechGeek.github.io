let selectedRating = null;
const ratingContainer = document.getElementById("ratingButtons");

// Criar botões 0 a 10
for (let i = 0; i <= 10; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("rating-btn");

    btn.onclick = function() {
        selectedRating = i;

        document.querySelectorAll(".rating-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
    };

    ratingContainer.appendChild(btn);
}

function submitReview() {
    const text = document.getElementById("reviewText").value.trim();

    if (selectedRating === null || text === "") {
        alert("Selecione uma nota e escreva uma review.");
        return;
    }

    const review = document.createElement("div");
    review.classList.add("review-card");

    review.innerHTML = `
        <div class="review-note">${selectedRating}/10</div>
        <p class="text-white mt-4">${text}</p>
    `;

    document.getElementById("reviews").prepend(review);

    // Reset
    selectedRating = null;
    document.querySelectorAll(".rating-btn")
        .forEach(b => b.classList.remove("active"));
    document.getElementById("reviewText").value = "";
}
