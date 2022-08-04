import spinner from "../../assets/spinner.svg";

const SpinnerComponent = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading" />
    </div>
  );
};

export default SpinnerComponent;
