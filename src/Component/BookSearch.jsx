import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { bookData } from "../data/data"; // Import your data

const BookSearch = ({ onClose, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Assuming bookData is a static import or a function returning books
  const books = bookData(); // If it's a static import, change this line accordingly

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    setSearchQuery(query); // Update search query

    // Filter books based on search query
    if (query) {
      const filteredSuggestions = books.filter((book) =>
        book.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Suggestion click handler
  const handleSuggestionClick = (book) => {
    setSearchQuery(book.name); // Set search query to selected book
    setSearchInput(book.name); // Set input to selected book's name
    setSuggestions([]); // Clear suggestions
    onClose(); // Close the search modal
  };

  // Handle Enter key press to trigger search or select the first suggestion
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]); // Select the first suggestion on Enter
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-96 bg-transparent text-white shadow-xl rounded-lg mx-4 lg:mx-auto lg:w-2/4">
      <IoMdClose
        className="absolute top-2 right-6 text-4xl text-gray-300 hover:text-white cursor-pointer transition-colors"
        onClick={onClose}
      />
      <div className="relative w-5/6 md:w-2/3 lg:w-1/2">
        <FaSearch className="absolute top-6 left-6 text-3xl text-gray-300 transition-all duration-300" />
        <input
          type="text"
          placeholder="Search for your favorite books..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="w-full pl-16 pr-6 py-6 text-xl text-gray-300 bg-transparent border border-gray-500 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-500 placeholder-gray-400 transition-all duration-300"
        />
      </div>

      {suggestions.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto"
          aria-live="assertive" // Make suggestions accessible for screen readers
        >
          <ul>
            {suggestions.map((book) => (
              <li
                key={book.id}
                className="flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer transition-all duration-200"
                onClick={() => handleSuggestionClick(book)}
              >
                <img
                  src={book.image} // Ensure you are accessing image property from the book object
                  alt={book.name}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div>
                  <p className="text-lg font-medium">{book.name}</p>
                  <p className="text-sm text-gray-400">by {book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-8 text-xl text-gray-300 italic opacity-80 hover:opacity-100 transition-all duration-300">
        Start typing to find the books you love!
      </p>
    </div>
  );
};

export default BookSearch;
