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

var hymnSidebar = document.querySelector(".hymn-neighbors");

if (hymnSidebar) {
    var hymns = [
        "Praise to the Lord",
        "All Creatures of Our God and King",
        "God Himself is With Us",
        "Praise, My Soul, the King of Heaven",
        "All My Hope on God is Founded",
        "O Worship the Lord",
        "The Lord in Zion Reigneth",
        "Praise God, From Whom All Blessings Flow",
        "Let All Things Now Living",
        "Come, Christians, Join to Sing"
    ];
    var selectedHymn = Number(new URLSearchParams(window.location.search).get("hymn")) || 1;
    var hymnNumber = Math.min(Math.max(selectedHymn, 1), hymns.length);

    function renderHymnNavigation() {
        hymnSidebar.replaceChildren();

        [hymnNumber - 1, hymnNumber, hymnNumber + 1].forEach(function (number, index) {
            var button = document.createElement("button");
            button.className = "hymn-neighbor";
            button.type = "button";
            button.disabled = number < 1 || number > hymns.length;
            button.setAttribute("aria-label", number < 1 || number > hymns.length
                ? (index === 0 ? "No previous hymn" : "No next hymn")
                : "Hymn " + number + ": " + hymns[number - 1]);

            var title = document.createElement("strong");
            title.textContent = number < 1 || number > hymns.length
                ? ""
                : "Hymn " + number + " - " + hymns[number - 1];
            button.appendChild(title);

            if (number === hymnNumber) {
                button.setAttribute("aria-current", "page");
            } else if (!button.disabled) {
                button.addEventListener("click", function () {
                    hymnNumber = number;
                    window.history.pushState(null, "", "?hymn=" + hymnNumber);
                    renderHymnNavigation();
                    renderSelectedHymn();
                });
            }

            hymnSidebar.appendChild(button);
        });
    }

    function renderSelectedHymn() {
        var hymnNumberLabel = document.querySelector(".hero .text");
        var hymnTitle = document.querySelector(".hero .title");
        var hymnCredits = document.querySelector(".hero .about");
        var lyrics = document.querySelector(".hero .verses");
        var unavailableMessage = document.querySelector(".lyrics-unavailable");
        var hasLyrics = hymnNumber === 1;

        hymnNumberLabel.textContent = "Hymn " + hymnNumber;
        hymnTitle.textContent = hymns[hymnNumber - 1];
        hymnCredits.hidden = !hasLyrics;
        lyrics.hidden = !hasLyrics;
        unavailableMessage.hidden = hasLyrics;
    }

    window.addEventListener("popstate", function () {
        var requestedHymn = Number(new URLSearchParams(window.location.search).get("hymn")) || 1;
        hymnNumber = Math.min(Math.max(requestedHymn, 1), hymns.length);
        renderHymnNavigation();
        renderSelectedHymn();
    });

    renderHymnNavigation();
    renderSelectedHymn();
}