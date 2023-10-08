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
          src="https://res.cloudinary.com/dx5ilizca/image/upload/v1695924744/41_heqf9s.svg"
          alt="wenyfour logo"
          style={{ width: 150 }}
        />
      </div>
      <CompHeader header={"Verify your email"}>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <div className="mt-3 text-center">
              <p className="m-0" style={{ fontWeight: "" }}>
                Registration successful! Check your email for a confirmation
                link. Welcome to wenyfour!
              </p>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </CompHeader>
    </>
  );
}
