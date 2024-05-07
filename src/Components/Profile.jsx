import React, { useEffect, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
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
import AvatarEditor from "react-avatar-editor";

function Profile() {
  const [image, setImage] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState(false);

  const editorRef = useRef();
  const [scale, setScale] = useState(1);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  const openModal = () => {
    setModal(!modal);
  };

  //HANDLING IMAGE STARTS
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //HANDLING IMAGE ENDS

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  // let imageToBeUploaded = image;
  // let base64Data = imageToBeUploaded?.replace(/^data:image\/\w+;base64,/, "");
  // let binaryString = atob(base64Data);

  const formData = new FormData();
  formData.append("image", image);
  const uploadPicture = () => {
    console.log(image);
    axios
      .post(
        `${api}/auth/users/upload/profile/picture`,
        formData,

        {
          headers: {
            "x-token": xtoken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
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
      {/* <CompHeader header={"Profile"}> */}
      <Row className="">
        {/* {JSON.stringify(profileData)} */}
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
                <img
                  src={profileData?.picture}
                  className="profile_pic shadow"
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
                  <div>
                    <button
                      className="add_profile_picture mt-2"
                      onClick={openModal}
                    >
                      Add profile picture
                    </button>
                  </div>
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
          {image && (
            <div>
              <div className="d-flex mt-3 justify-content-center">
                <AvatarEditor
                  className="shadow"
                  ref={editorRef}
                  image={image}
                  width={150}
                  style={{ borderRadius: "500px" }}
                  height={150}
                  border={0}
                  color={[234, 234, 234]}
                  scale={scale}
                  // rotate={rotate}
                  disableBoundaryChecks={false}
                  showGrid={true}
                  borderRadius={"500"}
                />
              </div>
              <div className="d-flex gap-3 mt-3 justify-content-between">
                <label htmlFor="">Adjust</label>
                <input
                  type="range"
                  class="form-range"
                  value={scale}
                  min="1"
                  max="2"
                  step="0.01"
                  onChange={handleScaleChange}
                />
              </div>
            </div>
          )}
          {/* <input className="input_field" type="file" required /> */}
          <div className="mt-5 d-flex align-items-center justify-content-between">
            <button className="app_button" onClick={uploadPicture}>
              Save
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
