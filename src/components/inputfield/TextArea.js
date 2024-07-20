import React from "react";
import { classNames } from "../helpers/classNames";
import PropTypes from "prop-types";
const TextArea = ({
  col,
  row,
  className,
  placeholder,
  label,
  error,
  ...props
}) => {
  return (
    <>
      {label && (
        <label className=" block capitalize text-base mb-2  text-zapp-black  font-semibold ">
          {label}
        </label>
      )}
      <textarea
        cols={col}
        placeholder={placeholder}
        rows={row}
        className={classNames(
          "w-full px-3 py-4  border-[0.05rem]   border-zapp-gray_500 rounded-md ",
          className
        )}
        {...props}
      ></textarea>
      {error && (
        <p className="  text-sm  text-zapp-warning  font-light  capitalize ">
          {error}
        </p>
      )}
    </>
  );
};

TextArea.defaultProps = {
  row: 10,
  col: 20,
};
TextArea.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["col", "row"]),
};
export default TextArea;
