import {
  dayHoursList,
  precipitationCategoryList,
  weatherSymbolList,
  degToCompass,
  getWxSymbolImage
} from './convertTables.js'

const URL = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json"

let weatherArray = [];

const hasData = () => {
  if (localStorage.getItem("wxData") === null) {
    return false
  } else {
    return true
  }
}

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

  // Använd data för 12 timmar framåt
  parseData(data.timeSeries.slice(0, 12));

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

    let wxInfo = {
      time: forecast.validTime,
      forecastDate: date.toLocaleDateString(),
      forecastTime: date.toLocaleTimeString().substring(0, 5),
      timeOfDay: dayHoursList[parseInt(forecast.validTime.substring(11, 13))],

      wxSymbol: weatherSymbolList[wxSymbolValue],
      temp: tempValue,
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
