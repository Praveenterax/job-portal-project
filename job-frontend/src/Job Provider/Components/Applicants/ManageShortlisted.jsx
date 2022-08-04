import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";

import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import classes from "./ApplicantTab.module.css";
import ManageShortlistItem from "./ManageShortlistItem";
import Config from "../../../config/Config.json";
let shortlistsdata = [];

const ManageShortlisted = () => {
  const [page, setPage] = useState(1);
  const [shortlistsData, setShortlistsData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [action, setAction] = useState(false);

  const { slice, range } = useTable(shortlistsData, page, 5);

  const params = useParams();
  const jobId = params.jobId;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "provider/view-shortlists/" + jobId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.shortlists;
        setShowSpinner(false);
        shortlistsdata = [...data];
        setShortlistsData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, [jobId, action, token]);

  const searchApplicantHandler = (event) => {
    setShortlistsData(
      shortlistsdata.filter((applicant) =>
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
            <span className={classes.span}>View Shortlists</span>
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
      {shortlistsData.length > 0 && (
        <Container>
          <div className={classes.tableBox}>
            {showSpinner && <SpinnerComponent />}

            <Table striped hover>
              <thead>
                <tr className={classes.tableHeader}>
                  {/* <th>User Id</th> */}
                  <th>Username</th>
                  <th>Email</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((applicantItem) => {
                  return (
                    <ManageShortlistItem
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
      {shortlistsData.length === 0 && (
        <h3 className="text-center fw-bold">No Shortlists Data!</h3>
      )}
    </>
  );
};

export default ManageShortlisted;
