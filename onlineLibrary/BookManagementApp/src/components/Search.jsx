import { useEffect, useState } from "react";
import BookList from "./BookList";

const Search = ({ searchText }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [searchText]); 

  const getBooks = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText || "all"}&key=AIzaSyALBHUjihVmt4ON1ynRyYUmIXOcyThDzz4`
      );
      const data = await res.json();
      if (data.items) {
        setBooks(data.items);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center font-semibold m-3 text-4xl">Popular Books</h2>
      <BookList books={books} />
    </div>
  );
};

export default Search;
