// Times for day and night - Summer
export const dayHoursList = {
  0: "night",
  1: "night",
  2: "night",
  3: "night",
  4: "night",
  5: "night",
  6: "night",
  7: "night",
  8: "day",
  9: "day",
  10: "day",
  11: "day",
  12: "day",
  13: "day",
  14: "day",
  15: "day",
  16: "day",
  17: "day",
  18: "day",
  19: "day",
  20: "day",
  21: "night",
  22: "night",
  23: "night",
}

// Precipitation Category (pcat)
// The precipitation category parameter value is an integer with a value range of 0 to 6.
// The values represent the following:
export const precipitationCategoryList = {
  // { Value: "Meaning" }
  0: "No precipitation",
  1: "Snow",
  2: "Snow and rain",
  3: "Rain",
  4: "Drizzle",
  5: "Freezing rain",
  6: "Freezing drizzle",
}

// Weather Symbol
// Wsymb2, consists of integers, 1 to 27.
// Every value represents a different kind of weather situation.
export const weatherSymbolList = {
  // { Value: "Meaning" }
  1:	"Clear sky",
  2:	"Nearly clear sky",
  3:	"Variable cloudiness",
  4:	"Halfclear sky",
  5:	"Cloudy sky",
  6:	"Overcast",
  7:	"Fog",
  8:	"Light rain showers",
  9:	"Moderate rain showers",
  10:	"Heavy rain showers",
  11:	"Thunderstorm",
  12:	"Light sleet showers",
  13:	"Moderate sleet showers",
  14:	"Heavy sleet showers",
  15:	"Light snow showers",
  16:	"Moderate snow showers",
  17:	"Heavy snow showers",
  18:	"Light rain",
  19:	"Moderate rain",
  20:	"Heavy rain",
  21:	"Thunder",
  22:	"Light sleet",
  23:	"Moderate sleet",
  24:	"Heavy sleet",
  25:	"Light snowfall",
  26:	"Moderate snowfall",
  27:	"Heavy snowfall",
}


// Because north on a compass could be described as 0 degrees or 360 degrees,
// we have to use two data bins for it.
// This means that, for our 16 compass sectors,
// we actually need 17 values in our lookup table.
// The first value and last value are both north.
// The table below shows the 17 values with the 16 different compass sectors:
// Values 	Compass Sectors
export const degToCompass = ( degrees ) => {
  const SECTOR_SIZE = 22.5
  const DIRECTION_VALUES = [
    "N", "NNO", "NO", "ONO",
    "O", "OSO", "SO", "SSO",
    "S", "SSV", "SV", "VSV",
    "V", "VNV", "NV", "NNV"
  ]

  const directionIndex = parseInt( ( degrees / SECTOR_SIZE ) + 0.5 )
  return DIRECTION_VALUES[( directionIndex % 16 )]
}

const pngFiles = [
  { day: 'clearsky_day.png', night: 'clearsky_night.png' },
  { day: 'fair_day.png', night: 'fair_night.png' },
  { day: 'fair_day.png', night: 'fair_night.png' },
  { day: 'partlycloudy_day.png', night: 'partlycloudy_night.png' },
  { day: 'cloudy.png', night: 'cloudy.png' },
  { day: 'fog.png', night: 'fog.png' },
  { day: 'fog.png', night: 'fog.png' },
  { day: 'lightrainshowers_day.png', night: 'lightrainshowers_night.png' },
  { day: 'rainshowers_day.png', night: 'rainshowers_night.png' },
  { day: 'heavyrainshowers_day.png', night: 'heavyrainshowers_night.png' },
  { day: 'heavyrainshowersandthunder_day.png', night: 'heavyrainshowersandthunder_night.png' },
  { day: 'lightsleetshowers_day.png', night: 'lightsleetshowers_night.png' },
  { day: 'sleetshowers_day.png', night: 'sleetshowers_night.png' },
  { day: 'heavysleetshowers_day.png', night: 'heavysleetshowers_night.png' },
  { day: 'lightsnowshowers_day.png', night: 'lightsnowshowers_night.png' },
  { day: 'snowshowers_day.png', night: 'snowshowers_night.png' },
  { day: 'heavysnowshowers_day.png', night: 'heavysnowshowers_night.png' },
  { day: 'lightrain.png', night: 'lightrain.png' },
  { day: 'rain.png', night: 'rain.png' },
  { day: 'heavyrain.png', night: 'heavyrain.png' },
  { day: 'rainshowersandthunder_day.png', night: 'rainshowersandthunder_night.png' },
  { day: 'lightsleet.png', night: 'lightsleet.png' },
  { day: 'sleet.png', night: 'sleet.png' },
  { day: 'heavysleet.png', night: 'heavysleet.png' },
  { day: 'lightsnow.png', night: 'lightsnow.png' },
  { day: 'snow.png', night: 'snow.png' },
  { day: 'heavysnow.png', night: 'heavysnow.png' },
]

// Converting time of day and weather symbol to correct image
export const getWxSymbolImage = (wxSymbol, timeOfDay) => {
  return pngFiles[wxSymbol - 1][timeOfDay]
}
