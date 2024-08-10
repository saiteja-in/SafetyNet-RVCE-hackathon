import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WeatherDataItem } from '../types/ForecastInterfaces';


const WeatherCard: React.FC = () => {
  const formatTemperature = (temp: number) => `${(temp - 273.15).toFixed(1)}°C`;

  const [data, setData] = useState<WeatherDataItem[] | undefined>(undefined);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const getPosition = () =>
          new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error)
            )
          );

        const position = await getPosition();
        const { latitude: lat, longitude: lon } = position.coords;

        const res = await axios.post('http://localhost:3217/api/weather/getWeather', { lat, lon });
        // Assuming res.data.data.daily contains the array of weather data
        if (Array.isArray(res.data.data.daily)) {
          setData(res.data.data.daily);
        } else {
          console.error('Unexpected data format:', res.data);
        }
        console.log(res.data.data.daily);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeather();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col px-2 py-3 max-md:items-center max-md:gap-5 md:flex md:flex-row md:justify-around md:gap-1">
        {data && data.map((item, index) => (
          <div className="rounded-3xl shadow-lg" key={index}>
            <div
              className="group relative h-60 w-10 overflow-hidden text-wrap rounded-3xl p-4 shadow-inner shadow-zinc-400/80 transition-all duration-1000 max-md:hover:min-h-52 sm:w-96 md:min-h-48 md:w-36 md:hover:w-64"
            >
              {/* Before Hover */}
              <div className="absolute flex flex-row items-center gap-12 py-2 text-zinc-700 transition-opacity duration-1000 group-hover:opacity-0 max-md:px-3 max-md:text-sm sm:gap-28 md:flex-col md:gap-8">
                <span className="text-lg md:text-xl">
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </span>
                <span className="animate-stretch text-3xl">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-16 h-16"
                  />
                </span>
                <span className="text-xl">
                  {formatTemperature(item.feels_like.day)}
                </span>
              </div>

              {/* After Hover */}
              <div className="absolute mx-auto flex flex-col gap-3 px-2 py-4 text-zinc-800 opacity-0 transition-all duration-1000 group-hover:opacity-100">
                <div className="space-x-4">
                  <span className="capitalize text-lg">
                    {item.weather[0].main}
                  </span>
                  <span className="inline-block animate-stretch text-xl">
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-8 h-8"
                    />
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-4">
                    <span className="font-medium">Min Temp:</span>
                    <span>{formatTemperature(item.temp.min)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="font-medium">Max Temp:</span>
                    <span>{formatTemperature(item.temp.max)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="font-medium">Pressure:</span>
                    <span>{item.pressure} hPa</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="font-medium">Humidity:</span>
                    <span>{item.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
