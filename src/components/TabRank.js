import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { RankSong } from "../components";
import icons from "../ultis/icons";
const { BsPlayFill } = icons;

function TabRank({ data }) {
  const navigate = useNavigate();
  return (
    <div className="w-[32%] bg-alpha py-5 px-[10px] rounded-md">
      <div className="flex items-center gap-2">
        <h3 className="text-2xl text-white font-semibold pl-10 pb-[10px]">
          {data?.country === "vn"
            ? "Việt Nam"
            : data?.country === "korea"
            ? "K-Pop"
            : "US-UK"}
        </h3>
        <span className="">
          <BsPlayFill />
        </span>
      </div>
      <RankSong data={data?.items} number={5} isHideNode />
      <div className="flex justify-center">
        <button
          className="py-2 px-[25px] mt-2 border rounded-full text-white text-[14px] font-semibold"
          onClick={() => {
            navigate(data?.link?.split(".")[0]);
          }}
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default memo(TabRank);
