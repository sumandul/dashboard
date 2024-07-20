import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import querystring from "querystring";
import { MdSearch } from "react-icons/md";
import DownloadIcon from "../../../public/dowloadicon.png";
import { getDateValue } from "@/helper/client";
import { callFetch, getMyProfile } from "@/helper/server";
import { Router, useRouter } from "next/router";
import Loading from "@/components/loading/Loading";
import Head from "next/head";
const Table = dynamic(() => import("../../components/table/Table.js"));
const Typography = dynamic(() =>
  import("../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField.js")
);

const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout")
);
const Breadcrumb = dynamic(() => import("../../components/breadcum/index.js"));

export async function getServerSideProps(context) {
  try {
    const myProfile = await getMyProfile(context);

    const {
      status,
      json: { users_cashflows, currentPage, limit, pages, total },
    } = await callFetch(
      context,
      `users-cashflows?${querystring.stringify(context.query)}`
    );
    return {
      props: { users_cashflows, currentPage, limit, pages, total, myProfile },
    };
  } catch (error) {}

  if (!users_cashflows) {
    return {
      notFound: true,
    };
  }
}

const RiderDashboard = ({ users_cashflows, __state, myProfile }) => {
  const [activeTab, setActiveTab] = useState("alldelivery");
  const [dateValue, setDateValue] = useState({
    startDate: "",
    endDate: "",
  });

  const router = useRouter();
  Router.events.on("routeChangeStart", (url) => {
    __state.loading = true;
  });
  Router.events.on("routeChangeComplete", (url) => {
    __state.loading = false;
  });

  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  var columns = [
    {
      head: "Receiver Name",
      field: "name",
    },
    {
      head: "Phone number",
      field: "phonenumber",
    },
    {
      head: "Pick up location",
      field: "pickuplocation",
    },
    {
      head: "Drop location",
      field: "droplocation",
    },
    {
      head: "fare",
      field: "amount",
    },
    {
      head: "",
      field: "",
      cell: "hh",
    },
  ];
  useEffect(() => {
    if (dateValue.startDate && dateValue.endDate) {
    }
  }, [dateValue.startDate, dateValue.endDate]);

  return (
    <DashBoardLayout profile={myProfile}>
      <div className="px-3 sm:px-10">
        <div className="  text-base  capitalize">
          <Breadcrumb router={router} />
        </div>
        <div className=" flex  flex-col sm:flex-row  items-start sm:items-center justify-between ">
          <Typography variant={"h1"} className=" my-4 xl:mt-7">
            Delivery Dashboard
          </Typography>
          <div className=" flex  mb-6 sm:mb-0 items-center justify-between    gap-3  text-zapp-black   border-zapp-gray_500 ">
            <InputField
              className="pl-10 pr-2 py-3 sm:py-4"
              placeholder="Start Date ..."
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
              placeholder="End Date ..."
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
        <div className=" bg-zapp-whit  grid  grid-cols-3      py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
          <div className=" border-r-2  border-zapp-gray_500  pl-2 sm:pl-6  2xl:pr-52">
            <span className=" text-[14px] font-normal">This month’s spend</span>
            <Typography variant="h4">RS. 20,000.00</Typography>
          </div>
          <div className=" pl-2 sm:pl-4  2xl:pr-52">
            <span className=" text-[14px] font-normal">Delivery Dashboard</span>
            <Typography variant="h4">250</Typography>
          </div>
          <div className=" border-l-2 pl-6  border-zapp-gray_500">
            <span className=" text-[14px] font-normal">Active deliveries</span>
            <Typography variant="h4">25</Typography>
          </div>
        </div>
        <div className=" mt-14  border-zapp-gray_500 ">
          <div className="border-zapp-gray_500 flex text-[1rem] text-zapp-light_black font-normal ">
            <button
              className={`  ${
                activeTab === "alldelivery" && " border-zapp-primary  "
              }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
              onClick={() => handleTabClick("alldelivery")}
            >
              All deliveries
            </button>

            <button
              className={`  ${
                activeTab === "activedelivery" && "border-zapp-primary  "
              }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("activedelivery")}
            >
              Active delivery
            </button>

            <button
              className={`  ${
                activeTab === "completeddelivery" && "border-zapp-primary  "
              }     border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("completeddelivery")}
            >
              Completed delivery
            </button>
          </div>
          <div></div>
        </div>
        <div className=" flex justify-between mt-10">
          <div>
            <InputField
              placeholder="Search receiver (name or number)"
              className="py-3 w-[23rem]  pl-12"
              icon={<MdSearch />}
            />
          </div>
          <div className=" flex items-center">
            <Image
              src={DownloadIcon}
              width={14}
              height={17}
              className="mr-2"
              alt="download_icon"
            />
            <span className=" text-zapp-primary text-base font-normal">
              Export
            </span>
          </div>
        </div>
        <div className=" mt-5">
          {activeTab === "alldelivery" && (
            <Table data={users_cashflows} columns={columns} />
          )}
          {activeTab === "activedelivery" && (
            <Table data={users_cashflows} columns={columns} />
          )}
          {activeTab === "completeddelivery" && (
            <Table data={users_cashflows} columns={columns} />
          )}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default RiderDashboard;
