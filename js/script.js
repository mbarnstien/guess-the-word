const letters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circle(word);
}

getWord();

const circle = function (word) {
    const circleSymbol = [];
    for (const letter of word) { 
        console.log(letter);
        circleSymbol.push("●");
    }   
    inProgress.innerText = circleSymbol.join("");
};


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
        guessCountdown(guessedLetters);
        showLetters();
        showWord(guessedLetters);
    }
};

const showLetters = function () {
    letters.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        letters.append(li);
    }
};

const showWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if(guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●")
        }
    }
    inProgress.innerText = revealWord.join("");
    checkIfWin();
};

const guessCountdown = function (guess) {
    const wordUpper = word.toUpperCase();
    if(!wordUpper.includes(guess)) {
        messages.innerText = `This word doesn't have that letter!`;
        remainingGuesses -= 1;
    } else {
        messages.innerText = `Good job! ${guess} is in this word!`;
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `You have no guesses remaining! Boo~ The word was <span class="highlight">${word}</span>.`
        spanGuesses.innerText = `${remainingGuesses} guesses`
        startOver();
    } else if (remainingGuesses === 1) {
        spanGuesses.innerText = `${remainingGuesses} guess`
    } else {
        spanGuesses.innerText = `${remainingGuesses} guesses`
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight"> You guessed correctly! Woohoo! </p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    letters.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

playAgainButton.addEventListener("click", function (e) {
    messages.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    messages.innerText = "";
    letters.innerHTML = "";
    spanGuesses.innerText = `${remainingGuesses} guesses`;
    getWord();

    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    letters.classList.remove("hide");
    playAgainButton.classList.add("hide");
});