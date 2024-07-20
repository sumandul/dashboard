import React, { useState } from "react";
import Image from "next/image";
const Registration_Preview_Image = () => {
  const [back,setBack]= useState()
  return (
    <div>
      <div className=" bg-zapp-primary">Back</div>
      <Image
        src={"/business/preview-image/pan"}
        height={400}
        width={400}
        alt="preview-image-pan"
      />
    </div>
  );
};

export default Registration_Preview_Image;
