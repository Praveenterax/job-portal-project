import React from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

import { TextField, SelectInput } from "./FormTypes";
import * as Yup from "yup";
export default function AddJob(props) {
  let initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
  };

  if (props.jobInfo) {
    initialValues = {
      title: props.jobInfo.title,
      description: props.jobInfo.description,
      startDate: props.jobInfo.startDate,
      endDate: props.jobInfo.endDate,
      category: props.jobInfo.category,
    };
  }

  // VALIDATION
  const validate = Yup.object({
    title: Yup.string().max(30).required("Required"),
    description: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    category: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const editedValues = { ...props.jobInfo, ...values };
          props.onAdd(editedValues);
        }}
      >
        {(formik) => (
          // console.log(formik);
          <Form onSubmit={formik.handleSubmit} id="manageJob-form">
            <div>
              <TextField label="Title" name="title" type="text" />
              <TextField
                label="Description "
                name="description"
                type="text-area"
              />
              <SelectInput label="Category " name="category">
                <option value="">Select</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="HR Department">HR Department</option>
                <option value="Techincal and Hardware">
                  Techincal and Hardware
                </option>
                <option value="Front Desk">Front Desk</option>
              </SelectInput>
              <TextField label="Start date " name="startDate" type="date" />
              <TextField label="  End date " name="endDate" type="date" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
