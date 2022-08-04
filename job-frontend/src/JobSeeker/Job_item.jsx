import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import classes from "./Modalf.module.css";

function Jobitem({ item, jobApply }) {
  const tag = item.title.split(" ")[0].toLowerCase();
  return (
    <Card style={{ width: "18rem" }}>
      <div className={classes.images}>
        <Card.Img
          variant="top"
          src={`https://source.unsplash.com/276x170?${tag}+computer`}
        />
      </div>
      <Card.Body>
        <Card.Title>
          <h4>{item.title} Role</h4>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <span className="badge bg-primary">Full time</span>
            <span className="badge bg-primary">Min.1 Year</span>
            <span className="badge bg-primary">Senior Level</span>
          </div>
        </ListGroupItem>

        <ListGroupItem>
          <Card.Text className={classes.description}>
            {item.description}
          </Card.Text>
        </ListGroupItem>
        <ListGroupItem>
          <h6>{item.category}</h6>
        </ListGroupItem>
        <ListGroupItem>
          <div className={classes.deadlines}>
            <div>Apply From:</div>
            <div className={classes.dates}>
              <i className="bi bi-calendar2-check"></i>
              <span className="mx-2">{item.startDate}</span>
            </div>
          </div>
        </ListGroupItem>

        <ListGroupItem>
          <div className={classes.deadlines}>
            <div>Apply Before:</div>
            <div className={classes.dates}>
              <i className="bi bi-calendar-x"></i>
              <span className="mx-2">{item.startDate}</span>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        {!item.status && (
          <Button
            variant="primary"
            onClick={() => {
              jobApply(item);
            }}
          >
            Apply Now
          </Button>
        )}
        {item.status && (
          <Button
            variant={item.status.includes("Applied") ? "secondary" : "success"}
            className={
              item.status === "Shortlisted" ? classes.shortlistedButton : ""
            }
            disabled={true}
          >
            {item.status === "Shortlisted" ? (
              <span>
                Shortlisted <i className="bi bi-heart-fill"></i>
              </span>
            ) : (
              item.status
            )}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Jobitem;
