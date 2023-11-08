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
import CompHeader from "../CustomComponents/CompHeder";
import dobToAge from "dob-to-age";
import { PiUserLight } from "react-icons/pi";
import { AiOutlineCalendar, AiOutlinePhone } from "react-icons/ai";
import BackButton from "./BackButton";

function Profile() {
  const [vehicles, setVehicles] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/

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
          // console.log(response.data);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
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
          // console.log(response.data);
          setVehicles(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getVehicles();
  }, []);
  //end fetching user's vehicles

  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"Profile"}> */}
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
        <Row className="">
          {/* {JSON.stringify(profileData)} */}
          <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="profile_heading">
              <BackButton headingText={"Profile"} />
            </div>
            <div
              className="profile_div_wrapper d-flex justify-content-center profile_div"
              style={{ gap: 30 }}
            >
              <div className="add d-flex align-items-center justify-content-between">
                <img
                  src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
                  className="profile_pic"
                  alt="user_image"
                />

                <button
                  className="edit_profile app_button second_app_button mt-2 edit_button"
                  onClick={() =>
                    navigate(
                      `/edit-profile?name=${profileData?.name}&phone=${profileData?.phone}&email=${profileData?.email}&dob=${profileData?.date_of_birth}&about=${profileData?.about}`
                    )
                  }
                >
                  Edit profile
                </button>
              </div>
              <div>
                <h3 className="m-0 fullname">{profileData?.name}</h3>
                <p className="email">{profileData?.email}</p>
                <p className="about">{profileData?.about}</p>
                <div className="profile_div_button" style={{ gap: 20 }}>
                  <p className="m-0 d-flex align-items-center gap-2">
                    <AiOutlinePhone className="text-secondary m-0" />
                    {profileData?.phone}
                  </p>{" "}
                  {/* . */}
                  <p className="m-0 d-flex align-items-center gap-2">
                    <PiUserLight />
                    {dobToAge(profileData?.date_of_birth)} y
                    {/* {moment(profileData?.date_of_birth, "YYYYMMDD").fromNow()} */}
                  </p>{" "}
                  {/* . */}
                  <p className="date_joined d-flex align-items-center gap-2">
                    <AiOutlineCalendar className="m-0 text-secondary" />
                    Joined {moment(profileData?.created_at).format("MMM, YYYY")}
                  </p>
                </div>
                <div>
                  <button
                    className="edit_profile_web app_button second_app_button mt-2 edit_button"
                    onClick={() =>
                      navigate(
                        `/edit-profile?name=${profileData?.name}&phone=${profileData?.phone}&email=${profileData?.email}&dob=${profileData?.date_of_birth}&about=${profileData?.about}`
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
                  <div className="mt-3">
                    <b className="">Vehicles</b>
                    {vehicles?.map((item, index) => (
                      <p key={index} className="m-0">
                        {item?.brand}, {item?.model} ({item?.c_type}) -{" "}
                        {item?.color}
                        {/* <hr /> */}
                      </p>
                    ))}
                  </div>
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
      {/* </CompHeader> */}
    </div>
  );
}

export default Profile;
