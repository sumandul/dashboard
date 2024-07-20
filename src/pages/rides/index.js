import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { callFetch, getMyProfile } from "@/helper/server";
import Image from "next/image";
import { getDateValue } from "@/helper/client";
import { Router, useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import DowmloadIcon from "../../../public/dowloadicon.png";
import { debounce } from "debounce";
import searchRedirect from "@/helper/server/searchRedirect";
// import RadioButton from "../radiobutton/RadioButton";
import { DotSvg } from "@/svgicon";
import RadioButton from "@/components/radiobutton/RadioButton";
import Link from "next/link";
import NotFound from "@/pages/404";


const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField")
);
const Typography = dynamic(
  () => import("../../components/typography/Typography"),
  {
    suspense: true,
  }
);
const Breadcrumb = dynamic(() => import("../../components/breadcum/index"), {
  suspense: true,
});
const Table = dynamic(() => import("../../components/table/Table"), {
  suspense: true,
});

export async function getServerSideProps(context) {

    const myProfile = await getMyProfile(context);


    const { page = 1, limit = "5", phone = "",name="", active = "" } = context.query;
    const response = await Promise.all([
      callFetch(
        context,
        `rides?page=${page}&limit=${limit}&phone=${phone}&name=${name}&active=${active}`
      ),
      callFetch(context, `rides/stats`),
    ]);

    const [
      {
        json: { rides, currentPage, limit: returnedLimit, pages, total },
      },
      {
        json: { spending, totalRides, noOfActiveRides, noOfCompletedRides },
      },
    ] = response;
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
    if (!myProfile.is_live) {
      return {
        redirect: {
          destination: "/settings/company",
          permanent: false,
        },
      };
    }
   
    return {
      props: {
        rides,
        currentPage,
        limit,
        pages,
        total,
        spending,
        myProfile,
        totalRides,
        noOfActiveRides,
        noOfCompletedRides,
      },
    };
  
}

const Rides = ({
  rides,
  __state,
  currentPage,
  limit,
  pages,
  total,
  spending,
  myProfile,
  noOfActiveRides,
  noOfCompletedRides,
  totalRides,
}) => {
  const [open, setClose] = useState(false)
  const [id, setId] = useState()
  const [activeTab, setActiveTab] = useState("allrides");
  const dropdownRef = useRef(null);
  const [dateValue, setDateValue] = useState({
    startDate: getDateValue(new Date()),
    endDate: getDateValue(new Date()),
  });


  useOutsideAlerter(dropdownRef);
  const router = useRouter();
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

  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handlePopUp = () => {
    if(open){
      setClose(!open)
    } else {
      setClose(true)
    }
 
  }
  const columns = [
    {
      header:  <RadioButton   type={"checkbox"}/>,
      selector: (row) => {
        const handleId = (e) => {

        }
        return (
          <div className={"pl-2"}>
            <RadioButton onChange={handleId} value={row.id} type={"checkbox"} />
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
      selector: (row) =>
      <td>
        Rs. {
     row.fare
        }

      </td>
   
    },
    {
      header: '',
      selector: (row) => <div className=" flex justify-end  ">
        <div     className=" relative    " onClick={() => { handlePopUp(), setId(row.id) }}>

          <span className=" cursor-pointer">    <DotSvg /></span>
          {
            open && id === row.id &&
            <div ref={dropdownRef} 
              className="  z-20   w-24    bg-[#ebebeb] capitalize shadow-md absolute  bottom-[-3rem] right-0   transition-all duration-0.5 ease-in-out"
            >
              <ul className=" ">

                <li className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white">   
                   <Link
                  href={`/rides/${row.id}`}
                >
                  ride detail
                </Link>
                </li>
              </ul>

            </div>
          }

        </div>
      </div>,
    },
  ];
  return (
    <DashBoardLayout profile={myProfile}>
      <div className="px-3 2xl:px-10">
        <div className="  text-base  capitalize">
          <Breadcrumb router={router} />
        </div>
        <div className=" flex  flex-col sm:flex-row  items-start sm:items-center justify-between ">
          <Typography variant={"h1"} className=" my-4 xl:mt-7">
            Ride Dashboard
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
        <div className=" bg-zapp-whit  grid  grid-cols-2      py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
          <div className=" border-r-2  border-zapp-gray_500  pl-2 sm:pl-6  2xl:pr-52">
            <span className=" text-[14px] font-normal">This month’s spend</span>
            <Typography variant="h4">RS. {spending}</Typography>
          </div>
          <div className=" pl-2 sm:pl-4  2xl:pr-52">
            <span className=" text-[14px] font-normal">
              Total rides this month
            </span>
            <Typography variant="h4">{totalRides}</Typography>
          </div>
    
        </div>
        <div className=" mt-14  border-zapp-gray_500 ">
          <div className="border-zapp-gray_500 flex text-[1rem] text-zapp-light_black font-normal ">
            <button
              className={`  ${activeTab === "allrides" && " border-zapp-primary  "
                }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
              onClick={() => handleTabClick("allrides")}
            >
              All rides
            </button>

            <button
              className={`  ${activeTab === "activerides" && "border-zapp-primary  "
                }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("activerides")}
            >
              Active rides
            </button>

            <button
              className={`  ${activeTab === "completedrides" && "border-zapp-primary  "
                }     border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("completedrides")}
            >
              Completed rides
            </button>
          </div>
          <div></div>
        </div>
        <div className=" sm:flex justify-between mt-10">
          <div className="sm:basis-[50%] md:basis-[40%] lg:basis-[46%] xl:basis-[34%] 2xl:basis-[35%]">
            <InputField
              placeholder="Search Number"
              className="py-3 sm:w-[14rem]  pl-12"
              icon={<MdSearch />}
              onChange={debounce(
                (e) =>
                  searchRedirect(
                    router.pathname,
                   `${ /^[0-9]$/.test(e.target.value[0]) ? "phone" : "name"}`,
                    e.target.value,
                    router
                  ),
                500
              )}
            />
          </div>
          <div className=" mt-4 sm:mt-0 flex items-center">
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
          </div>
        </div>
        <div className=" mt-5">
          {activeTab === "allrides" && (
            <Table
              data={rides}
              columns={columns}
              total={total}
              currentPage={currentPage}
              pages={pages}
              limit={limit}
              message={"Ride Data Not Found."}
              className={"w-[1200px] sm:w-full"}
            />
          )}
          {activeTab === "activerides" && <Table columns={columns}    message={"Ride Data Not Found."}    className={"w-[1200px] sm:w-full"} />}
          {activeTab === "completedrides" && <Table columns={columns}   message={"Ride Data Not Found."}      className={"w-[1200px] sm:w-full"}/>}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Rides;
