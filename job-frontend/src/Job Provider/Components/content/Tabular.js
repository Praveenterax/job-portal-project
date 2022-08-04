import React from "react";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import classes from "../Table/Table.module.css";
import Pagination1 from "../Table/pagination.js";
const Tabular = () => {
  return (
    // <div>
    //   <Container>
    //     <Row className="mt-5">
    //       <Table striped hover size="lg">
    //         <thead className="bg-primary">
    //           <tr>
    //             <th>Job ID</th>
    //             <th>User name</th>
    //             <th>Job Title</th>
    //             <th>Email id</th>
    //             <th>Applied On</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td>1231</td>
    //             <td>Peter</td>
    //             <td>xxxxx</td>
    //             <td>xxxxx</td>
    //             <td>03-15-2022</td>
    //           </tr>
    //           <tr>
    //             <td>1232</td>
    //             <td>Parker</td>
    //             <td>xxxxx</td>
    //             <td>xxxxx</td>
    //             <td>03-12-22</td>
    //           </tr>
    //         </tbody>
    //       </Table>
    //     </Row>
    //   </Container>
    // </div>
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
              <th>Job ID</th>
              <th>User name</th>
              <th>Job Title</th>
              <th>Email id</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1231</td>
              <td>Peter</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>03-15-2022</td>
            </tr>
            <tr>
              <td>1232</td>
              <td>Parker</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>03-12-22</td>
            </tr>
          </tbody>
        </Table>
        <Pagination1 />
      </Container>
    </React.Fragment>
  );
};

export default Tabular;
