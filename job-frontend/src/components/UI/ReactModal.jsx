import { Modal, Button } from "react-bootstrap";
import classes from "./ReactModal.module.css";
const ReactModal = ({
  isDelete = false,
  formId,
  buttonTitle,
  formModal = false,
  ...props
}) => {
  return (
    <Modal
      {...props}
      size={isDelete ? "md" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.children.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={isDelete ? "" : classes.reactModal}>
        {props.children.body}
      </Modal.Body>
      {/* {!isDelete && (
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      )} */}
      {!formModal && isDelete && (
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" size="md" onClick={props.onOk}>
            Ok
          </Button>
          <Button variant="danger" size="md" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      )}
      {formModal && (
        <Modal.Footer className="d-flex justify-content-center">
          <button className={classes.submitBtn} type="submit" form={formId}>
            {buttonTitle}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ReactModal;
