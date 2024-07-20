import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import QR from "../../../public/QR.png";
import { Button } from "@/components/button/Button";
import { getMyProfile } from "@/helper/server";

const Typography = dynamic(() =>
  import("../../components/typography/Typography.js")
);
const InputField = dynamic(() =>
  import("../../components/inputfield/InputField")
);
const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout.js")
);
export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  return { props: { myProfile } };
}
const Payment = ({ myProfile }) => {
  return (
    <DashBoardLayout profile={myProfile}>
      <div className=" px-3 sm:px-10">
        <div className=" text-base uppercase pt-8 ">Settings / PAyment</div>
        <div>
          <Typography variant={"h1"} className="my-5 mb-11">
            Payment
          </Typography>
        </div>

        <div className="  bg-zapp-white   flex-col flex  sm:flex-row items-center   sm:pl-10 pt-5 rounded-[1rem]  ">
          <div className="px-2  order-2 sm:order-1 basis-[52%]">
            <Typography variant={"h2"} className="mb-5 sm:leading-10">
              Top up through eSewa | ID: 9802009277
            </Typography>
            <p className="  text-[0.875rem] text-zapp-black  leading-[1.1875rem] ">
              Once you make the payment, please let us know the amount and
              upload the screenshot. Our team will update your profile within 24
              hours.
            </p>
            <form>
              <div className=" mt-3">
                <InputField placeholder="Amount" className="py-3 lg:w-1/2 " />
              </div>
              <div className=" flex items-center mt-4">
                <div className="">
                  <label for="pan">
                    <div className=" rounded-[0.5rem]   px-8   py-2   bg-zapp-gray_500 ">
                      <span className="  text-zapp-black text-base  font-semibold">
                        Upload
                      </span>
                      <InputField
                        id="pan"
                        type="file"
                        className="py-3  hidden "
                      />
                    </div>
                  </label>
                </div>{" "}
                <div className=" ml-8">
                  <Button className="">Submit</Button>
                </div>
              </div>
            </form>
          </div>
          <div className=" order-1  sm:order-2  basis-[45%]  flex justify-end ">
            <Image src={QR} alt="QR" />
          </div>
        </div>
        <div className=" px-2  mt-10 bg-zapp-white   flex items-center  sm:pl-10 pt-5 rounded-[1rem]  ">
          <div className=" sm:basis-[52%]">
            <Typography variant={"h2"} className="mb-5 leading-10 pt-7">
              Top up through Bank / FonePay
            </Typography>
            <p className="  text-[0.875rem] text-zapp-black  leading-[1.1875rem] ">
              Once you make the payment, please let us know the amount and
              upload the screenshot. Our team will update your profile within 24
              hours.
            </p>
            <ul className=" text-base  leading-6  mt-4">
              <li>Account Name: ZAPP SERVICES PRIVATE LIMITED</li>
              <li>Account Number: D101010000243</li>
              <li>Bank: Global IME</li>
              <li>Branch: Kamladi</li>
            </ul>

            <form>
              <div className=" mt-3">
                <InputField placeholder="Amount" className="py-3  lg:w-1/2" />
              </div>
              <div className=" flex items-center mt-4">
                <div className="">
                  <label for="pan">
                    <div className=" rounded-[0.5rem]   px-8   py-2   bg-zapp-gray_500 ">
                      <span className="  text-zapp-black text-base  font-semibold">
                        Upload
                      </span>
                      <InputField
                        id="pan"
                        type="file"
                        className="py-3  hidden "
                      />
                    </div>
                  </label>
                </div>{" "}
                <div className=" ml-8">
                  <Button className="">Submit</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Payment;
