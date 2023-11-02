import React from "react";
import { BsArrowLeft } from "react-icons/bs";

function BackButton({ headingText }) {
  return (
    <div className="d-flex align-items-center gap-4 justify-content-center mb-3">
      <BsArrowLeft className="back_button" size="2.5rem" />
      <h4 className="page_title" style={{ fontWeight: 900, fontSize: 40 }}>
        {headingText}
      </h4>
    </div>
  );
}

export default BackButton;
