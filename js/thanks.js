// Några variabler och konstanter deklareras globalt
// för att kunna nå dem genom hela filen.
let ARTICLE;
let formData;

const grepElements = (name, url = window.location.href) => {
  ARTICLE = document.getElementById("thanks");
};

// Funktionen hämtar all data från formuläret.
const getFormData = () => {
  const firstName = getParameterByName('firstName')
  const lastName = getParameterByName('lastName')
  const heading = getParameterByName('heading')
  const description = getParameterByName('description')
  const email = getParameterByName('email')
  const phone = getParameterByName('phone')
  const type = getParameterByName('type')
  const contact = getParameterByName('contact')

  // Skapar ett objekt av formData så att det är lättare att hålla reda på det.
  formData = { firstName, lastName, heading, description, email, phone, type, contact }
}

// En funktion som hämtar innehållet i efterfrågat form-element.
const getParameterByName = (name) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Skriv ut den inmatade informationen på thanks-sidan.
const printInformation = () => {
  ARTICLE.innerHTML = `
  <h3>Din information</h3>
  <ul>
    <li><span>Namn:</span> ${formData.firstName} ${formData.lastName}</li>
    <li><span>Rubrik:</span> ${formData.heading}</li>
    <li><span>Beskrivning:</span> ${formData.description}</li>
    <li><span>E-post:</span> ${formData.email}</li>
    <li><span>Telefon:</span> ${formData.phone}</li>
    <li><span>Ärendetyp:</span> ${formData.type}</li>
    <li><span>Kontaktform:</span> ${formData.contact}</li>
  </ul>
  <p>Vi återkommer med svar så snart vi kan.</p>
  `
}

// Det här är main-funktionen
const main = () => {
  removeEventListener("load", main);

  grepElements();
  getFormData()

  printInformation();
};

// Eftersom jag använder funktioner som arrowfunctions
// med const före så måste jag köra denna rad efter
// deklarationen av const main.
addEventListener("load", main);
