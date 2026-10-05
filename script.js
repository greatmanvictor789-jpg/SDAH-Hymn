var numbersContainer = document.querySelector(".numbers");
var hymnCount = document.querySelectorAll(".hymn .text:nth-child(2) > div").length - 1;

for (var number = 1; number <= hymnCount; number++) {
    var numberRow = document.createElement("div");
    numberRow.textContent = number;
    numbersContainer.appendChild(numberRow);
}

var pageControls = document.querySelector(".number-controls");
var pageNumbers = pageControls.querySelector(".number-pages");
var pageArrows = pageControls.querySelectorAll(".page-arrow");
var totalPages = 695;
var visiblePageCount = 5;
var firstVisiblePage = 1;
var selectedPage = 1;
var expandedPages = false;

function createPageButton(page) {
    var button = document.createElement("button");
    button.className = "num-but";
    button.type = "button";
    button.textContent = page;
    button.setAttribute("aria-label", "Page " + page);

    if (page === selectedPage) {
        button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", function () {
        selectedPage = page;
        firstVisiblePage = Math.min(
            Math.max(1, page - Math.floor(visiblePageCount / 2)),
            totalPages - visiblePageCount + 1
        );
        expandedPages = false;
        renderPageButtons();
    });

    return button;
}

function renderPageButtons() {
    pageNumbers.replaceChildren();

    if (expandedPages) {
        for (var page = 1; page <= totalPages; page++) {
            pageNumbers.appendChild(createPageButton(page));
        }
        return;
    }

    var lastVisiblePage = Math.min(firstVisiblePage + visiblePageCount - 1, totalPages);
    var collapsedPages = [];

    for (var visiblePage = firstVisiblePage; visiblePage <= lastVisiblePage; visiblePage++) {
        collapsedPages.push(visiblePage);
    }

    if (!collapsedPages.includes(70)) {
        collapsedPages.push(70);
    }
    if (!collapsedPages.includes(totalPages)) {
        collapsedPages.push(totalPages);
    }
    collapsedPages.sort(function (left, right) {
        return left - right;
    });

    for (var pageIndex = 0; pageIndex < collapsedPages.length; pageIndex++) {
        var currentPage = collapsedPages[pageIndex];
        var previousPage = collapsedPages[pageIndex - 1];

        if (pageIndex > 0 && currentPage - previousPage > 1) {
            var ellipsis = document.createElement("button");
            ellipsis.className = "num-but";
            ellipsis.type = "button";
            ellipsis.textContent = "...";
            ellipsis.setAttribute("aria-label", "Show all pages");
            ellipsis.addEventListener("click", function () {
                expandedPages = true;
                renderPageButtons();
            });
            pageNumbers.appendChild(ellipsis);
        }

        pageNumbers.appendChild(createPageButton(currentPage));
    }
}

pageArrows[0].addEventListener("click", function () {
    if (expandedPages) {
        pageNumbers.scrollBy({ left: -pageNumbers.clientWidth * 0.75, behavior: "smooth" });
        return;
    }

    firstVisiblePage = Math.max(1, firstVisiblePage - 1);
    renderPageButtons();
});

pageArrows[1].addEventListener("click", function () {
    if (expandedPages) {
        pageNumbers.scrollBy({ left: pageNumbers.clientWidth * 0.75, behavior: "smooth" });
        return;
    }

    firstVisiblePage = Math.min(
        totalPages - visiblePageCount + 1,
        firstVisiblePage + 1
    );
    renderPageButtons();
});

renderPageButtons();