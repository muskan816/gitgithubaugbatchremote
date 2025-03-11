import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import userContext from "./assets/utils/userContext";
import {Provider} from "react-redux"
import appStore from "./assets/utils/appStore";

function App() {

  const [userName, setUserName] = useState("shauri")
  return (
    <Provider store={appStore}>
      <userContext.Provider value={{loggedInUser: userName, setUserName}}>
      <Header />
      <Outlet /> {/* This will render the child components (Search, About, Contact) */}
    </userContext.Provider>
    </Provider>
  );
}

export default App;
