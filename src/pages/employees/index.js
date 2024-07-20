import React, { useState, useEffect, useRef } from "react";
import { MdOutlineArrowBack, MdSearch } from "react-icons/md";
import dynamic from "next/dynamic";
import { callFetch, getMyProfile } from "@/helper/server";
import { DotSvg, DownloadSvg } from "@/svgicon";
import { useRouter } from "next/router";
import debounce from "debounce";
import searchRedirect from "@/helper/server/searchRedirect";
import { toast } from "react-toastify";
import Modal from "@/components/popupmodal/Modal";
import { Button } from "@/components/button/Button";
import { useForm } from "react-hook-form";
import RadioButton from "@/components/radiobutton/RadioButton";
import Link from "next/link";
import { HiOutlineXMark } from "react-icons/hi2";
import Select from "@/components/select/Select";
const Table = dynamic(() => import("../../components/table/Table"));
const Typography = dynamic(() =>
  import("../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField.js")
);
const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout.js")
);
const Breadcrumb = dynamic(() => import("../../components/breadcum/index.js"));
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const { page = 1, limit = "5", phone = "", active = "" ,balance="",order=""} = context.query;
  const response = await Promise.all([
    callFetch(
      context,
      `your-users?page=${page}&limit=${limit}&phone=${phone}&active=${active}&balance=${balance}&order=${order}`
    ),
    callFetch(context, `business`),
  ]);
  const [
    {
      statusCode,
    json: { business_users, currentPage, limit: returnedLimit, pages, total }},
    {
      status, json,
    },
  ] = response;
  // const {
  //   status,
  //   json: { business_users, currentPage, limit: returnedLimit, pages, total },
  // } = await callFetch(
  //   context,
  //   `your-users?page=${page}&limit=${limit}&name=${name}&active=${active}`
  // );
  if (!business_users) {
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
        destination: "/company",
        permanent: false,
      },
    };
  }
  return {
    props: {
      myProfile,
      status,
      business_users,
      currentPage,
      limit: returnedLimit,
      pages,
      total,
      json
    },
  };
}

