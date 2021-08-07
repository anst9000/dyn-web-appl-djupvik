import { fetchWeatherForecast } from "./fetch.js";

// Några variabler och konstanter deklareras globalt
// för att kunna nå dem genom hela filen.
let WX_TABLE_BODY;
let SELECT_WX;
let SHOW_WX;
let weatherForecast = [];

const CHECKMARK = `
  <td>
    <span class="checkmark">
      <div class="stem"></div>
      <div class="kick"></div>
    </span>
  </td>`;
const TABLEDATA = `<td></td>`;

const grepElements = () => {
  WX_TABLE_BODY = document.getElementById("table-body-weather");
  SELECT_WX = document.getElementById("select-weather");
  SHOW_WX = document.getElementById("show-weather-forecast");
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
    fillInForecast(wxInfo);
  });

};

// Hit kommer varje wx-info parseat och klart, så det är bara
// att hämta varje attribut från objektet wxInfo direkt (wxInfo.<ATTRIBUT>)
const fillInForecast = (wxInfo) => {
  // let tr = document.createElement("tr");
  let option = document.createElement("option");
  const {
    forecastDate, forecastTime, time, timeOfDay, wxSymbol, temp, windDir, windSpeed,
    gustSpeed, visibility, precipitationCategory, precipitaionMeanIntensity, wxSymbolImg
   } = wxInfo

  option.innerHTML = `
    <option value="${forecastDate} ${forecastTime}">${forecastDate} ${forecastTime}</option>
  `
//    tr.innerHTML = `
// <tr>
//   <td headers="Prognos för">${forecastDate} ${forecastTime}</td>
//   <td headers="Temperature">${Math.round(temp)}&#176;C</td>
//   <td headers="Wind">${Math.round(windSpeed)} m/s ${windDir}</td>
//   <td headers="Symbol"><img src="../assets/images/wxIcons/png/${wxSymbolImg}" width="200" height="200" alt="Vädersymbol" /></td>
// </tr>
// `

  SELECT_WX.appendChild(option);
};


// Det här är main-funktionen
const main = () => {
  removeEventListener("load", main);
  grepElements();
  addListeners();
  getWeatherForecast();
};

// Eftersom jag använder funktioner som arrowfunctions
// med const före så måste jag köra denna rad efter
// deklarationen av const main.
addEventListener("load", main);
