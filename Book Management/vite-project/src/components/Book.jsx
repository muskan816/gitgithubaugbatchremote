import "./style.css";
import { useContext } from "react";
import userContext from "../assets/utils/userContext";

function Book({ bookDetails }) {
  const data = useContext(userContext);
  return (
    <div className="book-card">
      <img
        src={bookDetails.coverImage}
        alt={bookDetails.title}
        width="200px"
        height="200px"
        className="book-cover"
      />
      <div className="book-details">
        <h2 className="book-title">{bookDetails.title}</h2>
        <p className="book-author">{bookDetails.author}</p>
        <p className="book-description">{bookDetails.description}</p>
        <p className="book-description">{data.loggedInUser}</p>
      </div>
    </div>
  )
}

export default Book;
