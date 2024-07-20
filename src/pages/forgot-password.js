import React, { useState } from "react";
import { Button } from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "@/components/inputfield/InputField";
import Typography from "@/components/typography/Typography";
import { PoweredSvg, LogoSvg, PoweredTextSvg } from "@/svgicon";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const { payload } = router.query;
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
    <div className=" bg-zapp-primary_Light flex  min-h-screen justify-center items-center">
      <div className=" ">
        <div>
          <div className=" bg-zapp-white sm:pt-8 flex items-start  px-4  sm:pl-10 sm:pr-24   py-20 ">
            <div>
              <LogoSvg />
              <div className="">
                <div className="  my-9 ">
                  <div className=" text-sm">
                    <Typography variant="h2" className={"capitalize"}>
                      Forgot Your Password
                    </Typography>

                    <p className="my-5  w-[22rem]  text-zapp-light_black  leading-[22px]">
                      Please enter your registered email address and we will
                      send you an email with a reset link .
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <InputField
                      type="email"
                      name="email"
                      placeholder="Work Email*"
                      className="py-4 text-sm"
                      register={register}
                      rules={{
                        required: true,
                      }}
                    />
                  </div>

                  <div className=" mt-6">
                    <Button type="submit">Submit</Button>
                  </div>
                  <div className="text-[0.875rem] text-zapp-light_black  my-4 "></div>
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

export default ForgotPassword;
