import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { BsPlus } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions";

export default function NavigationMenu() {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state?.auth?.user);
  
  const getProfilePicture = () => {
    if (loggedInUser?.profile_picture) {
      return loggedInUser.profile_picture;
    }
    
    try {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const parsed = JSON.parse(userData);
        return parsed?.profile_picture || null;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    
    return null;
  };

  const profilePicture = getProfilePicture();

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div>
      <Row className="m-0 navbar_ shadow-sm">
        <Col lg={3} md={3} sm={3} xs={3} className="d-flex align-items-center">
          <img
            className="mobile_logo"
            src="https://res.cloudinary.com/dx5ilizca/image/upload/v1700895319/Galaxy__2_-removebg-preview_w1jyje.png"
            onClick={() => navigate("/")}
            alt="Wenyfour logo"
            style={{ width: "10rem", cursor: "pointer" }}
          />
        </Col>
        <Col
          lg={9}
          md={9}
          sm={9}
          xs={9}
          className="d-flex align-items-center justify-content-end"
          style={{ gap: 10 }}
        >
          <button
            className="app_button pub_web"
            onClick={() => navigate(`/publish-ride`)}
          >
            Publish a ride
          </button>

          <AiOutlineBell
            style={{ margin: 0, cursor: "pointer" }}
            size="1.6rem"
            className="notification_icon text-secondary"
          />
          <BsPlus
            style={{ margin: 0, cursor: "pointer" }}
            className="publish_icon"
            onClick={() => navigate("/publish-ride")}
          />
          {profilePicture ? (
            <img
              src={profilePicture}
              className="result profile"
              alt="profile_pic"
              style={{ width: 30, cursor: "pointer", borderRadius: "50%" }}
              onClick={() => navigate("/profile")}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
              className="result profile"
              alt="profile_pic"
              style={{ width: 30, cursor: "pointer", borderRadius: "50%" }}
              onClick={() => navigate("/profile")}
            />
          )}
          <Dropdown
            className="profile_dropdown_body"
            toggle={showDropdown}
            isOpen={dropdown}
          >
            <DropdownToggle className="pb-4" data-toggle="dropdown" tag="span">
              <MdOutlineKeyboardArrowDown
                size={30}
                className="text-secondary"
                style={{ cursor: "pointer" }}
              />
            </DropdownToggle>
            <DropdownMenu className="shadow profile_dropdown p-3">
              <div
                onClick={() => {
                  navigate("/published-rides");
                  showDropdown();
                }}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>Published Rides</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <hr />
              <div
                onClick={() => {
                  navigate("/my-vehicles");
                  showDropdown();
                }}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>My Vehicles</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                onClick={() => {
                  navigate("/my-bookings");
                  showDropdown();
                }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>My Bookings</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/payments");
                  showDropdown();
                }}
              >
                <div>Payments</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/wallet");
                  showDropdown();
                }}
              >
                <div>Wallet</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/settings");
                  showDropdown();
                }}
              >
                <div>Settings</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={handleLogout}
              >
                <div>Logout</div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}