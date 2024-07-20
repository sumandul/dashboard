import React from "react";
import Pagination from "../pagination";
import Typography from "../typography/Typography";
import { classNames } from "../helpers/classNames";

const Table = ({ columns, data, pages, currentPage, limit, message ,className}) => {
  const getCellValue = (row, selector) => {
    return selector(row);
  };
  return (
    <>
      <div className=" pb-20 overflow-x-auto sm:overflow-y-hidden    ">
        <table className= { classNames( " bg-zapp-white   ",className)}>
          <thead className="  ">
            <tr className="border-b-[0.0625rem]   border-zapp-gray_500">
              {columns?.map((column, index) => {
                return (
                  <>
                  <th
                    className={` text-start py-4 px-2   ${
                      index === 0 && " "
                    }  uppercase  font-semibold text-[0.7rem]`}
                    key={index}
                  >
                    {column.header}
                  </th>
                  </>
                );
              })}
            </tr>
          </thead>
          {data?.length > 0 ? (
            <tbody>
              {data?.map((row, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                    className="border-b-[0.0625rem]  rounded-lg   border-zapp-gray_500"
                  >
                    {columns?.map((column, columnIndex) => {
                      return (
                        <>
                          <td
                            key={columnIndex}
                            className=" text-[0.8rem] py-4 pr-5"
                          >
                            {getCellValue(row, column.selector)}
                          </td>
                        </>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tr>
              <td colSpan={8} className="   text-center py-20">
                {" "}
                <Typography
                  variant={"h1"}
                  className=" my-4    capitalize text-zapp-primary xl:mt-7"
                >
                  {message}
                </Typography>
              </td>
            </tr>
          )}
        </table>
       {
        data?.length > 0 &&  <Pagination pages={pages} limit={limit} currentPage={currentPage} />
       }
       
      </div>
    </>
  );
};

export default Table;
