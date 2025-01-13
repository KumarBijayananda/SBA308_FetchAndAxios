import * as gameFunc from "./gameFunc.js";
import * as scores from "./scores.js";

const guessForm = document.getElementById("guessForm");
guessForm.autocomplete = "off";
const guessButton = document.getElementById("guessButton");
const clearButton = document.getElementById("clear");
const resultMessage = document.getElementById("resultMessage");
const scoreDiv = document.getElementById("score");
const hints = document.getElementById("hints");
const synButton = document.getElementById("synButton");
const antButton = document.getElementById("antButton");
const synonym = document.getElementById("synonym");
const antonym = document.getElementById("antonym");
const getLetterButton = document.getElementById("getLetterButton");
const getLetter = document.getElementById("getLetter");
const startButton = document.getElementById("startButton");
const gameContainer = document.querySelector(".gameContainer");
const startPage = document.getElementById("startPage");
const highScores = document.getElementById("highScores");
const restartButton = document.getElementById("restartButton");

let wordToGuess = "";
let synNum = 0;
let antNum = 0;
let synArray = [];
let antArray = [];
let score = 100;

scores.getRecord();

export async function getGoodWord() {
  guessForm.innerHTML = ""; //clear existing elements in guessForm
  synonym.innerHTML = "";
  antonym.innerHTML = "";
  getLetter.innerHTML = "";
  antButton.disabled = false;
  synButton.disabled = false;
  antNum = 0;
  synNum = 0;
  synArray = [];
  antArray = [];
  await getRandomWord();
  //   await getSynonyms();
  displayTiles();
  scoreDiv.textContent = "Score : " + score;
}

async function getRandomWord() {
  try {
    //get method to get a random word from api
    const response = await axios.get(
      "https://random-word-api.vercel.app/api?words=1&length=4"
    );
    const randomWord = response.data;
    wordToGuess = randomWord.toString().toUpperCase(); //changing the response object to upper case string
    console.log("response from getRandom word: " + wordToGuess);
  } catch (error) {
    console.log("Error from getRandomWord: " + error);
  }
  getSynonyms(wordToGuess);
}

function displayTiles() {
  //func to get a random word and creating empty tiles for user to enter

  console.log("Word to Guess:" + wordToGuess);

  //looping through the word length to create same number of empty tiles
  for (let i = 0; i < wordToGuess.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.className = "tile";
    input.id = i;
    input.dataset.index = i;
    guessForm.appendChild(input);

    //adding eventListener to input field and moving the focus to next form element on tab press
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();
      //   const nodeList = document.querySelectorAll(".tile"); //getting node list

      let nextIndex = parseInt(input.id, 10) + 1;
      if (document.getElementById(nextIndex)) {
        while (document.getElementById(nextIndex)) {
          if (!document.getElementById(nextIndex).disabled) {
            document.getElementById(nextIndex).focus();
            break;
          } else nextIndex++;
        }
      } else guessButton.focus();
    });

    input.addEventListener("keydown", (event) => {
      const currentIndex = parseInt(input.dataset.index, 10);

      if (event.key === "ArrowLeft") {
        const prevInput = guessForm.querySelector(
          `input[data-index="${currentIndex - 1}"]`
        );
        if (prevInput) {
          prevInput.focus();
        }
        event.preventDefault(); // Prevent cursor movement inside input
      } else if (event.key === "ArrowRight") {
        const nextInput = guessForm.querySelector(
          `input[data-index="${currentIndex + 1}"]`
        );
        if (nextInput) {
          nextInput.focus();
        }
        event.preventDefault(); // Prevent cursor movement inside input
      } else if (event.key === "Backspace") {
        if (input.value !== "") {
          input.value = ""; // Clear current tile
        } else {
          const prevInput = guessForm.querySelector(
            `input[data-index="${currentIndex - 1}"]`
          );
          if (prevInput) {
            prevInput.focus();
          }
        }
        event.preventDefault(); // Prevent default backspace behavior
      }
    });

    guessForm.appendChild(input);
  }
  gameFunc.focus();
}

clearButton.addEventListener("click", gameFunc.clear);

guessButton.addEventListener("click", () => {
  const userLetters = []; //array to hold letters from input value
  const nodeList = guessForm.querySelectorAll(".tile"); //getting node list
  nodeList.forEach((input) => {
    //extracting values from input node list
    userLetters.push(input.value);
  });
  const userWord = userLetters.join(""); //joining the letter into word
  resultMessage.innerHTML = "";
  //checking if the words match

  if (gameFunc.validate(userWord, wordToGuess)) {
    score = score + 100;
    scoreDiv.textContent = "Score : " + score;
  }
  gameFunc.focus();
});

synButton.addEventListener("click", () => {
  if (synArray[synNum]) {
    synonym.append(synArray[synNum] + ", ");
    score = score - 20;
    scoreDiv.textContent = "Score : " + score;
  } else {
    synonym.append("Sorry, no synonyms available!");
    synButton.disabled = true;
  }
  synNum++;
});

antButton.addEventListener("click", () => {
  if (antArray[antNum]) {
    antonym.append(antArray[antNum] + ", ");
    score = score - 20;
    scoreDiv.textContent = "Score : " + score;
  } else {
    antonym.append("Sorry, no antonyms available!");
    antButton.disabled = true;
  }
  antNum++;
});

getLetterButton.addEventListener("click", () => {
  score = score - 10;
  scoreDiv.textContent = "Score : " + score;

  getLetter.append(wordToGuess[Math.floor(Math.random() * wordToGuess.length)]);
});

startButton.addEventListener("click", () => {
  startPage.style.display = "none";
  gameContainer.style.display = "block";
  highScores.style.display = "block";
  restartButton.disabled = true;
  getGoodWord();
  timer();
});

restartButton.addEventListener("click", () => {
  startPage.style.display = "none";
  gameContainer.style.display = "block";
  highScores.style.display = "block";
  getGoodWord();
  timer();
});

async function getSynonyms(wordToGuess) {
  try {
    const response = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${wordToGuess}?key=6db2ca72-cae2-4680-94b5-1a78e3ff0092`
    );
    const synResponse = response.data;

    // console.log(
    //   "https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/" +
    //     wordToGuess +
    //     "?key=6db2ca72-cae2-4680-94b5-1a78e3ff0092"
    // );
    console.log("word to guess" + wordToGuess);
    console.log("response from 2nd synonym:" + synResponse[0].meta.syns.flat());
    synArray = synResponse[0].meta.syns.flat();
    antArray = synResponse[0].meta.ants.flat();
    // console.log(synArray[synNum]);
    // console.log(antArray);
  } catch (error) {
    console.log("Error from getSynonym:" + error);
  }
}

function getDefinition() {}

function timer() {
  // Timer duration in seconds (2 minutes)
  const timerDuration = 30;

  const timerDisplay = document.getElementById("timer");

  let timeRemaining = timerDuration;

  // Update the timer display every second
  const timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;

      // Format time as MM:SS
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;

      timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      clearInterval(timerInterval);

      // Disable the button when the timer ends
      scores.checkHighScore(score);
      guessButton.disabled = true;
      synButton.disabled = true;
      antButton.disabled = true;
      getLetterButton.disabled = true;
      restartButton.disabled = false;
    }
  }, 1000);
}

// scores.putRecord();
//ff808181932badb601945c4de9c41d71
