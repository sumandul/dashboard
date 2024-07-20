import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { classNames } from "../helpers/classNames";
import Typography from "../typography/Typography";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Accordion = ({ data, keyAttr, valAttr, height, width }) => {
  const [current, setCurrent] = useState(null);

  const select = useCallback(
    (i) => {
      if (current === i) return setCurrent(null);
      setCurrent(i);
    },
    [current]
  );

  return (
    <div
      className="  border   border-[#E7EBF0]   rounded-md bg-zapp-white   "
      style={{ width }}
    >
      {data.map((item, index) => (
        <div className="bg-white text-black " key={index}>
          <div
            className="text-xl cursor-pointer border-b-[0.1rem] border-[#E7EBF0]   flex justify-between items-center px-3  py-4 "
            onClick={() => select(index)}
          >
            <div>
              <Typography variant={"h4"}>{item[keyAttr]}</Typography>
            </div>
            <div>
              <span className=" text-[2rem]">
                {current === index ? "-" : <MdKeyboardArrowDown />}
              </span>
            </div>
          </div>
          <div
            className={classNames(
              "text-base transition-all ease-in-out duration-500  font-medium    border-b-[0.1rem] border-[#E7EBF0]  overflow-auto ",
              current === index ? " p-4 " : "p-0"
            )}
            style={{
              maxHeight: current === index ? height : 0,
            }}
          >
            {item[valAttr]}
          </div>
        </div>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.array,
  keyAttr: PropTypes.string,
  valAttr: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Accordion.defaultProps = {
  height: 200,
  width: "100%",
};
