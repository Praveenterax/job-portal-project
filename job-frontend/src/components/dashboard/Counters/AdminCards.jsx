import AdminCard from "./AdminCard";

import React from "react";
import { Col, Row } from "react-bootstrap";

// import userData from "../../../store/userData.json";
// import jobData from "../../../store/jobData.json";

const AdminCards = ({ stats, ...props }) => {
  return (
    <Row>
      <Col>
        <AdminCard
          logo={<i className="bi bi-briefcase-fill"></i>}
          heading={"Total Jobs"}
          statistics={stats.jobCount}
          caption={""}
        />
      </Col>
      <Col>
        <AdminCard
          color="#fa3535"
          logo={<i className="bi bi-file-earmark-person-fill"></i>}
          heading={"Total Applicants"}
          statistics={stats.applicantCount}
          caption={""}
        />
      </Col>
      <Col>
        <AdminCard
          color="#00b359"
          logo={<i className="bi bi-person-check-fill"></i>}
          heading={"Total Job Providers"}
          statistics={stats.providerCount}
          caption={""}
        />
      </Col>
      <Col>
        <AdminCard
          color="#ff5500"
          logo={<i className="bi bi-person-circle"></i>}
          heading={"Total Users"}
          statistics={stats.seekerCount}
          caption={""}
        />
      </Col>
    </Row>
  );
};

export default AdminCards;
