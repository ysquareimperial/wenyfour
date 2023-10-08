import { MdArrowForwardIos } from "react-icons/md";
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
          <Col md={4}>
            <div className="mt-3">
              <div
                className="mt-4 d-flex align-items-center justify-content-between ride_details_user"
                onClick={() => navigate("/delete-account")}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className="m-0" style={{ fontWeight: "" }}>
                    Delete account
                  </p>
                </div>
                <div>
                  <MdArrowForwardIos size="1.2rem" className="arrow" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </CompHeader>
    </div>
  );
}
