let swedishBtn;
let englishBtn;
let swedishText;
let englishText;

const grepElements = () => {
  swedishBtn = document.querySelector(".btn-swedish");
  englishBtn = document.querySelector(".btn-english");
  swedishText = document.getElementById('swedish')
  englishText = document.getElementById('english')
};

const addListeners = () => {

  swedishBtn.addEventListener('click', () => {
    console.log('clicked swedish button')
    swedishText.style.display = "block";
    englishText.style.display = "none";
  })

  englishBtn.addEventListener('click', () => {
    console.log('clicked english button')
    englishText.style.display = "block";
    swedishText.style.display = "none";
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
