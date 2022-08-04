import { Card, Col } from "react-bootstrap";
import classes from "./Modalf.module.css";

function Jobitem({ item, jobApply }) {
  const jobApplyHandler = () => {
    jobApply(item);
    console.log(item.job);
  };
  return (
    <div class="grid grid-col-4 gap-4">
      <Card
        // style={{ height: "375px", width: "15rem", marginTop: "45px" }}
        className={classes.cardstyle}
      >
        <Card.Body>
          <div className={classes.imgstyle}>
            <img
              src="https://source.unsplash.com/random/200x100?html"
              alt={item.job}
            />
          </div>
          <Card.Title>{item.title}</Card.Title>
          <Card.Title>
            <div className={classes.style}>{item.description}</div>
          </Card.Title>

          <div className={classes.badge}>
            <span class="badge bg-primary">Full time</span>
            <span class="badge bg-primary" style={{ marginLeft: "13px" }}>
              Min.1 Year
            </span>
            <span class="badge bg-primary" style={{ marginLeft: "10px" }}>
              Senior Level
            </span>
          </div>

          <button
            type="button"
            style={{ marginTop: "30px", paddingBottom: "10px" }}
            onClick={jobApplyHandler}
            className="btn btn-primary"
          >
            Apply Now
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Jobitem;
