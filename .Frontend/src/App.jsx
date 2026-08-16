import { useEffect, useState } from "react";
import "./App.css";
import AppNavigation from "./routes/AppNavigation";
import { useNavigate, useLocation } from "react-router-dom";
import NoInternet from "./Components/NoInternet";
import { Modal } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout, restoreUserFromLocalStorage } from "./redux/actions";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modal, setModal] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);
  
  // Restore user session on app load
  useEffect(() => {
    dispatch(restoreUserFromLocalStorage());
  }, [dispatch]);
  
  const handleModal = () => {
    setModal(!modal);
  };
  
  const logoutTimeout = 15 * 60 * 1000;

  const handleLogout = () => {
    dispatch(logout());
    setModal(false);
    navigate("/auth");
  };

  const isPublicRoute = () => {
    const publicRoutes = ["/auth", "/reset", "/forgotten-password", "/signup-message"];
    return publicRoutes.includes(location.pathname);
  };

  useEffect(() => {
    if (logoutTimer) {
      clearInterval(logoutTimer);
    }

    if (localStorage.getItem("access_token") && !isPublicRoute()) {
      const intervalId = setInterval(() => {
        handleModal();
      }, logoutTimeout);

      setLogoutTimer(intervalId);
      return () => clearInterval(intervalId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isPublicRoute()) {
      return;
    }

    const accessToken = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (!accessToken || !userData) {
      navigate("/auth");
    }
  }, [location.pathname, navigate]);

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

  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) {
        clearInterval(logoutTimer);
        if (localStorage.getItem("access_token") && !isPublicRoute()) {
          const intervalId = setInterval(() => {
            handleModal();
          }, logoutTimeout);
          setLogoutTimer(intervalId);
        }
      }
    };

    const events = ['click', 'keypress', 'scroll', 'mousemove', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [logoutTimer, location.pathname]);

  return (
    <>
      {isOnline ? (
        <AppNavigation />
      ) : (
        <NoInternet />
      )}
      
      <Modal isOpen={modal} toggle={handleModal}>
        <div className="p-3 text-center small">
          <h4>
            <b>Your session has expired</b>
          </h4>
          <p>Please Sign in again to continue using Wenyfour.</p>
          <button
            className="app_button"
            onClick={handleLogout}
          >
            Sign in
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;