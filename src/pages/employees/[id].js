import React, { useState } from "react";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import Typography from "@/components/typography/Typography";
import { Button } from "@/components/button/Button";
import Image from "next/image";
import InputField from "@/components/inputfield/InputField";
import DownloadIcon from "../../../public/dowloadicon.png";
import Table from "@/components/table/Table";
import { useRouter } from "next/router";
import debounce from "debounce";
import searchRedirect from "@/helper/server/searchRedirect";
import { SearchSvg } from "@/svgicon";
import { useForm } from "react-hook-form";
import RadioButton from "@/components/radiobutton/RadioButton";
import { toast } from "react-toastify";
import Breadcrumb from "@/components/breadcum";
import { callFetch, getMyProfile } from "@/helper/server";

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const { status, json } = await callFetch(
    context,
    `your-users/${context.query.id}`
  );
  if (!json) {
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
      json,
    },
  };
}
const EmployeeDetail = ({ json, myProfile }) => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("EmployeeInfo");
  const gender = JSON.parse(process.env.NEXT_PUBLIC_USER_GENDER);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: json,
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/your-users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (response.status === 200) {
        toast.success(`Employee ${json.name} Updated successfully`);
        router.push("/employees")
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DashBoardLayout profile={myProfile}>
      <div className=" px-3 sm:px-14">
        <div className="  text-base  capitalize">
          <Breadcrumb router={router} />
        </div>
        <div className=" flex  flex-col sm:flex-row  items-start sm:items-center justify-between">
          <Typography variant={"h1"} className="  my-4 sm:mt-7">
            Employee Details
          </Typography>
        </div>
        <div className=" bg-zapp-whit  grid  grid-cols-3  p   py-3 border-2 rounded-[1rem]  text-zapp-black   border-zapp-gray_500 ">
          <div className=" border-r-2   border-zapp-gray_500  pl-2 sm:pl-6  ">
            <span className=" text-[0.8rem] font-normal">
              {" "}
               Employee Balance
            </span>
            <Typography variant="h4">RS.{json.balance}</Typography>
          </div>
          <div className=" pl-2 sm:pl-4  ">
            <span className=" text-[0.8rem] font-normal">
              Total deliveries placed{" "}
            </span>
            <Typography variant="h4">0</Typography>
          </div>
          <div className=" border-l-2 pl-6  border-zapp-gray_500">
            <span className=" text-[0.8rem] font-normal">Total rides taken</span>
            <Typography variant="h4">0</Typography>
          </div>
        </div>
        <div className=" mt-14  border-zapp-gray_500 ">
          <div className="border-zapp-gray_500 flex text-[1rem] text-zapp-light_black font-normal ">
            <button
              className={`  ${
                activeTab === "EmployeeInfo" && " border-zapp-primary  "
              }  border-zapp-gray_500  pb-1   border-b-2  w-full px-4  `}
              onClick={() => handleTabClick("EmployeeInfo")}
            >
              Employee Info
            </button>

            <button
              className={`  ${
                activeTab === "TransactionHistory" && "border-zapp-primary  "
              }   border-zapp-gray_500  border-b-2  w-full   px-4  `}
              onClick={() => handleTabClick("TransactionHistory")}
            >
              Transaction History
            </button>
          </div>
        </div>
        {activeTab === "TransactionHistory" && (
          <div className=" flex justify-between mt-10">
            <div>
              <InputField
                placeholder="Search employee (name or number)"
                className="py-4 w-[24rem]  pl-12"
                icon={<SearchSvg />}
                onChange={debounce(
                  (e) =>
                    searchRedirect(
                      "/business/riderdashboard",
                      "search",
                      e.target.value,
                      router
                    ),
                  500
                )}
              />
            </div>
            <div className=" flex items-center">
              <Image
                src={DownloadIcon}
                width={14}
                height={17}
                alt="DownloadIcon"
                className="mr-2"
              />{" "}
              <span className=" text-zapp-primary text-base font-normal">
                Export
              </span>
            </div>
          </div>
        )}
        <div className=" mt-5">
          {activeTab === "TransactionHistory" && (
            <Table
              pathname="/business/riderdashboard"
              // currentPage={currentPage}
              // pages={pages}
              // data={users_cashflows}
              // columns={columns}
            />
          )}
        </div>

        {activeTab === "EmployeeInfo" && (
          <div className=" mt-10 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-5 flex-col">
                <InputField
                  name="name"
                  className="py-4"
                  placeholder="Employee"
                  register={register}
                  rules={{
                    required: true,
                  }}
                  errors={errors}
                />
                <InputField
                  name="phone"
                  placeholder="Phone Number"
                  className="py-4"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className=" flex gap-10  py-6 ">
                <div className="">
                  <span className=" text-base text-zapp-light_black ">
                    Gender
                  </span>
                  <div className=" flex mt-1">
                    {gender.map((item, i) => (
                      <div className="mr-3" key={i}>
                        <RadioButton
                          label={item}
                          name="gender"
                          value={item}
                          register={register}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="">
                  <span className=" text-base text-zapp-light_black ">
                    Status
                  </span>
                  <div className=" flex mt-1">
                    <div className="ml-3">
                      <RadioButton
                        type="checkbox"
                        name="active"
                        label="Active"
                        register={register}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="  flex items-center gap-5 ">
                <div>
                  <span>
                    <Button
                      variant="primary"
                      type="submit"
                      className=" py-2 px-8 "
                    >
                      Update
                    </Button>
                  </span>
                </div>
                <div>
                  {/* <Button variant="default" className="py-2 ">
                    Delete Employee
                  </Button> */}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashBoardLayout>
  );
};
export default EmployeeDetail;
