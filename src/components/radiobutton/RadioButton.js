import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../helpers/classNames";

const RadioButton = ({
  className,
  label,
  name,
  defaultChecked,
  register,
  value,
  type,
  onChange,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className=" flex items-center gap-3">
      <input
        type={
          type === "radio" ? "radio" : type === "checkbox" ? "checkbox" : ""
        }
        className={classNames("  accent-zapp-primary   ", className)}
        name={name}
        value={value}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={onChange}
        {...props}
        {...(register && register(name))}
      />
      <label className="  capitalize  text-sm sm:text-base   text-zapp-light_black font-normal">
        {label}
      </label>
      {error && (
        <p className="  text-sm  text-zapp-warning  font-light  capitalize">
          {error}
        </p>
      )}
    </div>
  );
};
RadioButton.defaultProps = {
  type: "radio",
};
RadioButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["radio"]),
};

export default RadioButton;
