// import { useEffect, useState } from "react";
// import CurrentWeather from "../components/CurrentWeather";
// import axios from "axios";
// import ForecastWeather from "../components/ForeCastWeather";
// import { WeatherData } from "../types/WeatherInterface";
import ForecastWeather from "../components/ForeCastWeather";


function Weather() {
  // const [weatherData, setWeatherData] = useState<WeatherData>();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);


  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      {/* {weatherData ?  */}
      {/* <CurrentWeather /> */}
      {/* //  : <div>No weather data available</div>} */}
      <ForecastWeather/>
    </div>
  );
}

export default Weather;
