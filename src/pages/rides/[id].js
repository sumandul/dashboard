import dynamic from "next/dynamic";
import { LogoSvg, PoweredSvg } from "@/svgicon";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/router";
import { useRef} from "react";
import { callFetch, getMyProfile } from "@/helper/server";
import IsoDateString from "@/components/helpers/dateFormate";
import Link from "next/link";
const Map = dynamic(() => import("../../components/map/Map"), {
  ssr: false,
});
const DashBoardLayout = dynamic(() =>
  import("../../components/layout/DashBoardLayout")
);
const Breadcrumb = dynamic(() =>
  import("../../components/breadcum/index.js")
);

const Typography = dynamic(() =>
  import("../../components/typography/Typography")
);

export async function getServerSideProps(context) {
  const myProfile = await getMyProfile(context);
  const { status, json } = await callFetch(
    context,
    `rides/${context.query.id}`
  );
  if (!json) {
    return {
      notFound: true,
    };
  }
  if(!myProfile){
    return {
      notFound: true,
    };
  }
  
  if (!myProfile.is_live) {
    return {
      redirect: {
        destination: "/settings/company",
        permanent: false,
      },
    };
  }
  return {
    props: {
      status,
      myProfile,
      json,
    },
  };
}

const RideDetail = ({ json, myProfile }) => {
  const d = IsoDateString(json.booked_date);
  const [day, date, year, time] = d
    .split(/,\s|\sat\s/)
    .map((str) => str.trim());

  const yearFormate = year?.replace(/(\d+:\d+\s+\w+)/, "").trim();
  const timehrsfomate = year?.substring(5);

  const timeFomate = (hrs) => {
    const apiTime = hrs;
    const [hours, minutes, seconds] = apiTime.split(":");

    // Create a new Date object and set the hours, minutes, and seconds
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    // Convert the time to a 12-hour format with AM/PM
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };

  const totalFare = (fare) => {
    const serviceFee = 120;
    return fare + serviceFee;
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const router = useRouter();
  return (
    <>
      <DashBoardLayout profile={myProfile}>
        <div className=" px-4 sm:pl-14 sm:pr-14">
          <div className="  text-base  uppercase">
            <Breadcrumb router={router} />
          </div>
          <div className=" flex items-center justify-between">
            <Typography variant={"h1"} className=" my-4 sm:my-5">
              Ride Details
            </Typography>
          </div>
          <div className=" py-10 rounded-[1rem] bg-zapp-white px-3 sm:px-11">
            <div className=" flex justify-between  ">
              <div>
                <Typography variant={"h2"} className=" ">
                  <div>{`${date} ${yearFormate}`}</div>
                  <div className=" text-base   font-normal mt-4">
                    {`${day}  `} <span>|</span> {`${timehrsfomate}`}
                    <p className=" mt-1">ID:{json.id}</p>
                  </div>
                </Typography>
              </div>
              <div>
                <LogoSvg />
              </div>
            </div>
            <div className=" mt-4 sm:flex gap-6">
              <div className=" basis-[90%]">
                <Map location={json.locations} route={json.route} />

                <div className=" mt-10  text-[10px] leading-[14px]  hidden sm:block ">
                  <ul>
                    <li>Zapp Services Pvt. Ltd.</li>
                    <li className=" my-1">
                      Yala Sadak, Pulchowk, Lalitpur, Nepal
                    </li>
                    <li>
                      This is not a tax document. Please contact us for further
                      information at finance@zapp.today.
                    </li>
                  </ul>
                  <div className=" pt-10 flex items-center gap-1">
                    <div className=" text-base ">Powered by </div>
                    <div>
                      {" "}
                      <PoweredSvg />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-4 sm:mt-0 bas  w-full">
                <div>
                  <span className=" capitalize  font-semibold text-sm sm:text-base text-zapp-light_black">
                    Employee
                  </span>
                  <div className="font-normal  my-1  text-base sm:text-[1.5rem]">
                    {" "}
                    {json?.user?.name}
                  </div>
                  <span className=" text-sm sm:text-base font-normal">
                    +977-{json?.user.phone}
                  </span>
                </div>
                <div className=" mt-4">
                  <span className="  font-semibold  text-sm sm:text-base text-zapp-light_black">
                    Driver
                  </span>
                  <div className="font-normal   my-1 text-base sm:text-[1.5rem]">
                    {" "}
                    {json.driver}
                  </div>
                  <span className=" text-sm sm:text-base font-normal">
                    Tootle Bike
                  </span>
                </div>
                <div className=" mt-4">
                  <span className=" capitalize  font-semibold text-sm sm:text-base text-zapp-light_black">
                    Pick up location
                  </span>
                  <div className="font-normal   my-1 text-base sm:text-[1.5rem]">
                    {timeFomate(json?.picked_time)}
                  </div>
                  <span className=" text-sm sm:text-base font-normal">
                    {" "}
                    {json?.locations?.pickup?.name.split(",").slice(0, 3)},
                  </span>
                </div>
                <div className=" mt-4">
                  <span className=" capitalize  font-semibold text-sm sm:text-base text-zapp-light_black">
                    Drop location
                  </span>
                  <div className="font-normal   my-1 text-base sm:text-[1.5rem]">
                    {timeFomate(json?.dropped_time)}
                  </div>
                  <span className=" text-sm sm:text-base font-normal">
                    {" "}
                    {json?.locations?.drop?.name.split(",").slice(0, 3)},
                  </span>
                </div>
                <div className=" mt-4">
                  <span className=" capitalize font-bold  text-sm sm:text-base text-zapp-light_black">
                    Price Breakdown
                  </span>

                  <div className=" ">
                    <div className="border-b border-zapp-gray_500 flex font-normal text-base sm:text-[1.25rem] justify-between ">
                      <div>
                        <ul>
                          <li className=" mb-2">Tootle Fare</li>
                          <li className=" mb-2">Service Fee and other fees</li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <li className=" mb-2">Rs. {json.fare}</li>
                          <li>Rs. 120</li>
                        </ul>
                      </div>
                    </div>
                    <div className=" mt-1 font-normal text-base sm:text-[1.25rem] flex justify-between">
                      <div>
                        <div>Transaction Amount</div>
                        <span className=" text-[0.6925rem] font-normal">
                          {" "}
                          Paid by organization
                        </span>
                      </div>
                      <div>
                        <div> Rs. {totalFare(json.fare)} </div>
                      </div>
                    </div>
                    <div className=" flex justify-end">
                      <div >
                        <Link  href={'/print'} >
                        <Button variant={"primary"} className=" " >
                          Print Details
                        </Button>
                        </Link>
                      </div>
                    </div>
                    <div className=" mt-10  text-[10px] leading-[14px]    block sm:hidden ">
                      <ul>
                        <li>Zapp Services Pvt. Ltd.</li>
                        <li className=" my-1">
                          Yala Sadak, Pulchowk, Lalitpur, Nepal
                        </li>
                        <li>
                          This is not a tax document. Please contact us for
                          further information at finance@zapp.today.
                        </li>
                      </ul>
                      <div className=" pt-10 flex items-center gap-1">
                        <div className=" text-base ">Powered by </div>
                        <div>
                          {" "}
                          <PoweredSvg />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashBoardLayout>
    </>
  );
};

export default RideDetail;
