/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [localDate, setLocalDate] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // --- NEW: Fetch City Suggestions ---
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length > 2) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
          );
          setSuggestions(res.data);
        } catch (err) {
          console.error("Suggestion error", err);
        }
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300); // 300ms debounce to save API calls

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  const updateDateTime = (timezoneOffset) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + 1000 * timezoneOffset);
    setLocalTime(
      cityTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    setLocalDate(
      cityTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  };

  useEffect(() => {
    let timer;
    if (weather) {
      updateDateTime(weather.timezone);
      timer = setInterval(() => updateDateTime(weather.timezone), 1000);
    }
    return () => clearInterval(timer);
  }, [weather]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setSuggestions([]); // Clear suggestions on search
    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const daily = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(current.data);
      setForecast(daily.data.list.filter((_, i) => i % 8 === 0));
      setCity("");
    } catch (err) {
      alert("Location not found");
    }
    setLoading(false);
  };

  const getTheme = () => {
    if (!weather) return "theme-default";
    const main = weather.weather[0].main.toLowerCase();
    const isNight = weather.weather[0].icon.includes("n");
    if (isNight) return "theme-night";
    if (main.includes("rain")) return "theme-rainy";
    if (main.includes("cloud")) return "theme-cloudy";
    if (main.includes("clear")) return "theme-sunny";
    return "theme-default";
  };

  return (
    <div className={`app-canvas ${getTheme()}`}>
      <div className="glass-card">
        <div className="search-container">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search City..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
            />
            <button onClick={() => fetchWeather(city)}>Explore</button>
          </div>

          {/* --- NEW: Suggestion Dropdown --- */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => fetchWeather(`${s.name},${s.country}`)}
                >
                  {s.name}, {s.state ? `${s.state}, ` : ""}
                  {s.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          <div className="pro-loader">Analyzing Sky...</div>
        ) : (
          weather && (
            <div className="fade-in-ui">
              <div className="date-time-container">
                <div className="time-badge">{localTime}</div>
                <p className="date-text">{localDate}</p>
              </div>

              <div className="main-display">
                <h1>
                  {weather.name}, {weather.sys.country}
                </h1>
                <div className="temp-row">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt="icon"
                  />
                  <span className="big-degree">
                    {Math.round(weather.main.temp)}°
                  </span>
                </div>
                <p className="condition-label">
                  {weather.weather[0].description}
                </p>
              </div>

              <div className="stats-row">
                <div className="stat-pill">
                  <span>Humidity</span>
                  <strong>{weather.main.humidity}%</strong>
                </div>
                <div className="stat-pill">
                  <span>Wind</span>
                  <strong>{weather.wind.speed} km/h</strong>
                </div>
                <div className="stat-pill">
                  <span>Feels</span>
                  <strong>{Math.round(weather.main.feels_like)}°</strong>
                </div>
              </div>

              <div className="forecast-strip">
                {forecast.slice(0, 5).map((day, i) => (
                  <div key={i} className="mini-card">
                    <p>
                      {new Date(day.dt_txt).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt="icon"
                    />
                    <p>{Math.round(day.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
