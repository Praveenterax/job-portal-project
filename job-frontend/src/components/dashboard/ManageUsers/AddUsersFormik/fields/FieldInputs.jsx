import React from "react";
import { useField } from "formik";

const requiredField = <span className="text-danger">*</span>;
export const TextInput = ({ label, disabled, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={field.name}>
        {label}
        {props.mandatory === "true" && requiredField}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "invalid"
        }`}
        type={props.type || "text"}
        disabled={disabled}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={field.id}>
        {label}
        {props.mandatory === "true" && requiredField}
      </label>
      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "invalid" : ""}
      />
      {meta.touched && meta.error ? (
        <div className="mx-2 error">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export const NumberInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={field.id}>
        {label}
        {props.mandatory === "true" && requiredField}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "invalid"
        }`}
        type="number"
        step="1"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mx-2">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};
export const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={field.id}>
        {label}
        {props.mandatory === "true" && requiredField}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "invalid"
        }`}
        type="file"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mx-2">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};
