import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { login, loginFailure, signup } from "../redux/actions";
// import logo from "../assets/images/41.SVG";
import { api } from "../helper/apis";
import axios from "axios";

export default function SignUpp() {
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState(true);
  const navigate = useNavigate();
  const switchTab = () => {
    setTab(!tab);
  };
  const dispatch = useDispatch();
  const [_email, _setEmail] = useState("");
  const [_password, _setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nin, setNin] = useState("");
  const [errorMessage_, setErrorMessage_] = useState("");
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login(_email, _password));
      if (loggedInUser || localStorage.getItem("access_token")) {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        // setErrorMessage("Incorrect username or password"); // Set error message for incorrect login
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${api}/auth/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone: phone,
        password: password,
        nin: nin,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data?.detail) {
          setErrorMessage_(data?.detail);
          console.log("Sent", data);
        } else {
          navigate("/signup-message");
          console.log(data);
        }
        setErrorMessage_("");
      })
      .catch((error) => {
        console.error("Error...:", error);
      });
  };
  useEffect(() => {
    return () => {
      dispatch(loginFailure(null));
    };
  }, [dispatch]);
  return (
    <div className="mb-3">
      <Row className="m-0 mt-5">
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          {/* <h4 className="" style={{ fontWeight: 900, fontSize: 40 }}>
            wenyfour
          </h4> */}
          <div className="text-center mb-3">
            <img
              src="https://res.cloudinary.com/dx5ilizca/image/upload/v1695924744/41_heqf9s.svg"
              alt="wenyfour logo"
              style={{ width: 150 }}
            />
          </div>
          <div className="d-flex justify-content-between" style={{ gap: 30 }}>
            <p className={tab ? "bold" : "not_bold"} onClick={switchTab}>
              Login
            </p>
            <p className={!tab ? "bold" : "not_bold"} onClick={switchTab}>
              Register
            </p>
            {/* {JSON.stringify(errorMessage_)} */}
          </div>
          {tab ? (
            <form onSubmit={handleLogin}>
              <div className="mt-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input_field"
                  id="email"
                  required
                  type="email"
                  value={_email}
                  onChange={(e) => _setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input_field"
                  id="password"
                  required
                  type="password"
                  value={_password}
                  onChange={(e) => _setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p style={{ color: "red", fontSize: 13 }}>{errorMessage}</p>
              )}

              <div
                className="d-flex justify-content-between mt-3"
                style={{ fontSize: 13 }}
              >
                <p className="m-0">
                  <input type="checkbox" /> Remember me
                </p>
                <p className="forgot_p m-0">Forgot Password</p>
              </div>
              {!loading ? (
                <button className="app_button auth mt-3 p-3">Sign In</button>
              ) : (
                <button className="app_button auth mt-3 p-3">Loading...</button>
              )}
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              {/* {JSON.stringify(email + name + phone + password+ nin)} */}
              <div className="mt-3">
                <label className="label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="input_field"
                  id="fullName"
                  required
                  type="text"
                  minLength={3}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="input_field"
                  id="phone"
                  required
                  type="tel"
                  minLength={9}
                  // pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input_field"
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>{" "}
              <div className="mt-3">
                <label className="label" htmlFor="nin">
                  NIN
                </label>
                <input
                  className="input_field"
                  id="nin"
                  required
                  type="number"
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                />
              </div>{" "}
              <div className="mt-3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input_field"
                  id="password"
                  required
                  minLength={5}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage_ && (
                <p style={{ color: "red", fontSize: 13 }}>
                  {"Registration failed: " + errorMessage_ + "!"}
                </p>
              )}
              <div className="mt-3">
                <p className="forgot_p m-0">
                  <input type="checkbox" /> I have read and agree to the terms
                </p>
              </div>
              {!loading ? (
                <button className="app_button auth mt-3 p-3">Sign Up</button>
              ) : (
                <button className="app_button auth mt-3 p-3">Loading...</button>
              )}
            </form>
          )}
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
      </Row>
    </div>
  );
}
