import { getGoodWord } from "./app.js";

export function clear() {
  const nodeList = guessForm.querySelectorAll(".tile"); //getting node list
  nodeList.forEach((input) => {
    if (!input.disabled) input.value = "";
  });
  //   guessForm.querySelector('input[data-index="0"]').focus(); //moving the focus to first input field
  focus();
}

export function focus() {
  const nodeList = document.querySelectorAll(".tile"); //getting node list
  for (let node of nodeList) {
    if (!node.disabled) {
      node.focus(); // Set focus to the first non-disabled input
      break; // Stop after focusing the first eligible input
    }
  }
}

export function validate(userWord, wordToGuess) {
  let isCorrect = false;
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === userWord[i]) {
      document.getElementById(i).disabled = true;
    }
  }

  if (userWord === wordToGuess) {
    resultMessage.append("You got it!!");
    isCorrect = true;
    getGoodWord();
  } else {
    resultMessage.append("Incorrect try again!");
    clear();
  }
  return isCorrect;
}
