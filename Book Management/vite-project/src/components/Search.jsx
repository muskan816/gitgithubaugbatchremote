import { useState } from "react";
import BookList from "./BookList";
import { Books } from "../assets/utils/mockData"; // Ensure correct path

function Search() {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(Books);

  function handleSearch() {
    const filtered = Books.filter((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  return (
    <div>
      <div className="search">
        <h2>Search Books</h2>
        <div>
          <input
            type="text"
            className="search-input"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by title"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <BookList booksData={filteredBooks} />
    </div>
  );
}

export default Search;
