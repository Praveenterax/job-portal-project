import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";

import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import classes from "./ApplicantTab.module.css";
import ManageApplicantItem from "./ManageApplicantItem";
let applicantsdata = [];

const ManageJobApplicants = () => {
  const [page, setPage] = useState(1);
  const [applicantsData, setApplicantsData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [action, setAction] = useState(false);

  const { slice, range } = useTable(applicantsData, page, 5);

  const params = useParams();
  const jobId = params.jobId;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/provider/view-applicants/${jobId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.applicants;
        setShowSpinner(false);
        applicantsdata = [...data];
        setApplicantsData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, [jobId, action, token]);

  const searchApplicantHandler = (event) => {
    setApplicantsData(
      applicantsdata.filter((applicant) =>
        applicant.userId.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
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
                onChange={searchApplicantHandler}
              />
            </Col>
          </Col>
        </Row>
      </Container>
      {applicantsData.length > 0 && (
        <Container>
          <div className={classes.tableBox}>
            {showSpinner && <SpinnerComponent />}

            <Table striped hover>
              <thead>
                <tr className={classes.tableHeader}>
                  {/* <th>User Id</th> */}
                  <th>Job Title</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((applicantItem) => {
                  return (
                    <ManageApplicantItem
                      key={applicantItem._id}
                      applicantItem={applicantItem}
                      setAction={setAction}
                      token={token}
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
      {applicantsData.length === 0 && (
        <h3 className="text-center fw-bold">No Applicant Data!</h3>
      )}
    </>
  );
};

export default ManageJobApplicants;
