import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WeatherDataItem } from '../types/ForecastInterfaces';
import { CurrentWeather } from '../types/CurrentInterfaces';
import First from './First';
import Remaining from './Remaining';
import { Loader2 } from 'lucide-react';

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherDataItem[] | undefined>(undefined);
  const [current, setCurrent] = useState<CurrentWeather | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
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
        setData(res.data.data.daily);
        setCurrent(res.data.data.current);
        setLoading(false);

      } catch (error) {
        setError('Error fetching weather data');
        setLoading(false);
        console.error('Error fetching weather data:', error);
      }
    };

    getWeather();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Weather Forecast</h1>
      <div className="space-y-8">
        {current ? <First current={current} /> : <div className="text-center text-gray-500">No current weather data</div>}
        {data ? <Remaining data={data} /> : <div className="text-center text-gray-500">No forecast data available</div>}
      </div>
    </div>
  );
};

export default WeatherCard;