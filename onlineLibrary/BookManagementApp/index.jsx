import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the store
import App from "./App"; // Import the main App component

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
