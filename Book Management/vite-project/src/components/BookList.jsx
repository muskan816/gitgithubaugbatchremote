import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book"; // Assuming you have a Book component to render individual books
import { useContext } from "react";
import userContext from "../assets/utils/userContext";

function BookList({ booksData }) {
  if (!Array.isArray(booksData)) {
    booksData = [];
  }
  const {setUserName} = useContext(userContext)

  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData(){
    const response = await fetch("https://freetestapi.com/api/v1/books")
    const data = await response.json()
    booksData(data)
    console.log(data)
  }

  return (
    <>
    <input type="text" name="" id="" onChange={(e) => setUserName(e.target.value)}/>
    <div className="bookList">
      {booksData.length > 0 ? (
        booksData.map((data) => (
          <Link key={data.id} to={`/book/${data.id}`} className="book-link">
            <Book bookDetails={data} />
          </Link>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
    </>
  );
}

export default BookList;
