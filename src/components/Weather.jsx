import { useEffect, useState } from "react";
import fetchWeather from "./api";
import "./style/Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState("India");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeather(place);
        setWeatherData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [place]);

  if (error) {
    console.log(error);
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const { currentConditions, days, resolvedAddress } = weatherData;
  const {
    temp,
    feelslike,
    conditions,
    humidity,
    windspeed,
    winddir,
    sunrise,
    sunset,
    uvindex,
  } = currentConditions;

  return (
    <div className="weather-container">
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Enter a location..."
      />
      <div>
        <h1>Weather in {resolvedAddress}</h1>
        <p>🌡️ Temperature: {temp}°C</p>
        <p>🤒 Feels Like: {feelslike}°C</p>
        <p>🌤️ Conditions: {conditions}</p>
        <p>💧 Humidity: {humidity}%</p>
        <p>
          🌬️ Wind: {windspeed} km/h, Direction: {winddir}°
        </p>
        <p>☀️ Sunrise: {sunrise}</p>
        <p>🌅 Sunset: {sunset}</p>
        <p>🌞 UV Index: {uvindex}</p>
      </div>
      <div className="daily-forecast">
        <h1>Daily Forecast</h1>
        <div className="forecast-grid">
          {days.slice(0, 3).map((day, index) => (
            <div key={index} className="forecast-card">
              <p>{day.datetime}</p>
              <p>🌡️ Max: {day.tempmax}°C</p>
              <p>🌡️ Min: {day.tempmin}°C</p>
              <p>🌤️ {day.conditions}</p>
              <p>💧 {day.humidity}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
