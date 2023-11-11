import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
// import logo from "../assets/images/wenyfour-black.PNG";
import { useState } from "react";
export default function Settings() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="text-center mt-5">
        <img
          src="https://res.cloudinary.com/dx5ilizca/image/upload/v1695924745/21_lepo8j.svg"
          alt="wenyfour logo"
          style={{ width: 200 }}
        />
      </div>
      {/* <CompHeader header={"Verify your email"}> */}
      <h4
        className="page_title text-center mt-4 m-0"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Verify your email
      </h4>
      <Row className="m-0">
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-3 text-center">
            <p className="m-0" style={{ fontWeight: "" }}>
              Registration successful! Check your email for a confirmation link,
              the link will be valid for only <b>1 hour</b> Welcome to wenyfour!
            </p>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}
