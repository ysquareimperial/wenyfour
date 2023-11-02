import { BsArrowLeftShort } from "react-icons/bs";
import { Col, Row } from "reactstrap";

export default function CompHeader({ children, header }) {
  return (
    <>
      <div className="p-3">
        <h4
          className="text-center page_title"
          style={{ fontWeight: 900, fontSize: 40 }}
        >
          <BsArrowLeftShort
            style={{ marginRight: 20 }}
            size=""
            className="back"
            onClick={() => navigate(-1)}
          />
          {header}
        </h4>
        <div>{children}</div>
      </div>
    </>
  );
}
