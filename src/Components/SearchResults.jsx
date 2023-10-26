import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Card, Col, Row } from "reactstrap";
import profile from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { AiFillStar } from "react-icons/ai";
import { api } from "../helper/apis";
import axios from "axios";
import { useQuery } from "../helpers/helpers";
import moment from "moment";
import numeral from "numeral";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
export default function SearchResults() {
  const query = useQuery();
  const start_loc = query.get("start_loc");
  const to_loc = query.get("to_loc");
  const _date = query.get("date");
  const seats = query.get("seats");
  const navigate = useNavigate();
  const [availableRides, setAvailableRides] = useState([]);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  const [loading, setLoading] = useState(false);
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/

  const getAvailableRides = () => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(
          // `${api}/rides/q/search/ride?start_loc=${start_loc}&to_loc=${to_loc}`,
          `https://api.wenyfour.com/api/rides/q/search/ride?start_loc=Kano&to_loc=Jigawa&seats=2`, 
          {
            headers: {
              "x-token": xtoken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setAvailableRides(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getAvailableRides();
  }, []);

  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Available rides
      </h4>
      {/* {JSON.stringify(availableRides)} */}
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
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="mt-3">
              <p className="results_date">
                {moment(_date).format("ddd, DD MMM")}
              </p>
              <p className="from_to">
                <b>{start_loc}</b> <BsArrowRight size="1.5rem" />{" "}
                <b>{to_loc}</b>
              </p>
              <div className="rides-avail-div mb-3">
                <p className="rides_avail m-0">
                  {availableRides.length} rides(s) available
                </p>
              </div>
            </div>
            <>
              {availableRides.map((item, index) => (
                <Card
                  key={index}
                  className="mb-3 results_card shadow-sm p-3"
                  onClick={() =>
                    navigate(
                      `/ride-details?id=${item?.id}&car_id=${item?.car_id}&driver_id=${item?.driver_id}&seats=${seats}`
                    )
                  }
                >
                  <Row className="m-0">
                    <Col className="m-0" md={6} sm={7} xs={7}>
                      <div className="d-flex" style={{ gap: 10 }}>
                        <div>
                          <p
                            className="rides_avail"
                            style={{ fontWeight: "bold" }}
                          >
                            {moment(item?.time, "HH:mm:ss").format("HH:mm A")}
                            {/* {item?.time} */}
                          </p>
                          <p className="rides_avail">{}</p>
                        </div>
                        <div>
                          <img src={icon} style={{ width: 12 }} />
                        </div>
                        <div>
                          <p className="rides_avail ">{item?.from_location}</p>
                          <p className="rides_avail m-0">{item?.to_location}</p>
                        </div>
                      </div>
                    </Col>
                    <Col className="m-0" md={6} sm={5} xs={5}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <div>
                          <p className="rides_avail">
                            <b>
                              ₦{numeral(item?.seat_price).format("0,0")}
                              {/* <span style={{ fontSize: "small" }}> Seat</span> */}
                            </b>
                          </p>
                        </div>
                        <div>
                          <p className="m-0">
                            <MdOutlineAirlineSeatReclineExtra
                              size="1.5rem"
                              style={{ color: "#0d6efd" }}
                            />
                            - <b>{item?.available_seats}</b>
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}{" "}
              {availableRides.length === 0 ? (
                <div className="text-center mb-5">
                  <span className="">
                    No available rides for today between these cities.
                  </span>
                </div>
              ) : (
                ""
              )}
            </>
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    </div>
  );
}
