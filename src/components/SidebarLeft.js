import { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import path from "../ultis/path";
import { nav, subNav } from "../ultis/nav";
import logo from "../source/logo-dark.svg";

const notActiveStyle =
  "flex items-center py-2 px-[25px] border-l-[3px] border-transparent";
const activeStyle =
  "flex items-center py-2 px-[25px] text-white bg-activeItemNav border-l-[3px] border-[#9b4de0]";

function SidebarLeft() {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-[25px] py-[15px]" onClick={() => navigate(path.HOME)}>
        <img src={logo} alt="logo" className="w-[120px] object-contain" />
      </div>
      <ul className="flex flex-col gap-1">
        {nav?.map((item) => {
          return (
            <li className="text-[13px]" key={item.path}>
              <NavLink
                end={item.end}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                <span className="material-symbols-outlined mr-2">
                  {item?.icon}
                </span>
                <span className="font-bold">{item?.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <span className="flex mx-auto w-[80%] h-[1px] bg-line my-[8px]"></span>
      <ul className="flex flex-col">
        {subNav?.map((item) => {
          return (
            <li className="text-[13px]" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                <span className="material-symbols-outlined mr-2">
                  {item?.icon}
                </span>
                <span className="font-bold">{item?.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default memo(SidebarLeft);
