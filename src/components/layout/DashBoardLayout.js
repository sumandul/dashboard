import React, { useState } from "react";
import SideBar from "../sidebar";
import Image from "next/image";
import Logo from "../../../public/tootl_logo_white.webp";
import { Button } from "@/components/button/Button";
import LogoutIcon from "../../../public/logout_icon.png";
import PoweredByLogo from "../../../public/white_powered_logo.png";
import { WhitedotSvg } from "@/svgicon";
import { MdEast, MdMenu } from "react-icons/md";
import Link from "next/link";

const DashBoardLayout = ({ children, profile }) => {
  const [mobileMeNU, setMobileMenu] = useState(false);
  return (
    <>
      <div className=" lg:flex items-start ">
        <div
          className={` lg:py-2 lg:pt-4 shadow-lg  lg:min-h-screen static  lg:fixed lg:top-0 lg:left-0  lg:w-[18rem]   bg-zapp-secondary  lg:h-[100vh] lg:overflow-y-scroll scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-400    2xl:h-0     basis-[15%]
        }  `}
        >
          <div className="  overflow-hidden flex justify-between py-8 fixed w-full z-50  bg-zapp-secondary    h-4    px-3 items-center  lg:hidden">
            <Image src={Logo} height={100} width={100} alt="logo_image_2" />
            <div
              onClick={() => setMobileMenu(!mobileMeNU)}
              className="flex text-zapp-white"
            >
              <MdMenu className=" text-[2rem]   text-zapp-white" />
            </div>
            <div
              className={` z-50  min-h-screen  fixed   bg-zapp-secondary top-[0]  ${
                mobileMeNU ? "right-0 fixed w-full" : "right-[-100%]  "
              } top-0 w-full  md:pl-20  lg:px-10 py-6   duration-500 "
             `}
            >
              <div className=" flex justify-end mr-4 ">
                <MdEast
                  className=" text-zapp-primary text-[1.5rem]"
                  onClick={() => setMobileMenu(false)}
                />
              </div>
              <SideBar profile={profile} />
              <div className=" mt-10 ml-12 w-1/2">
                <Link type="secondary" href="/logout">
                  <Button variant={'secondary'}   className="w-full flex items-center    ">
                    <Image src={LogoutIcon} className="mr-6" alt="logout" />
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className=" hidden lg:block">
            <div className=" pl-6 ">
              <div className=" mb-8 mt-2 ">
                <Image src={Logo} height={23} width={193} alt="logo_image_2" />
              </div>

              <SideBar profile={profile} />
              <div className=" mt-[5rem] pr-6 ">
                <div className=" flex items-center justify-between">
                  {" "}
                  <Link href="/my-profile" className=" cursor-pointer">
                  <div className=" flex gap-5">
                  
                      <div className=" w-[50px] h-[50px]  rounded-full  bg-[#D9D9D9]"></div>{" "}
                    <div className=" text-zapp-white">
                      <div className="  text-[1.2rem] font-medium ">
                        {profile && profile.name}
                      </div>
                      <div className=" text-[0.75rem]">
                        {profile && profile.business}
                      </div>
                    </div>
                  </div>
              
              </Link>
                </div>
                <div className=" mt-4">
                  <Link type="primary" href="/logout">
                    <Button className="w-full flex items-center">
                      {" "}
                      <Image
                        src={LogoutIcon}
                        className="mr-6"
                        alt="logout"
                      />{" "}
                      Logout
                    </Button>
                  </Link>
                </div>
                <div className=" mt-5 flex justify-center  items-center">
                  <Image
                    src={PoweredByLogo}
                    height={25}
                    width={130}
                    alt="powered_by"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={` bg-zapp-primary_Light pt-20 lg:ml-[14rem]  lg:pt-6 md:pl-1 min-h-screen lg:basis-[100%]  lg:pl-[5rem] w-full `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
