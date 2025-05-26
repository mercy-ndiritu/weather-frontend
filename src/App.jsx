import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import FavoriteCities from './components/FavoriteCities';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    fetchWeather,
    fetchForecast 
  } = useWeather();
  const { 
    favorites, 
    addFavorite, 
    removeFavorite, 
    isFavorite 
  } = useFavorites();

  // Initialize with default city
  useEffect(() => {
    fetchWeather('New York');
    fetchForecast('New York');
  }, []);

  const handleSearch = async (cityName) => {
    await fetchWeather(cityName);
    await fetchForecast(cityName);
    setSearchValue('');
  };

  const handleToggleFavorite = () => {
    if (!currentWeather) return;
    
    const cityKey = `${currentWeather.city}, ${currentWeather.country}`;
    
    if (isFavorite(cityKey)) {
      removeFavorite(cityKey);
    } else {
      addFavorite(cityKey, currentWeather);
    }
  };

  const handleFavoriteClick = async (cityName) => {
    await fetchWeather(cityName);
    await fetchForecast(cityName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">WeatherWise</h1>
          <p className="text-white/90">Real-time weather updates and forecasts</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loading={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white text-center">
            {error}
          </div>
        )}

        {/* Weather Content */}
        <div className="max-w-4xl mx-auto">
          {/* Favorite Cities */}
          {favorites.length > 0 && (
            <FavoriteCities 
              favorites={favorites}
              onFavoriteClick={handleFavoriteClick}
              currentCity={currentWeather?.city}
            />
          )}

          {/* Current Weather */}
          <WeatherCard 
            weatherData={currentWeather}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={currentWeather ? isFavorite(`${currentWeather.city}, ${currentWeather.country}`) : false}
            loading={loading}
          />

          {/* 5-Day Forecast */}
          <ForecastCard forecast={forecast} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default App;