import { useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  addFavorite as addFavoriteToStorage,
  removeFavorite as removeFavoriteFromStorage,
  isFavorite as checkIsFavorite
} from '../services/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites on mount
  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites);
  }, []);

  // Add a city to favorites
  const addFavorite = useCallback((cityKey, weatherData) => {
    try {
      const updatedFavorites = addFavoriteToStorage(cityKey, weatherData);
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }, []);

  // Remove a city from favorites
  const removeFavorite = useCallback((cityKey) => {
    try {
      const updatedFavorites = removeFavoriteFromStorage(cityKey);
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }, []);

  // Check if a city is favorited
  const isFavorite = useCallback((cityKey) => {
    return checkIsFavorite(cityKey);
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((cityKey, weatherData) => {
    if (isFavorite(cityKey)) {
      return removeFavorite(cityKey);
    } else {
      return addFavorite(cityKey, weatherData);
    }
  }, [addFavorite, removeFavorite, isFavorite]);

  // Get favorite cities as simple array of city names
  const getFavoriteCityNames = useCallback(() => {
    return favorites.map(fav => fav.cityKey.split(',')[0]);
  }, [favorites]);

  // Get favorite by city key
  const getFavoriteByKey = useCallback((cityKey) => {
    return favorites.find(fav => fav.cityKey === cityKey);
  }, [favorites]);

  // Clear all favorites
  const clearAllFavorites = useCallback(() => {
    favorites.forEach(fav => {
      removeFavoriteFromStorage(fav.cityKey);
    });
    setFavorites([]);
  }, [favorites]);

  return {
    // State
    favorites,
    
    // Actions
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    
    // Utilities
    getFavoriteCityNames,
    getFavoriteByKey,
    clearAllFavorites,
    
    // Computed
    favoritesCount: favorites.length,
    hasFavorites: favorites.length > 0
  };
};