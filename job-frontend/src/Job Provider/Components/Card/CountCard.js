import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
//
import { MdWork } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import "./CountCard.css";
export default function CountCard() {
  return (
    <div>
      <Container>
        <Row className="RowStyle">
          <Col className="colStyle">
            <Card className="Card">
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "20px",
                  }}
                  className="CardStyle"
                >
                  Total Jobs
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "50px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    // color: "rgb(35, 46, 71)",
                  }}
                  // className="CardStyle"
                >
                  <MdWork />
                </Card.Text>

                <Card
                  className="cardInfo"
                  style={{
                    height: "3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontSize: "20px",
                        color: "rgb(35, 46, 71)",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      // className="CardStyle"
                    >
                      xxx
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>

          <Col className="colStyle">
            <Card className="Card">
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "20px",
                  }}
                  className="CardStyle"
                >
                  Total Applicants
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "50px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    // color: "rgb(35, 46, 71)",
                  }}
                  // className="CardStyle"
                >
                  <FaUserAlt />
                </Card.Text>

                <Card
                  className="cardInfo"
                  style={{
                    height: "3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontSize: "20px",
                        color: "rgb(35, 46, 71)",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      // className="CardStyle"
                    >
                      xxx
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
