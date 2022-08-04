import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";

import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import classes from "./ApplicantTab.module.css";
import JobApplicantItem from "./JobApplicantItem";
import Config from "../../../config/Config.json";
let jobdata = [];

const ManageTab = () => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { slice, range } = useTable(jobData, page, 5);

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "provider/jobs"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data.jobs;
        setShowSpinner(false);
        jobdata = [...data];
        setJobData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, []);

  const searchJobHandler = (event) => {
    setJobData(
      jobdata.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.manageUsers} col-md-3`}>
            <span className={classes.span}>Manage Applicants</span>
          </Col>
          <Col className={`${classes.col} col-md-6  `}>
            <Col className="d-flex justify-content-center align-items-center">
              {/* <div> */}
              <input
                type="text"
                id="search"
                placeholder="Search Applicants"
                className={classes.searchBar}
                onChange={searchJobHandler}
              />
            </Col>
          </Col>
        </Row>
      </Container>
      {jobData.length > 0 && (
        <Container>
          <div className={classes.tableBox}>
            {showSpinner && <SpinnerComponent />}

            <Table striped hover>
              <thead>
                <tr className={classes.tableHeader}>
                  {/* <th>User Id</th> */}
                  <th>Job Title</th>
                  <th>Applicants</th>
                  <th>Shortlisted</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((jobItem) => {
                  return (
                    <JobApplicantItem key={jobItem._id} jobItem={jobItem} />
                  );
                })}
              </tbody>
            </Table>
          </div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </Container>
      )}

      {/* <Container/> */}
      {jobData.length === 0 && <h3>No job Data!</h3>}
    </>
  );
};

export default ManageTab;
