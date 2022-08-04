import { Modal, Button } from "react-bootstrap";
import classes from "./ApplicantTab.module.css";

const ReactModal = ({ isReject = false, ...props }) => {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {isReject && (
          <Modal.Header className={classes.headerModal}>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.children.title}
            </Modal.Title>
          </Modal.Header>
        )}
        {!isReject && (
          <Modal.Header
            style={{
              textAlign: "center",
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {props.children.title}
            </Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {props.children.body}
        </Modal.Body>

        {/* {!isReject && <Modal.Body>{props.children.body}</Modal.Body>} */}

        {isReject && (
          <Modal.Footer className="d-flex justify-content-between">
            <>
              <Button variant="danger" size="md" onClick={props.onOk}>
                Ok
              </Button>{" "}
              <Button variant="danger" size="md" onClick={props.onHide}>
                Close
              </Button>
            </>
          </Modal.Footer>
        )}
        {!isReject && (
          <Modal.Footer className="d-flex justify-content-between">
            <>
              <Button variant="primary" size="md" onClick={props.onOk}>
                Yes
              </Button>{" "}
              <Button variant="primary" size="md" onClick={props.onHide}>
                Close
              </Button>
            </>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ReactModal;
