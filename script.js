var numbersContainer = document.querySelector(".numbers");
var hymnCount = document.querySelectorAll(".hymn .text:nth-child(2) > div").length - 1;

for (var number = 1; number <= hymnCount; number++) {
    var numberRow = document.createElement("div");
    numberRow.textContent = number;
    numbersContainer.appendChild(numberRow);
}