const EmployeesList = ({
  __state,
  business_users: serverUser,
  total,
  limit,
  pages,
  myProfile,
  currentPage,
   json
}) => {

  const router = useRouter();
  const [singleData, setSingleData] = useState({});
  const [business_users, setBusinessUsers] = useState(serverUser);

  const [show, setShow] = useState({
    addDeduct: false,
    edit: false,
  });

  const [activeTab, setActiveTab] = useState("allemployees");
  const [Amount, setAmount] = useState();
  const [EmployeeDetail, setEmployeeDetail] = useState();
  const [open, setClose] = useState(false)
  const [id, setId] = useState()
  const handlePopUp = () => {

    setClose(!open)
  }
  const {
    formState: { errors },
  } = useForm({
    defaultValues: "",
  });
  const dropdownRef = useRef(null)
  useOutsideAlerter(dropdownRef);
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

  const columns = [
    {
      header: <RadioButton   type={"checkbox"}/> ,
      selector: (row) => {
        const handleId = (e) => {
        }
        return (
          <div className={"pl-2 "}>
            <RadioButton onChange={handleId} value={row.id} type={"checkbox"} />
          </div>
        )
      }
    },
    {
      header: 'Name',
      selector: (row) => <td className=" gap-2 flex items-center">
        <div className={`h-2 w-2  rounded-full ${row.active === 1 ? "bg-zapp-success" : " bg-zapp-warning"} `}>

        </div>

        {row?.name}

      </td>
    },
    {
      header: 'Phone Number',
      selector: (row) => row.phone,

    },
    {
      header: 'gender',
      selector: (row) => row.gender
    },
    {
      header: 'balance',
      selector: (row) => <td>

        {`Rs. ${row.balance}`}

      </td>
    },
    {
      header: '',
      selector: (row) => {

        return (
          <div className=" flex justify-end  ">
            <div className=" relative    " onClick={() => { handlePopUp(), setId(row.id) }}>

              <span className=" cursor-pointer">    <DotSvg /></span>
              {
                open && id === row.id &&
                <div
                  ref={dropdownRef}

                  className="  z-20   w-32 text-zapp-black   bg-[#ebebeb] capitalize shadow-md absolute  top-[0rem] right-[0%]    transition-all duration-0.5 ease-in-out"
                >
                  <ul className=" text-[0.6rem] text-normal">

                    <li onClick={() => {
                      handleModal(row)
                      setShow({
                        addDeduct: true,
                        edit: false,
                      });
                      setPopUp(false);
                    }}
                      className="  text-center hover:bg-zapp-primary  py-3   hover:text-zapp-white">
                      add / Deduct Balance

                    </li>
                    <li className=" py-3  text-center hover:bg-zapp-primary   text-zapp-black font-normal  hover:text-zapp-white">
                      <Link href={`employees/${row.id}`} >



                        Edit Employee
                      </Link>
                    </li>
                    <li className="  text-center hover:bg-zapp-primary  text-zapp-black font-normal py-3  hover:text-zapp-white">

                      <Link
                        href={`rides/${row.id}/of-user`}
                      >
                        ride history
                      </Link>

                    </li>

                  </ul>

                </div>
              }

            </div>
          </div>

        )
      }
    },

  ];
  const handleAddAmount = async () => {
    try {
      __state.loading = true;
      const response = await fetch(
        `api/your-users/${EmployeeDetail.id}/add-balance`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseInt(Amount) }),
        }
      );

      const json = await response.json();
      if (response.status === 200) {
        const updated = business_users.map((data) => {
          if (data.id === json.id) {
            return { ...data, ...json };
          }
          return data;
        });
        setBusinessUsers(updated);
        setShow(show.addDeduct === false);
        toast.success(
          `Amount  Rs${Amount} added to ${json.name}  successfully`
        );
        setEmployeeDetail(json);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      __state.loading = false;
    }
  };
  const handleDeductAmount = async () => {
    try {
      const response = await fetch(
        `api/your-users/${EmployeeDetail.id}/deduct-balance`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseInt(Amount) }),
        }
      );

      const json = await response.json();

      if (response.status === 200) {
        const updated = business_users.map((data) => {
          if (data.id === json.id) {
            return { ...data, ...json };
          }
          return data;
        });
        setBusinessUsers(updated);
        setShow(show.addDeduct === false);
        toast.success(
          `Amount  Rs${Amount} deducted  from  ${json.name}  successfully`
        );
        setEmployeeDetail(json);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const [popUp, setPopUp] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab == "allemployees") {
      router.push({
        pathname: "/employees",
      });
    } else if (tab == "activeemployee") {
      router.push({
        pathname: "/employees",
        query: { active: "yes" },
      });
    } else if (tab == "archievedemployee") {
      router.push({
        pathname: "/employees",
        query: { active: "no" },
      });
    }
  };

  const handleModal = (row) => {
    setShow(true);

    setEmployeeDetail(row);
    setPopUp(false);
  };


  useEffect(() => {
    setBusinessUsers(serverUser);
  }, [serverUser]);



  return (
    <>
      <Modal width={"100%"} isOpen={show.addDeduct}>
      <div className=" flex justify-end">
      <button
          className=" flex  gap-1 items-center"
          onClick={() => setShow({ addDeduct: false })}
        >
         <div className="w-6 h-6 bg-zapp-primary flex    justify-center items-center rounded-full"><HiOutlineXMark className="    drop-shadow-2xl text-zapp-primary_Light text-[1.2rem]" /></div>
          
        </button>
        </div>
       
        <div className="sm:px-10">
          <div>
            <Typography variant={"h1"}>Add or deduct balance</Typography>
          </div>
          <div className=" bg-zapp-whit pl-2 gap-1   grid  grid-cols-2  sm:grid-cols-3  mt-4   py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
            <div className=" sm:border-r-2  border-zapp-gray_500   px-4.  2xl:pr-52">
              <span className=" text-[14px] font-normal">
               Employee Balance
              </span>
              <Typography variant="h4">Rs.{EmployeeDetail?.balance}</Typography>
            </div>
            <div className=" pl-2 sm:pl-5  2xl:pr-52">
              <span className=" text-[14px] font-normal">
                {" "}
                Total rides taken
              </span>
              <Typography variant="h4">0</Typography>
            </div>
           
            <div className=" sm:border-l-2 sm:px-6  border-zapp-gray_500">
              <span className=" text-[14px] font-normal">Company Balance</span>
              <Typography variant="h4">Rs.{myProfile.balance}</Typography>
            </div>
          </div>
          <div className=" my-6 sm:w-1/4">
            <InputField
              className="py-4 "
              type={"number"}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </div>
          <div className=" flex">
            <span onClick={handleDeductAmount}>
              <Button variant={"default"} className="  sm:py-2">
                Deduct amount
              </Button>
            </span>

            <span onClick={handleAddAmount}>
              <Button className={"ml-4 sm:py-2"}>Add amount</Button>
            </span>
          </div>
        </div>
      </Modal>

      <DashBoardLayout profile={myProfile}>
        <div className="  px-4 w-full   2xl:px-14">
          <div className="   text-base  flex  font-normal text-zapp-black  uppercase">
            <Breadcrumb router={router} />
          </div>
          <div className=" flex items-center justify-between">
            <Typography variant={"h1"} className=" my-4 sm:my-6">
              All Employees
            </Typography>
          </div>
          <div className=" bg-zapp-whit  grid  grid-cols-3     py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
            <div className=" border-r-2  border-zapp-gray_500  pl-2 sm:pl-6  2xl:pr-52">
              <span className=" text-[14px]    font-normal">
                Total employees
              </span>
              <Typography variant="h4">{ total}</Typography>
            </div>
            <div className=" pl-2 sm:pl-4  2xl:pr-52">
              <span className=" text-[14px] font-normal">
                Total rides taken
              </span>
              <Typography variant="h4">0</Typography>
            </div>
            <div className=" border-l-2 pl-6  border-zapp-gray_500">
              <span className=" text-[14px] font-normal">Total deliveries</span>
              <Typography variant="h4">0</Typography>
            </div>
          </div>
          <div className=" mt-8 sm:mt-14  border-zapp-gray_500 ">
            <div className="border-zapp-gray_500 flex text-sm sm:text-[1rem] text-zapp-light_black font-normal ">
              <button
                className={`  ${activeTab === "allemployees" && " border-[#3056D3]  "
                  }  border-zapp-gray_500  pb-1    border-b-2  w-full px-4  `}
                onClick={() => handleTabClick("allemployees")}
              >
                All employees
              </button>

              <button
                className={`  ${activeTab === "activeemployee" && "border-[#3056D3]   "
                  }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
                onClick={() => handleTabClick("activeemployee")}
              >
                Active employees
              </button>

              <button
                className={`  ${activeTab === "archievedemployee" && "border-[#3056D3]   "
                  }     border-zapp-gray_500  border-b-2  w-full   px-4  `}
                onClick={() => handleTabClick("archievedemployee")}
              >
                Archived employees
              </button>
            </div>
            <div></div>
          </div>
          <div className=" sm:flex justify-between mt-10">
            <div className=" sm:basis-[50%] md:basis-[40%] lg:basis-[46%] xl:basis-[34%] 2xl:basis-[35%]">
              <InputField
                placeholder="Search Number"
                className="py-3 sm:w-[14rem]  pl-12"
                icon={<MdSearch />}
                onChange={debounce(
                  (e) =>
                    searchRedirect(
                      "/employees",
                      "phone",
                      e.target.value,
                      router
                    ),
                  500
                )}
              />
            </div>
            <div className="  flex-wrap flex items-center gap-4">
          
          <div className=" ">
            <Select
              data={[
                { label: "All", value: "all" },
                { label: "Equal to 0", value: "eq_0" },
                { label: "Less Than 0", value: "lt_0" },
                { label: "Greater Than 0", value: "gt_0" },
                { label: "Greater OR Equal to 0", value: "gt_0" },
                { label: "Less OR Equal to 0", value: "gt_0" },
              ]}
              defaultValue={"Select Balance"}
              onChange={(e) => {
                const { balance, ...query } = router.query;
                if (e.target.value === "all") {
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                  return;
                }
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...query,
                    balance: e.target.value,
                  },
                });
              }}
            />
          </div>
       
          <div className="select-wrapper">
          <Select
              data={[
                { label: "All", value: "all" },
                { label: "Asc", value: "asc" },
                { label: "Dsc", value: "desc" },
              ]}
              defaultValue={"Select Order"}
              onChange={(e) => {
                const { order, ...query } = router.query;
                if (e.target.value === "all") {
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                  return;
                }
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...query,
                    order: e.target.value,
                  },
                });
              }}
            />
            
  
          </div>
          <div className=" flex justify-end mt-4">
              <div className="mr-2">
                <DownloadSvg />
              </div>
              <span className=" text-zapp-primary text-base font-normal">
                Export
              </span>
            </div>
        
        </div>
         
          </div>
          <div className=" mb-20  mt-5 w-full ">
            {activeTab === "allemployees" && (
              <Table
                data={business_users}
                columns={columns}
                total={total}
                currentPage={currentPage}
                pages={pages}
                limit={limit}
                setAmount={setAmount}
                onClick={handleModal}
                setSingleData={setSingleData}
                setShow={setShow}
                popUp={popUp}
                setPopUp={setPopUp}
                className={"w-[600px] sm:w-full"}
              />
            )}
            {activeTab === "activeemployee" && (
              <Table
                data={business_users}
                columns={columns}
                total={total}
                currentPage={currentPage}
                pages={pages}
                limit={limit}
                className={"w-[600px] sm:w-full"}
                setSingleData={setSingleData}
              />
            )}
            {activeTab === "archievedemployee" && (
              <Table
                data={business_users}
                columns={columns}
                total={total}
                currentPage={currentPage}
                pages={pages}
                limit={limit}
                setSingleData={setSingleData}
                className={"w-[600px] sm:w-full"}
              />
            )}
          </div>
        </div>
      </DashBoardLayout>
    </>
  );
};

export default EmployeesList;
