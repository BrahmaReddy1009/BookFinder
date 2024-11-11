import React from "react";

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

interface BookCardProps {
  book: Book;
  onClick: () => void;
  isSelected: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick, isSelected }) => {
  const coverImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150";

  return (
    <div
      className={`relative group ${isSelected ? "bg-gray-200" : "bg-white"} rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 mb-4`}
      onClick={onClick}
    >
      <img
        src={coverImageUrl}
        alt={book.title}
        className="w-full h-60  rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 rounded-lg">
        <div className="text-center text-white p-4 space-y-2">
          {/* Book Title */}
          <h3 className="text-lg font-semibold">{book.title}</h3>
          
          {/* Author Name */}
          {book.author_name && book.author_name.length > 0 && (
            <p className="text-sm font-medium">{book.author_name.join(", ")}</p>
          )}

          {/* Published Year */}
          {book.first_publish_year && (
            <p className="text-xs">{book.first_publish_year}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
