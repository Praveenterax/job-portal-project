import React from "react";
import classes from "./Modalf.module.css";
import { Modal } from "react-bootstrap";
import ApplicationForm from "./ApplicationForm";

const ApplyModal = (props) => {
  // console.log(props.job);
  return (
    <React.Fragment>
      <Modal show={props.onOpen} onHide={props.onClose}>
        <Modal.Header className={classes["modal-header"]}>
          <Modal.Title className={classes["modal-title"]}>
            Job Application
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplicationForm
            job={props.job}
            onClose={props.onClose}
            changes={props.changes}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ApplyModal;
