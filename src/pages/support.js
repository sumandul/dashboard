import React from "react";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import Typography from "@/components/typography/Typography";
import { Button } from "@/components/button/Button";
import Image from "next/image";
import InputField from "@/components/inputfield/InputField";
import { SupportSvg } from "@/svgicon";
import { getMyProfile } from "@/helper/server";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  return { props: { myProfile } };
}

const Support = ({ myProfile }) => {
  return (
    <DashBoardLayout profile={myProfile}>
      <div className=" px-4 sm:px-14">
        <div className=" text-base pt-8  uppercase ">Support</div>
        <div>
          <Typography variant={"h1"} className="my-5">
            We are here to help!
          </Typography>
        </div>
        <div className="  bg-zapp-white   border-2 border-zapp-gray_500 flex items-center  pl-10 py-6 rounded-[1rem]  ">
          <div className=" basis-[52%]">
            <Typography variant={"h2"} className="mb-5 capitalize">
              How to get in touch with us
            </Typography>
            <ul className=" mb-0 text-[1.25rem]  leading-8">
              <li>Email: support@tootle.today</li>
              <li> Phone: +977-9802009277</li>
            </ul>
          </div>
          <div className=" basis-[45%]  flex justify-end ">
            <SupportSvg />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Support;
