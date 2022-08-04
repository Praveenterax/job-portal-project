// import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import classes from "./Register.module.css";
import {
  NumberInput,
  SelectInput,
  TextInput,
} from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    qualification: "",
    experience: "",
    role: "User",
  };

  const formSubmitHandler = (values, setSubmitting) => {
    setShowSpinner(true);
    axios
      .post(`http://localhost:8080/auth/register`, { ...values })
      .then((res) => {
        setShowSpinner(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setShowSpinner(false);
        toast.error("Oops something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };
  // const history = useHistory();
  return (
    <React.Fragment>
      <Header />
      <Container>
        <h1 className="p-3 text-center rounded" style={{ color: "#2c49ed" }}>
          Register
        </h1>
        {showSpinner && <SpinnerComponent />}
        <Row className="mb-5">
          <Col
            lg={7}
            md={6}
            sm={12}
            className={`${classes.formContainer} p-5 m-auto shadow-sm rounded-lg`}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(4, "Name should be more than 4 characters")
                  .max(25, "Name should be less than 25 characters")
                  .required("Name is a required field"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is a required field"),
                password: Yup.string()
                  .min(6, "Password must be minimum 6 characters")
                  .required("Password is a required field"),
                mobile: Yup.string()
                  .required("Phone number is required")
                  .matches(/^[0-9]+$/, "Must be only digits")
                  .min(10, "Must be exactly 10 digits")
                  .max(10, "Must be exactly 10 digits"),
                gender: Yup.string().required("Gender Required"),
                age: Yup.number()
                  .max(60, "Age should be less than or equal to 60")
                  .min(18, "Age should be greater than or equal to 18")
                  .required("Age Required"),
                qualification: Yup.string().required("Qualification Required"),
                experience: Yup.string(),
                role: Yup.string(),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const editedValues = { ...props.userInfo, ...values };
                formSubmitHandler(editedValues, setSubmitting);
              }}
            >
              {(formik) => (
                <div className={classes.main}>
                  <Form>
                    <div className={classes.formInputs}>
                      <TextInput
                        label="Name"
                        id="name"
                        name="name"
                        mandatory={"true"}
                      />
                    </div>
                    <div className={classes.formInputs}>
                      <TextInput
                        label="Email"
                        id="email"
                        name="email"
                        mandatory={"true"}
                      />
                    </div>
                    <div className={classes.formInputs}>
                      <TextInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        mandatory={"true"}
                      />
                    </div>
                    <div className={classes.formInputs}>
                      <TextInput
                        label="Mobile No"
                        id="mobile"
                        name="mobile"
                        mandatory={"true"}
                      />
                    </div>
                    <div className={classes["formInputs__side"]}>
                      <div
                        className={`${classes["formInputs__side__inner"]} ${classes.age}`}
                      >
                        <NumberInput
                          label="Age"
                          name="age"
                          id="age"
                          mandatory={"true"}
                        />
                      </div>
                      <div className={classes["formInputs__side__inner"]}>
                        <label>
                          Gender<span className="text-danger">*</span>
                        </label>
                        <div className={classes.gender}>
                          <div>
                            <Field
                              type="radio"
                              value="Male"
                              name="gender"
                              id="Male"
                            />
                            <label htmlFor="Male">Male</label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              value="Female"
                              name="gender"
                              id="Female"
                            />
                            <label htmlFor="Female">Female</label>
                          </div>
                        </div>
                        {formik.errors.gender && (
                          <div className="error">{formik.errors.gender}</div>
                        )}
                      </div>
                    </div>
                    <div className={classes["formInputs__side"]}>
                      <div className={classes["formInputs__side__inner"]}>
                        <SelectInput
                          name="qualification"
                          id="qualification"
                          label="Qualification"
                          mandatory={"true"}
                        >
                          <option value="">Select</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Diploma">Diploma</option>
                          <option value="High School">High School</option>
                        </SelectInput>
                      </div>
                      <div className={classes["formInputs__side__inner"]}>
                        <SelectInput
                          name="experience"
                          id="experience"
                          label="Experience"
                        >
                          <option value="">Select</option>
                          <option value="0-2">0-2</option>
                          <option value="3-7">3-7</option>
                          <option value="7-10">7-10</option>
                          <option value="10-50">10-50</option>
                        </SelectInput>
                      </div>
                    </div>
                    <div className={classes.formInputs}>
                      <SelectInput name="role" id="role" label="Role">
                        <option value="User">User</option>
                        <option value="Job Provider">Job Provider</option>
                      </SelectInput>
                    </div>
                    <Button variant="success" type="submit" className="mt-4 ">
                      Register
                    </Button>
                    <Link to="/Login">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-4 float-end"
                        style={{ marginLeft: "10px" }}
                      >
                        Back to Login
                      </Button>
                    </Link>
                  </Form>
                </div>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Register;
