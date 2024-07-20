import { callFetch, getMyProfile } from "@/helper/server";
import { Button } from "@/components/button/Button";
import { debounce } from "debounce";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
import RadioButton from "@/components/radiobutton/RadioButton.js";
import Table from "@/components/table/Table.js";
import IsoDateString from "@/components/helpers/dateFormate.js";
const Typography = dynamic(() =>
  import("@/components/typography/Typography.js")
);

const DashBoardLayout = dynamic(() =>
  import("@/components/layout/DashBoardLayout.js")
);
const Breadcrumb = dynamic(() =>
  import("@/components/breadcum/index.js")
);

export async function getServerSideProps(context) {
  try {
    const myProfile = await getMyProfile(context);

    const {
    //   currentPage,
    //   limit,
    //   pages,
    //   total,
    json,
    } = await callFetch(
      context,
      `business-cashflows/${context.query.id}/of-user`
    );
    return {
      props: {
        json,
        myProfile,
        // currentPage,
        // limit,
        // pages,
        // total,
      },
    };

    //   if (!myProfile.is_live) {
    //     return {
    //       redirect: {
    //         destination: "/settings/company",
    //         permanent: false,
    //       },
    //     };
    //   }
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const UserTransactionList = ({
json,
  currentPage,
  limit,
  pages,
  total,
  myProfile,
}) => {
  const router = useRouter();
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
        header: "Transaction Date",
        selector: (row) => IsoDateString(row.created_at),
      },
    // {
    //   header: "",
    //   selector: (row) => (
    //     <div className=" flex justify-end  ">
    //       <div
    //         className=" relative    "
    //         onClick={() => {
    //           handlePopUp(), setId(row.id);
    //         }}
    //       >
    //         <span className=" cursor-pointer">
    //           {" "}
    //           <DotSvg />
    //         </span>
    //         {open && id === row.id && (
    //           <div
    //             ref={dropdownRef}
    //             className="  z-20   w-24    bg-[#ebebeb] capitalize shadow-md absolute  bottom-[-3rem] right-0   transition-all duration-0.5 ease-in-out"
    //           >
    //             <ul className=" ">
    //               <li className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white">
    //                 <Link
    //                   href={`/settings/transaction-history/detail/${row.id}`}
    //                 >
    //                   detail
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div>
      <DashBoardLayout profile={myProfile}>
        <div className=" px-4 2xl:px-10">
          <div className="  text-base  capitalize">
            <Breadcrumb router={router} />
          </div>
          <div className=" flex items-center justify-between">
            <Typography variant={"h1"} className=" my-4 sm:my-5">
              Transaction Detail
            </Typography>
          </div>
          <Table
            data={json.business_cashflows}
            columns={columns}
            currentPage={currentPage}
            pages={pages}
            className={"w-full"}
            limit={limit}
            message={"No Transaction History Yet.x"}
          />
        </div>
      </DashBoardLayout>
    </div>
  );
};

export default UserTransactionList;
