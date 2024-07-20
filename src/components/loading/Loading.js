import ReactLoading from "react-loading";
import Logo from "../../../public/tootl_logo_white.webp";
import Image from "next/image";

export default function Loading({ show }) {
  return (
    <div
      className=" fixed top-0 left-0 min-h-screen w-full   bg-zapp-overlay z-50 flex justify-center items-center"
      style={{ display: show ? "flex" : "none" }}
    >
      <ReactLoading
        type="spin"
        color="#ff3b9d"
        className=""
        height={50}
        width={50}
      />
      {/* <Image
        src={Logo}
        height={150}
        width={150}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        alt=""
      /> */}
    </div>
  );
}
