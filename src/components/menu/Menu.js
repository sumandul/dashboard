import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { menuItems } from "../sidebar/SiderElement";

const Menu = ({ profile }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div className="w-full ">
      {menuItems?.map((item, i) => {
        if (
          profile &&
          profile.role === "Admin" &&
          item.sub &&
          item.sub.some((sub_menu) => sub_menu.path.includes("/admin"))
        ) {
          return item.name === "Employees" ? (
            <ul className="  mb-0" key={i}>
              <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                <span className=" mr-2"> {item.icon} </span>
                {item.name}
              </li>
              <ul className=" mt-2  ml-8">
                {item.sub.map((sub_menu, j) => {
                  if (sub_menu.path.includes("/admin")) {
                    return null;
                  }
                  return (
                    <Link href={sub_menu.path} key={j}>
                      <li
                        className={`${
                          currentRoute === `${sub_menu.path}` &&
                          "  rounded-tl-[0.5rem] px-2   rounded-bl-[0.5rem]  text-zapp-white py-2 bg-zapp-primary"
                        }  my-4   text-zapp-white  text-[0.875rem] font-normal `}
                      >
                        {sub_menu.name}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </ul>
          ) : null;
          
        }else if( profile &&
          profile.role === "Admin" &&
          item.sub &&
          item.sub.some((sub_menu) => sub_menu.path.includes("/company"))){
            return item.name === "Settings" ? (
              <ul className="  mb-0" key={i}>
                <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                  <span className=" mr-2"> {item.icon} </span>
                  {item.name}
                </li>
                <ul className=" mt-2  ml-8">
                  {item.sub.map((sub_menu, j) => {
                    if (sub_menu.path.includes("/company")) {
                      return null;
                    }
                    return (
                      <Link href={sub_menu.path} key={j}>
                        <li
                          className={`${
                            currentRoute === `${sub_menu.path}` &&
                            "  rounded-tl-[0.5rem] px-2   rounded-bl-[0.5rem]  text-zapp-white py-2 bg-zapp-primary"
                          }  my-4   text-zapp-white  text-[0.875rem] font-normal `}
                        >
                          {sub_menu.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </ul>
            ) : null;
          }else if( profile &&
            profile.role === "Admin" &&
            item.sub &&
            item.sub.some((sub_menu) => sub_menu.path.includes("/payment"))){
              return item.name === "Settings" ? (
                <ul className="  mb-0" key={i}>
                  <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                    <span className=" mr-2"> {item.icon} </span>
                    {item.name}
                  </li>
                  <ul className=" mt-2  ml-8">
                    {item.sub.map((sub_menu, j) => {
                      if (sub_menu.path.includes("/payment")) {
                        return null;
                      }
                      return (
                        <Link href={sub_menu.path} key={j}>
                          <li
                            className={`${
                              currentRoute === `${sub_menu.path}` &&
                              "  rounded-tl-[0.5rem] px-2   rounded-bl-[0.5rem]  text-zapp-white py-2 bg-zapp-primary"
                            }  my-4   text-zapp-white  text-[0.875rem] font-normal `}
                          >
                            {sub_menu.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </ul>
              ) : null;
            }
        if (profile?.is_live === 0) {
  
          if (item.name === "Settings") {
    
            return (
              <ul className="  pl-14 sm:pl-0  mb-0" key={i}>
                {!item.path ? (
                  <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                    <span className=" mr-2"> {item.icon} </span>

                    {item.name} 
                  </li>
                ) : (
                  <Link href={item.path}>
                    <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                      <span className=" mr-2">{item.icon}</span>

                      {item.name} 
                    </li>
                  </Link>
                )}

                {item.sub && (
                  <ul className=" mt-2  ml-8">
                    {item.sub.map((sub_menu, j) => {
                      if (
                        sub_menu.path.includes("/payment") ||
                        sub_menu.path.includes("/transaction-history")
                      ) {
                        return null;
                      }
                      return (
                        <>
                        
                        <Link href={sub_menu.path} key={j}>
                          <li
                            className={`${
                              currentRoute === `${sub_menu.path}` &&
                              "  rounded-tl-[0.5rem] px-2   rounded-bl-[0.5rem]  text-zapp-white py-2 bg-zapp-primary"
                            }  my-4   text-zapp-white  text-[0.875rem] font-normal `}
                          >
                            {sub_menu.name} 
                          </li>
                        </Link>
                        </>
                      );
                    })}
                  </ul>
                )}
              </ul>
            );
          }
        } else {
          return (
            <ul className="  pl-14 sm:pl-0  mb-0" key={i}>
              {!item.path ? (
                <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                  <span className=" mr-2"> {item.icon} </span>
                  {item.name}
                </li>
              ) : (
                <Link href={item.path}>
                  <li className=" flex items-center uppercase text-base font-semibold  text-zapp-white">
                    <span className=" mr-2">{item.icon}</span>

                    {item.name}
                  </li>
                </Link>
              )}

              {item.sub && (
                <ul className=" mt-2  ml-8">
                  {item.sub.map((sub_menu, j) => (
                    <Link href={sub_menu.path} key={j}>
                      <li
                        className={`${
                          currentRoute === `${sub_menu.path}` &&
                          "  rounded-tl-[0.5rem] px-2   rounded-bl-[0.5rem]  text-zapp-white py-2 bg-zapp-primary"
                        }  my-4   text-zapp-white  text-[0.875rem] font-normal `}
                      >
                        {sub_menu.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </ul>
          );
        }
      })}
    </div>
  );
};

export default Menu;
