import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import profile from "../assets/images/profile.png";
import { api } from "../helper/apis";
import numeral from "numeral";
import icon from "../assets/images/path.png";
import { PiUsersFour } from "react-icons/pi";
import moment from "moment";
export default function MyBookings() {
  const [loading, setLoading] = useState(false);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [rideDetails, setRideDetails] = useState([]);
  const [ridersArray, setRidersArray] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const userId = userData?.user_id;

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/rides/${userId}/ordered/ride`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response?.data);
          setRideDetails(response?.data);

          // Iterate through the response array
          const passengersArray = response?.data.map((ride) => {
            // Iterate through the passengers array within each ride object
            const passengers = ride.passengers.map((passenger) =>
              axios.get(`${api}/auth/users/${passenger.user_id}/user`, {
                headers: {
                  "x-token": xtoken,
                },
              })
            );

            // Use Promise.all to fetch user data for all passengers of this ride
            return Promise.all(passengers);
          });

          // Use Promise.all to wait for all the passenger data requests to complete
          Promise.all(passengersArray)
            .then((userResponses) => {
              // userResponses is an array of arrays containing passenger data
              const ridersArray = userResponses.map((userResponse) =>
                userResponse.map((userData) => userData.data)
              );
              console.log(ridersArray, "zzzzzzzzzz");
              setRidersArray(ridersArray);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("error fetching user data", err);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching ride data", err);
        });
    }
  }, []);

  return (
    <div className="mt-5">
      <CompHeader header={"My Bookings"}>
        <Row>
          {/* {JSON.stringify(ridersArray)} */}
          <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
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
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              {/* {JSON.stringify(rideDetails)} */}
              {/* {JSON.stringify(ridersArray)} */}
              {rideDetails.map((item, index) => (
                <div className="mt-3" key={index}>
                  <div>
                    <Row>
                      <Col md={9} sm={9} xs={9}>
                        <p>
                          <b>{moment(item?.date).format("MMM DD, YYYY")}</b>
                        </p>
                        <div className="d-flex" style={{ gap: 10 }}>
                          <div>
                            <p className="rides_avail">
                              <b>
                                {moment(item?.time, "HH:mm:ss").format(
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
                                {item?.pickup_location},
                              </span>{" "}
                              <b>{item?.from_location}</b>
                            </p>
                            <p className="rides_avail">
                              <span style={{ color: "grey" }}>
                                {item?.dropoff_location},
                              </span>{" "}
                              <b>{item?.to_location}</b>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} sm={3} xs={3} className="">
                        <p className="rides_avail" style={{ float: "right" }}>
                          <b>₦{numeral(item?.seat_price).format("0,0")}</b>
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
                      {ridersArray[0].map((item, index) => (
                        <>
                          <div
                            key={index}
                            className="d-flex align-items-center"
                          >
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
                                style={{
                                  color: "grey",
                                  fontSize: 13,
                                  margin: 0,
                                }}
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
                          <p>
                            This ride has not been reserved by anyone so far.
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          )}
          <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
        </Row>
      </CompHeader>
    </div>
  );
}
