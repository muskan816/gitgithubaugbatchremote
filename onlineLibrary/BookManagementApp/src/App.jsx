import './App.css';
import Nav from './components/Nav';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search'; 
import Error from './components/Error';
import BrowseBooks from './components/BrowseBooks';
import AddBooks from './AddBooks';
import Header from './components/Header';

function App() {
  const [name, setName] = useState(""); // State for user's name
  const [searchText, setSearchText] = useState(""); // State for search query

  return (
    <Router>
      <Nav name={name} setName={setName} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header name={name} searchText={searchText} setSearchText={setSearchText} />
              <Search searchText={searchText} />
            </>
          }
        />
        <Route
          path="/browseBooks"
          element={<BrowseBooks searchText={searchText} />}
        />
        <Route path="/addBooks" element={<AddBooks />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
