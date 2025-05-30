import './Book.css';


function Header({ name, searchText, setSearchText }) {
  const handleSearch = () => {
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <div className="header flex flex-col justify-between">
      <h1 className="head text-6xl flex justify-center m-4 font-semibold bg-transparent">
        Welcome, {name || "Guest"}
      </h1>
      <div className="flex justify-center bg-transparent m-12">
        <input
          type="text"
          className="input rounded-md border-solid border-2 w-1/2 mx-4 h-11 p-2"
          placeholder="Search by title or author"
          value={searchText || ""}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn text-lg px-3 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
