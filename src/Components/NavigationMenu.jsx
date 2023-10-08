import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
//https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png
import { BsPlus } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { PiCarSimpleLight } from "react-icons/pi";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/21.SVG";

import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

export default function NavigationMenu() {
  const [dropdown, setDropdown] = useState(false);

  //nav dropdown function
  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const logout = () => {
    const keysToRemove = ["access_token", "user_data"];

    // Loop through the keys and remove each item
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem("access_token");
    if (!localStorage.getItem("access_token" && "user_data")) {
      navigate("/auth");
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <Row className="m-0 navbar_ shadow-sm">
        <Col lg={3} md={3} sm={3} xs={3} className="d-flex align-items-center">
          <img
            src="https://res.cloudinary.com/dx5ilizca/image/upload/v1695924745/21_lepo8j.svg"
            onClick={() => navigate("/")}
            alt="wenyfour logo"
            style={{ width: "10rem" }}
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
            Publish ride
          </button>
          <button
            className="app_button pub_mob"
            onClick={() => navigate(`/publish-ride`)}
          >
            <BsPlus />
          </button>

          <AiOutlineBell
            style={{ margin: 0, cursor: "pointer" }}
            size="1.6rem"
          />
          <img
            src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
            className="result profile"
            alt="profile_pic"
            style={{ width: 30, cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          />
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
                onClick={() => navigate("/published-rides")}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>
                  {/* <PiCarSimpleLight className="text-secondary" /> */}
                  Published Rides{" "}
                </div>
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
                onClick={() => navigate("/my-vehicles")}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>
                  {/* <PiCarSimpleLight className="text-secondary" /> */}
                  My Vehicles{" "}
                </div>
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
                }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>My Bookings </div>
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
              >
                <div>Chats </div>
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
              >
                <div>Payment & Refunds </div>
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
                onClick={() => navigate("/settings")}
              >
                <div>
                  {/* <TbLogout className="text-secondary" /> */}
                  Settings{" "}
                </div>
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
                onClick={logout}
              >
                <div>
                  {/* <TbLogout className="text-secondary" /> */}
                  Logout{" "}
                </div>
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
