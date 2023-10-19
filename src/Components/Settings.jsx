import { MdArrowForwardIos, MdOutlineDeleteOutline } from "react-icons/md";
import { FiKey, FiTrash } from "react-icons/fi";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useState } from "react";
export default function Settings() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className="mt-5">
      <CompHeader header={"Settings"}>
        <Row>
          <Col md={4}></Col>
          <Col md={4} className="">
            <div className="mt-4">
              <Row
                style={{ cursor: "pointer" }}
                className="m-0 d-flex align-items-center"
              >
                <Col lg={1} md={1} sm={2} xs={2} className="">
                  <FiKey className="m-0" size="1.5rem" />
                </Col>
                <Col lg={9} md={9} sm={8} xs={8} className="">
                  <div>
                    <p className="m-0" style={{ fontWeight: "" }}>
                      Change your email and password
                    </p>
                    <p className="m-0" style={{ fontSize: 13, color: "grey" }}>
                      Manage your email & password at any time
                    </p>
                  </div>
                </Col>
                <Col lg={1} md={1} sm={2} xs={2} className="">
                  <MdArrowForwardIos size="1.2rem" className="arrow" />
                </Col>
              </Row>
              <Row
                onClick={() => navigate("/delete-account")}
                style={{ cursor: "pointer" }}
                className="m-0 mt-3 d-flex align-items-center"
              >
                <Col lg={1} md={1} sm={2} xs={2} className="">
                  <FiTrash className="m-0" size="1.3rem" />
                </Col>
                <Col lg={9} md={9} sm={8} xs={8} className="">
                  <div>
                    <p className="m-0" style={{ fontWeight: "" }}>
                      Delete your account
                    </p>
                    <p className="m-0" style={{ fontSize: 13, color: "grey" }}>
                      Find out how you can delete your account
                    </p>
                  </div>
                </Col>
                <Col lg={1} md={1} sm={2} xs={2} className="">
                  <MdArrowForwardIos size="1.2rem" className="arrow" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </CompHeader>
    </div>
  );
}
