// import axios from "axios";
import { Formik, Form } from "formik";
import React from "react";
import * as yup from "yup";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

import { Row, Button, Container } from "react-bootstrap";
import {
  TextInput,
  FileInput,
} from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";

const ApplicationForm = (props) => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    resume: yup.mixed().required("Resume is required"),
  });

  const formSubmitHandler = (values, setSubmitting) => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        formSubmitHandler(values, setSubmitting);
      }}
      initialValues={{
        name: "",
        email: "",
        resume: "",
      }}
    >
      {(formik) => (
        <Form noValidate>
          <Container>
            <Row className="mb-3">
              <TextInput
                disabled={true}
                label="Job Title"
                id="title"
                type="text"
                name="title"
                value={props.job.title}
                mandatory={"true"}
              />
            </Row>
            <Row className="mb-3">
              <TextInput
                label="Username"
                id="username"
                type="text"
                name="name"
                mandatory={"true"}
              />
            </Row>
            <Row className="mb-3">
              <TextInput
                label="Email"
                id="username"
                type="text"
                name="email"
                mandatory={"true"}
              />
            </Row>
            <Row className="mb-3">
              <FileInput
                label="Resume"
                id="username"
                type="file"
                name="resume"
                mandatory={"true"}
              />
            </Row>
            <Button type="submit">Submit form</Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationForm;
