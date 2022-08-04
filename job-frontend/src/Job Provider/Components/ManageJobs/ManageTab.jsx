import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Container } from "react-bootstrap";
import axios from "axios";
// import { BsSearch } from "react-icons/bs";
import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import "./Data.json";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";
import Config from "../../../config/Config.json";

import classes from "./ManageTab.module.css";
import JobItem from "./JobItem";

const ManageTab = (props) => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState([]);
  const [staticJobData, setStaticJobData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { slice, range } = useTable(jobData, page, 5);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${Config.SERVER_URL + "provider/jobs"}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setShowSpinner(false);

      const jobData = response.data.jobs;
      // console.log(data);
      setJobData(jobData);
      setStaticJobData(jobData);
    };
    getData();
  }, [props.changes, token]); //props.changes

  const searchJobHandler = (event) => {
    setJobData(
      staticJobData.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const addModalHandler = () => {
    props.onShowAddUser({ show: true, edit: false });
  };
  const editModalHandler = (jobData) => {
    props.onEditJob(jobData);
  };
  return (
    <>
      <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.manageUsers} col-md-3`}>
            <span className={classes.span}>Manage Jobs</span>
          </Col>
          <Col className={`${classes.col} col-md-6  `}>
            <Col className="d-flex justify-content-center align-items-center">
              <input
                type="text"
                id="search"
                placeholder="Search Jobs"
                className={classes.searchBar}
                onChange={searchJobHandler}
              />
            </Col>
          </Col>
          <Col className={`${classes.addUser} col-md-3`}>
            <Button
              variant="primary"
              id="add-new-user"
              className={classes.button}
              onClick={addModalHandler}
            >
              Add New Job
            </Button>
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
                  {/* <th>Job Id</th>
                  <th>Provider Id</th> */}
                  <th> Job Title</th>
                  <th>Job Description</th>
                  <th>Category</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((job) => {
                  return (
                    <JobItem
                      token={token}
                      key={job._id}
                      jobInfo={job}
                      onEdit={editModalHandler}
                      onDelete={props.onShowDelete}
                    />
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
      {jobData.length === 0 && <h3>No Jobs Data!</h3>}
    </>
  );
};

export default ManageTab;
