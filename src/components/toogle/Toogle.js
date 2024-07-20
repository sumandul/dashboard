import React, { useEffect, useState } from "react";

const Toogle = ({ active,  disbale }) => {
  const [toogle, setToogle] = useState(active);

 

  const handleToggle = (disbale) => {
    if(!disbale){
      setToogle(!toogle);

    }
  };

  useEffect(()=>{
setToogle(active)
  },[active])

  return (
    <>
    {

      <div
        className={` disabled:invalid flex items-center  ${
          toogle
            ? " bg-zapp-gray_500 duration-500   transition-all "
            : " bg-zapp-white duration-500   transition-all"
        }  border-[0.05rem]  border-zapp-gray_500 w-8 rounded-xl h-4`}
        onClick={()=>handleToggle(disbale)}
      >
        <div
          className={`duration-500  ${
            toogle && "translate-x-4"
          }   outline-none  cursor-pointer   rounded-full   caret-zapp-primary  w-4 h-4 ${ disbale ?" bg-[#EEEDED]":"bg-zapp-primary"} `}
        >
          {" "}
        </div>
      </div>
    }
     
    </>
  );
};

export default Toogle;
