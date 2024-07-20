import { LogoSvg, ZappBlackSvg } from "@/svgicon";
import React from "react";
import Typography from "../typography/Typography";

const PrintPage = ({dataref}) => {
  return (
    <>
      <div ref={dataref} className=" bg-zapp-white px-2 py-2 shadow-sm" >
        <div className=" mb-2 ">
          {/* <button
              onClick={() => setClose(false)}
              className="text-base flex items-center gap-1  capitalize"
            >
              <MdOutlineArrowBack className="  text-zapp-primary" />
              back
            </button> */}
        </div>
        <div className=" mt-4 flex justify-between  ">
          <div>
            <Typography variant={"h2"} className=" ">
              Ride Details
            </Typography>
            <div className=" font-normal  text-[0.7rem] sm:text-base sm:mt-2 ">
              <p>Completed: APR 12, 2023 at 2:25 PM</p>
            </div>
          </div>
          <div>
            <LogoSvg />
          </div>
        </div>
        <div className=" mt-2 sm:mt-6 ">
          <div>
            <Typography variant={"h2"} className=" ">
              Rubik joshiA
            </Typography>
            <div className=" font-normal text-[0.7rem] sm:text-base sm:mt-2 ">
              <p>P.N: 9802009277 | E: rubik@tootle.today</p>
            </div>
          </div>
        </div>
        <div className=" bg-zapp-primary_Light px-3">
          <div className=" border-b py-4 sm:py- 6mt-3 sm:mt-8    flex justify-center items-center  border-zapp-gray_500">
            <div>
              <Typography variant={"h2"} className=" text-center ">
                Rs. 160.00
              </Typography>
              <p className=" sm:mt-2 text-[10px] font-normal">
                Amount Charged | Tootle Bike{" "}
              </p>
            </div>
          </div>
          <div className=" pt-3 sm:pt-4 ">
            <ul className=" mb-0">
              <li className=" tex-base font-normal text-zapp-black">
                Pick up location
              </li>
              <li cassName="    text-[0.1rem]">
                Chauni Marg, Kathmandu, Nepal{" "}
              </li>
              <li className=" mt-1 tex-base font-normal text-zapp-black">
                Drop location
              </li>
              <li cassName="   text-[0.75rem]">Pulchowk, Lalitpur, Nepal</li>
            </ul>
            <div className=" mt-6  text-base font-bold text-zapp-black flex justify-between">
              <div className=" ">Ride Breakdown</div>
              <div>Rs. 160.00</div>
            </div>

            <div className=" border-t mt-1 text-[#] border-zapp-gray_500  py-4">
              <div className=" text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>Trip fare</div>
                <div>Rs. 20.00</div>
              </div>
              <div className=" mt-1 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>Insurance</div>
                <div>Rs. 20.00</div>
              </div>
              <div className=" mt-1 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>Driver charge</div>
                <div>Rs. 120.00</div>
              </div>
              <div className=" mt-1 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>Discount</div>
                <div>Rs. 10.00</div>
              </div>
              <div className=" mt-1 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>SurchargeD</div>
                <div>Rs. 24.00</div>
              </div>
              <div className=" mt-1 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>Pick up fee</div>
                <div>Rs. 0.00</div>
              </div>

              <div className=" mt-2 text-[0.75rem]  font-normal leading-[1rem] flex justify-between items-center">
                <div>VAT</div>
                <div>Rs. 5.20</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  mt-10 justify-between">
          <div className=" pt-10 flex items-center gap-1">
            <p>Powered by </p>{" "}
            <div>
              {" "}
              <ZappBlackSvg />{" "}
            </div>
          </div>
          <div className=" ">
            <ul className=" text-[0.75rem] font-normal">
              <li className=" text-end"> Zapp Services Pvt. Ltd.</li>
              <li className=" text-end">
                {" "}
                Yala Sadak, Pulchowk, Lalitpur, Nepal
              </li>
              <li className=" text-end">
                {" "}
                This is not a tax document. Please email{" "}
              </li>
              <li className=" text-end">
                finance@zapp.today for further information.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default PrintPage;
