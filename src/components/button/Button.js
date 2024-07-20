import PropTypes from "prop-types";
import { classNames } from "../helpers/classNames";
export const Button = ({
  className,
  children,
  rounded=true,
  type,
  variant = "primary",
  disabled=  false,
  ...props
}) => {
  return (
    <button
    disabled={disabled}
      type={type === "submit" ? "submit" : type === "reset" ? "reset" : ""}
      className={classNames(
        " sm:px-4  border-[0.5rem] capitalize text-sm sm:text-base font-semibold cursor-pointer border-zapp-transparent select-none [outline:none] shadow-md focus:ring-[1px] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-100 disabled:shadow-inner",
        rounded ? "rounded" : "",
        variant === "primary"
          ? " bg-zapp-primary text-zapp-white  hover:bg-zapp-secondary duration-700 transition-colors "
          : "",
        variant === "secondary"
          ? "  bg-zapp-secondary text-zapp-white hover:bg-zapp-primary transition-colors"
          : "",
        variant === "success"
          ? " bg-zapp-success hover:bg-green-600 focus:ring-green-500 text-zapp-white"
          : "",
        variant === "danger"
          ? "bg-red-700 hover:bg-red-600 focus:ring-red-500 text-zapp-white"
          : "",
        variant === "warning"
          ? " bg-zapp-warning hover:bg-yellow-400 focus:ring-yellow-300 text-zapp-white"
          : "",
        variant === "info"
          ? " bg-zapp-info hover:bg-cyan-600 focus:ring-cyan-500 text-zapp-white"
          : "",
        variant === "light"
          ? "   bg-zapp-white  hover:bg-gray-100 focus:ring-gray-300 text-gray-500"
          : "",
        variant === "dark"
          ? "  bg-zapp-black hover:bg-gray-600 focus:ring-gray-500 text-zapp-white"
          : "",
        variant === "primary-outline"
          ? " text-zapp-primary border-[1px]  border-zapp-primary hover:bg-zapp-primary hover:text-zapp-white focus:ring-blue-500"
          : "",
        variant === "secondary-outline"
          ? "text-zapp-secondary border-[1px] border-slate-500 border-zapp-secondary hover:bg-zapp-secondary hover:text-zapp-white focus:ring-slate-500"
          : "",
        variant === "success-outline"
          ? "text-green-700 border-[1px]  border-zapp-primary hover:bg-green-700 hover:text-zapp-white focus:ring-green-500"
          : "",
        variant === "danger-outline"
          ? "text-red-700 border-[1px]  border-zapp-warning hover:bg-red-700 hover:text-zapp-white focus:ring-red-500"
          : "",
        variant === "info-outline"
          ? "text-cyan-700 border-[1px]  border-zapp-info hover:bg-cyan-700 hover:text-zapp-white focus:ring-cyan-500"
          : "",
        variant === "light-outline"
          ? "text-gray-400 border-[1px]  border-zapp-white hover:bg-gray-100 focus:ring-gray-300"
          : "",
        variant === "default"
          ? "text-gray-700  bg-zapp-gray_500  hover:bg-gray-700 hover:text-zapp-white focus:ring-gray-500"
          :  disabled === true
          ? "   bg-zapp-gray "
          : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "primary-outline",
    "secondary-outline",
    "success-outline",
    "danger-outline",
    "info-outline",
    "light-outline",
    "dark-outline",
    "default",
  ]),
};
