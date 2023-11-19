import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "reactstrap";
import icon from "../assets/images/path.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
import moment from "moment";
import numeral from "numeral";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import { api } from "../helper/apis";
import { BiArrowBack } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import BackButton from "./BackButton";
export default function BookRide() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
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
    // console.log("fdfasfasd");
    // e.preventDefault();
    // setLoading(true);
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
        if (response.status === 200) {
          handleModal();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: "yasir@example.com",
    name: "yasir",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_6bc5f797ff907f312e689ed4547705e0ce6ee058",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    console.log("seat(s) booked");
    // navigate("/my-bookings");
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
        if (response.status === 200) {
          handleModal();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const PaystackHookExample = ({ ridePrice }) => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="app_button"
          style={{ fontWeight: "bold" }}
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay ₦{ridePrice}
        </button>
      </div>
    );
  };

  return (
    <div className="p-3 mt-5">
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="">
          {/* <div className="d-flex align-items-center mb-5 gap-4">
            <BackButton />
            <h4
              className="text-center page_title"
              style={{ fontWeight: 900, fontSize: 40 }}
            >
              Review and boo
            </h4>
          </div> */}
          <BackButton headingText={"Review and book"} />
          <p className="rides_avail mt-5" style={{ fontWeight: 700 }}>
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
          <div className="text-center">
            {/* <PaystackHookExample
              ridePrice={numeral(price * seats).format("0,0")}
            /> */}
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Modal isOpen={modal}>
        <div className="p-3 text-center">
          <p>Ride booked successfully</p>
          <button
            className="app_button"
            onClick={() => navigate("/my-bookings")}
          >
            View ordered ride(s)
          </button>
        </div>
      </Modal>
    </div>
  );
}
