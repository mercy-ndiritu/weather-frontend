import { useState, useCallback } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherApi';
import { saveLastSearched } from '../services/localStorage';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current weather data
  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getCurrentWeather(cityName);
      setCurrentWeather(weatherData);
      saveLastSearched(cityName);
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch forecast data
  const fetchForecast = useCallback(async (cityName) => {
    if (!cityName) return;

    try {
      const forecastData = await getForecast(cityName);
      setForecast(forecastData);
    } catch (err) {
      console.error('Forecast fetch error:', err);
      // Don't set error for forecast failures, just log them
    }
  }, []);

  // Fetch both weather and forecast
  const fetchWeatherAndForecast = useCallback(async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch both in parallel
      const [weatherData, forecastData] = await Promise.allSettled([
        getCurrentWeather(cityName),
        getForecast(cityName)
      ]);

      // Handle weather data
      if (weatherData.status === 'fulfilled') {
        setCurrentWeather(weatherData.value);
        saveLastSearched(cityName);
      } else {
        throw new Error(weatherData.reason?.message || 'Failed to fetch weather data');
      }

      // Handle forecast data (optional)
      if (forecastData.status === 'fulfilled') {
        setForecast(forecastData.value);
      } else {
        console.warn('Forecast fetch failed:', forecastData.reason);
        setForecast([]); // Clear previous forecast on error
      }

    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset all weather data
  const resetWeatherData = useCallback(() => {
    setCurrentWeather(null);
    setForecast([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    // State
    currentWeather,
    forecast,
    loading,
    error,
    
    // Actions
    fetchWeather,
    fetchForecast,
    fetchWeatherAndForecast,
    clearError,
    resetWeatherData
  };
};