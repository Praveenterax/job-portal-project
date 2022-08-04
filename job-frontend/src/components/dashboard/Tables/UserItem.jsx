import dateFormatter from "../../../util/dateFormatter";
import classes from "./UserItem.module.css";
const UserItem = (props) => {
  let formattedCreatedAt = dateFormatter(props.userInfo.createdAt);
  let formattedUpdatedAt = dateFormatter(props.userInfo.updatedAt);
  return (
    <tr className={classes.row}>
      {/* <td>{props.userInfo.id}</td> */}
      <td>{props.userInfo.name}</td>
      <td>{props.userInfo.email}</td>
      <td>{formattedCreatedAt}</td>
      <td>{formattedUpdatedAt}</td>
    </tr>
  );
};

export default UserItem;
