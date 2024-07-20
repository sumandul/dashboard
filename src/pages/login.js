import React from "react";
import { Button } from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "@/components/inputfield/InputField";
import Typography from "@/components/typography/Typography";
import Link from "next/link";
import { PoweredSvg, LogoSvg, PoweredTextSvg } from "@/svgicon";
import { useRouter } from "next/router";
import { getMyProfile } from "@/helper/server";

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  try {
    if (
      context.req.cookies.hasOwnProperty("x-auth-headers") &&
      context.req.cookies.hasOwnProperty("x-my-profile")
    ) {
      if(!myProfile.is_live){
        return {
          redirect: {
            permanent: false,
            destination: "/settings/company",
          },
      } 

      }
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
    return { props: {} };
  } catch (err) {
    return { props: {} };
  }
}

const LoginForm = () => {
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
          toast.success("Login Successful");
        } else {
          router.push(`/return-back?payload=${payload}`);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" bg-zapp-primary_Light flex    min-h-screen justify-center items-center">
        <div className="  bg-red-300 ">
          <div className=" bg-zapp-white sm:pt-8 flex items-start  px-4  sm:pl-10 sm:pr-24   py-20 ">
            <div>
              <LogoSvg />
              <div className="">
                <div className="  my-9 ">
                  <div className=" text-sm">
                    <Typography variant="h2" className={"capitalize"}>
                      Log in to Tootle Business
                    </Typography>

                    <p className="my-5  w-[22rem]  text-zapp-light_black  leading-[22px]">
                      You can only login to an account after we create a
                      business account for you.
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <InputField
                      name="email"
                      placeholder="Work Email*"
                      className="py-4 text-sm"
                      register={register}
                      rules={{
                        required: "Email is required",
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className=" mt-4">
                    <InputField
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="py-4 text-sm "
                      register={register}
                      rules={{
                        required: "Password is required",
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className=" mt-6">
                    <Button type="submit" className={"w-full py-1 sm:py-0 sm:w-1/4"} >Login</Button>
                  </div>
                  <div className="text-[0.875rem] text-zapp-light_black  my-4 ">
                    <span>
                      {/* <Link href="/forgot-password" className=" underline"> */}
                        Forgot Password?
                      {/* </Link> */}

                      <p className=" mt-3">
                        <Link href={"/register"} className=" underline">
                          Register
                        </Link>
                        , to get a business account with Tootle.{" "}
                      </p>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=" flex items-center mt-8  justify-center   sm:flex-col">
            <div className=" mt-3 text-[#424242] uppercase  font-medium text-sm mr-1">
              <PoweredTextSvg />
            </div>
            <div>
              <PoweredSvg />
            </div>
          </div>
        </div>

    </div>
  );
};

export default LoginForm;
