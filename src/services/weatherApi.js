// Weather API Service
// Replace with your actual weather API (OpenWeatherMap, WeatherAPI, etc.)

const API_KEY = '06faf26a6e7c8aaae3aad13fbe2a46e0'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for development/testing
const mockWeatherData = {
  'new york': {
    city: 'New York',
    country: 'US',
    temperature: 22,
    condition: 'Partly Cloudy',
    feelsLike: 23,
    minTemp: 19,
    maxTemp: 24,
    humidity: 65,
    windSpeed: 5.2,
    sunrise: '09:20 AM',
    sunset: '11:40 PM'
  },
  'london': {
    city: 'London',
    country: 'UK',
    temperature: 15,
    condition: 'Light Rain',
    feelsLike: 13,
    minTemp: 12,
    maxTemp: 18,
    humidity: 78,
    windSpeed: 3.1,
    sunrise: '07:45 AM',
    sunset: '09:15 PM'
  },
  'tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temperature: 28,
    condition: 'Sunny',
    feelsLike: 31,
    minTemp: 25,
    maxTemp: 32,
    humidity: 55,
    windSpeed: 2.8,
    sunrise: '06:30 AM',
    sunset: '08:45 PM'
  }
};

const mockForecastData = {
  'new york': [
    { day: 'Mon', date: '5/19/2023', temp: 22, tempRange: '19° / 24°', condition: 'Partly Cloudy' },
    { day: 'Tue', date: '5/20/2023', temp: 24, tempRange: '20° / 26°', condition: 'Sunny' },
    { day: 'Wed', date: '5/21/2023', temp: 25, tempRange: '21° / 27°', condition: 'Clear Sky' },
    { day: 'Thu', date: '5/22/2023', temp: 23, tempRange: '19° / 25°', condition: 'Light Rain' },
    { day: 'Fri', date: '5/23/2023', temp: 20, tempRange: '18° / 22°', condition: 'Moderate Rain' }
  ],
  'london': [
    { day: 'Mon', date: '5/19/2023', temp: 15, tempRange: '12° / 18°', condition: 'Light Rain' },
    { day: 'Tue', date: '5/20/2023', temp: 17, tempRange: '14° / 20°', condition: 'Partly Cloudy' },
    { day: 'Wed', date: '5/21/2023', temp: 19, tempRange: '16° / 22°', condition: 'Sunny' },
    { day: 'Thu', date: '5/22/2023', temp: 16, tempRange: '13° / 19°', condition: 'Cloudy' },
    { day: 'Fri', date: '5/23/2023', temp: 14, tempRange: '11° / 17°', condition: 'Heavy Rain' }
  ],
  'tokyo': [
    { day: 'Mon', date: '5/19/2023', temp: 28, tempRange: '25° / 32°', condition: 'Sunny' },
    { day: 'Tue', date: '5/20/2023', temp: 30, tempRange: '27° / 34°', condition: 'Clear Sky' },
    { day: 'Wed', date: '5/21/2023', temp: 26, tempRange: '23° / 29°', condition: 'Partly Cloudy' },
    { day: 'Thu', date: '5/22/2023', temp: 24, tempRange: '21° / 27°', condition: 'Light Rain' },
    { day: 'Fri', date: '5/23/2023', temp: 27, tempRange: '24° / 30°', condition: 'Sunny' }
  ]
};

// Utility function to format time
const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Utility function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  return { day, date: dateStr };
};

// Get current weather data
export const getCurrentWeather = async (cityName) => {
  try {
    // For development, use mock data
    const mockKey = cityName.toLowerCase();
    if (mockWeatherData[mockKey]) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockWeatherData[mockKey];
    }

    // Real API implementation (uncomment when you have an API key)
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      feelsLike: Math.round(data.main.feels_like),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: formatTime(data.sys.sunrise),
      sunset: formatTime(data.sys.sunset)
    };
    
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

// Get 5-day forecast data
export const getForecast = async (cityName) => {
  try {
    const mockKey = cityName.toLowerCase();
    if (mockForecastData[mockKey]) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockForecastData[mockKey];
    }

    const response = await fetch(
      `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('Forecast not available');

    const data = await response.json();

    const dailyForecasts = [];
    const processedDays = new Set();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();

      if (!processedDays.has(dayKey) && dailyForecasts.length < 5) {
        const { day, date: dateStr } = formatDate(item.dt);
        dailyForecasts.push({
          day,
          date: dateStr,
          temp: Math.round(item.main.temp),
          tempRange: `${Math.round(item.main.temp_min)}° / ${Math.round(item.main.temp_max)}°`,
          condition: item.weather[0].main
        });
        processedDays.add(dayKey);
      }
    });

    return dailyForecasts;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
};