import { useParams } from "react-router-dom";
import { Books } from "../assets/utils/mockData";

function BookDetails() {
  const params = useParams();
  const book = Books.filter((book) => book.id == params.id);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <>
      <h1>{`Book Details ${params.id}`}</h1><br/>
      {book.map((book) => {
        return (
          <>
            <h2>{book.title}</h2>
            <h2>{book.description}</h2>
            <img src={book.coverImage} alt="" width="200px" height="200px" />
            <h2>{book.author}</h2>
          </>
        );
      })}
    </>
  );
}

export default BookDetails;
