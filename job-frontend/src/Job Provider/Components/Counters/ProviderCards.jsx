import ProviderCard from "./ProviderCard";

import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import classes from "../../../components/dashboard/Counters/AdminCard.module.css";
const ProviderCards = ({ stats, ...props }) => {
  return (
    <Container>
      <Row className={classes.row}>
        <Col>
          <ProviderCard
            logo={<i className="bi bi-briefcase-fill"></i>}
            heading={"Total Jobs"}
            statistics={stats.jobsCount}
            caption={""}
          />
        </Col>
        <Col>
          <ProviderCard
            color="#ff1a1a"
            logo={<i className="bi bi-file-earmark-person-fill"></i>}
            heading={"Total Applicants"}
            statistics={stats.applicantsCount}
            caption={""}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProviderCards;
