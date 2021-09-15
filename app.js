let errors_text = document.querySelector(".curr_Errors");
let timer_text = document.querySelector(".curr_Timer");
let accuaracy_text = document.querySelector(".curr_Accuaracy");
let charTyped_text = document.querySelector(".curr_Char_Typed");
let errors = document.querySelector(".errors");
let timer = document.querySelector(".timer");
let accuaracy = document.querySelector(".accuaracy");
let CharTyped = document.querySelector(".charTyped");
let text = document.querySelector(".text");
const textarea = document.querySelector("textarea");
const btn = document.querySelector(".btn");

let timeLeft = 60;
let totalErr = 0;
let errors_num = 0;
let char_typed = 0;
let time = null;
let quoteNum = Math.floor(Math.random() * 6);
let curr_Quote = "";

let qoutesArr = [
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
];

function updateQoute() {
  text.textContent = null;
  curr_Quote = qoutesArr[quoteNum];

  curr_Quote.split("").forEach((char) => {
    let charSpan = document.createElement("span");
    charSpan.innerText = char;
    text.appendChild(charSpan);
  });
  quoteNum = Math.floor(Math.random() * 6);
}

function proccesCurrText() {
  let curr_textarea = textarea.value;
  let curr_textareaArr = curr_textarea.split("");

  char_typed++;
  errors = 0;

  let spanArr = text.querySelectorAll("span");
  spanArr.forEach((char, index) => {
    let typedChar = curr_textareaArr[index];
    if (typedChar == null) {
      char.classList.remove("incorrect_char");
      char.classList.remove("correct_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      errors++;
    }
  });

  errors_text.textContent = totalErr + errors;

  let correctCharacters = char_typed - (totalErr + errors);
  let accuaracyVal = (correctCharacters / char_typed) * 100;

  accuaracy_text.textContent = Math.round(accuaracyVal);
  charTyped_text.textContent = char_typed;

  if (curr_textarea.length == curr_Quote.length) {
    updateQoute();
    totalErr += errors;
    textarea.value = "";
  }
}

function startGame() {
  resetValue();
  updateQoute();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValue() {
  totalErr = 0;
  errors = 0;
  timeLeft = 60;
  accuaracy = 0;
  char_typed = 0;
  quoteNum = Math.floor(Math.random() * 6);
  textarea.disabled = false;

  textarea.value = "";
  text.textContent = "Click on the area below to start the game";
  accuaracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  errors_text.textContent = 0;
  btn.style.display = "none";
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timer_text.textContent = timeLeft + "s";
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  textarea.disabled = true;
  text.textContent = "Click on restart to start a new game.";
  btn.style.display = "block";
  CharTyped.style.display = "block";
}
