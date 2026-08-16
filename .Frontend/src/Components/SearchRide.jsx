import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Places from "./Places";

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

  //Calculating max days
  function calculateMaxDate() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 7);

    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = maxDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Search for ride
      </h4>
      <form onSubmit={handleSubmit}>
        <div
          className="mt-5 d-flex justify-content-center search_ride_inputs_div"
          style={{ gap: 10 }}
        >
          <div>
            <Places
              label="Leaving from"
              name="from"
              value={searchData.from}
              onChange={handleChange}
            />
          </div>
          <div>
            <Places
              label="Going to"
              name="to"
              value={searchData.to}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">Date</label>
            <input
              className="input_field search_ride_input"
              type="date"
              min="2023-10-05"
              max={calculateMaxDate()}
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
        <div className="m-0 text-center mt-5">
          <button className="app_button" style={{ padding: "13px 40px" }}>
            GO
          </button>
        </div>
      </form>
    </div>
  );
}