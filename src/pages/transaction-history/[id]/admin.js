import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MdSearch } from "react-icons/md";
const Table = dynamic(() => import("../../../components/table/Table"));
const Typography = dynamic(() =>
  import("../../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../../components/inputfield/InputField")
);

const DashBoardLayout = dynamic(() =>
  import("../../../components/layout/DashBoardLayout.js")
);

import { callFetch, getMyProfile } from "@/helper/server";
import RadioButton from "@/components/radiobutton/RadioButton";
import Breadcrumbs from "@/components/breadcum";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);

  // const { page = 1, limit = "5", phone = "",name="", active = "" } = context.query;
  const {
    status,
    json: { business_cashflows, pages ,currentPage,limit,total},
  } = await callFetch(
    context,
    `business-cashflows/${context.query.id}/by-admin`
  );
  // const {
  //     json: { business_cashflows, currentPage, limit, pages, total },
  //     // json: { users_cashflows },
  //   } = res;
  // if (!rides) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // if(!myProfile){
  //   return {
  //     notFound: true,
  //   };
  // }
  // if (!myProfile.is_live) {
  //   return {
  //     redirect: {
  //       destination: "/settings/company",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      myProfile,
      business_cashflows,
      currentPage,
      limit,
      pages,
      total
    },
  };
}
const TransactionHistory = ({ myProfile, business_cashflows }) => {
  const [activeTab, setActiveTab] = useState("currentadmin");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
        return <td>Rs.{row.amount_added}</td>;
      },
    },
    {
      header: "Amount Deducted",
      selector: (row) => {
        return <td>Rs.{row.amount_deducted}</td>;
      },
    },
    // {
    //   header: 'Amount_deducted',
    //   selector: (row) => console.log(row),
    // },
    // {
    //   header: 'Transaction Date',
    //   // selector: (row) => <td>
    //   //   {
    //   //     row.pickup_name.split(",").slice(0, 4)
    //   //   }

    //   // </td>

    // },
  ];
  return (
    <DashBoardLayout profile={myProfile}>
      <div className=" px-10">
        <div className=" text-base  capitalize pt-8 ">
          <Breadcrumbs />
        </div>
        <div className=" flex items-center justify-between">
          <Typography variant={"h1"} className="my-5">
            Admin Transaction
          </Typography>
          {/* <div>
            <InputField type="date" className="py-1" />
          </div> */}
        </div>
        <div className=" mt-6  border-zapp-gray_500 ">
          <div className="border-zapp-gray_500 flex text-[1rem] text-zapp-light_black font-normal ">
            {/* <button
              className={`  ${
                activeTab === "currentadmin" && " border-zapp-primary  "
              }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
              onClick={() => handleTabClick("all")}
            >
              All Transaction History
            </button> */}

            {/* <button
              className={`  ${
                activeTab === "activeride" && "border-zapp-primary  "
              }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("admin")}
            >
                Employeee
            </button> */}
          </div>
        </div>
        <div className=" flex justify-between mt-2">
          {/* <div>
            <InputField
              placeholder="Search with ID (e.g. 123456)"
              className="py-3  pl-8"
              icon={<MdSearch />}
            />
          </div> */}
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
        <div className=" mt-5">
          <Table
            data={business_cashflows}
            columns={columns}
            className={"w-full"}
            currentPage={currentPage}
            pages={P}
          />
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default TransactionHistory;
