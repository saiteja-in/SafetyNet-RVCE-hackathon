import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WeatherDataItem } from '../types/ForecastInterfaces';
import { CurrentWeather } from '../types/CurrentInterfaces';
import First from './First';
import Remaining from './Remaining';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col px-2 py-3">
        {/* 0 */}
        {current ? <First current={current} /> : <div>No current weather data</div>}

        {/* 1-6 */}
        {data ? <Remaining data={data} /> : <div>No forecast data available</div>}
      </div>
    </div>
  );
};

export default WeatherCard;
