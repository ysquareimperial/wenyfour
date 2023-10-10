import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";

export default function YourRides() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [rides, setRides] = useState([]);
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/
  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/rides/published/rides`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response.data);
          setRides(response?.data);
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
        Published rides
      </h4>
      <Row className="">
        <Col md={3}></Col>
        <Col md={6}>
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
            <>
              {/* {JSON.stringify(rides)} */}
              {rides?.map((item, index) => (
                <Card
                  key={index}
                  className="mb-3 mt-3 results_card shadow-sm p-3"
                  onClick={() => navigate(`/ride-requests?ride_id=${item?.id}`)}
                >
                  <Row>
                    <Col md={6} sm={8} xs={8}>
                      <p>{moment(item?.date).format("MMM DD, YYYY")}</p>
                      <div className="d-flex" style={{ gap: 10 }}>
                        <div>
                          <p className="rides_avail">
                            {" "}
                            {moment(item?.time, "HH:mm:ss").format("HH:mm A")}
                          </p>

                          {/* <p className="rides_avail">12:30 AM</p> */}
                        </div>
                        <div>
                          <img src={icon} style={{ width: 12 }} />
                        </div>
                        <div>
                          <p className="rides_avail">
                            <span style={{ color: "grey" }}>
                              {item?.pickup_location},
                            </span>{" "}
                            {item?.from_location}
                          </p>
                          <p className="rides_avail">
                            <span style={{ color: "grey" }}>
                              {item?.dropoff_location},
                            </span>{" "}
                            {item?.to_location}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} sm={4} xs={4}>
                      <p className="rides_avail" style={{ float: "right" }}>
                        NGN {item?.seat_price}
                      </p>
                    </Col>
                  </Row>
                </Card>
              ))}
              {rides.length === 0 ? (
                <div className="text-center mt-3 mb-5">
                  <span className="">
                    You don't have any published ride(s) yet
                  </span>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
