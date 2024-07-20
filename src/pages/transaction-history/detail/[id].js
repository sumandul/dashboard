import { callFetch, getMyProfile } from "@/helper/server";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
const Typography = dynamic(() =>
  import("../../../components/typography/Typography.js")
);

const DashBoardLayout = dynamic(() =>
  import("../../../components/layout/DashBoardLayout.js")
);
const Breadcrumb = dynamic(() =>
  import("../../../components/breadcum/index.js")
);

export async function getServerSideProps(context) {
  try {
    const myProfile = await getMyProfile(context);

    const { status, json } = await callFetch(
      context,
      `business-cashflows/${context.query.id}`
    );

    return {
      props: {
        json,
        status,
        myProfile
      },
    };

    //   if (!myProfile.is_live) {
    //     return {
    //       redirect: {
    //         destination: "/settings/company",
    //         permanent: false,
    //       },
    //     };
    //   }
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Detail = ({ json, status, myProfile }) => {
    const router = useRouter()
  return (
    <div>
      <DashBoardLayout profile={myProfile}>
        <div className=" px-4 2xl:px-10">
          <div className="  text-base  capitalize">
            <Breadcrumb router={router} />
          </div>
          <div className=" flex items-center justify-between">
            <Typography variant={"h1"} className=" my-4 sm:my-5">
              Transaction Detail
            </Typography>
          </div>
          {
    Object.keys(json).length > 0 && 
   (


    <div className=" bg-zapp-white  shadow-sm p-4 w-1/2 rounded-lg ">
    <div className=" grid gap-4 grid-cols-2">
      <div className=" text-zapp-black  border-zapp-gray_500 border-b-[0.0625rem] text-[0.8rem] font-semibold">
        Employee Name:
      </div>
      <div className=" text-[14px]   border-zapp-gray_500 border-b-[0.0625rem]    ">{json.user.name}</div>
      <div className=" font-semibold text-zapp-black text-[0.8rem]  border-zapp-gray_500 border-b-[0.0625rem] ">
        Phone:
      </div>
      <div className=" text-[14px]  border-zapp-gray_500 border-b-[0.0625rem]    ">{json.user.phone}</div>
      <div className=" font-semibold  border-zapp-gray_500 border-b-[0.0625rem]  text-zapp-black text-[0.8rem]">
        Done By:
      </div>
      <div className=" text-[14px]  border-zapp-gray_500 border-b-[0.0625rem]    ">{json.admin.name}</div>
      
      <div className=" font-semibold  border-zapp-gray_500 border-b-[0.0625rem]  text-zapp-black text-[0.8rem]">
        Role:
      </div>
      <div className=" border-zapp-gray_500 border-b-[0.0625rem] ">
        {json.admin.is_super_admin === 1 ? (
          <span className="   text-zapp-primary text-[14px] ">
            super admin
          </span>
        ) : (
            <span className="   text-zapp-secondary text-[14px]">
            super admin
          </span>
        )}
      </div>
      <div className="  border-zapp-gray_500 border-b-[0.0625rem]  font-semibold text-zapp-black text-[0.8rem]">
        Type:
      </div>
      <div className="  border-zapp-gray_500 border-b-[0.0625rem]  text-[14px]  ">{json.type}</div>
      <div className=" font-semibold text-zapp-black  border-zapp-gray_500 border-b-[0.0625rem]  text-[0.8rem]">
        Remark:
      </div>
      
      <div className="  border-zapp-gray_500 border-b-[0.0625rem]  text-[14px]  ">{json.remark}</div>
      <div className="  border-zapp-gray_500 border-b-[0.0625rem]  font-semibold text-zapp-black text-[0.8rem]">
        Amount Added:
      </div>
      <div className="  border-zapp-gray_500 border-b-[0.0625rem]  text-[14px]  ">
        {json.amount_added === 0 ? "-" : `Rs.${json.amount_added}`}
      </div>
      <div className=" font-semibold  border-zapp-gray_500 border-b-[0.0625rem]  text-zapp-black text-[0.8rem]">
        Amount Deducted :
      </div>
      <div className=" text-[14px]  border-zapp-gray_500 border-b-[0.0625rem]   ">
        {json.amount_deducted === 0
          ? "-"
          : `Rs.${json.amount_deducted}`}
      </div>
    </div>
  </div>
   )
          }

         
        </div>
      </DashBoardLayout>
    </div>
  );
};

export default Detail;
