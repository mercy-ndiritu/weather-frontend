// API Configuration
export const WEATHER_API_KEY = '06faf26a6e7c8aaae3aad13fbe2a46e0';
export const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather Icons Mapping
export const WEATHER_ICONS = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️', // scattered clouds
  '04d': '☁️', // broken clouds
  '04n': '☁️', // broken clouds
  '09d': '🌧️', // shower rain
  '09n': '🌧️', // shower rain
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️', // thunderstorm
  '13d': '❄️', // snow
  '13n': '❄️', // snow
  '50d': '🌫️', // mist
  '50n': '🌫️', // mist
};

// Weather Conditions
export const WEATHER_CONDITIONS = {
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
  RAIN: 'Rain',
  DRIZZLE: 'Drizzle',
  THUNDERSTORM: 'Thunderstorm',
  SNOW: 'Snow',
  MIST: 'Mist',
  SMOKE: 'Smoke',
  HAZE: 'Haze',
  DUST: 'Dust',
  FOG: 'Fog',
  SAND: 'Sand',
  ASH: 'Ash',
  SQUALL: 'Squall',
  TORNADO: 'Tornado'
};

// Default Cities
export const DEFAULT_CITIES = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Sydney'
];

// Units
export const TEMPERATURE_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
  KELVIN: 'standard'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  FAVORITE_CITIES: 'weatherDashboard_favoriteCities',
  RECENT_SEARCHES: 'weatherDashboard_recentSearches',
  TEMPERATURE_UNIT: 'weatherDashboard_temperatureUnit'
};

// API Endpoints
export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  GEO_CODING: '/geo/1.0/direct'
};