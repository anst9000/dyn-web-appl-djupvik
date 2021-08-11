import { fetchWeatherForecast } from "./fetch.js";

// Några variabler och konstanter deklareras globalt
// för att kunna nå dem genom hela filen.
let WX_WIDGET;
let WX_TABLE;
let SELECT_WX;
let SHOW_WX;
let WEATHER_FORECAST;
let weatherForecast = [];
let tableToday;
let tableTomorrow;
let todaysDate = null
let tomorrowsDate = null
let weatherLeftForToday = true;


const CHECKMARK = `
  <td>
    <span class="checkmark">
      <div class="stem"></div>
      <div class="kick"></div>
    </span>
  </td>`;
const TABLEDATA = `<td></td>`;

const grepElements = () => {
  WX_WIDGET = document.getElementById("smhi-widget");
  SELECT_WX = document.getElementById("select-weather");
  SHOW_WX = document.getElementById("show-weather-forecast");
  WEATHER_FORECAST = document.getElementById('weather-forecast')
};

const addListeners = () => {
  SELECT_WX.addEventListener('change', showForecast)
}

const getSpecificWx = (post) => {
  let output = null
  const time = post.split(' ')[1];

  weatherForecast.map((wxInfo) => {
    if (wxInfo.forecastTime === time ) {
      output = wxInfo;
    }
  });

  return output
}

const showForecast = () => {
  const value = SELECT_WX.options[SELECT_WX.selectedIndex].value;
  const {
    forecastDate, forecastTime, time, timeOfDay, wxSymbol, temp, windDir, windSpeed,
    gustSpeed, visibility, precipitationCategory, precipitaionMeanIntensity, wxSymbolImg
   } = getSpecificWx(value)

  SHOW_WX.innerHTML = `
    <h4><span>${forecastDate} ${forecastTime}</span></h4>
    <p><span>Temp</span> ${Math.round(temp)}&#176;C</p>
    <p><span>Vind</span> ${Math.round(windSpeed)} m/s ${windDir}</p>
    <p><img src="../assets/images/wxIcons/png/${wxSymbolImg}" width="200" height="200" alt="Vädersymbol" /></p>
  `

{/* <td headers="Prognos för">${forecastDate} ${forecastTime}</td>
<td headers="Temperature">${Math.round(temp)}&#176;C</td>
<td headers="Wind">${Math.round(windSpeed)} m/s ${windDir}</td>
<td headers="Symbol"><img src="../assets/images/wxIcons/png/${wxSymbolImg}" width="200" height="200" alt="Vädersymbol" /></td> */}

}

// Det här är en asynkron funktion som vi vill vänta in för att
// få tillbaka resultaten från fetch innan programmet kör vidare.
const getWeatherForecast = async () => {
  // Jag använder async - await eftersom det blir mer lättläst i koden.
  weatherForecast = await fetchWeatherForecast();

    // Jag använder funktionen map för att loopa igenom hela listan.
  weatherForecast.map((wxInfo) => {
    // console.log(wxInfo)
    fillWeatherSelect(wxInfo);
    fillWeatherTables(wxInfo)
  });
};

const getTomorrowsDate = () => {
  // Creating the date instance
  let d = new Date();

  // Adding one date to the present date
  d.setDate(d.getDate() + 1);
  let year = d.getFullYear()
  let month = String(d.getMonth() + 1)
  let day = String(d.getDate())

  // Adding leading 0 if the day or month
  // is one digit value
  month = month.length == 1 ?
      month.padStart('2', '0') : month;

  day = day.length == 1 ?
      day.padStart('2', '0') : day;

  return `${year}-${month}-${day}`
}

