import React from "react";
import { Button } from "@/components/button/Button";
import { getMyProfile } from "@/helper/server";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import dynamic from "next/dynamic.js";
const DashBoardLayout = dynamic(() =>
  import("../../../components/layout/DashBoardLayout.js")
);
const Typography = dynamic(() =>
  import("../../../components/typography/Typography.js")
);
const RadioButton = dynamic(() =>
  import("../../../components/radiobutton/RadioButton.js")
);
const InputField = dynamic(() =>
  import("../../../components/inputfield/InputField.js")
);
const Breadcrumb = dynamic(() =>
  import("../../../components/breadcum/index.js")
);
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  if (!myProfile) {
    return {
      notFound: true,
    };
  }
  if (myProfile.is_live === 0) {
    return {
      redirect: {
        destination: "/settings/company",
        permanent: false,
      },
    };
  }
  return { props: { myProfile } };
}
const AddAdmin = ({ __state, myProfile }) => {
  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    is_super_admin: false,
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
      __state.loading = true;

      const response = await fetch("/api/your-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if(response.status ===412){
       return  toast.info(json.message)
      }
      if (json.id) {
   
          const response = await fetch(
            `/api/your-admins/${json.id}/update-password`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password:  data.password }),
            }
          );
        const passwordUpdate = await response.json();
        if (response.status === 412) {
          toast.info(passwordUpdate.message)
        }else{
          toast.success("Admin added successfully");
          router.push("/employees/admin");
      }
      }

    } catch (err) {
      toast.error(err.message);
    } finally {
      __state.loading = false;
    }
  };
  return (
    <DashBoardLayout profile={myProfile}>
      <div className=" px-4  sm:px-10">
        <div className="  text-base uppercase ">
          <Breadcrumb router={router} />
        </div>
        <div className="holder">
          <div className="candle">
            <div className="blinking-glow"></div>
            <div className="thread"></div>
            <div className="glow"></div>
            <div className="flame"></div>
          </div>
        </div>

        <div className=" flex items-center justify-between">
          <Typography variant={"h1"} className="my-4 sm:my-5">
            Add Admin
          </Typography>
        </div>
        <div className="  rounded-[0.5rem] bg-zapp-white px-3 sm:px-20 py-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid  sm:grid-cols-2 gap-6">
              <div>
                <InputField
                  placeholder=" Name"
                  className="py-3"
                  name="name"
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
              <div>
                <InputField
                  type="text"
                  placeholder="Enter Password"
                  rules={{
                    required: true,
                    pattern:{
                      value:/^[A-Za-z0-9]{8,}$/,
                      message:"Password length must be greater than or equal to 8"
                    }

                                     }}
                  className="py-3"
                  name="password"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div className="mt-3 flex gap-4 flex-wrap ">
              <div className="mt-5 ">
                <div className=" text-base font-normal  text-zapp-light_black ">
                  Access
                </div>

                <div className=" mt-2 border  border-zapp-gray_500 px-3 py-4 rounded-[0.5rem]">
                  <RadioButton
                    type="checkbox"
                    label="Super Admin"
                    register={register}
                    name="is_super_admin"
                  />
                </div>
              </div>
              <div className="mt-5 ">
                <div className="  text-base font-normal  text-zapp-light_black ">
                  Status
                </div>
                <div className=" mt-2 border   border-zapp-gray_500 px-3 py-4 rounded-[0.5rem]">
                  <RadioButton
                    type="checkbox"
                    label="Active"
                    register={register}
                    name="active"
                  />
                </div>
              </div>
            </div>
            <div className=" mt-5 flex justify-end">
              <Button className=" w-full sm:w-1/6" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default AddAdmin;
