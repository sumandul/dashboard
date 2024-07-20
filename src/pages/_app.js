import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/loading/Loading";
const __state = proxy({ loading: false });

export default function App({ Component, pageProps }) {
  const snap = useSnapshot(__state);
  const [theme, setTheme] = useState("");
  return (
    <div
      className={` ${
        theme === "esewa" ? "theme-esewa" : theme === "zapp" ? "theme-zapp" : ""
      } `}
    >
      <Component {...{ ...pageProps, __state, setTheme }} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Loading show={snap.loading} />
    </div>
  );
}
