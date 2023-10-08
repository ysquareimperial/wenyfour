import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { loginSuccess } from "../redux/actions";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { api } from "../helper/apis";
import moment from "moment/moment";
import { BeatLoader, ScaleLoader, MoonLoader } from "react-spinners";
function Profile() {
  const [vehicles, setVehicles] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("access_token"));
    if (userData) {
      // Dispatch loginSuccess action to restore user data
      const { email, access_token, token_type, name, user_id, phone } =
        userData;
      dispatch(
        loginSuccess(email, access_token, token_type, name, user_id, phone)
      );
    }
  }, [dispatch]);

  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      axios
        .get(`${api}/auth/users/me`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          setLoading(false);
          setProfileData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, [loggedInUser]);

  //start fetching user's vehicles
  const getVehicles = () => {
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
          setVehicles(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getVehicles();
  }, []);
  //end fetching user's vehicles

  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Profile
      </h4>

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
        <Row className="mt-5">
          {/* {JSON.stringify(profileData)} */}
          <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div
              className="d-flex justify-content-center profile_div"
              style={{ gap: 30 }}
            >
              <div>
                <img
                  src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
                  className="profile_pic"
                  alt="user_image"
                />
              </div>
              <div>
                <h3 className="m-0 fullname">{profileData?.name}</h3>
                <p className="email">{profileData?.email}</p>
                <p className="about">
                  My name is Yasir, I am a Software Engineer with years of
                  experience in Frontend Web Dev..
                </p>
                <div className="profile_div_button" style={{ gap: 10 }}>
                  <p className="phone">{profileData?.phone}</p> .
                  <p className="years">30 years</p> .
                  <p className="date_joined">
                    Joined{" "}
                    {moment(profileData?.created_at).format("MMMM, YYYY")}
                  </p>
                </div>
                <div>
                  <button
                    className="app_button second_app_button mt-2 edit_button"
                    onClick={() =>
                      navigate(
                        `/edit-profile?name=${loggedInUser?.name}&phone=${loggedInUser?.phone}&email=${loggedInUser.email}`
                      )
                    }
                  >
                    Edit profile
                  </button>
                </div>
                {/* <div className="mt-3">
                  <b>Vehicles</b>
                  <p>Mercedes Benz, E350</p>
                </div> */}
                <>
                  {vehicles?.map((item, index) => (
                    <div key={index} className="mt-4">
                      <b>Vehicles</b>
                      <p>
                        {item?.brand}, {item?.model}({item?.c_type}) -{" "}
                        {item?.color}
                      </p>
                      {/* <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          className="m-0"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.brand} {item?.model}
                        </p>
                        <p>{item?.color}</p>
                      </div> */}
                    </div>
                  ))}
                  {vehicles.length === 0 ? (
                    <div className="mt-3 mb-5">
                      <span style={{ fontSize: 13 }}>
                        You don't have registered vehicle(s) yet
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
        </Row>
      )}
    </div>
  );
}

export default Profile;
