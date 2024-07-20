import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { classNames } from "../helpers/classNames";
const Alert = ({ type, className, icon, message, ...props }) => {
  const [close, setClose] = useState(true);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setClose(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);
  return (
    <>
      {!message === "" && (
        <div
          className={classNames(
            type === "success"
              ? "     bg-zapp-success  "
              : type === "info"
              ? " bg-zapp-pending"
              : type === "warning"
              ? ""
              : type === "error"
              ? " bg-zapp-warning "
              : "",
            `  rounded-2xl  translate-x-[0%]  ${
              message && "-translate-x-[0%] transition-all duration-700 "
            }  absolute right-0 top-2 w-1/6 px-3 py-2  shadow-lg`,
            className
          )}
          {...props}
        >
          <div className=" flex  items-center text-zapp-white">
            {icon}
            <span className="   text-zapp-white pl-2 ">hello</span>
          </div>
        </div>
      )}
    </>
  );
};
Alert.defaultProps = {
  type: "success",
};
Alert.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["success", "info", "wwarning", "error"]),
};

export default Alert;
