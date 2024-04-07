import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";
import BackButton from "./BackButton";

export default function Payments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [rides, setRides] = useState([]);

  return (
    <div className="p-3 mt-5">
      <BackButton headingText={"Payments"} />
      <Row className="">
        <Col md={3}></Col>
        <Col md={6}>
          <Card className="mb-3 mt-3 results_card shadow-sm p-3">Payments</Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
