import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { callFetch, getMyProfile } from "@/helper/server";
import { getDateValue } from "@/helper/client";
import { Router, useRouter } from "next/router";
import { HiEyeSlash } from "react-icons/hi2";
// import { debounce } from "debounce";
// import searchRedirect from "@/helper/server/searchRedirect";
// import MyProfile from "@/pages/my-profile";
const DashBoardLayout = dynamic(() =>
  import("../../../components/layout/DashBoardLayout")
);
const InputField = dynamic(() =>
  import("../../../components/inputfield/InputField")
);
const Typography = dynamic(() =>
  import("../../../components/typography/Typography")
);
const Breadcrumb = dynamic(() =>
  import("../../../components/breadcum/index")
);
const Table = dynamic(() => import("../../../components/table/Table"));

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const { page = 1, limit = "5", name = "", active = "" } = context.query;
  const {
    status,
    json: { rides, currentPage, limit: returnedLimit, pages, total },
  } = await callFetch(context, `rides/${context.params.id}/of-user`);
  
  if (!rides) {
    return {
      notFound: true,
    };
  }
  if(!myProfile){
    return {
      notFound: true,
    };
  }
  

  return {
    props: { rides, currentPage, limit, pages, total,myProfile },
  };
}

const RideHistory = ({ rides, __state, currentPage, limit, pages, total,myProfile }) => {
  for (let i = 0; i < rides?.length; i++) {
    const ride = rides[i];
    var employeeName = ride.user.name;
    var Balance = ride.user.balance;
  }


  const [dateValue, setDateValue] = useState({
    startDate: getDateValue(new Date()),
    endDate: getDateValue(new Date()),
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

  const columns = [
    {
      header: '',
      selector: (row) => {
        const handleId = (e) => {

        }
        return (
          <div className={"pl-2"}>
            {/* <RadioButton onChange={handleId} value={row.id} type={"checkbox"} /> */}
          </div>
        )

      }
    },
    {
      header: 'Name',
      selector: (row) => row?.user?.name,
    },
    {
      header: 'Phone Number',
      selector: (row) => row?.user?.phone,

    },
    {
      header: 'Pick up location',
      selector: (row) => <td className="  pr-10">
        {
          row.drop_name.split(",").slice(0, 4)
        }

      </td>


    },
    {
      header: 'Service',
      selector: (row) => row.service,
    },
    {
      header: 'Drop location',
      selector: (row) => <td>
        {
          row.pickup_name.split(",").slice(0, 4)
        }

      </td>

    },
    {
      header: 'Fare',
      selector: (row) => row.fare,
    },
    {
      header: '',
      selector: (row) => <div className=" flex justify-end  ">
        {/* <div     className=" relative    " onClick={() => { handlePopUp(), setId(row.id) }}>

          <span className=" cursor-pointer">    <DotSvg /></span>
          {
            open && id === row.id &&
            <div ref={dropdownRef} 
              className="  z-20   w-24    bg-[#ebebeb] capitalize shadow-md absolute  bottom-[-3rem] right-0   transition-all duration-0.5 ease-in-out"
            >
              <ul className=" ">

                <li className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white">   
                   <Link
                  href={`/business/rides/${row.id}`}
                >
                  ride detail
                </Link>
                </li>
              </ul>

            </div>
          }

        </div> */}
      </div>,
    },
  ];
  useEffect(() => {
    if (dateValue.startDate && dateValue.endDate) {
    }
  }, [dateValue.startDate, dateValue.endDate]);
  return (
    <DashBoardLayout  profile={myProfile}>
      <div className="px-3 2xl:px-10">
        <div className="  text-base  capitalize">
          <Breadcrumb router={router} />
        </div>
        <div className=" flex  flex-col sm:flex-row  items-start sm:items-center justify-between ">
          <Typography variant={"h1"} className=" my-4 xl:mt-7">
            {employeeName}
          </Typography>
        </div>
        <div className=" bg-zapp-whit  grid  grid-cols-2 sm:w-1/3    py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
          <div className=" border-r-2  border-zapp-gray_500  pl-2 sm:pl-6  2xl:pr-52">
            <span className=" text-[14px] font-normal">Employee Balance</span>
            <Typography variant="h4">Rs.{Balance}</Typography>
          </div>
          <div className=" pl-2 sm:pl-4  2xl:pr-52">
            <span className=" text-[14px] font-normal">
              Total rides 
            </span>
            <Typography variant="h4">{total}</Typography>
          </div>
        
        </div>

        <div className=" sm:flex justify-between mt-10">
          {/* <div>
            <InputField
              placeholder="Search employees (name or number)"
              className="py-3 sm:w-[25rem]  pl-12"
              icon={<MdSearch />}
              onChange={debounce(
                (e) =>
                  searchRedirect(
                    "/business/rides",
                    "name",
                    e.target.value,
                    router
                  ),
                500
              )}
            />
          </div> */}
          {/* <div className=" mt-4 sm:mt-0 flex items-center">
            <Image
              src={DowmloadIcon}
              width={14}
              height={17}
              className="mr-2"
              alt="download_icon"
            />
            <span className=" text-zapp-primary text-base font-normal">
              Export
            </span>
          </div> */}
        </div>
     
      
          <div className=" mt-5">
             <Table
              data={rides}
              columns={columns}
              total={total}
              currentPage={currentPage}
              pages={pages}
              limit={limit}
              message={"no ride  history."}
              className={"w-[1200px] sm:w-full"}
            />
          </div>
      
      </div>
    </DashBoardLayout>
  );
};

export default RideHistory;
