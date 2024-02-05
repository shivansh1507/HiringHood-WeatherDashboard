// WeatherDisplay.jsx
import React from 'react';
import './WeatherDisplay.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherDisplay = ({ data, userGroup }) => {
  if (!data || !data.location || !data.current) {
    return <div className="error-message">No data available</div>;
  }

  const { location, current } = data;

  const getWeatherIcon = (code) => {
    // Map condition codes to corresponding weather icons
    const iconMap = {
      1000: WiDaySunny,
      1003: WiCloudy,
      1006: WiCloudy, // Adjust code for cloudy weather
      1063: WiRain,
      1189: WiRain, // Adjust code for rainy weather
      1192: WiThunderstorm,
      1114: WiSnow,
    };

    const WeatherIcon = iconMap[code] || WiDaySunny; // Default to sunny if no match

    return <WeatherIcon className="weather-icon" />;
  };

  return (
    <div className="weather-display">
      <h2>{location.name}, {location.country}</h2>
      <p className="temperature">{current.temp_c}°C</p>
      {getWeatherIcon(current.condition.code)}
      <p className="description">{current.condition.text}</p>
      {userGroup && (
        <div className="user-group-insights">
          {userGroup === 'event-planners' && (
            <p>Consider indoor venues for your events today!</p>
          )}
          {userGroup === 'farmers' && (
            <p>Optimal conditions for planting crops today.</p>
          )}
          {userGroup === 'travelers' && (
            <p>Perfect weather for a spontaneous road trip!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
