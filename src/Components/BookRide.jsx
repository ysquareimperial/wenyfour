import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import icon from "../assets/images/path.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
import moment from "moment";
import numeral from "numeral";
import axios from "axios";
import { api } from "../helper/apis";
export default function BookRide() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const query = useQuery();
  const ride_id = query.get("ride_id");
  const date = query.get("date");
  const time = query.get("time");
  const from = query.get("from");
  const pickup_from = query.get("pickup_from");
  const to = query.get("to");
  const drop_off_at = query.get("drop_off_at");
  const seats = query.get("seats");
  const noOfSeats = parseInt(seats);
  const price = query.get("price");

  const totalPrice = (
    <p className="m-0 rides_avail" style={{ fontWeight: 700 }}>
      ₦{numeral(price * seats).format("0,0")}
    </p>
  );

  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${api}/rides/${ride_id}/book/ride`,
        {
          no_seats: noOfSeats,
        },
        {
          headers: {
            "x-token": xtoken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Review and book
      </h4>
      <Row>
        {/* {JSON.stringify(noOfSeats)}
        {JSON.stringify(ride_id)}
        {JSON.stringify(xtoken)} */}
        <Col md={3}></Col>
        <Col md={6} className="mt-5">
          <p className="rides_avail" style={{ fontWeight: 700 }}>
            {/* {date} at {time} */}
            {moment(date).format("ddd, DD MMMM")} at{" "}
            {moment(time, "HH:mm:ss").format("HH:mm A")}
          </p>
          <div className="d-flex" style={{ gap: 10 }}>
            <div>
              <img src={icon} style={{ width: 20 }} />
            </div>
            <div>
              <p className="rides_avail m-0" style={{ fontWeight: "bold" }}>
                {pickup_from}
              </p>
              <p className="rides_avail" style={{ fontSize: 13, color: "" }}>
                {from}
              </p>
              <p className="rides_avail m-0" style={{ fontWeight: "bold" }}>
                {drop_off_at}
              </p>
              <p className="rides_avail" style={{ fontSize: 13, color: "" }}>
                {to}
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <p className="m-0" style={{}}>
              Total price for {seats} passenger(s)
            </p>
            {totalPrice}
          </div>

          <div className="mt-3 text-center">
            {loading ? (
              <button
                className="app_button"
                disabled
                style={{ fontWeight: "bold", cursor: "not-allowed" }}
              >
                Booking...
              </button>
            ) : (
              <button
                className="app_button"
                style={{ fontWeight: "bold" }}
                // onClick={() => navigate("/payment-method")}
                onClick={handleSubmit}
              >
                Pay ₦{numeral(price * seats).format("0,0")}
              </button>
            )}
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
