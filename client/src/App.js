import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather.js";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    // if Enter is pressed, make api call
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      console.log(query);
      console.log(data);
      setWeather(data);

      // reset weather
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <h3 className="search-header">Enter a city</h3>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {/* if weather.main exists, render component */}
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            {/* superscript element; works like exponent format */}
            <sup>{weather.sys.country}</sup>
          </h2>
          {/* round the temp */}
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            {/* degree sign */}
            <sup>&deg; C</sup>
          </div>
          <div className="info">
            {/* icon of weather */}
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            {/* description of weather */}
            <p>{weather.weather[0].description}</p>
            <p>
              <strong>Wind</strong>{" "}
              <span>
                {weather.wind.deg}
                <sup>&deg; </sup>, {weather.wind.speed} mph
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
