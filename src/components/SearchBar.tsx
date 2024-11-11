// src/components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  suggestions,
  onSuggestionClick,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-row justify-center gap-5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books..."
        className="border rounded-l px-4 py-2 w-80"
      />
      <button
        onClick={onSearch}
        className="bg-indigo-400 hover:bg-blue-800 text-white px-4 py-2 rounded-r text-yellow"
      >
        Find Books
      </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
