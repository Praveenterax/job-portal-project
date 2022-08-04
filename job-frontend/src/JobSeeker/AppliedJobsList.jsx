import React from "react";
import { useState, useEffect, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Jobitem from "./Job_item";
import classes from "./Modalf.module.css";
import Config from "../config/Config.json";

let jobsData = [];
const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const statusInputRef = useRef();
  const statusChangeHandler = (event) => {
    if (event.target.value === "All") {
      setJobs(jobsData);
    } else {
      setJobs(
        jobsData.filter((job) => job.status.includes(event.target.value))
      );
    }
  };

  const jobSearchHandler = (event) => {
    const status = statusInputRef.current.value;
    if (status === "All") {
      setJobs(
        jobsData.filter((job) =>
          job.title.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setJobs(
        jobsData.filter(
          (job) =>
            job.title
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) &&
            job.status.includes(status)
        )
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "user/jobsApplied"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        jobsData = response.data.jobsApplied;
        setJobs(response.data.jobsApplied);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "20px", marginLeft: "85px" }}>
          <Col sm={6}>
            <input
              className="form-control float-end"
              type="search"
              onChange={jobSearchHandler}
              placeholder="Search Jobs"
            ></input>
          </Col>
          <Col sm={6}>
            <select
              className="form-control float-end"
              type="select"
              onChange={statusChangeHandler}
              ref={statusInputRef}
            >
              <option value="All">All</option>
              <option value="Applied">Applied Only</option>
              <option value="Shortlisted">Shortlisted Only</option>
            </select>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <div className={classes.grid}>
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AppliedJobs;
