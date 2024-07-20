import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
import { MdSearch } from "react-icons/md";
import IsoDateString from "@/components/helpers/dateFormate.js";
const Table = dynamic(() => import("../../components/table/Table.js"));
const Typography = dynamic(() =>
  import("../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField")
);
const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout.js")
);
import { callFetch, getMyProfile } from "@/helper/server";
import RadioButton from "@/components/radiobutton/RadioButton";
import { debounce } from "debounce";
import Link from "next/link.js";
import { DotSvg } from "@/svgicon/index.js";
import Breadcrumbs from "@/components/breadcum/index.js";
import getDateValue from "@/helper/client/getDateValue.js";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const res = await Promise.all([
    callFetch(context, `business-cashflows`),
    callFetch(context, `users-cashflows`),
  ]);
  const [
    {
      status,
      json: { business_cashflows, currentPage, limit, pages, total },
    },
    {
      statusCode,
      json: { users_cashflows },
    },
  ] = res;
  if(!myProfile){
    return {
      notFound: true,
    };
  }
  if (!myProfile.is_live) {
    return {
      redirect: {
        destination: "/company",
        permanent: false,
      },
    };
  }
  return {
    props: {
      myProfile,
      business_cashflows,
      users_cashflows,
      currentPage,
      limit,
      pages,
      total,
    },
  };
}
const TransactionHistory = ({
  myProfile,
  business_cashflows,
  users_cashflows,
  currentPage,
  pages,
  total,
  limit,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [open, setClose] = useState(false);
  const [id, setId] = useState();
  const dropdownRef = useRef();
  const router = useRouter();
  const [dateValue, setDateValue] = useState({
    startDate: getDateValue(new Date()),
    endDate: getDateValue(new Date()),
  });
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });
  useOutsideAlerter(dropdownRef);
  // const router = useRouter();
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClose(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handlePopUp = () => {
    if (open) {
      setClose(!open);
    } else {
      setClose(true);
    }
  };
  const columns = [
    {
      header: <RadioButton   type={"checkbox"}/>,
      selector: (row) => {
        const handleId = (e) => {};
        return (
          <div className={"pl-2"}>
            <RadioButton onChange={handleId} value={row.id} type={"checkbox"} />
          </div>
        );
      },
    },
    {
      header: "User Id",
      selector: (row) => row.user_id,
    },
    {
      header: "Type",
      selector: (row) => row.type,
    },
    {
      header: "Remark",
      selector: (row) => row.remark,
    },
    {
      header: "Amount Added",
      selector: (row) => {
        return (
          <td>{row.amount_added === 0 ? "-" : `Rs.${row.amount_added}`}</td>
        );
      },
    },
    {
      header: "Amount Deducted",
      selector: (row) => {
        return (
          <td>
            {row.amount_deducted === 0 ? "-" : `Rs.${row.amount_deducted}`}
          </td>
        );
      },
    },
    {
      header: "Done By",
      selector: (row) => row.done_by,
     
    },
    {
      header: "",
      selector: (row) => (
        <div className=" flex justify-end">
          <div
            className=" relative    "
            onClick={() => {
              handlePopUp(), setId(row.id);
            }}
          >
            <span className=" cursor-pointer">
              {" "}
              <DotSvg />
            </span>
            {open && id === row.id && (
              <div
                ref={dropdownRef}
                className="  z-20   w-24    bg-[#ebebeb] capitalize shadow-md absolute  bottom-[-3rem] right-0   transition-all duration-0.5 ease-in-out"
              >
                <ul className=" ">
                  <li className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white">
                    <Link href={`/transaction-history/detail/${row.id}`}>
                      detail
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  const Usercolumns = [
    {
      header: <RadioButton   type={"checkbox"}/>,
      selector: (row) => {
        const handleId = (e) => {};
        return (
          <div className={"pl-2"}>
            <RadioButton onChange={handleId} value={row.id} type={"checkbox"} />
          </div>
        );
      },
    },
    {
      header: "User Id",
      selector: (row) => row.user_id,
    },
    {
      header: "Service",
      selector: (row) => row.service_type,
    },
    {
      header: "receipt",
      selector: (row) => {
        const data = JSON.parse(row.receipt);
        return (
          <td>
            <table>
              <tr>
                <td className="   font-semibold ">Total Amount</td>
                <td className="  font-semibold pl-10">Commission</td>
                <td className=" font-semibold px-10">Insurance</td>
                <td className=" font-semibold">TDS</td>
              </tr>
              <tbody>
                <tr>
                  <td>{`Rs.${data.total_amount}`}</td>
                  <td className="pl-10">{`Rs.${data.commission}`}</td>
                  <td className=" px-10">{`Rs.${data.insurance}`}</td>
                  <td>{`Rs.${data.tds}`}</td>
                </tr>
              </tbody>
            </table>
          </td>
        );
      },
    },
    {
      header: "Transaction Date",
      selector: (row) => IsoDateString(row.created_at),
    },
  ];
  return (
    <DashBoardLayout profile={myProfile}>
      <div className="  px-4 w-full   2xl:px-14">
        <div className=" pt-8 text-sm lg:text-base uppercase ">
          <Breadcrumbs router={router} />
        </div>
        <div className=" flex items-center justify-between">
          <Typography variant={"h1"} className="my-5">
            Transaction History
          </Typography>
          <div className=" flex  mb-6 sm:mb-0 items-center justify-between    gap-3  text-zapp-black   border-zapp-gray_500 ">
            <InputField
              className="pl-10 pr-2 py-3 sm:py-4"
              placeholder="From ..."
              type={showDatePicker.startDate ? "date" : "text"}
              id="date"
              value={showDatePicker.startDate ? dateValue.startDate : ""}
              onFocus={() => {
                setShowDatePicker({ ...showDatePicker, startDate: true });
              }}
              onChange={(e) => {
                setDateValue({ ...dateValue, startDate: e.target.value });
              }}
            /> 

             <InputField
              className="pl-10 pr-2 py-3 sm:py-4"
              placeholder="To ..."
              type={showDatePicker.endDate ? "date" : "text"}
              id="date"
              value={showDatePicker.endDate ? dateValue.endDate : ""}
              onFocus={() => {
                setShowDatePicker({ ...showDatePicker, endDate: true });
              }}
              onChange={(e) => {
                setDateValue({ ...dateValue, endDate: e.target.value });
              }}
            />
          </div>
        </div>
        <div className=" mt-6  border-zapp-gray_500 ">
          <div className="border-zapp-gray_500 flex text-[1rem] text-zapp-light_black font-normal ">
            <button
              className={`  ${
                activeTab === "all" && " border-zapp-primary  "
              }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
              onClick={() => handleTabClick("all")}
            >
              All Transaction
            </button>

            <button
              className={`  ${
                activeTab === "user" && "border-zapp-primary  "
              }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("user")}
            >
              Employeee Transaction
            </button>
          </div>
        </div>
        <div className=" flex justify-between mt-10">
          <div className="sm:basis-[50%] md:basis-[40%] lg:basis-[46%] xl:basis-[34%] 2xl:basis-[35%]">
            {/* <InputField
              placeholder="Search Number"
              className="py-3 sm:w-[14rem]  pl-12"
              icon={<MdSearch />}
              onChange={debounce(
                (e) =>
                  searchRedirect(
                    "/business/rides",
                    "phone",
                    e.target.value,
                    router
                  ),
                500
              )}
            /> */}
          </div>
          <div className=" flex items-center">
            {/* <Image
              src={DownloadIcon}
              width={14}
              height={17}
              alt="downlaodIcon"
              className="mr-2"
            />{" "} */}
            <span className=" text-zapp-primary text-base font-normal">
              Export
            </span>
          </div>
        </div>
        <div className=" mt-1">
          {activeTab === "all" && (
            <Table
              data={business_cashflows}
              columns={columns}
              currentPage={currentPage}
              pages={pages}
              className={"w-[50rem] sm:w-full"}
              limit={limit}
            />
          )}
          {activeTab === "user" && (
            <Table data={users_cashflows} columns={Usercolumns}   className={"w-[60rem] sm:w-full"} />
          )}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default TransactionHistory;
