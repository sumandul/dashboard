import Image from "next/image";
import Link from "next/link";
import NOImage from "../../public/no.png"
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center ">
     <div className="">
<div>
 
 <Image src={NOImage} width={300} height={300} alt="no-image"/>

 <p className="     text-zapp-secondary  font-medium text-center ">
       <span className=" text-zapp-primary">  Oops! </span> Something went worng.
       </p>
       <p className="text-zapp-secondary text-center ">
        Please check your connection or back to home page.
       </p>
       <div className=" flex justify-center">
        <Link href={'/'}> <div className="bg-zapp-primary mt-3  text-center text-zapp-white py-1 px-5  font-semibold rounded-md hover:bg-gray-100 transition duration-300 ease-in-out">
           Home
         </div>
         </Link> 
         </div>
         
         </div>

     </div>
    
    </div>
  );
};

export default NotFound;
