import { Modal, Button } from "react-bootstrap";
const ReactModal = ({ isDelete = false, ...props }) => {
  return (
    <>
      <Modal
        {...props}
        size={isDelete ? "md" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {isDelete && (
          <Modal.Header
            style={{
              backgroundColor: "crimson",
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {props.children.title}
            </Modal.Title>
          </Modal.Header>
        )}
        {!isDelete && (
          <Modal.Header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {props.children.title}
            </Modal.Title>
          </Modal.Header>
        )}
        {isDelete && (
          <Modal.Body
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.children.body}
          </Modal.Body>
        )}
        {!isDelete && <Modal.Body>{props.children.body}</Modal.Body>}
        {/* {!isDelete && (
        // <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          
        // </Modal.Footer>
      )} */}
        {isDelete && (
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
      </Modal>
    </>
  );
};

export default ReactModal;
