import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { loginSuccess } from "../redux/actions";
import axios from "axios";
import { api } from "../helper/apis";
import moment from "moment/moment";
import dobToAge from "dob-to-age";
import { PiUserLight } from "react-icons/pi";
import { AiOutlineCalendar, AiOutlinePhone } from "react-icons/ai";
import BackButton from "./BackButton";
import AvatarEditor from "react-avatar-editor";
import { BsCamera, BsCameraFill } from "react-icons/bs";

function Profile() {
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  //HANDLE PROFILE CHANGE
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const openModal = () => {
    setModal(!modal);
  };

  const uploadPicture = async () => {
    setLoading2(true);
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("picture", selectedFile);

      const response = await axios.post(
        "https://api.wenyfour.com/api/auth/users/upload/profile/picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-token": xtoken,
          },
        }
      );

      console.log(response);
      response && setLoading2(false);
      if (response?.status === 200) {
        openModal();
        location.reload();
      }
    } catch (error) {
      setLoading2(false);
      console.error("Error uploading picture:", error); // Handle error
    }
  };

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
      <Row className="">
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className="profile_heading">
            <BackButton headingText={"Profile"} />
          </div>
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
            <div
              className="profile_div_wrapper d-flex justify-content-center profile_div"
              style={{ gap: 30 }}
            >
              <div className="add d-flex align-items-center justify-content-between">
                <div>
                  <img
                    src={profileData?.picture}
                    className="profile_pic shadow"
                    alt="user_image"
                  />
                  <div className="text-center">
                    <button
                      className="add_profile_picture p-2 mt-2"
                      onClick={openModal}
                    >
                      {/* <b>Update profile picture</b> */}
                      <BsCameraFill size={20} />
                    </button>
                  </div>
                </div>
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
                <p className="about mt-3">{profileData?.about}</p>
                <div className="profile_div_button" style={{ gap: 20 }}>
                  <p className="m-0 d-flex align-items-center gap-2">
                    <AiOutlinePhone className="text-secondary m-0" />
                    {profileData?.phone}
                  </p>{" "}
                  {/* . */}
                  <p className="m-0 d-flex align-items-center gap-2">
                    <PiUserLight />
                    {profileData?.date_of_birth === null
                      ? "No DOB"
                      : dobToAge(profileData?.date_of_birth) + "y"}
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
                  {/* <div>
                    <button
                      className="add_profile_picture p-2 mt-2"
                      onClick={openModal}
                    >
                      <b>Add profile picture</b>
                    </button>
                  </div> */}
                </div>

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
          )}
        </Col>
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
      </Row>
      {/* </CompHeader> */}
      <Modal isOpen={modal} size="sm">
        <div className="p-3" style={{}}>
          <p>
            <b>Update profile picture</b>
          </p>
          <input
            type="file"
            className="app_input"
            onChange={handleFileChange}
          />
          {/* {JSON.stringify(image)} */}
          {/* {JSON.stringify(binaryString)} */}

          {/* <input className="input_field" type="file" required /> */}
          <div className="mt-5 d-flex align-items-center justify-content-between">
            <button
              className="app_button"
              onClick={uploadPicture}
              disabled={loading2}
              style={{ cursor: loading2 ? "not-allowed" : "" }}
            >
              {loading2 ? "Saving..." : " Save"}
            </button>

            <button className="cancel_button" onClick={openModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
