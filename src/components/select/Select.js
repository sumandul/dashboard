import { classNames } from "../helpers/classNames";

const Select = ({ data,defaultValue ,onChange}) => {
  return (
    <>
      <select defaultValue={defaultValue} onChange={onChange} className="py-[0.6rem] px-3      text-[0.8rem]  sm:text-base      w-full  bg-zapp-white  accent-zapp-primary border-[0.05rem]   focus: outline-zapp-primary   border-zapp-gray_500 rounded-[0.6rem]">
      <option disabled>{defaultValue} </option>
        {data.map((item, i) => {
          return(
          <option  key={i} value={item.value}>
            {item.label}
          </option>
      )})}
      </select>
    </>
  );
};

export default Select;
