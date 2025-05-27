import React, { useState, useEffect } from 'react';
import { Search, Heart, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Eye, Clock } from 'lucide-react';

// Weather Icon Component
const WeatherIcon = ({ condition, size = 24 }) => {
  const getIcon = () => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun size={size} className="text-yellow-500" />;
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud size={size} className="text-gray-500" />;
      case 'rain':
      case 'light rain':
        return <CloudRain size={size} className="text-blue-500" />;
      case 'snow':
        return <CloudSnow size={size} className="text-blue-200" />;
      default:
        return <Sun size={size} className="text-yellow-500" />;
    }
  };

  return getIcon();
};

// Search Bar Component
const SearchBar = ({ onSearch, placeholder = "Search for a city..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Search size={20} />
        Search
      </button>
    </div>
  );
};

// Weather Card Component
const WeatherCard = ({ city, weather, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative">
      <button
        onClick={() => onToggleFavorite(city)}
        className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
          isFavorite 
            ? 'text-red-500 hover:bg-red-50' 
            : 'text-gray-400 hover:bg-gray-100'
        }`}
      >
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
        <p className="text-gray-600">US</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <WeatherIcon condition={weather.condition} size={48} />
        <div>
          <div className="text-4xl font-bold text-gray-800">{weather.temp}°C</div>
          <div className="text-gray-600">{weather.condition}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-sm text-gray-500">Feels like: {weather.feelsLike}°C</div>
          <div className="text-sm text-gray-500">
            Min: {weather.min}°C / Max: {weather.max}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <Droplets size={20} className="mx-auto mb-1 text-blue-500" />
          <div className="text-sm text-gray-500">Humidity</div>
          <div className="font-semibold">{weather.humidity}%</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Wind size={20} className="mx-auto mb-1 text-gray-500" />
          <div className="text-sm text-gray-500">Wind</div>
          <div className="font-semibold">{weather.wind} m/s</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Sun size={20} className="mx-auto mb-1 text-yellow-500" />
          <div className="text-sm text-gray-500">Sunrise</div>
          <div className="font-semibold">{weather.sunrise}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Clock size={20} className="mx-auto mb-1 text-orange-500" />
          <div className="text-sm text-gray-500">Sunset</div>
          <div className="font-semibold">{weather.sunset}</div>
        </div>
      </div>
    </div>
  );
};

// Forecast Card Component
const ForecastCard = ({ day, date, condition, temp, min, max, isToday = false }) => {
  return (
    <div className={`p-4 rounded-lg text-center ${
      isToday ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
    }`}>
      <div className="font-semibold text-gray-800 mb-2">{day}</div>
      <div className="text-sm text-gray-500 mb-3">{date}</div>
      <div className="mb-3">
        <WeatherIcon condition={condition} size={32} />
      </div>
      <div className="text-xl font-bold text-gray-800 mb-2">{temp}°C</div>
      <div className="text-sm text-gray-500">
        {min}° / {max}°
      </div>
      <div className="text-xs text-gray-400 mt-1 capitalize">{condition}</div>
    </div>
  );
};

// Favorite Cities Component
const FavoriteCities = ({ favorites, onSelectCity, onRemoveFavorite }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Favorite Cities</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {favorites.map((city) => (
          <div
            key={city}
            className="flex-shrink-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-opacity-30 transition-all group"
            onClick={() => onSelectCity(city)}
          >
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{city}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city);
                }}
                className="opacity-0 group-hover:opacity-100 text-white hover:text-red-200 transition-all"
              >
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sample weather data
const weatherData = {
  'New York': {
    temp: 22,
    condition: 'Partly Cloudy',
    feelsLike: 23,
    min: 19,
    max: 24,
    humidity: 65,
    wind: 5.2,
    sunrise: '09:20 AM',
    sunset: '11:40 PM'
  },
  'London': {
    temp: 18,
    condition: 'Cloudy',
    feelsLike: 19,
    min: 15,
    max: 21,
    humidity: 72,
    wind: 4.8,
    sunrise: '08:45 AM',
    sunset: '10:30 PM'
  },
  'Tokyo': {
    temp: 26,
    condition: 'Sunny',
    feelsLike: 28,
    min: 23,
    max: 29,
    humidity: 58,
    wind: 3.2,
    sunrise: '07:15 AM',
    sunset: '09:45 PM'
  },
  'Paris': {
    temp: 20,
    condition: 'Light Rain',
    feelsLike: 21,
    min: 17,
    max: 23,
    humidity: 78,
    wind: 6.1,
    sunrise: '08:30 AM',
    sunset: '10:15 PM'
  }
};

const forecastData = [
  { day: 'Mon', date: '5/19/2023', condition: 'Partly Cloudy', temp: 22, min: 19, max: 24 },
  { day: 'Tue', date: '5/20/2023', condition: 'Sunny', temp: 24, min: 20, max: 26 },
  { day: 'Wed', date: '5/21/2023', condition: 'Clear', temp: 25, min: 21, max: 27 },
  { day: 'Thu', date: '5/22/2023', condition: 'Light Rain', temp: 23, min: 19, max: 25 },
  { day: 'Fri', date: '5/23/2023', condition: 'Moderate Rain', temp: 20, min: 18, max: 22 }
];

// Main Dashboard Component
const WeatherDashboard = () => {
  const [currentCity, setCurrentCity] = useState('New York');
  const [favorites, setFavorites] = useState(['New York']);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Simulate search - in real app, this would call an API
    const cities = Object.keys(weatherData);
    const results = cities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
      setCurrentCity(results[0]);
      setSearchResults(results);
    } else {
      // Add mock data for searched city
      weatherData[query] = {
        temp: Math.floor(Math.random() * 30) + 10,
        condition: 'Sunny',
        feelsLike: Math.floor(Math.random() * 30) + 12,
        min: Math.floor(Math.random() * 20) + 5,
        max: Math.floor(Math.random() * 35) + 15,
        humidity: Math.floor(Math.random() * 40) + 40,
        wind: (Math.random() * 10 + 1).toFixed(1),
        sunrise: '07:30 AM',
        sunset: '08:45 PM'
      };
      setCurrentCity(query);
    }
  };

  const toggleFavorite = (city) => {
    setFavorites(prev => {
      if (prev.includes(city)) {
        return prev.filter(fav => fav !== city);
      } else {
        return [...prev, city];
      }
    });
  };

  const selectFavoriteCity = (city) => {
    setCurrentCity(city);
  };

  const removeFavorite = (city) => {
    setFavorites(prev => prev.filter(fav => fav !== city));
  };

  const currentWeather = weatherData[currentCity] || weatherData['New York'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">WeatherWise</h1>
          <p className="text-sky-100">Real-time weather updates and forecasts</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Favorite Cities */}
        <FavoriteCities 
          favorites={favorites}
          onSelectCity={selectFavoriteCity}
          onRemoveFavorite={removeFavorite}
        />

        {/* Current Weather */}
        <div className="mb-8">
          <WeatherCard 
            city={currentCity}
            weather={currentWeather}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(currentCity)}
          />
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecastData.map((forecast, index) => (
              <ForecastCard
                key={forecast.day}
                day={forecast.day}
                date={forecast.date}
                condition={forecast.condition}
                temp={forecast.temp}
                min={forecast.min}
                max={forecast.max}
                isToday={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;