import { useState } from "react";
import "./App.css";
import AppNavigation from "./routes/AppNavigation";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {

  return (
    <div>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </div>
  );
}

export default App;