const preloadTableStructure = () => {
  let h4 = createElement('h4', 'Vädertabeller för idag och i morgon')
  WX_WIDGET.appendChild(h4)

  let tableToday = document.createElement('table')
  tableToday.classList.add("weather-table")
  tableToday.setAttribute('id', 'today')

  const todaysDate = new Date().toLocaleString().split(',')[0]
  const tomorrowsDate = getTomorrowsDate()

  tableToday.innerHTML = `
      <caption>Idag - ${todaysDate}</caption>
      <thead>
        <tr>
          <th>Kl.</th>
          <th>Temp.</th>
          <th>Vind</th>
          <th>Himmel</th>
        </tr>
      </thead>
  `
  WX_WIDGET.appendChild(tableToday)

  let tableTomorrow = document.createElement('table')
  tableTomorrow.classList.add("weather-table")
  tableTomorrow.setAttribute('id', 'tomorrow')

  tableTomorrow.innerHTML = `
      <caption>Imorgon - ${tomorrowsDate}</caption>
      <thead>
        <tr>
          <th>Kl.</th>
          <th>Temp.</th>
          <th>Vind</th>
          <th>Himmel</th>
        </tr>
      </thead>
  `
  WX_WIDGET.appendChild(tableTomorrow)
}

// Hit kommer varje wx-info parseat och klart, så det är bara
// att hämta varje attribut från objektet wxInfo direkt (wxInfo.<ATTRIBUT>)
const fillWeatherSelect = (wxInfo) => {
  let option = document.createElement("option");
  const {
    forecastDate, forecastTime, time, timeOfDay, wxSymbol, temp, windDir, windSpeed, gustSpeed,
    windDirValue, visibility, precipitationCategory, precipitaionMeanIntensity, wxSymbolImg
   } = wxInfo

  option.innerHTML = `
    <option value="${forecastDate} ${forecastTime}">${forecastDate} ${forecastTime}</option>
  `

  SELECT_WX.appendChild(option);
};


const fillWeatherTables = (wxInfo) => {
  let tbody

  const {
    forecastDate, forecastTime, time, timeOfDay, wxSymbol, temp, windDir, windSpeed, gustSpeed,
    windDirValue, visibility, precipitationCategory, precipitaionMeanIntensity, wxSymbolImg
  } = wxInfo

  if (
    todaysDate &&
    tomorrowsDate &&
    forecastDate !== todaysDate &&
    forecastDate !== tomorrowsDate
  ) {
    return;
  }

  // Kolla om det finns några prognoser kvar att kolla idag
  if (forecastTime >= "18.00" && weatherLeftForToday) {
    weatherLeftForToday = false;
    todaysDate = forecastDate;
    return;
  }

  if (forecastTime === "06:00" || forecastTime === "12:00" || forecastTime === "18:00" ) {
    tableToday = document.getElementById('today')
    tableTomorrow = document.getElementById('tomorrow')

    tbody = document.createElement("tbody");


    if (todaysDate === null) {
      todaysDate = forecastDate;
    }

    if (tomorrowsDate === null && todaysDate !== forecastDate) {
      tomorrowsDate = forecastDate
    }

    tbody.innerHTML += `
        <tr>
          <td>${forecastTime}</td>
          <td>${Math.round(temp)}&#176;C</td>
          <td>
            <img
              src="../assets/images/wxIcons/wind-direction.png"
              width="207"
              height="244"
              alt="Pil som visar vindriktningen ${windDir}"
              style="transform: rotate(${windDirValue}deg);"
            />
            <span class="wind-speed">(${Math.round(windSpeed)})</span>
          </td>
          <td>${wxSymbol}</td>
        </tr>
    `
  } else {
    return;
  }

  if (wxInfo.forecastDate === todaysDate) {
    tableToday.appendChild(tbody);
  } else {
    tableTomorrow.appendChild(tbody);
  }
}

const writeTimeNow = () => {
  const weatherHeader = document.getElementById('weather-forecast-header');
  const time = new Date().toTimeString().slice(0,5)
  weatherHeader.innerText = `Väder - klockan är nu: ${time}`
}

const createElement = (element, text) => {
  let el = document.createElement(element)
  el.textContent = text;

  return el;
}

// Det här är main-funktionen
const main = () => {
  removeEventListener("load", main);
  grepElements();
  addListeners();

  preloadTableStructure();

  getWeatherForecast();

  writeTimeNow();
};

// Eftersom jag använder funktioner som arrowfunctions
// med const före så måste jag köra denna rad efter
// deklarationen av const main.
addEventListener("load", main);
