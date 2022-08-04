import React from "react";
import { ErrorMessage, useField } from "formik";
import classes from "./AddJob.module.css";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.name} className={classes.requiredField}>
        {label}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        } `}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.id} className={classes.requiredField}>
        {label}
      </label>
      <select
        className={`form-control  ${
          meta.touched && meta.error && "is-invalid"
        } `}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};
