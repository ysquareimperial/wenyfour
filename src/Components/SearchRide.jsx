import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, restoreUserFromLocalStorage } from "../redux/actions";
import moment from "moment";
import LivingFrom from "./States/LivingFrom";
export default function SearchRide() {
 

  const formData = {
    from: "",
    to: "",
    date: moment().format("YYYY-MM-DD"),
    numberOfSeats: 1,
  };
  const [searchData, setSearchData] = useState(formData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/search-results?start_loc=${searchData.from}&to_loc=${searchData.to}&date=${searchData.date}&seats=${searchData.numberOfSeats}`
    );
  };

  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check localStorage for user data
    const userData = JSON.parse(localStorage.getItem("access_token"));

    if (userData) {
      // Dispatch loginSuccess action to restore user data
      const { email, access_token, token_type, name, user_id } = userData;
      dispatch(loginSuccess(email, access_token, token_type, name, user_id));
    }
  }, [dispatch]);

  return (
    <div className="p-3 mt-5">
      {/* {JSON.stringify(searchData)}  */}
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Search for ride
      </h4>
      <form onSubmit={handleSubmit}>
        <div
          className="mt-3 d-flex justify-content-center search_ride_inputs_div"
          style={{ gap: 10 }}
        >
          <div>
            {/* <LivingFrom/> */}
            <label className="label">Leaving from</label>
            <select
              className="input_field search_ride_input"
              name="from"
              required
              value={searchData.from}
              onChange={handleChange}
            >
              <option style={{ color: "grey" }}></option>
              <option>Kano</option>
              <option>Jigawa</option>
              <option>Bavaria</option>
              <option>Hessen</option>
              <option>London</option>
              <option>Sokoto</option>
              <option>Zaria</option>
              <option>Manchester</option>
              <option>Ibadan</option>
              <option>Birmingham</option>
              <option>Suleja</option>
              <option>Ressss</option>
            </select>
          </div>
          <div>
            <label className="label">Going to</label>
            <select
              className="input_field search_ride_input"
              name="to"
              value={searchData.to}
              required
              onChange={handleChange}
            >
              <option style={{ color: "grey" }}></option>
              <option>Kano</option>
              <option>Jigawa</option>
              <option>Bavaria</option>
              <option>Hessen</option>
              <option>Manchester</option>
              <option>Zamfara</option>
              <option>London</option>
              <option>Kaduna</option>
              <option>Ibadan</option>
              <option>Suleja</option>
              <option>Birmingham</option>
              <option>Apiiiii</option>
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input
              className="input_field search_ride_input"
              type="date"
              min="2023-10-05"
              name="date"
              value={searchData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Seats</label>
            <input
              className="input_field search_ride_input"
              type="number"
              name="numberOfSeats"
              value={searchData.numberOfSeats}
              onChange={handleChange}
              min={1}
              max={8}
              required
            />
          </div>
        </div>
        <div className="m-0 text-center mt-3">
          <button className="app_button" style={{ padding: "13px 40px" }}>
            GO
          </button>
        </div>
      </form>
    </div>
  );
}
