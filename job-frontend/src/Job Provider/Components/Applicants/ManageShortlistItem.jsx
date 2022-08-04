import axios from "axios";

import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ShortlistItem = ({ setAction, ...props }) => {
  const applicantItemId = props.applicantItem._id;
  const token = props.token;
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
      <td>{props.applicantItem.userId.email}</td>
      <td>
        <button className={classes.button} onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>
    </tr>
  );
};

export default ShortlistItem;
