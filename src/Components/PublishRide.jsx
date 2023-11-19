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
      publishRide.gender === "" ||
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
    maxDate.setDate(currentDate.getDate() + 3);

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
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          {/* <div className="d-flex align-items-center justify-content-between">
            <BsArrowLeft className="back_button" size="2.5rem" />
            <h4
              className="page_title"
              style={{ fontWeight: 900, fontSize: 40 }}
            >
              Publish a ride
            </h4>
          </div> */}
          <BackButton headingText={"Publish a ride"} />
          {/* {JSON.stringify(cars)} */}

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
                    min="2023-10-05"
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
                    <option>-</option>
                    <option>00:10</option>
                    <option>00:20</option>
                    <option>00:30</option>
                    <option>00:40</option>
                    <option>00:50</option>
                    <option>01:10</option>
                    <option>01:20</option>
                    <option>01:30</option>
                    <option>01:40</option>
                    <option>01:50</option>
                    <option>02:10</option>
                    <option>02:20</option>
                    <option>02:30</option>
                    <option>02:40</option>
                    <option>02:50</option>
                    <option>03:10</option>
                    <option>03:20</option>
                    <option>03:30</option>
                    <option>03:40</option>
                    <option>03:50</option>
                    <option>04:10</option>
                    <option>04:20</option>
                    <option>04:30</option>
                    <option>04:40</option>
                    <option>04:50</option>
                    <option>05:10</option>
                    <option>05:20</option>
                    <option>05:30</option>
                    <option>05:40</option>
                    <option>05:50</option>
                    <option>06:10</option>
                    <option>06:20</option>
                    <option>06:30</option>
                    <option>06:40</option>
                    <option>06:50</option>
                    <option>07:10</option>
                    <option>07:20</option>
                    <option>07:30</option>
                    <option>07:40</option>
                    <option>07:50</option>
                    <option>08:10</option>
                    <option>08:20</option>
                    <option>08:30</option>
                    <option>08:40</option>
                    <option>08:50</option>
                    <option>09:10</option>
                    <option>09:20</option>
                    <option>09:30</option>
                    <option>09:40</option>
                    <option>09:50</option>
                    <option>10:00</option>
                    <option>10:10</option>
                    <option>10:20</option>
                    <option>10:30</option>
                    <option>10:40</option>
                    <option>10:50</option>
                    <option>11:00</option>
                    <option>11:10</option>
                    <option>11:20</option>
                    <option>11:30</option>
                    <option>11:40</option>
                    <option>11:50</option>
                    <option>12:00</option>
                    <option>12:10</option>
                    <option>12:20</option>
                    <option>12:30</option>
                    <option>12:40</option>
                    <option>12:50</option>
                    <option>13:00</option>
                    <option>13:10</option>
                    <option>13:20</option>
                    <option>13:30</option>
                    <option>13:40</option>
                    <option>13:50</option>
                    <option>14:00</option>
                    <option>14:10</option>
                    <option>14:20</option>
                    <option>14:30</option>
                    <option>14:40</option>
                    <option>14:50</option>
                    <option>15:00</option>
                    <option>15:10</option>
                    <option>15:20</option>
                    <option>15:30</option>
                    <option>15:40</option>
                    <option>15:50</option>
                    <option>16:00</option>
                    <option>16:10</option>
                    <option>16:20</option>
                    <option>16:30</option>
                    <option>16:40</option>
                    <option>16:50</option>
                    <option>17:00</option>
                    <option>17:10</option>
                    <option>17:20</option>
                    <option>17:30</option>
                    <option>17:40</option>
                    <option>17:50</option>
                    <option>18:00</option>
                    <option>18:10</option>
                    <option>18:20</option>
                    <option>18:30</option>
                    <option>18:40</option>
                    <option>18:50</option>
                    <option>19:00</option>
                    <option>19:10</option>
                    <option>19:20</option>
                    <option>19:30</option>
                    <option>19:40</option>
                    <option>19:50</option>
                    <option>20:00</option>
                    <option>20:10</option>
                    <option>20:20</option>
                    <option>20:30</option>
                    <option>20:40</option>
                    <option>20:50</option>
                    <option>21:00</option>
                    <option>21:10</option>
                    <option>21:20</option>
                    <option>21:30</option>
                    <option>21:40</option>
                    <option>21:50</option>
                    <option>22:00</option>
                    <option>22:10</option>
                    <option>22:20</option>
                    <option>22:30</option>
                    <option>22:40</option>
                    <option>22:50</option>
                    <option>23:00</option>
                    <option>23:10</option>
                    <option>23:20</option>
                    <option>23:30</option>
                    <option>23:40</option>
                    <option>23:50</option>''
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Leaving from</label>
                  {/* <input
                    className="input_field"
                    required
                    type="text"
                    name="from_location"
                    value={publishRide.from_location}
                    onChange={handleChange}
                  /> */}
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
                  {/* <input
                    className="input_field"
                    required
                    type="text"
                    name="to_location"
                    value={publishRide.to_location}
                    onChange={handleChange}
                  /> */}
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
                <Col md={6} className="mt-3">
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
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Price per seat</label>
                  <input
                    className="input_field"
                    type="number"
                    required
                    min={0}
                    name="seat_price"
                    value={publishRide.seat_price}
                    onChange={handleChange}
                  />
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
      <Modal isOpen={modal}>
        <div className="p-3 text-center">
          <p>You don't have registered car(s) yet</p>
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
