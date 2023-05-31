/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useLayoutEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { navSearch } from "../../ultis/nav";
import { apiGetArtist } from "../../apis";
import * as actions from "../../store/actions";

function Search() {
  const { keyword, searchData } = useSelector((state) => state.music);
  const location = useLocation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const arr = location.pathname.split("/");
    if (arr[arr.length - 1] === "playlist") {
      const fetch = async () => {
        const res = await apiGetArtist(searchData?.top?.alias);
        dispatch(actions.setPlaylist(res?.data?.data?.sections[1]?.items));
      };
      fetch();
    }
    if (arr[arr.length - 1] === "bai-hat") {
      dispatch(
        actions.searchSongs(searchData?.top?.id ?? searchData?.artists[0]?.id)
      );
    }
  }, [location, searchData]);

  return (
    <div className="px-[60px]">
      <div className="flex items-center gap-4 border-b border-[#393142] mx-[-59px] mb-7 pl-[59px]">
        <p className="text-white text-xl font-bold pr-5 border-r border-[#393142]">
          Kết Quả Tìm Kiếm
        </p>
        <ul className="flex gap-6 text-[14px] font-semibold">
          {navSearch?.map((item) => (
            <li className="py-[15px] cursor-pointer" key={item?.id}>
              <NavLink
                to={`${item?.path}?q=${keyword.replace(" ", "+")}`}
                className={({ active }) =>
                  active
                    ? "text-white py-[15px] border-active"
                    : "py-[15px] border-b-2 border-transparent"
                }
              >
                {item?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Search);
