import { useEffect, useState } from "react";
import "./App.css";
import AppNavigation from "./routes/AppNavigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoInternet from "./Components/NoInternet";
import { Modal } from "reactstrap";

function App() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const logoutTimeout = 1 * 60 * 1000;

  const logout = () => {
    const keysToRemove = ["access_token", "user_data"];
    // Loop through the keys and remove each item
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem("access_token");
    if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("user_data")
    ) {
      navigate("/auth");
      window.location.reload();
    }
  };

  const reloadComponent = () => {
    // Implement the logic to reload your component here
    logout(); // Call the logout function
  };
  useEffect(() => {
    // Set up an interval to run the reloadComponent function every 15 minutes (15 * 60 * 1000 milliseconds)
    const intervalId = setInterval(() => {
      // reloadComponent();
      handleModal();
    }, logoutTimeout);

    // Clear the interval when the component is unmounted to prevent memory leaks
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);

  // Implementing No Internet
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div>
      <Provider store={store}>
        {isOnline ? (
          <AppNavigation />
        ) : (
          <>
            <NoInternet />
          </>
        )}
        <button onClick={handleModal}>isOpen</button>
        <Modal isOpen={modal}>
          <div className="p-3 text-center">
            <h4>
              <b>Your session has expired</b>
            </h4>
            <p>Please Sign in again to continue using Wenyfour</p>
            <button
              className="app_button"
              onClick={() => {
                logout();
                reloadComponent();
              }}
            >
              Sign in
            </button>
          </div>
        </Modal>
      </Provider>
    </div>
  );
}

export default App;
