// Local Storage Service for managing favorites and app data
// Note: In Claude.ai artifacts, localStorage is not available
// This file shows the implementation that would work in a real browser environment

const STORAGE_KEYS = {
  FAVORITES: 'weather_favorites',
  LAST_SEARCHED: 'weather_last_searched',
  USER_PREFERENCES: 'weather_user_preferences'
};

// Since localStorage is not available in Claude.ai artifacts,
// we'll use in-memory storage as a fallback
let memoryStorage = {
  [STORAGE_KEYS.FAVORITES]: [],
  [STORAGE_KEYS.LAST_SEARCHED]: '',
  [STORAGE_KEYS.USER_PREFERENCES]: {}
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Generic storage functions
const getItem = (key) => {
  if (isLocalStorageAvailable()) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return memoryStorage[key] || null;
    }
  }
  return memoryStorage[key] || null;
};

const setItem = (key, value) => {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      memoryStorage[key] = value; // Keep memory storage in sync
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
      memoryStorage[key] = value; // Fallback to memory storage
    }
  } else {
    memoryStorage[key] = value;
  }
};

const removeItem = (key) => {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing from localStorage:', error);
    }
  }
  delete memoryStorage[key];
};

// Favorites management
export const getFavorites = () => {
  const favorites = getItem(STORAGE_KEYS.FAVORITES);
  return Array.isArray(favorites) ? favorites : [];
};

export const saveFavorites = (favorites) => {
  setItem(STORAGE_KEYS.FAVORITES, favorites);
};

export const addFavorite = (cityKey, weatherData) => {
  const favorites = getFavorites();
  const favoriteItem = {
    cityKey,
    city: weatherData.city,
    country: weatherData.country,
    addedAt: new Date().toISOString()
  };
  
  // Check if already exists
  const existingIndex = favorites.findIndex(fav => fav.cityKey === cityKey);
  
  if (existingIndex === -1) {
    favorites.push(favoriteItem);
    saveFavorites(favorites);
  }
  
  return favorites;
};

export const removeFavorite = (cityKey) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.cityKey !== cityKey);
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};

export const isFavorite = (cityKey) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.cityKey === cityKey);
};

// Last searched city
export const getLastSearched = () => {
  return getItem(STORAGE_KEYS.LAST_SEARCHED) || '';
};

export const saveLastSearched = (cityName) => {
  setItem(STORAGE_KEYS.LAST_SEARCHED, cityName);
};

// User preferences
export const getUserPreferences = () => {
  const defaultPreferences = {
    temperatureUnit: 'celsius', // celsius or fahrenheit
    timeFormat: '12hour', // 12hour or 24hour
    theme: 'default' // default, dark, light
  };
  
  const saved = getItem(STORAGE_KEYS.USER_PREFERENCES);
  return { ...defaultPreferences, ...saved };
};

export const saveUserPreferences = (preferences) => {
  const current = getUserPreferences();
  const updated = { ...current, ...preferences };
  setItem(STORAGE_KEYS.USER_PREFERENCES, updated);
  return updated;
};

// Clear all stored data
export const clearAllData = () => {
  removeItem(STORAGE_KEYS.FAVORITES);
  removeItem(STORAGE_KEYS.LAST_SEARCHED);
  removeItem(STORAGE_KEYS.USER_PREFERENCES);
  
  // Clear memory storage
  memoryStorage = {
    [STORAGE_KEYS.FAVORITES]: [],
    [STORAGE_KEYS.LAST_SEARCHED]: '',
    [STORAGE_KEYS.USER_PREFERENCES]: {}
  };
};

// Export storage status for debugging
export const getStorageInfo = () => {
  return {
    isLocalStorageAvailable: isLocalStorageAvailable(),
    favorites: getFavorites(),
    lastSearched: getLastSearched(),
    preferences: getUserPreferences()
  };
};