import React from 'react';
import WeatherIcon from './WeatherIcon';

const ForecastCard = ({ forecast, loading }) => {
  if (loading) {
    return (
      <div className="glass-morphism rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-white/30 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-center">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/15 rounded mb-3"></div>
                <div className="h-8 w-8 bg-white/20 rounded-full mx-auto mb-3"></div>
                <div className="h-5 bg-white/25 rounded mb-1"></div>
                <div className="h-3 bg-white/15 rounded mb-2"></div>
                <div className="h-3 bg-white/15 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="glass-morphism rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="text-center p-3 rounded-xl hover:bg-white/10 transition-colors duration-200">
            <p className="text-white/80 font-medium mb-2">{day.day}</p>
            <p className="text-white/60 text-sm mb-3">{day.date}</p>
            <div className="flex justify-center mb-3">
              <WeatherIcon condition={day.condition} size="w-8 h-8" />
            </div>
            <p className="text-white font-bold text-lg mb-1">{day.temp}°C</p>
            <p className="text-white/60 text-xs mb-2">{day.tempRange}</p>
            <p className="text-white/70 text-xs">{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;