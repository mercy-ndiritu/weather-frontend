// Weather utility functions and helpers

/**
 * Convert temperature between Celsius and Fahrenheit
 * @param {number} temp - Temperature value
 * @param {string} from - Source unit ('C' or 'F')
 * @param {string} to - Target unit ('C' or 'F')
 * @returns {number} Converted temperature
 */
export const convertTemperature = (temp, from, to) => {
  if (from === to) return temp;
  
  if (from === 'C' && to === 'F') {
    return (temp * 9/5) + 32;
  }
  
  if (from === 'F' && to === 'C') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

/**
 * Convert wind speed between different units
 * @param {number} speed - Wind speed value
 * @param {string} from - Source unit ('ms', 'kmh', 'mph')
 * @param {string} to - Target unit ('ms', 'kmh', 'mph')
 * @returns {number} Converted wind speed
 */
export const convertWindSpeed = (speed, from, to) => {
  if (from === to) return speed;
  
  // Convert to m/s first
  let ms = speed;
  if (from === 'kmh') ms = speed / 3.6;
  if (from === 'mph') ms = speed / 2.237;
  
  // Convert from m/s to target unit
  if (to === 'kmh') return ms * 3.6;
  if (to === 'mph') return ms * 2.237;
  return ms;
};

/**
 * Get wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Wind direction (N, NE, E, SE, S, SW, W, NW)
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Get weather condition category
 * @param {string} condition - Weather condition string
 * @returns {string} Category (clear, cloudy, rainy, snowy, stormy)
 */
export const getWeatherCategory = (condition) => {
  const conditionLower = condition?.toLowerCase() || '';
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return 'clear';
  }
  
  if (conditionLower.includes('cloud')) {
    return 'cloudy';
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'rainy';
  }
  
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return 'snowy';
  }
  
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return 'stormy';
  }
  
  return 'other';
};

/**
 * Get UV index description
 * @param {number} uvIndex - UV index value
 * @returns {object} UV index info with level and description
 */
export const getUVIndexInfo = (uvIndex) => {
  if (uvIndex <= 2) {
    return { level: 'Low', description: 'No protection needed', color: 'green' };
  } else if (uvIndex <= 5) {
    return { level: 'Moderate', description: 'Some protection needed', color: 'yellow' };
  } else if (uvIndex <= 7) {
    return { level: 'High', description: 'Protection essential', color: 'orange' };
  } else if (uvIndex <= 10) {
    return { level: 'Very High', description: 'Extra protection needed', color: 'red' };
  } else {
    return { level: 'Extreme', description: 'Stay indoors if possible', color: 'purple' };
  }
};

/**
 * Get air quality description
 * @param {number} aqi - Air Quality Index
 * @returns {object} Air quality info with level and description
 */
export const getAirQualityInfo = (aqi) => {
  if (aqi <= 50) {
    return { level: 'Good', description: 'Air quality is good', color: 'green' };
  } else if (aqi <= 100) {
    return { level: 'Moderate', description: 'Air quality is acceptable', color: 'yellow' };
  } else if (aqi <= 150) {
    return { level: 'Unhealthy for Sensitive Groups', description: 'Sensitive people should limit outdoor activity', color: 'orange' };
  } else if (aqi <= 200) {
    return { level: 'Unhealthy', description: 'Everyone should limit outdoor activity', color: 'red' };
  } else if (aqi <= 300) {
    return { level: 'Very Unhealthy', description: 'Avoid outdoor activity', color: 'purple' };
  } else {
    return { level: 'Hazardous', description: 'Emergency conditions', color: 'maroon' };
  }
};

/**
 * Calculate heat index (feels like temperature)
 * @param {number} temp - Temperature in Celsius
 * @param {number} humidity - Relative humidity percentage
 * @returns {number} Heat index in Celsius
 */
export const calculateHeatIndex = (temp, humidity) => {
  // Convert to Fahrenheit for calculation
  const tempF = convertTemperature(temp, 'C', 'F');
  const rh = humidity;
  
  // Heat index formula (valid for temp >= 80°F and humidity >= 40%)
  if (tempF >= 80 && rh >= 40) {
    const hi = -42.379 + 
               2.04901523 * tempF + 
               10.14333127 * rh - 
               0.22475541 * tempF * rh - 
               6.83783e-3 * tempF * tempF - 
               5.481717e-2 * rh * rh + 
               1.22874e-3 * tempF * tempF * rh + 
               8.5282e-4 * tempF * rh * rh - 
               1.99e-6 * tempF * tempF * rh * rh;
    
    // Convert back to Celsius
    return convertTemperature(hi, 'F', 'C');
  }
  
  // For lower temperatures/humidity, return original temperature
  return temp;
};

/**
 * Get clothing recommendation based on temperature and weather
 * @param {number} temp - Temperature in Celsius
 * @param {string} condition - Weather condition
 * @returns {string} Clothing recommendation
 */
export const getClothingRecommendation = (temp, condition) => {
  const category = getWeatherCategory(condition);
  
  let baseRecommendation = '';
  
   if (temp <= 0) {
    baseRecommendation = 'Heavy winter coat, warm layers, gloves, and hat';
  } else if (temp <= 10) {
    baseRecommendation = 'Warm jacket or coat, long sleeves';
  } else if (temp <= 20) {
    baseRecommendation = 'Light jacket or sweater, long pants';
  } else if (temp <= 30) {
    baseRecommendation = 'T-shirt and jeans or shorts';
  } else {
    baseRecommendation = 'Light clothing, shorts, and a hat';
  }

  // Adjust for weather condition
  if (category === 'rainy') {
    baseRecommendation += ', and don’t forget an umbrella or raincoat';
  } else if (category === 'snowy') {
    baseRecommendation += ', waterproof boots recommended';
  } else if (category === 'stormy') {
    baseRecommendation += ', stay indoors if possible';
  } else if (category === 'clear' && temp > 25) {
    baseRecommendation += ', sunglasses and sunscreen advised';
  }

  return baseRecommendation;
};