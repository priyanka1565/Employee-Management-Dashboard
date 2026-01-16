import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <Spinner animation="border" role="status" />
      <span className="mt-2 text-muted">{text}</span>
    </div>
  );
};

export default Loader;
