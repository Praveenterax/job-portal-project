import React from "react";
import classes from "./UserTable.module.css";
import { Table, Row, Col, Button } from "react-bootstrap";
import UserItem from "./UserItem";
// import usersData from "../../../store/userData.json";
import { useNavigate } from "react-router-dom";
const UserTable = (props) => {
  const navigate = useNavigate();
  const recentUsersHandler = () => {
    navigate("/manage-users");
  };
  return (
    <React.Fragment>
      <Row className={classes.rowStyle}>
        <Col>
          <span className={`${classes.span} float-start`}>Recent Users</span>
        </Col>
        <Col>
          <Button
            variant="primary"
            className={`${classes.button} float-end`}
            onClick={recentUsersHandler}
          >
            View All
          </Button>
        </Col>
      </Row>
      <div className={classes.tableBox}>
        <Table striped hover>
          <thead>
            <tr className={classes.tableHeader}>
              {/* <th>UserId</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>First Created</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {props.usersData.map((user) => (
              <UserItem userInfo={user} key={user._id} />
            ))}
          </tbody>
        </Table>
        {props.usersData.length === 0 && (
          <p className="text-center fw-bold">No data</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserTable;
