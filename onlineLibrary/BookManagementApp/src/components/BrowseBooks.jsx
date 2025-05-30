import { useEffect, useState } from "react";
import BookList from "./BookList";
import "./Book.css";

function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");  // Add searchText state here
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  // Fetch books whenever searchText or selectedCategory changes
  useEffect(() => {
    fetchBooks();
  }, [searchText, selectedCategory]);

  const fetchBooks = async () => {
    try {
      let query = searchText || "all";  // Default query is 'all' if no search term
      if (selectedCategory !== "All" && selectedCategory !== "uncategorized") {
        query += `+subject:${selectedCategory}`;
      }
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyALBHUjihVmt4ON1ynRyYUmIXOcyThDzz4`
      );
      const data = await res.json();
      setBooks(data.items || []);  // Set books based on the fetched data
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Dynamically generate categories
  const categories = [
    "All",
    ...new Set(
      books.flatMap((book) => book.volumeInfo.categories || ["uncategorized"])
    ),
  ];

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center bg-transparent m-12">
        <input
          type="text"
          className="input rounded-md border-solid border-2 w-1/2 mx-4 h-11 p-2"
          placeholder="Search by title or author"
          value={searchText}
          onChange={handleSearchInputChange}  // Update search text state
        />
        <button
          className="search-btn text-lg px-3 rounded-md"
          onClick={fetchBooks}  // Trigger fetchBooks on button click
        >
          Search
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="browse-books-sidebar bg-gray-700 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold mb-4 bg-gray-700">Select a Category</h2>
          <ul className="space-y-2 bg-gray-700">
            {categories.map((category) => (
              <li
                key={category}
                className={`bg-gray-700 cursor-pointer py-2 px-4 rounded-md ${
                  selectedCategory === category
                    ? "bg-orange-500 text-black"
                    : "hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedCategory} Books
          </h2>
          <BookList books={books} />
        </div>
      </div>
    </>
  );
}

export default BrowseBooks;
