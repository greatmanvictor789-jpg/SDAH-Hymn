document.querySelectorAll(".hymn-row").forEach(function (row, index) {
    row.querySelector(".hymn-number").textContent = index + 1;
});

var rangeContainer = document.querySelector(".hymn-ranges");
var rangeToggle = rangeContainer.querySelector(".range-more");

rangeToggle.addEventListener("click", function () {
    var isExpanded = rangeContainer.classList.toggle("is-expanded");
    rangeContainer.classList.toggle("is-collapsed", !isExpanded);
    rangeToggle.setAttribute("aria-expanded", isExpanded);
    rangeToggle.textContent = isExpanded ? "Less" : "More";
});

var pageControls = document.querySelector(".number-controls");
var pageNumbers = pageControls.querySelector(".number-pages");
var pageArrows = pageControls.querySelectorAll(".page-arrow");
var totalPages = 695;
var visiblePageCount = 5;
var firstVisiblePage = 1;
var selectedPage = 1;

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
        renderPageButtons();
    });

    return button;
}

function createPageEllipsis(nextPage) {
    var button = document.createElement("button");
    button.className = "num-but";
    button.type = "button";
    button.textContent = "...";
    button.setAttribute("aria-label", "Show pages from " + nextPage);
    button.addEventListener("click", function () {
        firstVisiblePage = nextPage;
        renderPageButtons();
    });

    return button;
}

function renderPageButtons() {
    pageNumbers.replaceChildren();

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
            pageNumbers.appendChild(createPageEllipsis(previousPage + 1));
        }

        pageNumbers.appendChild(createPageButton(currentPage));
    }
}

pageArrows[0].addEventListener("click", function () {
    firstVisiblePage = Math.max(1, firstVisiblePage - 1);
    renderPageButtons();
});

pageArrows[1].addEventListener("click", function () {
    firstVisiblePage = Math.min(
        totalPages - visiblePageCount + 1,
        firstVisiblePage + 1
    );
    renderPageButtons();
});

renderPageButtons();

var menuToggle = document.querySelector(".menu-toggle");
var menuLinksContainer = document.querySelector("#site-menu");
var menuLinks = menuLinksContainer.querySelectorAll("a");

function closeMenu() {
    menuToggle.classList.remove("is-open");
    menuLinksContainer.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.classList.toggle("is-open");
    menuLinksContainer.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});