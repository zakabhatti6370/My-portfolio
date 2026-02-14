// === Blog Page Pagination ===
const showcaseGrid = document.getElementById("showcase-grid");
const cards = showcaseGrid ? showcaseGrid.querySelectorAll(".showcase-card") : [];
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentPage = 0;
const cardsPerPage = 8;

function showPage(page) {
    cards.forEach((card, index) => {
        card.style.display =
            index >= page * cardsPerPage && index < (page + 1) * cardsPerPage
                ? "block"
                : "none";
    });
}

if (cards.length > 0) {
    showPage(currentPage);

    nextBtn?.addEventListener("click", () => {
        if ((currentPage + 1) * cardsPerPage < cards.length) {
            currentPage++;
            showPage(currentPage);
        }
    });

    prevBtn?.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });
}
