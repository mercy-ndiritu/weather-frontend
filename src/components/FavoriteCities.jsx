import React from 'react';
import { Star, MapPin } from 'lucide-react';

const FavoriteCities = ({ favorites, onFavoriteClick, currentCity }) => {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="glass-morphism rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        <h3 className="text-lg font-bold text-white">Favorite Cities</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {favorites.map((cityKey, index) => {
          const cityName = cityKey.split(',')[0];
          const isCurrentCity = cityName === currentCity;
          
          return (
            <button
              key={index}
              onClick={() => onFavoriteClick(cityName)}
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
        })}
      </div>
    </div>
  );
};

export default FavoriteCities;