import React, { useState, useEffect, useRef } from "react";

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
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close the suggestions when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };

    // Add event listener to document to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSuggestionsVisible(e.target.value.length > 0); // Show suggestions only when there is text
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setSearchTerm(suggestion); // Optional: You can set the selected suggestion as the search term
    setIsSuggestionsVisible(false); // Close suggestions after selecting
  };

  return (
    <div className="relative" ref={searchBarRef}>
      <div className="flex flex-row justify-center gap-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
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
      {isSuggestionsVisible && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
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
