import React from "react";
import classes from "./Table.module.css";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import Pagination1 from "./Pagination.js";

const Table1 = () => {
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
              <th>JobId</th>
              <th>Title</th>
              <th>Category</th>
              <th>First Created</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Web Developer</td>
              <td>Software</td>
              <td>02/03/2022</td>
              <td>19/03/2022</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Web Developer</td>
              <td>Software</td>
              <td>07/03/2022</td>
              <td>22/03/2022</td>
            </tr>
          </tbody>
        </Table>
        <Pagination1 />
      </Container>
    </React.Fragment>
  );
};

export default Table1;
