import PropTypes from "prop-types";
import { classNames } from "../helpers/classNames";

export const Tooltip = ({ position, content, children }) => (
  <div id="tooltip" className="relative w-[6rem]  cursor-pointer group">
    <div className="mx-2 my-1">{children}</div>
    <span
      className={classNames(
        "absolute  bg-zapp-primary   hidden group-hover:inline-block    text-zapp-white text-xs p-2 whitespace-nowrap rounded",
        position === "top"
          ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
          : "",
        position === "bottom"
          ? "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
          : "",
        position === "left"
          ? "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
          : "",
        position === "right"
          ? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
          : ""
      )}
    >
      {content}
    </span>
    <span
      className={classNames(
        "absolute hidden group-hover:inline-block border-[6px]",
        position === "top"
          ? "left-1/2 -translate-x-1/2 bottom-full border-l-zapp-transparent border-r-zapp-transparent border-b-0 border-t-zapp-primary"
          : "",
        position === "bottom"
          ? "left-1/2 -translate-x-1/2 top-full border-l-zapp-transparent border-r-zapp-transparent border-t-0 border-b-zapp-primary"
          : "",
        position === "left"
          ? "top-1/2 -translate-y-1/2 right-full border-t-zapp-transparent border-b-zapp-transparent border-r-0 border-l-zapp-primary"
          : "",
        position === "right"
          ? "top-1/2 -translate-y-1/2 left-full border-t-zapp-transparent border-b-zapp-transparent border-l-0 border-r-zapp-primary"
          : ""
      )}
    ></span>
  </div>
);

Tooltip.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
