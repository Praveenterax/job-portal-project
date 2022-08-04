import axios from "axios";

import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ApplicantItem = ({ setAction, ...props }) => {
  const applicantItemId = props.applicantItem._id;
  const token = props.token;
  const shortlistCandidateHandler = () => {
    axios
      .patch(
        `${
          Config.SERVER_URL + "provider/applicants/shortlist/" + applicantItemId
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectCandidateHandler = () => {
    axios
      .patch(
        `${
          Config.SERVER_URL + "provider/applicants/reject/" + applicantItemId
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewResumeHandler = () => {
    axios
      .get(
        `${
          Config.SERVER_URL +
          "provider/applicants/view-resume/" +
          applicantItemId
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr className={classes.row}>
      <td>{props.applicantItem.userId.name}</td>
      <td>
        <button className={classes.button} onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>

      <td className={classes.actions}>
        <button
          className={`${classes.shortlistCandidate} ${classes.button}`}
          onClick={shortlistCandidateHandler}
          disabled={props.applicantItem.status === "Shortlisted" ? true : false}
        >
          <span>
            <i className="bi bi-person-check-fill"></i>
          </span>
          <span>Shortlist</span>
        </button>

        <button
          className={`${classes.rejectCandidate} ${classes.button}`}
          onClick={rejectCandidateHandler}
        >
          <span>
            <i className="bi bi-person-x-fill"></i>
          </span>
          <span>Reject</span>
        </button>
      </td>
    </tr>
  );
};

export default ApplicantItem;
