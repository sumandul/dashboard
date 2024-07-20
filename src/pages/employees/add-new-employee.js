import React from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getMyProfile } from "@/helper/server";
const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout.js")
);
const Typography = dynamic(() =>
  import("../../components/typography/Typography.js")
);
const RadioButton = dynamic(() =>
  import("../../components/radiobutton/RadioButton")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField")
);

const Breadcrumb = dynamic(() => import("../../components/breadcum/index.js"));

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
 
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
  return { props: { myProfile } };
}
const AddEmployee = ({ myProfile }) => {
  const defaultValues = {
    name: "",
    phone: "",
    gender: "",
    active: true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/your-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (response.status === 200) {
        toast.success(`Employee ${json.name} added successfully`);
        router.push("/employees");
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <DashBoardLayout profile={myProfile}>
      <div className="px-3 2xl:px-10">
        <div className="   uppercase">
          <Breadcrumb router={router} />
        </div>
        <div className=" flex items-center justify-between">
          <Typography variant={"h1"} className=" my-4 sm:my-7">
            Add New Member
          </Typography>
          {/* <div className=" flex items-center">
            <Image
              src={DownloadIcon}
              width={14}
              height={17}
              className="mr-2"
              alt="download_icon"
            />{" "}
            <span className=" text-zapp-primary text-base font-normal">
              Import
            </span>
          </div> */}
        </div>
        <div className=" mt sm:mt-0 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid xl:grid-cols-2 gap-6 xl:gap-10">
              <div>
                <InputField
                  name="name"
                  placeholder="Employee name"
                  className="py-3"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className=" ">
                <InputField
                  name="phone"
                  placeholder="Phone number (If a registered number in Tootle, even better)"
                  className="py-3"
                  register={register}
                  errors={errors}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^98\d{8}$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                />
            
              </div>
              
              <div className=" ">
                <InputField placeholder="Email address" className="py-3" />
              </div>
              <div className="">
                  <span className=" text-base text-zapp-light_black ">
                    Gender
                  </span>
                  <div className=" flex mt-1">
                    <RadioButton
                      label="male"
                      name="gender"
                      value="male"
                      register={register}
                    />
                    <div className=" ml-3">
                      <RadioButton
                        label="female"
                        name="gender"
                        value="female"
                        register={register}
                      />
                    </div>
                  </div>
                </div>
              {/* <div className=" mt-6">
                <span className=" text-base text-zapp-light_black "> Type</span>
                <div className=" flex flex-wrap gap-6  sm:gap-10 mt-4">
                  <div className=" border-2  px-4 py-4  sm:basis-[25%]  border-zapp-gray_500 rounded-[1rem]  gap-4 sm:gap-10 flex items-center ">
                    <div className="b ">
                      <RadioButton className="w-6 h-6" />
                    </div>
                    <div className=" ">
                      <span className="  text-[1rem] sm:text-[1.25rem]  font-normal text-zapp-black">
                        Monthly
                      </span>
                      <p className=" text-[0.75rem] font-normal text-zapp-black">
                        Tootle balance will renew every month for this team
                        member.
                      </p>
                    </div>
                  </div>
                  <div className=" border-2  px-4 py-4  sm:basis-[25%]  border-zapp-gray_500 rounded-[1rem]   gap-4  sm:gap-10 flex items-center ">
                    <div>
                      <RadioButton className="w-6 h-6" />
                    </div>
                    <div>
                      <span className=" text-[1rem]  sm:text-[1.25rem]  font-normal text-zapp-black">
                        One time
                      </span>
                      <p className=" text-[0.75rem]  font-normal text-zapp-black">
                        Tootle balance for anyone that expire or don’t renew
                        every month.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className=" mt-6">
              <Button className="py-1">Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default AddEmployee;
