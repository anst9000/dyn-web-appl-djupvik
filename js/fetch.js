// Vi behöver några hjälptabeller från convertTables.js
import {
  dayHoursList,
  precipitationCategoryList,
  weatherSymbolList,
  degToCompass,
  getWxSymbolImage
} from './convertTables.js'

// Den URL som vi hämtar väderdata ifrån.
const URL = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json"

let weatherArray = [];

// Kollar om det finns data lagrat i localStorage eller inte.
const hasData = () => {
  if (localStorage.getItem("wxData") === null) {
    return false
  } else {
    return true
  }
}

// Kollar om datat från SMHI är uppdaterat eller inte.
// SMHI skickar med data.referenceTime som är senaste
// tiden som de uppdaterat vädret.
const isFreshData = () => {
  let data = JSON.parse(localStorage.getItem("wxData"))

  const timeSMHI = new Date(data.referenceTime)
  const timeNow = new Date()

  // Om datat är färskare än 3600 sekunder (60 * 60) kör på det.
  return ( (timeNow - timeSMHI) / 1000 ) < 60 * 60
}

// Här hämtar jag från API:et genom funktionen fetch
// som också är asynkron, därför deklarerar jag
// själva funktionen som konstant. Den exporteras också.
export const fetchWeatherForecast = async () => {
  let data

  // Om data redan finns i localStorage så använder vi det,
  // men datat får inte vara äldre än 1 timma.
  if (hasData() && isFreshData()) {
    data = JSON.parse(localStorage.getItem("wxData"))
  } else {
    // Vi behöver hämta ny data från API:et
    // Här behöver jag vänta in resultatet från fetch och result.json()
    const result = await fetch(URL);
    data = await result.json();
    // Sätter wxData till nyss hämtade data från localStorage
    localStorage.setItem("wxData", JSON.stringify(data))
  }

  // Använd data för 48 timmar framåt
  parseData(data.timeSeries.slice(0, 48));

  // Returnera arrayen med 'tillplattade' objekt.
  return weatherArray;
};


// Jag använder funktionen parseData för att 'platta ut'
// det ursprungliga objektet och returnera ett objekt
// som är lättare att hantera i fillInResults() i index.js
const parseData = (forecasts) => {
  let wxSymbolValue, tempValue, windDirValue,
      windSpeedValue, gustSpeedValue, visibilityValue,
      precipitationCategoryValue, precipitaionMeanIntensityValue;

  // Ett problem var att egenskaperna från API:et inte alltid ligger
  // i samma ordning i den lista som returneras från API.
  // Därför var det smidigt med en switch-sats som kollar det som av intresse.
  forecasts.map((forecast) => {
    forecast.parameters.forEach(wx => {
      switch (wx.name) {
        case "t":
          tempValue = wx.values[0]
          break;
        case "Wsymb2":
          wxSymbolValue = wx.values[0]
          break;
        case "wd":
          windDirValue = wx.values[0]
          break;
        case "ws":
          windSpeedValue = wx.values[0]
          break;
        case "gust":
          gustSpeedValue = wx.values[0]
          break;
        case "vis":
          visibilityValue = wx.values[0]
          break;
        case "pcat":
          precipitationCategoryValue = wx.values[0]
          break;
        case "pmean":
          precipitaionMeanIntensityValue = wx.values[0]
          break;

        default:
          break;
      }
    });

    let date = new Date(forecast.validTime)

    // Nu finns det med data som kanske inte kommer användas i tabellerna,
    // men det var enklare att lägga med de flesta egenskaper här i fetch.js
    // än att upptäcka att nu saknar jag det attributet när man ska kör mot DOM.
    let wxInfo = {
      time: forecast.validTime,
      forecastDate: date.toLocaleDateString(),
      forecastTime: date.toLocaleTimeString().substring(0, 5),
      timeOfDay: dayHoursList[parseInt(forecast.validTime.substring(11, 13))],

      wxSymbol: weatherSymbolList[wxSymbolValue],
      temp: tempValue,
      windDirValue,
      windDir: degToCompass(windDirValue),
      windSpeed: windSpeedValue,
      gustSpeed: gustSpeedValue,

      visibility: visibilityValue,
      precipitationCategory: precipitationCategoryList[precipitationCategoryValue],
      precipitaionMeanIntensity: precipitaionMeanIntensityValue,
      wxSymbolImg: getWxSymbolImage(wxSymbolValue, dayHoursList[parseInt(forecast.validTime.substring(11, 13))])
    };

    weatherArray.push(wxInfo);
  });
};
