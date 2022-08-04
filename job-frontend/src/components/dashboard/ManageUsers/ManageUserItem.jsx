import axios from "axios";
import classes from "./ManageUserItem.module.css";
import dateFormatter from "../../../util/dateFormatter";
import Config from "../../../config/Config.json";

const ManageUserItem = (props) => {
  const token = localStorage.getItem("token");
  const editButtonHandler = () => {
    axios
      .get(`${Config.SERVER_URL + "admin/users/" + props.userInfo._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        props.onEdit(res.data.user);
      })
      .catch((err) => console.log(err));
  };
  const deleteButtonHandler = () => {
    props.onDelete(props.userInfo._id);
  };
  return (
    <tr className={classes.row}>
      <td>{props.userInfo.name}</td>
      <td>{props.userInfo.email}</td>
      <td>{props.userInfo.mobile}</td>
      <td>{props.userInfo.role}</td>
      <td>{dateFormatter(props.userInfo.createdAt)}</td>
      <td className={classes.actions}>
        <button
          className={`${classes.edit} ${classes.button}`}
          onClick={editButtonHandler}
        >
          <span>
            <i className="bi bi-pencil-fill"></i>
          </span>
          <span>Edit</span>
        </button>
        <button
          className={`${classes.delete} ${classes.button}`}
          onClick={deleteButtonHandler}
        >
          <span>
            <i className="bi bi-trash3-fill"></i>
          </span>
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ManageUserItem;
