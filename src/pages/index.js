import React, { useEffect } from "react";
import { getMyProfile } from "@/helper/server";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import Typography from "@/components/typography/Typography";
import AddIcon from "../../public/addIcon.png";
import Image from "next/image";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/router";
import Link from "next/link";
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
 
  if (!myProfile) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  if (!myProfile.is_live) {
    return { redirect: { destination: "/company", permanent: false } };
  }
  if (!myProfile) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: { myProfile } };
}

const Home = ({ setTheme, myProfile }) => {
  const router = useRouter();
  // if (!myProfile) {
  //   return <div>Loading...</div>;
  // }
  return (
    <DashBoardLayout profile={myProfile}>
      <div className="px-3 2xl:px-10">
      
        <Typography variant={"h1"} className=" mt-3 lg:mt-6">
          Get Started
        </Typography>
        <div className=" mt-4 bg-zapp-white px-10 py-10  border-2 rounded-[0.5rem]     border-[#CFCFCF] ">
          <div className=" ">
            <Typography
              variant={"h2"}
              className="pb-6 text-center sm:text-left"
            >
              Add employees
            </Typography>
          </div>


          <div className="     flex flex-col-reverse items-center gap-6 sm:items-end  sm:flex-row  justify-between">
            <div className=" ">
              <p className=" pb-10  sm:w-[20rem]">
                Invite company employees to create a Business Profile with and
                use Tootle.{" "}
              </p>
              <Link href={"/employees/add-new-employee"}>
                <Button className={"ml-4 sm:ml-0"}>Invite your team </Button>
              </Link>
            </div>
            <div className=" ">
              <Image src={AddIcon} className={211} height={153} alt="addicon" />
            </div>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Home;
