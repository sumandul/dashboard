import React from "react";
import Image from "next/image";
import Link from "next/link"; 
const Registration_Preview_Image = () => {
  return (
    <div className="relative">
      <Link href="/previous-page">
        <a className="back-button">Back</a>
      </Link>
      <Image
        src={"/business/preview-image/registration"}
        height={400}
        width={400}
        alt="preview-image-registration"
      />
    </div>
  );
};

export default Registration_Preview_Image;
