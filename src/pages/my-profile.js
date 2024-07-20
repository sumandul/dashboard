import React from "react";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import Typography from "@/components/typography/Typography";
import InputField from "@/components/inputfield/InputField";
import { Button } from "@/components/button/Button";
import { getMyProfile } from "@/helper/server";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Breadcrumbs from "@/components/breadcum";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);

  return { props: { myProfile } };
}
const MyProfile = ({ myProfile }) => {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/profile/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        toast.success(`Passwor updated successfully`);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DashBoardLayout profile={myProfile}>
      <div className="px-3 sm:px-10">
        <div className=" pt-8 text-sm sm:text-base uppercase "><Breadcrumbs/></div>
        <div>
          <Typography variant={"h1"} className=" my-4 sm:my-5">
            My profile
          </Typography>
        </div>
        <div className="  rounded-[1rem] sm:py-10 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputField
                disabled
                placeholder="Name"
                className="py-3"
                name="name"
                value={myProfile.name}
              />
            </div>
            <div className=" mt-6">
              <InputField
                disabled
                placeholder="Phone number "
                className="py-3"
                name="phone"
                value={myProfile.phone}
              />
            </div>
            <div className=" mt-6">
              <InputField
                disabled
                placeholder="Email"
                className="py-3"
                name="email"
                value={myProfile.email}
              />
            </div>
            <div className=" mt-6">
              <InputField
                placeholder="Current Password"
                className="py-3"
                name="oldPassword"
                register={register}
              />
            </div>
            <div className=" mt-6">
              <InputField
                placeholder="New Password"
                className="py-3"
                name="newPassword"
                register={register}
              />
            </div>
            <div className=" mt-6">
              <div className=" mt-4">
                <Button className="py-1 w-1/2 sm:w-1/5">Update</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default MyProfile;
