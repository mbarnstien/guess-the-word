const letters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const circle = function (word) {
    const circleSymbol = [];
    for (const letter of word) { 
        console.log(letter);
        circleSymbol.push("●");
    }   
    inProgress.innerText = circleSymbol.join("");
};

circle(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = inputLetter.value;
    console.log(guessedLetter);
    inputLetter.value = "";
});