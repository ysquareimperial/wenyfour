import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Modal } from "reactstrap";
import { api } from "../helper/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BsArrowLeft } from "react-icons/bs";
import BackButton from "./BackButton";
import { nigeriaStates } from "./States";

export default function PublishRide() {
  const [modal, setModal] = useState(false);
  const formData = {
    date: moment().format("YYYY-MM-DD"),
    dropoff_location: "",
    from_location: "",
    gender: "",
    pickup_location: "",
    seat_price: "",
    seats: "",
    time: "",
    to_location: "",
    car_id: "",
  };
  const [cars, setCars] = useState([]);

  const [publishRide, setPublishRide] = useState(formData);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const navigate = useNavigate();

  const handleModal = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    setPublishRide({ ...publishRide, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      publishRide.car_id === "" ||
      publishRide.time === "" ||
      publishRide.seats == ""
    ) {
      alert("Please fill all the inputs!");
    } else {
      setLoading(true);
      axios
        .post(
          `${api}/rides/create`,
          {
            date: publishRide.date,
            dropoff_location: publishRide.dropoff_location,
            from_location: publishRide.from_location,
            gender: publishRide.gender,
            pickup_location: publishRide.pickup_location,
            seat_price: publishRide.seat_price,
            seats: publishRide.seats,
            time: publishRide.time,
            to_location: publishRide.to_location,
            car_id: publishRide.car_id,
          },
          {
            headers: {
              "x-token": xtoken,
            },
          }
        )
        .then((response) => {
          // console.log(response?.status);
          if (response?.status === 201) {
            navigate("/published-rides");
          }
          setLoading(false);
        })
        .catch((e) => {
          // console.log(e);
          setLoading(false);
        });
      // console.log(publishRide);
    }
  };

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/cars/check/user/cars`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response.data.status);
          if (response.data.status === false) {
            // navigate("/signup-message");
            handleModal();
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  }, []);

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/cars/user/all`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setCars(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  }, []);

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

  // Calculating min days
  function calculateMinDate() {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setDate(currentDate.getDate() - 0);

    // Ensure minimum day is 0
    if (minDate.getDate() < 0) {
      minDate.setDate(0);
    }

    const year = minDate.getFullYear();
    let month = minDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = minDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  // const options = [];
  // for (let h = 0; h < 24; h++) {
  //   for (let m = 1; m < 60; m += 10) {
  //     const hour = (h < 10 ? "0" : "") + h;
  //     const minute = (m < 10 ? "0" : "") + m;
  //     const time = hour + ":" + minute;
  //     options.push(<option key={time}>{time}</option>);
  //   }
  // }

  const options = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 10) {
    let hour = h % 12 || 12; // Convert 0 to 12
    const minute = (m < 10 ? "0" : "") + m;
    const ampm = h < 12 ? "AM" : "PM";
    hour = (hour < 10 ? "0" : "") + hour;
    const time = hour + ":" + minute + " " + ampm;
    options.push(<option key={time}>{time}</option>);
  }
}


  return (
    <div className="p-3 mt-5">
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          <BackButton headingText={"Publish a ride"} />

          {/* {JSON.stringify(publishRide)} */}
          {loading ? (
            <div
              class="text-center mt-5 d-flex align-items-center justify-content-center gap-2"
              style={{ color: "#0d6efd" }}
            >
              <span
                style={{ width: "2rem", height: "2rem" }}
                class="spinner-border"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <p style={{ fontSize: 13, color: "#0d6efd" }}>
                  You can only publish ride 3 days ahead of your trip
                </p>
              </div>
              <Row>
                <Col md={6} className="mt-3">
                  {/* {JSON.stringify(xtoken)} */}
                  {/* {JSON.stringify(loggedInUser)} */}
                  <label className="label">When are you leaving?</label>

                  <input
                    className="input_field"
                    type="date"
                    min={calculateMinDate()}
                    max={calculateMaxDate()}
                    name="date"
                    value={publishRide.date}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Passenger's pickup time</label>
                  <select
                    required
                    className="input_field"
                    name="time"
                    value={publishRide.time}
                    onChange={handleChange}
                  >
                    {options}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Leaving from</label>
                  <select
                    required
                    className="input_field"
                    name="from_location"
                    value={publishRide.from_location}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    {nigeriaStates.map((item, index) => (
                      <option>{item.name}</option>
                    ))}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Going to</label>
                  <select
                    required
                    className="input_field"
                    name="to_location"
                    value={publishRide.to_location}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    {nigeriaStates.map((item, index) => (
                      <option>{item.name}</option>
                    ))}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Exact meeting point</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="pickup_location"
                    value={publishRide.pickup_location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Exact drop-off point</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="dropoff_location"
                    value={publishRide.dropoff_location}
                    onChange={handleChange}
                  />
                </Col>
                {/* <Col md={6} className="mt-3">
                  <label className="label">Select your gender</label>
                  <select
                    required
                    className="input_field"
                    name="gender"
                    value={publishRide.gender}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </Col> */}
                <Col md={6} className="mt-3">
                  <label className="label">Price per seat</label>
                  <select
                    required
                    className="input_field"
                    name="seat_price"
                    value={publishRide.seat_price}
                    onChange={handleChange}
                  >
                    {publishRide.from_location ? (
                      <>
                        <option>-</option>
                        <option>100</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Select a car</label>
                  <select
                    className="input_field"
                    name="car_id"
                    value={publishRide.car_id}
                    onChange={handleChange}
                  >
                    <option value="">-</option>
                    {cars.map((car) => (
                      <option value={car.id} key={car.id}>
                        {car.brand} {car.model}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Number of Seats</label>
                  <select
                    className="input_field"
                    name="seats"
                    value={publishRide.seats}
                    onChange={handleChange}
                  >
                    {publishRide.car_id &&
                    cars.find((car) => car.id === publishRide.car_id).c_type ===
                      "Sedan" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "SUV" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "Bus" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "Sports Car" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </Col>
                <div className="mt-3">
                  {loading ? (
                    <button
                      disabled={loading}
                      className="app_button p-3"
                      style={{ width: "100%" }}
                    >
                      <div
                        class="text-centerd-flex align-items-center justify-content-center gap-2"
                        style={{ color: "white" }}
                      >
                        <span
                          style={{ width: "1rem", height: "1rem" }}
                          class="spinner-border"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </div>
                    </button>
                  ) : (
                    <button
                      className="app_button p-3"
                      style={{ width: "100%" }}
                    >
                      Publish
                    </button>
                  )}
                </div>
              </Row>
            </form>
          )}
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
      </Row>
      <Modal size="sm" isOpen={modal}>
        <div className="p-3 text-center">
          <p>You don't have registered car(s) yet.</p>
          <button
            className="app_button p-3"
            onClick={() => navigate("/create-new-car")}
          >
            Create one here
          </button>
        </div>
      </Modal>
    </div>
  );
}
