import React from 'react';
import { WeatherDataItem } from '../types/ForecastInterfaces';
import { Droplets, Umbrella, ArrowDown, ArrowUp, Thermometer } from 'lucide-react';

interface RemainingProps {
  data: WeatherDataItem[];
}

const Remaining: React.FC<RemainingProps> = ({ data }) => {
  const formatTemperature = (temp: number): string => `${(temp - 273.15).toFixed(1)}°C`;

  return (
    <div>
      {/* Display the remaining items */}
      <div className="flex mt-2">
        {data && data.slice(1).map((item, index) => (
          <div className="w-full flex flex-col items-center md:w-1/4 mb-4" key={index}>
            <div className="rounded-3xl shadow-lg">
              <div
                className="group relative h-56 overflow-hidden text-wrap rounded-3xl p-4 shadow-inner shadow-zinc-400/80 transition-all duration-1000 max-md:hover:min-h-52 sm:w-96 md:min-h-48 md:w-36 md:hover:w-64"
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
                      <span className="font-medium flex items-center">
                        <ArrowDown className="w-4 h-4 mr-1 text-blue-500" /> Min Temp:
                      </span>
                      <span>{formatTemperature(item.temp.min)}</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="font-medium flex items-center">
                        <ArrowUp className="w-4 h-4 mr-1 text-red-500" /> Max Temp:
                      </span>
                      <span>{formatTemperature(item.temp.max)}</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="font-medium flex items-center">
                        <Umbrella className="w-4 h-4 mr-1 text-gray-500" /> Pressure:
                      </span>
                      <span>{item.pressure} hPa</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="font-medium flex items-center">
                        <Droplets className="w-4 h-4 mr-1 text-blue-400" /> Humidity:
                      </span>
                      <span>{item.humidity}%</span>
                    </div>
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

export default Remaining;