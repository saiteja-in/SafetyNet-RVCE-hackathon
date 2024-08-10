import React from 'react';
import { CurrentWeather } from '../types/CurrentInterfaces';

interface FirstProps {
  current?: CurrentWeather;
}

const First: React.FC<FirstProps> = ({ current }) => {
  const formatTemperature = (temp: number): string => `${(temp - 273.15).toFixed(1)}°C`;
  const formatDate = (timestamp: number): string => new Date(timestamp * 1000).toLocaleDateString();
  const formatTime = (timestamp: number): string => new Date(timestamp * 1000).toLocaleTimeString();

  if (!current) return <div className="text-center text-red-500">No current weather data available.</div>;

  return (
    <div className="w-full mb-4">
      <div className="relative shadow-inner shadow-zinc-400/80 mx-auto w-11/12 rounded-xl bg-white/20 p-4 drop-shadow-xl transition-all duration-700 sm:w-8/12 md:w-6/12">
        <div className="flex gap-4 py-2 text-zinc-700 sm:flex-row sm:gap-12 md:gap-8">
          <div className="text-lg sm:text-xl w-1/2">
            <div>Date: {formatDate(current.dt)}</div>
            <div>Time: {formatTime(current.dt)}</div>
            <div>Sunrise: {formatTime(current.sunrise)}</div>
            <div>Sunset: {formatTime(current.sunset)}</div>
          </div>
          <div className="flex flex-col items-center gap-4 w-1/2">
            <img
              src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
              alt={`Weather icon for ${current.weather[0].description}`}
              className="w-16 h-16"
            />
            <div className="text-3xl">
              {formatTemperature(current.temp)}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-10 px-2 py-4 text-zinc-800 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col space-y-3 text-sm text-zinc-600">
            <div className="flex justify-between">
              <span className="font-medium">Feels Like:</span>
              <span>{formatTemperature(current.feels_like)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Pressure:</span>
              <span>{current.pressure} hPa</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Humidity:</span>
              <span>{current.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Dew Point:</span>
              <span>{(current.dew_point - 273.15).toFixed(1)}°C</span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-3 text-sm text-zinc-600">
            <div className="flex justify-between">
              <span className="font-medium">UV Index:</span>
              <span>{current.uvi}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Clouds:</span>
              <span>{current.clouds}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Visibility:</span>
              <span>{current.visibility} meters</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Wind Speed:</span>
              <span>{current.wind_speed} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Wind Direction:</span>
              <span>{current.wind_deg}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
