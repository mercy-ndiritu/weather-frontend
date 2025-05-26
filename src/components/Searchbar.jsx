import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, searchValue, setSearchValue, loading }) => {
  const handleSubmit = () => {
    if (searchValue.trim() && !loading) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 mb-8">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for a city..."
        disabled={loading}
        className="flex-1 px-4 py-3 rounded-lg border-0 bg-white/90 backdrop-blur-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !searchValue.trim()}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        {loading ? (
          <div className="w-4 h-4 loading-spinner"></div>
        ) : (
          <Search className="w-4 h-4" />
        )}
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;