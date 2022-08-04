import React, { useState } from "react";
import classes from "../Table/Tabular.module.css";
import data from "./Mock-data.json";
import TableFooter from "../../Table/TableFooter";
import useTable from "../../Hooks/useTable";
import { Container, Row, Col, Table } from "react-bootstrap";

const Tabular = () => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState(data);

  const { slice, range } = useTable(jobData, page, 5);

  return (
    <div>
      <Container>
        <Row className={classes.rowStyle}>
          <Col>
            <span className={`${classes.span} float-start `}>Recent Jobs</span>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className={classes.tableBox}>
          <Table striped hover>
            <thead>
              <tr className={classes.tableHeader}>
                <th>JobId</th>
                <th>UserName</th>
                <th>JobTitle</th>
                <th>EmailId</th>
                <th>AppliedOn</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((contact) => (
                <tr key={contact.jobId}>
                  <td>{contact.JobId}</td>
                  <td>{contact.UserName}</td>
                  <td>{contact.JobTitle}</td>
                  <td>{contact.EmailId}</td>
                  <td>{contact.AppliedOn}</td>
                </tr>
              ))}
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
    </div>
  );
};

export default Tabular;
