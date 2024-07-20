import React, { useState } from "react";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/breadcum";
import { callFetch, getMyProfile } from "@/helper/server";
import { useForm } from "react-hook-form";
import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image.js";
import dynamic from "next/dynamic";
const Typography = dynamic(() =>
  import("../components/typography/Typography")
);
const InputField = dynamic(() =>
  import("../components/inputfield/InputField.js")
);
const DashBoardLayout = dynamic(() =>
  import("../components/layout/DashBoardLayout.js")
);

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const { status, json } = await callFetch(context, `business`);
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

  
  return {
    props: {
      myProfile,
      status,
      json,
    },
  };
}
const Companny = ({ myProfile, json, __state }) => {
  const numberHandle = (e) => {
    // alert("hello");
  };
  const [image, setImage] = useState(null);
  const [comapnyUrl, setCompanyUrl] = useState(null);
  const [panUrl, setPanUrl] = useState(null);
  const [imageReg, setImageReg] = useState(null);
  const handleRegistrationImageChange = (event) => {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setCompanyUrl(imageURL);
    const formData = new FormData();
    formData.append("image", file);
    setImageReg(formData);
  };

  const handlePanImageChange = (event) => {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setPanUrl(imageURL);
    const formData = new FormData();
    formData.append("image", file);
    setImage(formData);
  };

  const [updatedData, setUpdatedData] = useState(json);

  const [showLoading, setLoading] = useState(false);
  const updateCompanyDetail = {
    ...updatedData,
    registered_date: updatedData?.registered_date?.split("T")[0],
  };

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    const { pan_image, pan_no, phone, email, address, registered_date } = data;

    try {
      const response = await fetch("/api/business/upload/registration", {
        method: "POST",
        body: imageReg,
      });
    } catch (error) {
      toast.error(error.message);
    }

    try {
      const response = await fetch("/api/business/upload/pan", {
        method: "POST",
        body: image,
      });
    } catch (error) {
      toast.error(error.message);
    }

    try {
      const response = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pan_no,
          phone,
          email,
          address,
          registered_date,
        }),
      });
      const json = await response.json();

      setUpdatedData(json);

      if (response.status === 200) {
        setLoading(false);
        toast.success(`Business ${json.name} updated successfully`);
      } else {
        setLoading(false);
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      json?.email?.split("||")[1] === "change"
        ? { name: json.name }
        : updatedData,
  });
  return (
    <DashBoardLayout profile={myProfile}>
      <Loading show={showLoading} />
      <div className="px-3 lg:px-10">
        <div className=" pt-8 text-sm lg:text-base uppercase ">
          <Breadcrumb router={router} />
        </div>
        <div>
          <Typography variant={"h1"} className=" my-4 lg:my-5  capitalize">
            {json.name}
          </Typography>
        </div>
        <div className=" bg-zapp-white py-1   px-6 lgh:px-20 rounded-[1rem] lg:py-10 ">
          <div className=" lg:flex sm:justify-between sm:items-center">
            <Typography variant={"h1"} className=" mt-3 lg:my-10">
              Company Details
            </Typography>
            <div>
              <Typography variant={"h2"} className="  mt-2 mb-10  lg:my-10">
                Balance:
                <span className="  text-zapp-primary  sm:text-md">
                  {" "}
                  Rs. {json.balance}
                </span>
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputField
                placeholder="Company Name"
                name="name"
                className="py-4"
                register={register}
                disabled={true}
                rules={{
                  required: true,
                }}
                errors={errors}
              />
            </div>

            <div className=" mt-6">
              <InputField
                placeholder="Phone number "
                name="phone"
                onChange={numberHandle}
                className="py-4"
                disabled={myProfile.is_live === 1 ? true : false}
                register={register}
                rules={{
                  required: true,
                  pattern: {
                    value: /\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                errors={errors}
              />
              {updatedData?.email?.split("||")[1] === "change" && (
                <p className=" text-sm font-normal text-zapp-primary">
                  Fill the phone Number of your comapny
                </p>
              )}
            </div>
            <div className=" mt-6">
              <InputField
                placeholder="Email"
                name="email"
                className="py-4"
                register={register}
                disabled={myProfile.is_live === 1 ? true : false}
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
                    message: "Please enter valid a email ",
                  },
                }}
                errors={errors}
              />
              {updatedData?.email?.split("||")[1] === "change" && (
                <p className=" text-sm font-normal text-zapp-primary">
                  Fill the email address of your comapny
                </p>
              )}
            </div>
            <div className=" mt-6">
              <InputField
                placeholder="Address"
                name="address"
                className="py-4"
                register={register}
                disabled={myProfile.is_live === 1 ? true : false}
                rules={{
                  required: true,
                  pattern: {
                    value: /^(?!.*\|\|).*$/,
                    message: "Please fill a valid address",
                  },
                }}
                errors={errors}
              />
              {updatedData?.address?.split("||")[1] === "change" && (
                <p className=" text-sm font-normal text-zapp-primary">
                  Fill the address your comapny
                </p>
              )}
            </div>
            <div className=" mt-6">
              <InputField
                type={"date"}
                placeholder="Register Date"
                name="registered_date"
                className={`py-4`}
                register={register}
                disabled={myProfile.is_live === 1 ? true : false}
                rules={{
                  required: true,
                }}
                errors={errors}
              />
              {updatedData?.registered_date?.split("||")[1] === "change" && (
                <p className=" text-sm font-normal text-zapp-primary">
                  Fill the registered date of your comapny
                </p>
              )}
            </div>
            <div className=" mt-6">
              <InputField
                placeholder="PAN No."
                name="pan_no"
                className="py-4"
                register={register}
                disabled={myProfile.is_live === 1 ? true : false}
                rules={{
                  required: true,
                  pattern: {
                    value: /^\d{9}$/,
                    message: "Please enter  valid Pan number ",
                  },
                }}
                errors={errors}
              />
              {updatedData?.pan_no?.split("||")[1] === "change" && (
                <p className=" text-sm font-normal text-zapp-primary">
                  Fill the Pan No. of your comapny
                </p>
              )}
            </div>
            <div className=" flex-col  sm:flex-row gap-8 flex     mt-6">
              <div className="    ">
                <div className="  flex flex-col sm:flex-row  sm:gap-4">
              <div>
                    <label htmlFor="pan">
                    <div className="  cursor-pointer rounded-[0.5rem] w-full sm:w-[18rem]   py-4  px-4  bg-zapp-gray_500 ">
                      <span className=" text-zapp-light_black">
                        Upload PAN Document
                      </span>
                      <input
                        id="pan"
                        type="file"
                        name="pan_image"
                        onChange={handlePanImageChange}
                        className="py-3  hidden  w-[300px]"
                        disabled={myProfile?.is_live === 1 ? true : false}
                      />
                    </div>
                    <div className=" block sm:hidden">
                      {updatedData.pan_image && (
                        <Link href={"/api/business/preview-image/pan"}>
                          <span>
                            <div
                              className={
                                "py-1       mt-1  cursor-pointer rounded-[0.5rem]"
                              }
                            >
                              <Button variant={"secondary"} className="w-full">
                                Preview
                              </Button>
                            </div>
                          </span>
                        </Link>
                      )}
                    </div>
                  </label>
              </div>
                
                  <div className=" ">
                {updatedData.pan_image && (
                  <Link href={"/api/business/preview-image/pan"}>
                    <span>
                      <div
                        className={
                          "py-1 hidden sm:block      mt-1  cursor-pointer rounded-[0.5rem]"
                        }
                      >
                        <Button variant={"secondary"}>Preview</Button>
                      </div>
                    </span>
                  </Link>
                )}

              </div>
                </div>
                {image && (
                  <div className=" mt-4 ">
                    <Image
                      src={panUrl}
                      alt="Preview"
                      width={300}
                      height={400}
                    />
                  </div>
                )}
                
                <div className=" mt-4  flex-col flex    sm:flex-row sm:items-center sm:gap-4 ">
                  <label htmlFor="company_registration">
                    <div className="  cursor-pointer relative rounded-[0.5rem] w-full sm:w-[18rem]   px-4    py-4   bg-zapp-gray_500 ">
                      <span className=" text-zapp-light_black sm:text-base font-normal">
                        Upload Company Registration
                      </span>
                      <input
                        id="company_registration"
                        name="company_registration_image"
                        type="file"
                        onChange={handleRegistrationImageChange}
                        className="py-3  hidden  w-[300px]"
                        disabled={myProfile.is_live === 1 ? true : false}
                      />
                    </div>
                  
                  </label>
                  <div className="   block sm:hidden">
                 <Link href={"/api/business/preview-image/registration"}>
                      <span>
                        <div className="cursor-pointer mt-3    ">
                          <Button variant={"secondary"} className="w-full">
                            Preview
                          </Button>
                        </div>
                      </span>
                    </Link>
                 </div>
                 
                <div className={`  ${image ? "" : ""} `}>
                  {updatedData.company_registration_image && (
                    <Link href={"/api/business/preview-image/registration"}>
                      <span>
                        <div className="cursor-pointer hidden sm:block ">
                          <Button variant={"secondary"} >Preview</Button>
                        </div>
                      </span>
                    </Link>
                  )}
                </div>
                </div>
                {comapnyUrl && (
                  <div className=" mt-4 ">
                    <Image src={comapnyUrl} alt="Preview"     width={300}
                      height={400}/>
                  </div>
                )}
                <div className=" mt-4">
              <Button className="py-1 w-full sm:w-1/2"  disabled={myProfile.is_live} >Update</Button>
                </div>
              </div>
            
            </div>
          </form>
          {}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Companny;
