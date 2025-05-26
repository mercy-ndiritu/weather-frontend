import React from 'react';
import { Star } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ weatherData, onToggleFavorite, isFavorite, loading }) => {
  if (loading) {
    return (
      <div className="glass-morphism rounded-2xl p-6 mb-6 shadow-lg">
        <div className="animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="h-8 bg-white/30 rounded w-32 mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-16"></div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-white/20 rounded-full"></div>
            <div>
              <div className="h-16 bg-white/30 rounded w-32 mb-2"></div>
              <div className="h-6 bg-white/20 rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-6 bg-white/30 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className="glass-morphism rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{weatherData.city}</h2>
          <p className="text-white/80">{weatherData.country}</p>
        </div>
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star 
            className={`w-6 h-6 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white/60'}`} 
          />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <WeatherIcon condition={weatherData.condition} size="w-16 h-16" />
        <div>
          <div className="text-6xl font-light text-white mb-2">
            {Math.round(weatherData.temperature)}°C
          </div>
          <p className="text-white/90 text-lg">{weatherData.condition}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-white/80 mb-4">
        <span>Feels like: {weatherData.feelsLike}°C</span>
        <span>Min: {weatherData.minTemp}°C / Max: {weatherData.maxTemp}°C</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/70 text-sm mb-1">Humidity</p>
          <p className="text-white text-xl font-semibold">{weatherData.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/70 text-sm mb-1">Wind</p>
          <p className="text-white text-xl font-semibold">{weatherData.windSpeed} m/s</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/70 text-sm mb-1">Sunrise</p>
          <p className="text-white text-xl font-semibold">{weatherData.sunrise}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/70 text-sm mb-1">Sunset</p>
          <p className="text-white text-xl font-semibold">{weatherData.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;