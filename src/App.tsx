import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import axios from "axios";
import Footer from "./components/Footer";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  language?: string[];
  cover_i?: number;
  number_of_pages_median?: number;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [visibleBooksCount, setVisibleBooksCount] = useState<number>(18); // Initially show 18 books

  const genres = ["Fiction", "Non-Fiction", "Science", "History", "Fantasy"];

  const fetchBooks = async (query: string, genre: string = "") => {
    setLoading(true);
    setError("");
    try {
      const genreQuery = genre ? `&subject=${genre}` : "";
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}${genreQuery}`
      );
      const fetchedBooks: Book[] = response.data.docs.map((doc: any) => ({
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name,
        first_publish_year: doc.first_publish_year,
        publisher: doc.publisher,
        language: doc.language,
        cover_i: doc.cover_i,
        number_of_pages_median: doc.number_of_pages_median,
      }));
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks("Science");
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
    setVisibleBooksCount(18); // Reset visible book count
    fetchBooks(searchTerm, event.target.value);
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}&limit=5`
      );
      const titles = response.data.docs.map((doc: any) => doc.title);
      setSuggestions(titles);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setVisibleBooksCount(18); // Reset visible book count
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setVisibleBooksCount(18); // Reset visible book count on suggestion click
    fetchBooks(suggestion, selectedGenre);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setVisibleBooksCount(18); // Reset visible book count on search
      fetchBooks(searchTerm, selectedGenre);
      setSuggestions([]);
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null); // Close the details modal
  };

  // Show more books
  const handleViewAll = () => {
    setVisibleBooksCount(books.length); // Show all books
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md p-4 bg-gray-800">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <h1 className="text-3xl font-bold text-center text-indigo-400">NovelHunt</h1>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={handleInputChange}
            onSearch={handleSearch}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </header>

      <div className="container mx-auto px-20 py-4 h-full max-md:h-auto">
        <div className="mb-4">
          <label htmlFor="genre" className="mr-2">Filter by Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="border rounded px-4 py-2"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex  mt-4 loader-overlay fixed inset-0 items-center justify-center z-50">
            <div className="loader"></div> {/* The loader spinner */}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
            {books.length ? (
              books.slice(0, visibleBooksCount).map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onClick={() => handleBookClick(book)}
                  isSelected={selectedBook?.key === book.key}
                />
              ))
            ) : (
              <p className="text-center mt-4">No books found.</p>
            )}
          </div>
        )}
        {/* Show View All button only when not loading and if there are more books */}
        {!loading && visibleBooksCount < books.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleViewAll}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-20"
            >
              View All
            </button>
          </div>
        )}
      </div>

      {/* Display full book details if a book is selected */}
      <div>
        {selectedBook && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-lg w-11/12 md:w-/3 lg:w-1/2 xl:w-2/3 flex flex-col md:flex-row shadow-lg border-2 border-gray-300 relative">
              {/* Close Button at Top-Right */}
              <button
                className="absolute top-2 right-2 text-lg font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <svg
                  onClick={handleCloseDetails}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              {/* Left Section - Book Image */}
              <div className="w-full md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
                <img
                  src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                  alt={selectedBook.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Right Section - Book Details */}
              <div className="w-full md:w-2/3 px-4 md:px-6 py-4 flex flex-col justify-between text-gray-800">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{selectedBook.title}</h2>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-bold text-indigo-500">Author:</span> {selectedBook.author_name?.join(", ")}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-bold text-indigo-500">First Published:</span> {selectedBook.first_publish_year}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-bold text-indigo-500">Publisher:</span> {selectedBook.publisher?.join(", ")}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-bold text-indigo-500">Language:</span> {selectedBook.language?.join(", ")}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-bold text-indigo-500">Pages:</span> {selectedBook.number_of_pages_median || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default App;
