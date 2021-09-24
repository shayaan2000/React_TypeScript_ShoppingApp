import "./form-input.styles.scss";

import React from "react";

interface IFormInputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  label: string;
  value: string;
  required?: boolean;
}

// read thoroghly
const FormInput = ({ handleChange, label, ...otherProps }: IFormInputProps) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
