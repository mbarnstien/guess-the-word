const letters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
    const guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
    messages.innerText = "";
    
    const correctGuess = validateInput(guess);

    if (correctGuess) {
        makeGuess(guess);
    }
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = `Please enter a letter`;
    } else if (input.length > 1) {
        messages.innerText = `Please enter only 1 letter at a time`;
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = `Symbols or numbers are not a part of this word!`;
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messages.innerText = `You already guessed that! Try again.`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};