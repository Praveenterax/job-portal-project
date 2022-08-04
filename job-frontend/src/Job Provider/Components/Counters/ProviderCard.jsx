import classes from "./ProviderCard.module.css";

const ProviderCard = ({ color, ...props }) => {
  let logoBG = { backgroundColor: color };
  return (
    <div className={classes.card}>
      <div className={classes["logo-line"]}>
        <div className={classes.logo} style={logoBG}>
          {/* <img src={props.logo} alt="Total Jobs" /> */}
          <span>{props.logo}</span>
        </div>
        <div className={classes["card-heading"]}>
          <span className={classes.heading}>{props.heading}</span>
          <h4>{props.statistics}</h4>
        </div>
      </div>
      <hr />
      <div className={classes.caption}>
        <p>{props.caption}</p>
      </div>
    </div>
  );
};

export default ProviderCard;
