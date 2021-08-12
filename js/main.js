let swedishBtn;
let englishBtn;
let swedishHeader;
let englishHeader;
let swedishText;
let englishText;

const grepElements = () => {
  swedishBtn = document.querySelector(".btn-swedish");
  englishBtn = document.querySelector(".btn-english");
  swedishText = document.getElementById('swedish-text')
  englishText = document.getElementById('english-text')
  swedishHeader = document.getElementById('swedish-header')
  englishHeader = document.getElementById('english-header')
};

const addListeners = () => {

  // Om man har klickat på swedishBtn ska den svenska texten visas.
  swedishBtn.addEventListener('click', () => {
    swedishText.style.display = "block";
    englishText.style.display = "none";
    swedishHeader.style.display = "block";
    englishHeader.style.display = "none";
  })

  // Om man har klickat på englishBtn ska den engelska texten visas.
  englishBtn.addEventListener('click', () => {
    englishText.style.display = "block";
    swedishText.style.display = "none";
    englishHeader.style.display = "block";
    swedishHeader.style.display = "none";
  })
}

// Det här är main-funktionen
const main = () => {
  removeEventListener("load", main);
  grepElements();
  addListeners();
};

addEventListener("load", main);
