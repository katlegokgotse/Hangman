
const input = require("sync-input");  // to read user input

let wins = 0;  // number of wins
let losses = 0;  // number of losses

function playGame() {
    function getRandomElement(array) {
        let index = Math.floor(Math.random() * array.length);
        return array[index];
    }
    const words = ['python', 'java', 'swift', 'javascript'];
    let livesCount = 8;

    const chosenWord = getRandomElement(words);
    let guessedWord = '-'.repeat(chosenWord.length);
    let guessedLetters = [];

    while (livesCount > 0) {
        console.log();
        console.log(guessedWord);

        if (guessedWord == chosenWord) {
            break;
        }

        const newLetter = input('Input a letter: ');

        if (newLetter.length > 1 || newLetter.length == 0) {
            console.log("Please, input a single letter");
            continue;
        } else if ((!/[a-z]/.test(newLetter))) {
            console.log("Please, enter a lowercase letter from the English alphabet");
            continue;
        } else if (guessedLetters.includes(newLetter)) {
            console.log("You've already guessed this letter");
            continue;
        } else {
            guessedLetters.push(newLetter);
            if (chosenWord.includes(newLetter)) {
                for (index = 0; index < chosenWord.length; index++) {
                    if (chosenWord[index] === newLetter) {
                        guessedWord = guessedWord.slice(0, index) + newLetter + guessedWord.slice(index + 1);
                    }
                }
            } else {
                console.log("That letter doesn't appear in the word");
                livesCount -= 1;
            }
        }
    }

    if (livesCount > 0) {
        console.log(`You guessed the word ${chosenWord}!`);
        console.log('You survived!');
        wins++;
    } else {
        console.log();
        console.log('You lost!');
        losses++
    }
    showMenu();  // show the menu again after the game is finished
}

function showScoreboard() {
    console.log(`You won: ${wins} times`);
    console.log(`You lost: ${losses} times`);

    showMenu();  // show the menu again after the scoreboard is displayed
}

function showMenu() {
    // prompt the user to enter a command
    console.log('H A N G M A N');
    let userChoice = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
        if (userChoice === "play") {
            playGame();
        } else if (userChoice === "results") {
            showScoreboard();
        } else if (userChoice === "exit") {
            return; // close the readline interface and exit the program
        } else {
            // show the prompt again if the input is invalid
            console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
            showMenu();
        }
    }


showMenu();