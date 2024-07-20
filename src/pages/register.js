import React from "react";
import Typography from "@/components/typography/Typography";
import Link from "next/link";
import InputField from "@/components/inputfield/InputField";
import { Button } from "@/components/button/Button";
import { getMyProfile } from "@/helper/server";
import { LogoSvg, PoweredTextSvg } from "@/svgicon";
import { useForm } from "react-hook-form";
import { PoweredSvg } from "@/svgicon";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  return { props: { myProfile } };
}
const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await response.json();

      if (response.status !== 200) {
        toast.error(json.message);
      } else {
        if (!payload) {
          router.push("/");
          toast.success("Login Successful", {
            theme: "colored",
          });
        } else {
          router.push(`/return-back?payload=${payload}`);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" bg-zapp-primary_Light flex justify-center px-3  items-center ">
      <div className=" sm:h-[65.625rem] sm:w-[65.625rem] ">
        <div>
          <div
            className="  bg-zapp-white mt-20  rounded-[1rem] sm:pt-8   px-4  sm:pl-10 sm:pr-24   py-20 "
            style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
          >
            <div>
              <LogoSvg />
              <div className="">
                <div className="  my-9 ">
                  <div className=" text-sm">
                    <Typography variant="h2" className={"capitalize"}>
                      Company Registration
                    </Typography>

                    <p className="my-5  sm:w-[28rem]  text-zapp-light_black  leading-[22px]">
                      Once you submit the details below, our team will review
                      and create an account for you. You will be notified in
                      your email. (Usually takes up to 24 hours)
                    </p>
                  </div>
                </div>
                <form>
                  <div>
                    <InputField
                      placeholder="Company Name"
                      className="py-3 w-full"
                    />
                  </div>
                  <div className=" mt-6">
                    <InputField
                      placeholder="Phone number "
                      className="py-3 w-full"
                    />
                  </div>
                  <div className=" mt-6">
                    <InputField placeholder="Email" className="py-3 w-full" />
                  </div>
                  <div className=" mt-6">
                    <InputField placeholder="PAN No." className="py-3 w-full" />
                  </div>
                  <div className=" mt-6">
                    <div className=" mt-4">
                      <label htmlFor="pan">
                        <div className=" rounded-[0.5rem] w-[18rem]   py-4  px-4  bg-zapp-gray_500 ">
                          <span className=" text-zapp-light_black">
                            Upload PAN Document
                          </span>
                          <InputField
                            id="pan"
                            type="file"
                            className="py-3  hidden  w-[300px]"
                          />
                        </div>
                      </label>
                    </div>
                    <div className=" mt-4">
                      <label htmlFor="pan">
                        <div className=" rounded-[0.5rem] w-[18rem]    px-4    py-4   bg-zapp-gray_500 ">
                          <span className=" text-zapp-light_black text-base font-normal">
                            Upload Company Registration
                          </span>
                          <InputField
                            id="pan"
                            type="file"
                            className="py-3  hidden  w-[300px]"
                          />
                        </div>
                      </label>
                    </div>
                    <div className=" mt-4">
                      <Button className="py-1 w-1/4 ">Submit</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=" flex items-center  justify-center sm:mt-14 sm:flex-col">
            <div className=" mt-3 text-[#424242] uppercase  font-medium text-sm mr-1">
              <PoweredTextSvg />
            </div>
            <div>
              <PoweredSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
