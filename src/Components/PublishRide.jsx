import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Modal } from "reactstrap";
import { api } from "../helper/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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
        console.log(response?.status);
        if (response?.status === 201) {
          navigate("/published-rides");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    console.log(publishRide);
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
          console.log(response.data.status);
          if (response.data.status === false) {
            // navigate("/signup-message");
            handleModal();
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
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
          console.log(response.data);
          setCars(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, []);
  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Publish ride
      </h4>
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          {/* {JSON.stringify(cars)} */}

          {JSON.stringify(publishRide)}
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
              <Row>
                <Col md={6} className="mt-3">
                  {/* {JSON.stringify(xtoken)} */}
                  {/* {JSON.stringify(loggedInUser)} */}
                  <label className="label">When are you leaving?</label>
                  <input
                    className="input_field"
                    type="date"
                    required
                    name="date"
                    min="2023-10-05"
                    value={publishRide.date}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">
                    When is the passenger's pickup time?
                  </label>
                  <select
                    required
                    className="input_field"
                    name="time"
                    value={publishRide.time}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    <option>12:00 AM</option>
                    <option>1:00 AM</option>
                    <option>2:00 AM</option>
                    <option>3:00 AM</option>
                    <option>4:00 AM</option>
                    <option>5:00 AM</option>
                    <option>6:00 AM</option>
                    <option>7:00 AM</option>
                    <option>8:00 AM</option>
                    <option>8:00 AM</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                    <option>10:00 PM</option>
                    <option>11:00 PM</option>
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Leaving from</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="from_location"
                    value={publishRide.from_location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Going to</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="to_location"
                    value={publishRide.to_location}
                    onChange={handleChange}
                  />
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
                    min={0}
                    name="seat_price"
                    value={publishRide.seat_price}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Number of Seats</label>
                  <select
                    className="input_field"
                    name="seats"
                    value={publishRide.seats}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
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
                <div className="mt-3">
                  {loading ? (
                    <button
                      disabled={loading}
                      className="app_button p-2"
                      style={{ width: "100%" }}
                    >
                      Publishing...
                    </button>
                  ) : (
                    <button
                      className="app_button p-2"
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
            className="app_button"
            onClick={() => navigate("/create-new-car")}
          >
            Create one here
          </button>
        </div>
      </Modal>
    </div>
  );
}
