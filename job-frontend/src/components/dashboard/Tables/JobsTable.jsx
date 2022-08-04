import React from "react";
import classes from "./UserTable.module.css";
import { Table, Row, Col, Button } from "react-bootstrap";
import JobItem from "./JobItem";
// import jobData from "../../../store/jobData.json";
import { useNavigate } from "react-router-dom";
const JobsTable = (props) => {
  const navigate = useNavigate();
  const recentJobsHandler = () => {
    navigate("/manage-jobs");
  };
  return (
    <React.Fragment>
      <Row className={classes.rowStyle}>
        <Col>
          <span className={`${classes.span} float-start`}>Recent Jobs</span>
        </Col>
        <Col>
          <Button
            className={`${classes.button} float-end`}
            onClick={recentJobsHandler}
          >
            View All
          </Button>
        </Col>
      </Row>
      <div className={classes.tableBox}>
        <Table striped hover>
          <thead>
            <tr className={classes.tableHeader}>
              {/* <th>JobId</th> */}
              <th>Title</th>
              <th>Category</th>
              <th>First Created</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {props.jobData.map((job) => (
              <JobItem jobInfo={job} key={job._id} />
            ))}
          </tbody>
        </Table>
        {props.jobData.length === 0 && (
          <p className="text-center fw-bold">No data</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default JobsTable;
