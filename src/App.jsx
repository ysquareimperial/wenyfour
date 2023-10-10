import { useEffect, useState } from "react";
import "./App.css";
import AppNavigation from "./routes/AppNavigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const logout = () => {
    const keysToRemove = ["access_token", "user_data"];
    // Loop through the keys and remove each item
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem("access_token");
    if (!localStorage.getItem("access_token" && "user_data")) {
      navigate("/auth");
    }
  };

  setInterval(function () {
    logout();
  }, 900000);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);
  return (
    <div>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </div>
  );
}

export default App;
