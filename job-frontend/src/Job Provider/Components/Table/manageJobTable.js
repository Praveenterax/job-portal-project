import React from "react";
import classes from "./Table.module.css";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import Pagination1 from "./pagination.js";
const Table2 = () => {
  return (
    <React.Fragment>
      <Container>
        <Row className={classes.rowStyle}>
          <Col>
            <span className={`${classes.span} float-start`}>Recent Jobs</span>
          </Col>
          <Col>
            <Button className={`${classes.button} float-end`}>View All</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr className={classes.tableHeader}>
              <th>Job Id</th>
              <th> Job Title</th>
              <th>Job Description</th>
              <th> Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tony Stark</td>
              <td>ironman@marvel.com</td>
              <td>1/1/2022</td>
              <td className={classes.actions}>
                <button className={classes.actionButton}>Edit</button>
                <button
                  type="button"
                  className={classes.actionButton}
                  data-bs-toggle="modal"
                  data-bs-target="#deleterow"
                >
                  Delete{" "}
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Tony Stark</td>
              <td>ironman@marvel.com</td>
              <td>2/2/2022</td>
              <td className={classes.actions}>
                <button className={classes.actionButton}>Edit</button>
                {/* <button
                  className={classes.actionButton}
                  data-bs-toggle="modal"
                  data-bs-target="#deletemod"
                >
                  Delete
                </button> */}
                <button
                  type="button"
                  className={classes.actionButton}
                  data-bs-toggle="modal"
                  data-bs-target="#deleterow"
                >
                  Delete{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination1 />
        {/* modal */}
        <div
          className="modal fade"
          id="deleterow"
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">Do you want to Delete?</div>
              <div
                className="modal-footer"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button type="button" className="btn btn-danger" onClick>
                  OK
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  // data-bs-target="#cancelAdd"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </Container>
    </React.Fragment>
  );
};
export default Table2;
