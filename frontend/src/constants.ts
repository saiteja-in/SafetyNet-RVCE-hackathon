type WeatherInfoType = {
  [key: string]: {
    lottiefile: string;
    icon: string;
    emoji: string;
  };
};
export const WEEKDAYS: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const WEEKDAYSlen=7;

export const WEATHERINFO: WeatherInfoType = {
  "01d": { lottiefile: "01d", icon: "sunny day", emoji: "☀️" },
  "01n": { lottiefile: "01n", icon: "clear night", emoji: "🌙" },
  "02d": { lottiefile: "02d", icon: "few clouds", emoji: "🌤️" },
  "02n": { lottiefile: "02n", icon: "few clouds", emoji: "🌤️" },
  "03d": { lottiefile: "02d", icon: "scattered clouds", emoji: "🌥️" },
  "03n": { lottiefile: "02n", icon: "scattered clouds", emoji: "🌥️" },
  "04d": { lottiefile: "clouds", icon: "broken clouds", emoji: "☁️" },
  "04n": { lottiefile: "clouds", icon: "broken clouds", emoji: "☁️" },
  "09d": {  lottiefile: "rain",icon: "shower rain", emoji: "🌧️" },
  "09n": {  lottiefile: "rain",icon: "shower rain", emoji: "🌧️" },
  "10d": { lottiefile: "rain",icon: "rain", emoji: "🌦️" },
  "10n": { lottiefile: "rain",icon: "rain", emoji: "🌦️" },
  "11d": {lottiefile: "thunderstorm", icon: "thunderstorm", emoji: "⛈️" },
  "11n": {lottiefile: "thunderstorm", icon: "thunderstorm", emoji: "⛈️" },
  "13d": { lottiefile:"snow", icon: "snow", emoji: "🌨️" },
  "13n": {  lottiefile:"snow",icon: "snow", emoji: "🌨️" },
  "50d": {lottiefile:"mist", icon: "mist", emoji: "🌫️" },
  "50n": { lottiefile:"mist",icon: "mist", emoji: "🌫️" },
};