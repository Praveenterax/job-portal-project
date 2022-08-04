import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function Content() {
  return (
    <Container>
      <Row className="mt-4">
        <div className="manageUsers">
          <span className="span">Reports</span>
        </div>
      </Row>
      <Row className="mt-5">
        <Col>
          <Form.Control type="text" placeholder="Start Date" />
        </Col>
        <Col>
          <Form.Control type="text" placeholder="End Date" />
        </Col>
        <Col>
          <Button type="submit" size="sm" className="mx-4 mt-1">
            Submit
          </Button>
        </Col>
        <Col>
          <Button variant="warning" size="sm" className="ml-3 mt-1">
            export as csv
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
