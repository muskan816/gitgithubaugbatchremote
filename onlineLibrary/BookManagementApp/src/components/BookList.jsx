import { useState } from "react";
import "./Book.css";

function BookList({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const viewDetails = (book) => {
    setSelectedBook(book);
  };

  const closeDetails = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="relative overflow-hidden bg-[#f2f2f2] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-[1.1]"
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"}
              alt={book.volumeInfo.title}
              className="w-full max-h-72 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold text-gray-800">
                {book.volumeInfo.title.length > 20
                  ? book.volumeInfo.title.slice(0, 20) + "..."
                  : book.volumeInfo.title}
              </h5>
              <p className="text-sm text-gray-500">
                {(book.volumeInfo.authors?.join(", ") || "Unknown Author").length > 40
                  ? (book.volumeInfo.authors?.join(", ") || "Unknown Author").slice(0, 40) + "..."
                  : (book.volumeInfo.authors?.join(", ") || "Unknown Author")}
              </p>
              <button
                className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                onClick={() => viewDetails(book)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#f2f2f2] rounded-lg shadow-lg w-11/12 p-6 relative h-[700px] flex">
            <button
              className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeDetails}
            >
              Back to Browse
            </button>
            <img
              src={selectedBook.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"}
              alt={selectedBook.volumeInfo.title}
              className="w-full object-cover rounded-lg mb-4"
            />
            <div className="m-5">
            <h3 className="text-xl font-bold mb-2">
              {selectedBook.volumeInfo.title}
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Author(s):</strong>{" "}
              {selectedBook.volumeInfo.authors?.join(", ") || "Unknown"}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {selectedBook.volumeInfo.description || "No description available"}
            </p>
            <p className="text-gray-600">
            <strong>Rating:</strong>{" "}
            {selectedBook.volumeInfo.averageRating || "No rating available"}/5
            </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookList;
