import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Card, Col, Row } from "reactstrap";
import profile from "../assets/images/profile.png";
import icon from "../assets/images/path.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useQuery } from "../helpers/helpers";
import axios from "axios";
import { api } from "../helper/apis";
import numeral from "numeral";
import { PiUsersFour } from "react-icons/pi";

export default function RideRequests() {
  const [loading, setLoading] = useState(false);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [rideDetails, setRideDetails] = useState({});
  const [ridersArray, setRidersArray] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();
  const ride_id = query.get("ride_id");
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  //checks if there is access_token in local storage
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);

  //Start of fetching ride details
  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/rides/${ride_id}/ride`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response?.data);
          setRideDetails(response?.data);

          //Start of fetching riders profile based on ride passengers' user_id
          const passengers = response?.data?.passengers;
          const userPromises = passengers.map((item) =>
            axios.get(`${api}/auth/users/${item.user_id}/user`, {
              headers: {
                "x-token": xtoken,
              },
            })
          );

          Promise.all(userPromises)
            .then((userResponses) => {
              const usersArray = userResponses.map(
                (userResponse) => userResponse.data
              );
              console.log(usersArray, "zzzzzzzzzz");
              setRidersArray(usersArray);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("error fetching user data", err);
            });
          //End of fetching riders profile based on ride passengers' user_id
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching ride data", err);
        });
    }
  }, []);
  //End of fetching ride details

  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Ride requests
      </h4>
      <Row>
        {/* {JSON.stringify(ridersArray)} */}
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className="mt-3">
            <div>
              {loading ? (
                <div className="text-center">
                  <p>Loading ride details...</p>
                </div>
              ) : (
                <>
                  <Row>
                    <Col md={9} sm={9} xs={9}>
                      <p>
                        <b>
                          {moment(rideDetails?.date).format("MMM DD, YYYY")}
                        </b>
                      </p>
                      <div className="d-flex" style={{ gap: 10 }}>
                        <div>
                          <p className="rides_avail">
                            <b>
                              {moment(rideDetails?.time, "HH:mm:ss").format(
                                "HH:mm A"
                              )}
                            </b>
                          </p>
                        </div>
                        <div>
                          <img src={icon} style={{ width: 12 }} />
                        </div>
                        <div>
                          <p className="rides_avail">
                            <span style={{ color: "grey" }}>
                              {rideDetails?.pickup_location},
                            </span>{" "}
                            <b>{rideDetails?.from_location}</b>
                          </p>
                          <p className="rides_avail">
                            <span style={{ color: "grey" }}>
                              {rideDetails?.dropoff_location},
                            </span>{" "}
                            <b>{rideDetails?.to_location}</b>
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} sm={3} xs={3} className="">
                      <p className="rides_avail" style={{ float: "right" }}>
                        <b>₦{numeral(rideDetails?.seat_price).format("0,0")}</b>
                      </p>
                    </Col>
                  </Row>
                  <div className="divider mb-3"></div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <PiUsersFour
                        color="#0D6EFD"
                        size="1.5rem"
                        className="m-0"
                      />
                      <p className="m-0">
                        <b>Passengers</b>
                      </p>
                    </div>
                    <div className="divider mb-3 mt-3"></div>
                    {ridersArray.map((item, index) => (
                      <>
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              src={profile}
                              className="result profile"
                              alt="profile_pic"
                              style={{ marginRight: 20 }}
                            />
                          </div>
                          <div>
                            <p style={{ fontWeight: "bold", margin: 0 }}>
                              {item?.name}
                            </p>
                            <p
                              style={{ color: "grey", fontSize: 13, margin: 0 }}
                            >
                              {item?.email}
                            </p>
                            <p className="m-0">{item?.phone}</p>
                          </div>
                        </div>
                        <hr className="hr" />
                      </>
                    ))}
                    {ridersArray.length === 0 ? (
                      <div className="text-center">
                        <p>This ride has not been reserved by anyone so far.</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
      </Row>
    </div>
  );
}
