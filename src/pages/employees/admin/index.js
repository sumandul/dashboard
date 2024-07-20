import { callFetch, getMyProfile } from "@/helper/server";
import { Button } from "@/components/button/Button";
import { debounce } from "debounce";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import RadioButton from "@/components/radiobutton/RadioButton";
import { toast } from "react-toastify";
import { HiOutlineXMark } from "react-icons/hi2";
import searchRedirect from "@/helper/server/searchRedirect";
import Toogle from "@/components/toogle/Toogle.js";
import { DotSvg } from "@/svgicon/index.js";
import Select from "@/components/select/Select.js";
const Table = dynamic(() => import("../../../components/table/Table.js"));
const Typography = dynamic(() =>
  import("../../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../../components/inputfield/InputField.js")
);
const DashBoardLayout = dynamic(() =>
  import("../../../components/layout/DashBoardLayout.js")
);
const Breadcrumb = dynamic(() =>
  import("../../../components/breadcum/index.js")
);
const Modal = dynamic(() => import("../../../components/popupmodal/Modal.js"));
export async function getServerSideProps(context) {
  try {
    const myProfile = await getMyProfile(context);
    const {
      page = 1,
      limit = 7,
      phone = "",
      is_super_admin = "",
      active = "",
      order = "",
    } = context.query;
    if (!myProfile) {
      return {
        notFound: true,
      };
    }

    const {
      status,
      json: {
        business_admins,
        currentPage,
        limit: returnedLimit,
        pages,
        total,
      },
    } = await callFetch(
      context,
      `your-admins?page=${page}&limit=${limit}&phone=${phone}&is_super_admin=${is_super_admin}&active=${active}&order=${order}`
    );

    if (!business_admins) {
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
        business_admins,
        currentPage,
        limit: returnedLimit,
        pages,
        total,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
const Admin = ({
  business_admins: serverBusinessAdmins,
  currentPage,
  limit,
  pages,
  myProfile,
  total,
}) => {
  const [id, setId] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState();
  const [singleData, setSingleData] = useState({});
  const [open, setClose] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const dropdownRef = useRef(null);
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
  const [active, setActive] = useState(false);
  const [business_admins, setBusinessAdmins] = useState(serverBusinessAdmins);
  const [activeTab, setActiveTab] = useState("currentadmin");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {}, [isSuperAdmin]);

  const handleModalBack = () => {
    reset();
    setSingleData({});
    setShow(false);
  };
  const handleEditData = (data, disabled) => {
    setSingleData(data);
    if (!disabled) {
      setActive(false);
    } else {
      setActive(true);
    }

    setClose(false);
    setShow(true);
    setId(data.id);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const alertConfirm = async (row, disabled) => {
    if (!disabled) {
      try {
        const response = await fetch(
          `/api/your-admins/${row.id}/update-status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: row.active === 1 ? false : true }),
          }
        );
        const json = await response.json();
        if (response.status === 200) {
          toast.info(`${json.name} status changes `);
          const updatedAdmins = business_admins.map((admin) => {
            if (admin.id === row.id) {
              return { ...admin, active: json.active };
            }
            return admin;
          });

          setBusinessAdmins(updatedAdmins);
          reset();
          toast.success(json.message);
        } else {
          toast.error(json.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/your-admins/${singleData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        const updated = business_admins.map((data) => {
          if (data.id === json.id) {
            return { ...data, ...json };
          }
          return data;
        });
        await fetch(`/api/your-admins/${json.id}/update-password`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        });
        toast.success(`Admin  updated successfully`);
        setBusinessAdmins(updated);

        setShow(false);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const columns = [
    {
      header: <RadioButton type={"checkbox"} />,
      selector: (row) => {
        const handleId = (e) => {};
        return (
          <div className={"pl-2 "}>
            <RadioButton onChange={handleId} value={row.id} type={"checkbox"} />
          </div>
        );
      },
    },
    {
      header: "Name",
      selector: (row) => (
        <td className=" gap-2 flex items-center">
          <div
            className={`h-2 w-2  rounded-full ${
              row.active === 1 ? "bg-zapp-success" : " bg-zapp-warning"
            } `}
          ></div>
          {row?.name}
        </td>
      ),
    },
    {
      header: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      header: "Email",
      selector: (row) => row.email,
    },
    {
      header: "Admin type",
      selector: (row) => (
        <td>
          {row.is_super_admin === 1 ? (
            <>
              {" "}
              <div className=" bg-zapp-primary text-zapp-white hidden sm:block px-2 rounded-xl py-1">
                super admin
              </div>{" "}
              <div className=" bg-zapp-primary text-zapp-white block sm:hidden px-2 rounded-xl py-1">
                S.A
              </div>{" "}
            </>
          ) : (
            <div className="  bg-zapp-secondary capitalize text-zapp-white px-2 rounded-xl py-1">
              {" "}
              admin
            </div>
          )}
        </td>
      ),
    },
    {
      header: "status",
      selector: (row) => {
   
        return (
          <td>
            {
              <span onClick={() => alertConfirm(row, myProfile.id === row.id)}>
                {" "}
                <Toogle disbale={myProfile.id === row.id} active={row.active} />
              </span>
            }
          </td>
        );
      },
    },
    {
      header: "",
      selector: (row) => (
        <div className=" flex justify-end  ">
          <div
            className=" relative    "
            onClick={() => {
              setClose(true), setId(row.id);
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
                  <li
                    onClick={() => {
                      handleEditData(row, myProfile.id === row.id);
                    }}
                    className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white"
                  >
                    Edit Admin
                  </li>
                  {row.is_super_admin === 1 && (
                    <li className="  text-center hover:bg-zapp-primary py-2  text-zapp-black font-normal  hover:text-zapp-white">
                      <Link href={`/transaction-history/${row.id}/admin`}>
                        Transcation
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  const router = useRouter();
  useEffect(() => {
    setBusinessAdmins(serverBusinessAdmins);
  }, [serverBusinessAdmins]);
  useEffect(() => {
    if (status != null) {
    }
  }, [id]);

  return (
    <div>
      <Modal isOpen={show} setClose={setShow} width={400}>
        <div className=" flex justify-end">
          <button
            className=" flex  gap-1 items-center"
            onClick={handleModalBack}
          >
            <div className="w-6 h-6 bg-zapp-primary flex    justify-center items-center rounded-full">
              <HiOutlineXMark className="    drop-shadow-2xl text-zapp-primary_Light text-[1.2rem]" />
            </div>
          </button>
        </div>
        <div className=" sm:px-1">
          <div className=" flex items-center justify-between">
            <Typography variant={"h2"} className=" my-3">
              Admin Details
            </Typography>
          </div>
          <div className="  rounded-[0.5rem] bg-zapp-white  py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid  grid-cols-1 gap-6">
                <div>
                  <InputField
                    placeholder=" Name"
                    className="py-3"
                    name="name"
                    defaultValue={singleData && singleData.name}
                    register={register}
                    rules={{ required: true }}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    placeholder="Phone No."
                    className="py-3"
                    name="phone"
                    defaultValue={singleData.phone}
                    register={register}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^98\d{8}$/,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    type="email"
                    placeholder="Email Address"
                    className="py-3"
                    name="email"
                    defaultValue={singleData.email}
                    register={register}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                {singleData.is_super_admin === 0 && (
                  <div>
                    <InputField
                      name={"password"}
                      defaultValue={password}
                      placeholder="password"
                      className="py-3"
                      register={register}
                      errors={errors}
                    />
                  </div>
                )}

                <div>
                  <span className=" text-base font-normal  text-zapp-light_black ">
                    Access
                  </span>
                  <div className="  mt-1 gap-4 grid grid-cols-2">
                    <div className=" border border-zapp-gray_500 px-3 py-4 rounded-[0.5rem]">
                      <RadioButton
                        type="checkbox"
                        label="Super Admin"
                        disabled={active}
                        defaultChecked={singleData.is_super_admin === 1}
                        register={register}
                        name="is_super_admin"
                      />
                    </div>
                    <div className=" border border-zapp-gray_500 px-3 py-4 rounded-[0.5rem]">
                      <RadioButton
                        type="checkbox"
                        label="Active"
                        disabled={active}
                        defaultChecked={singleData.active === 1 ? true : false}
                        register={register}
                        name="active"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-5 flex justify-end">
                <Button className="" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <DashBoardLayout profile={myProfile}>
        <div className=" px-4 2xl:px-10">
          <div className="  text-base  capitalize">
            <Breadcrumb router={router} />
          </div>
          <div className=" flex items-center justify-between">
            <Typography variant={"h1"} className=" my-4 sm:my-5">
              Manage Admins
            </Typography>
          </div>
          {/* <div className="  border-zapp-gray_500 ">
            <div className="border-zapp-gray_500 text-[1rem] text-zapp-light_black font-normal ">
              <div>
                <button
                  className={`      ${
                    activeTab === "currentadmin" && " border-zapp-primary  "
                  }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
                  onClick={() => handleTabClick("currentadmin")}
                >
                  Current Admins
                </button>
              </div>
            </div>
          </div> */}
          <div className=" flex gap-4 flex-col  sm:flex-row  justify-between sm:items-center     mt-10">
            <div className="sm:basis-[50%] md:basis-[40%] lg:basis-[46%] xl:basis-[34%] 2xl:basis-[35%]  ">
              <InputField
                placeholder="Search Number"
                className="py-3 sm:w-[14rem]  pl-12"
                icon={<MdSearch />}
                onChange={debounce(
                  (e) =>
                    searchRedirect(
                      "/employees/admin",
                      "phone",
                      e.target.value,
                      router
                    ),
                  500
                )}
              />
            </div>
            <div className="  flex-wrap flex items-start gap-4">
          
              <div className=" ">
                <Select
                  data={[
                    { label: "All", value: "all" },
                    { label: "SuperAdmin", value: "yes" },
                    { label: "Admin", value: "no" },
                  ]}
                  defaultValue={"Select Admin"}
                  onChange={(e) => {
                    const { is_super_admin, ...query } = router.query;
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
                        is_super_admin: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="select-wrapper">
              <Select
                  data={[
                    { label: "All", value: "all" },
                    { label: "Active", value: "yes" },
                    { label: "InActive", value: "no" },
                  ]}
                  defaultValue={"Select Status"}
                  onChange={(e) => {
                    const { active, ...query } = router.query;
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
                        active: e.target.value,
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

              <div className=" ">
                <Link href="/employees/admin/add-admin">
                  <Button className="mr-4">Add Admin</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" mt-5">
            {activeTab === "currentadmin" && (
              <Table
                pathname={router.pathname}
                currentPage={currentPage}
                pages={pages}
                data={business_admins}
                columns={columns}
                className={"w-[700px] sm:w-full"}
              />
            )}
          </div>
        </div>
      </DashBoardLayout>
    </div>
  );
};

export default Admin;
