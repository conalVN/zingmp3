import { memo, useState } from "react";
import { Link } from "react-router-dom";

import { formatFollow } from "../ultis/constant";
import icons from "../ultis/icons";
const { SlUserFollow, RxShuffle } = icons;

function Artist({ data }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-col text-center w-[20%] px-[14px]">
      <Link
        className="relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={data?.link}
      >
        <img
          src={data?.thumbnailM}
          alt={data?.name}
          className={`object-cover rounded-full ${
            isHover && "animate-scaleImage"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-layer-30 rounded-full flex items-center justify-center">
            <span className="p-2 border-white border rounded-full">
              <RxShuffle size={20} />
            </span>
          </div>
        )}
      </Link>
      <Link
        to={data?.link}
        className="mt-[15px] mb-1 text-[14px] font-bold text-white"
      >
        {data?.name}
      </Link>
      <span className="text-xs text-subtext">
        {formatFollow(+data?.totalFollow)}
      </span>
      <button className="flex items-center justify-center gap-1 font-semibold text-[12px] border py-[6px] px-[19px] rounded-full w-[70%] mx-auto mt-[15px] mb-[20px] bg-alpha">
        <SlUserFollow size={16} />
        <span className="text-xs">QUAN TÂM</span>
      </button>
    </div>
  );
}

export default memo(Artist);
