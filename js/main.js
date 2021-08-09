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

  swedishBtn.addEventListener('click', () => {
    console.log('clicked swedish button')
    swedishText.style.display = "block";
    englishText.style.display = "none";
    swedishHeader.style.display = "block";
    englishHeader.style.display = "none";
  })

  englishBtn.addEventListener('click', () => {
    console.log('clicked english button')
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

  // time.textContent = `Time: ${timeleft}`;
};

addEventListener("load", main);
