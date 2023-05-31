import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

import bgRank from "../../source/bgRank.jpg";
import { RankSong } from "../../components";

function WeekRank({ weekChart }) {
  const { pid } = useParams();
  return (
    <div className="w-full h-full mt-[-70px]">
      <img src={bgRank} alt="background" className="w-full h-screen" />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-alpha-banner"></div>
      <div className="absolute top-[100px] left-0 bottom-0 right-0 h-full px-[59px]">
        <h1 className="text-4xl text-white font-bold">Bảng Xếp Hạng Tuần</h1>
        <div className="flex items-center gap-8 text-2xl text-white font-semibold">
          {weekChart?.map((item) => (
            <NavLink
              to={item?.link?.split(".")[0]}
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#9b4de0] py-[15px]"
                  : "py-[15px] border-b-4 border-transparent"
              }
              key={item?.country}
            >
              {item?.country === "vn"
                ? "VIỆT NAM"
                : item?.country === "korea"
                ? "K-POP"
                : "US-UK"}
            </NavLink>
          ))}
        </div>
        <div className="h-auto mt-2 overflow-y-auto scrollbar-hide">
          {weekChart?.map((obj) => {
            return (
              <RankSong
                key={obj?.country}
                data={obj?.link?.includes(pid) && obj?.items}
                number={obj?.items?.length}
                isAlbum
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(WeekRank);
