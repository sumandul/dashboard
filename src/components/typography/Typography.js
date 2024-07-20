import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../helpers/classNames";

const Typography = ({ className, children, variant, ...props }) => {
  return (
    <div
      className={classNames(
        "  text-zapp-black",
        variant === "h1"
          ? `  text-[1.4rem] lg:text-[2.3rem]   font-semibold `
          : variant === "h2"
          ? " text-lg lg:text-[2rem]  font-semibold"
          : variant === "h3"
          ? " text-lg  font-bold"
          : variant === "h4"
          ? "text-[0.9rem]  sm:text-[1.5rem] font-semibold"
          : variant === "h5"
          ? " text-sm  font-bold"
          : variant === "h6"
          ? " teaxt-base"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
Typography.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};

export default Typography;
