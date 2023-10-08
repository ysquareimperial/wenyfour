import { Col, Row } from "reactstrap";

export default function CompHeader({ children, header }) {
  return (
    <>
      <div className="p-3">
        <h4
          className="text-center page_title"
          style={{ fontWeight: 900, fontSize: 40 }}
        >
          {header}
        </h4>
        <div>{children}</div>
      </div>
    </>
  );
}
