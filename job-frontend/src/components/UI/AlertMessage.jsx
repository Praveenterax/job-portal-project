import { Alert } from "react-bootstrap";

const AlertMessage = (props) => {
  return (
    <Alert variant={props.variant} onClose={props.onClose} dismissible>
      <Alert.Heading style={{ fontSize: "1rem" }}>
        {props.children}
      </Alert.Heading>
    </Alert>
  );
};

export default AlertMessage;
