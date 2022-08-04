import React from "react";
import classes from "./AdminCounters.module.css";
import { Col, Row, Card } from "react-bootstrap";
import userData from "../../../store/userData.json";
import jobData from "../../../store/jobData.json";

const jobProviders = userData.filter((user) => user.role === "Job Provider");
const applicants = userData.filter((user) => user.role === "User");

const AdminCounters = () => {
  return (
    <Row className={classes.rowStyle}>
      <Col className={classes.colStyle}>
        <Card className={classes.card}>
          <Card.Body>
            <Card.Title className={classes.cardstyle}>Total Jobs</Card.Title>
            <Card.Text>
              <Card className={classes.cardInfo}>
                <Card.Body>
                  <Card.Text className={classes.cardstyle}>
                    {jobData.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className={classes.colStyle}>
        <Card className={classes.card}>
          <Card.Body>
            <Card.Title className={classes.cardstyle}>
              Total Applicants
            </Card.Title>
            <Card.Text>
              <Card className={classes.cardInfo}>
                <Card.Body>
                  <Card.Text className={classes.cardstyle}>
                    {applicants.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className={classes.colStyle}>
        <Card className={classes.card}>
          <Card.Body>
            <Card.Title className={classes.cardstyle}>
              Total Providers
            </Card.Title>
            <Card.Text>
              <Card className={classes.cardInfo}>
                <Card.Body>
                  <Card.Text className={classes.cardstyle}>
                    {jobProviders.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className={classes.colStyle}>
        <Card className={classes.card}>
          <Card.Body>
            <Card.Title className={classes.cardstyle}>Total Users</Card.Title>
            <Card.Text>
              <Card className={classes.cardInfo}>
                <Card.Body>
                  <Card.Text className={classes.cardstyle}>
                    {userData.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminCounters;
