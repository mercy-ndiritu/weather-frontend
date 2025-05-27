import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Wind,
  Eye,
  CloudFog
} from 'lucide-react';

const WeatherIcon = ({ condition, size = "w-8 h-8" }) => {
  const getIconAndColor = (weatherCondition) => {
    const conditionLower = weatherCondition?.toLowerCase() || '';
    
    // Sunny/Clear conditions
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return { icon: Sun, color: 'text-yellow-400' };
    }
    
    // Cloudy conditions
    if (conditionLower.includes('partly cloudy') || conditionLower.includes('partly')) {
      return { icon: Cloud, color: 'text-orange-400' };
    }
    
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      return { icon: Cloud, color: 'text-gray-300' };
    }
    
    // Rain conditions
    if (conditionLower.includes('heavy rain') || conditionLower.includes('heavy')) {
      return { icon: CloudRain, color: 'text-blue-600' };
    }
    
    if (conditionLower.includes('moderate rain') || conditionLower.includes('moderate')) {
      return { icon: CloudRain, color: 'text-blue-500' };
    }
    
    if (conditionLower.includes('light rain') || conditionLower.includes('light') || conditionLower.includes('rain')) {
      return { icon: CloudRain, color: 'text-blue-400' };
    }
    
    if (conditionLower.includes('drizzle')) {
      return { icon: CloudDrizzle, color: 'text-blue-300' };
    }
    
    // Snow conditions
    if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return { icon: CloudSnow, color: 'text-blue-200' };
    }
    
    // Storm conditions
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return { icon: CloudLightning, color: 'text-purple-400' };
    }
    
    // Fog/Mist conditions
    if (conditionLower.includes('fog') || conditionLower.includes('mist') || conditionLower.includes('haze')) {
      return { icon: CloudFog, color: 'text-gray-400' };
    }
    
    // Windy conditions
    if (conditionLower.includes('windy') || conditionLower.includes('breezy')) {
      return { icon: Wind, color: 'text-blue-300' };
    }
    
    // Default fallback
    return { icon: Cloud, color: 'text-gray-400' };
  };

  const { icon: IconComponent, color } = getIconAndColor(condition);
  
  return <IconComponent className={`${size} ${color}`} />;
};

export default WeatherIcon;