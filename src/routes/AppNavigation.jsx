import { useRoutes } from "react-router-dom";
import AppIndex from "./AppIndex";
// import SignUp from "../Components/SignUp";
import Home from "../Components/Home";
import SignUpp from "../Components/SignUpp";
import PublishRide from "../Components/PublishRide";
import Profile from "../Components/Profile";
import SearchResults from "../Components/SearchResults";
import RideDetails from "../Components/RideDetails";
import RideRequests from "../Components/RideRequests";
import RiderProfile from "../Components/RiderProfile";
import ReportRide from "../Components/ReportRide";
import BookRide from "../Components/BookRide";
import WriteReport from "../Components/WriteReport";
import PaymentMethod from "../Components/PaymentMethod";
import YourRides from "../Components/YourRides";
import SearchRide from "../Components/SearchRide";
import EditProfile from "../Components/EditProfile";
import Settings from "../Components/Settings";
import DeleteAccount from "../Components/DeleteAccount";
import CreateCar from "../Components/CreateCar";
import SignupMessage from "../Components/SignupMessage";
import EditCar from "../Components/EditCar";
import MyVehicles from "../Components/MyVehicles";
import MyBookings from "../Components/MyBookings";

function AppNavigation() {
  let element = useRoutes([
    {
      element: <AppIndex />,
      children: [
        // { index: true, element: <AppIndex /> },
        // {
        //   path: "/home",
        //   element: <Home />,
        // },
        {
          path: "/",
          element: <SearchRide />,
          children: [{ index: true }],
        },
        {
          path: "/publish-ride",
          element: <PublishRide />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/search-results",
          element: <SearchResults />,
        },
        {
          path: "/ride-details",
          element: <RideDetails />,
        },
        {
          path: "/ride-requests",
          element: <RideRequests />,
        },
        {
          path: "/my-bookings",
          element: <MyBookings />,
        },
        {
          path: "/rider-profile",
          element: <RiderProfile />,
        },
        {
          path: "/report-ride",
          element: <ReportRide />,
        },
        {
          path: "/book-ride",
          element: <BookRide />,
        },
        {
          path: "/write-report",
          element: <WriteReport />,
        },
        {
          path: "/payment-method",
          element: <PaymentMethod />,
        },
        {
          path: "/published-rides",
          element: <YourRides />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/delete-account",
          element: <DeleteAccount />,
        },
        {
          path: "/my-vehicles",
          element: <MyVehicles />,
        },
        { path: "/create-new-car", element: <CreateCar /> },
        { path: "/edit-car", element: <EditCar /> },
      ],
    },
    {
      path: "/signup-message",
      element: <SignupMessage />,
    },
    {
      path: "/auth",
      element: <SignUpp />,
    },
  ]);
  return element;
}
export default AppNavigation;
