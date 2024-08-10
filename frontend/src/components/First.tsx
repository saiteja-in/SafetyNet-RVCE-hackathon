import React from 'react';
import { CurrentWeather } from '../types/CurrentInterfaces';
import { Sunrise, Sunset, Wind, Droplets, Umbrella, Thermometer, Eye } from 'lucide-react';

interface FirstProps {
  current?: CurrentWeather;
}

const First: React.FC<FirstProps> = ({ current }) => {
  const formatTemperature = (temp: number): string => `${(temp - 273.15).toFixed(1)}°C`;
  const formatDate = (timestamp: number): string => new Date(timestamp * 1000).toLocaleDateString();
  const formatTime = (timestamp: number): string => new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!current) return <div className="text-center text-red-500">No current weather data available.</div>;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">{formatDate(current.dt)}</h2>
          <p className="text-xl">{formatTime(current.dt)}</p>
        </div>
        <div className="flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={`Weather icon for ${current.weather[0].description}`}
            className="w-24 h-24"
          />
          <div className="text-5xl font-bold ml-4">
            {formatTemperature(current.temp)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-3">
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 mr-2" />
            <span className="font-medium">Feels Like:</span>
            <span className="ml-auto">{formatTemperature(current.feels_like)}</span>
          </div>
          <div className="flex items-center">
            <Umbrella className="w-5 h-5 mr-2" />
            <span className="font-medium">Pressure:</span>
            <span className="ml-auto">{current.pressure} hPa</span>
          </div>
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            <span className="font-medium">Humidity:</span>
            <span className="ml-auto">{current.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            <span className="font-medium">Visibility:</span>
            <span className="ml-auto">{current.visibility} meters</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span className="font-medium">Wind Speed:</span>
            <span className="ml-auto">{current.wind_speed} m/s</span>
          </div>
          <div className="flex items-center">
            <Sunrise className="w-5 h-5 mr-2" />
            <span className="font-medium">Sunrise:</span>
            <span className="ml-auto">{formatTime(current.sunrise)}</span>
          </div>
          <div className="flex items-center">
            <Sunset className="w-5 h-5 mr-2" />
            <span className="font-medium">Sunset:</span>
            <span className="ml-auto">{formatTime(current.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;