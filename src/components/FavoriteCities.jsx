import React from 'react';
import { Star, MapPin } from 'lucide-react';

const FavoriteCities = ({ favorites = [], onFavoriteClick, currentCity = '' }) => {
  // Early return if no favorites or invalid data
  if (!Array.isArray(favorites) || favorites.length === 0) return null;
  
  // Filter out invalid entries
  const validFavorites = favorites.filter(cityKey => 
    cityKey && typeof cityKey === 'string' && cityKey.trim().length > 0
  );
  
  if (validFavorites.length === 0) return null;

  const handleCityClick = (cityName) => {
    if (typeof onFavoriteClick === 'function') {
      onFavoriteClick(cityName);
    } else {
      console.warn('onFavoriteClick is not a function');
    }
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        <h3 className="text-lg font-bold text-white">Favorite Cities</h3>
      </div>
     
      <div className="flex flex-wrap gap-2">
        {validFavorites.map((cityKey, index) => {
          try {
            // Safely extract city name
            const cityName = cityKey.includes(',') 
              ? cityKey.split(',')[0].trim() 
              : cityKey.trim();
            
            if (!cityName) return null;
            
            const isCurrentCity = currentCity && cityName.toLowerCase() === currentCity.toLowerCase();
           
            return (
              <button
                key={`${cityKey}-${index}`} // More unique key
                onClick={() => handleCityClick(cityName)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  flex items-center gap-2
                  ${isCurrentCity
                    ? 'bg-white/30 text-white border-2 border-white/50'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20'
                  }
                `}
              >
                <MapPin className="w-3 h-3" />
                {cityName}
                {isCurrentCity && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </button>
            );
          } catch (error) {
            console.error('Error rendering favorite city:', cityKey, error);
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default FavoriteCities;