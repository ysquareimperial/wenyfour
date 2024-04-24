import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";
import BackButton from "./BackButton";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "../helpers/helpers";

export default function Invoice() {
  const query = useQuery();
  const txnid = query.get("txnid");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/transactions/${userData?.user_id}/transactions/${txnid}`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response?.data);
          setInvoice(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, []);
  return (
    <div className="p-3 mt-5">
      <BackButton headingText={"Payment details"} />
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
        <Row className="m-0">
          <Col md={3}></Col>
          <Col md={6}>
            <Card className="mb-3 mt-3 results_card shadow-sm p-3">
              {JSON.stringify(invoice)}
              <div className="">
               {}
              </div>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    </div>
  );
}
