// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './Components/WeatherDisplay';

const API_KEY = 'b0611bed3acc4e29a5073905240502';
const API_ENDPOINT = 'https://api.weatherapi.com/v1/current.json';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [userGroup, setUserGroup] = useState('');
  const [showStories, setShowStories] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT}?key=${API_KEY}&q=${city}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleUserGroupSelection = (group) => {
    setUserGroup(group);
  };

  const handleShowStories = () => {
    setShowStories(true);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather Dashboard</h1>
        <p>Stay informed about the weather conditions and share your experiences!</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={() => setCity(city)}>
          Search
        </button>
      </div>
      <div className="user-group-selector">
        <p>Select your user group:</p>
        <button onClick={() => handleUserGroupSelection('event-planners')}>
          Event Planners
        </button>
        <button onClick={() => handleUserGroupSelection('farmers')}>
          Farmers
        </button>
        <button onClick={() => handleUserGroupSelection('travelers')}>
          Travelers
        </button>
      </div>
      {weatherData ? (
        <>
          <WeatherDisplay data={weatherData} userGroup={userGroup} />
          {!showStories && (
            <button className="show-stories-button" onClick={handleShowStories}>
              Share Your Weather Story
            </button>
          )}
        </>
      ) : (
        <p className="loading-message">Enter Your City Name</p>
      )}
      {showStories && (
        <div className="user-stories">
          <h2>Weather Stories</h2>
          <p>Explore stories shared by users in your city!</p>
          {/* Add a component to display user stories */}
        </div>
      )}
    </div>
  );
};

export default App;
