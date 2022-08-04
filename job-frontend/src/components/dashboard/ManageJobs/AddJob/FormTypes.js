import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.name}>
        {label}
        <span className="text-danger">*</span>
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
      <label htmlFor={field.id}>{label}</label>
      <select
        className={`form-control  ${
          meta.touched && meta.error && "is-invalid"
        } `}
        {...field}
        {...props}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};
