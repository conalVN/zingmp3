import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import icons from "../ultis/icons";
const { BsHeart, BsThreeDots, BsPlayFill } = icons;

function CategoryItem({ dataItem, isSinger, isTitle, isSortDesc, isRelease }) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="w-1/5 px-[14px]"
      key={dataItem?.encodeId}
      onClick={() =>
        navigate(dataItem?.link?.split(".")[0], { state: { playAlbum: false } })
      }
    >
      <div
        className="relative rounded-md overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={dataItem?.thumbnailM}
          alt={dataItem?.sortDescription}
          className={`transition duration-500 ease-linear ${
            isHover ? "scale-110" : "scale-100"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 right-0 rounded-md bg-layer-30 flex items-center justify-center gap-6 text-white">
            <span className="" onClick={() => {}}>
              <BsHeart />
            </span>
            <span
              className="p-2 border rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(dataItem?.link?.split(".")[0], {
                  state: { playAlbum: true },
                });
              }}
            >
              <BsPlayFill size={30} />
            </span>
            <span className="" onClick={() => {}}>
              <BsThreeDots size={20} />
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-2 leading-4">
        {isTitle && (
          <span className="text-white font-bold text-[16px] truncate">
            {dataItem?.title}
          </span>
        )}
        {isSinger && (
          <div className="flex items-center flex-wrap gap-1 text-[14px] text-subtext font-semibold">
            {dataItem?.artists?.map((singer, index) => {
              if (index < 3) {
                return (
                  <Link
                    to={singer?.link}
                    key={singer?.id}
                    className="hover:underline hover:text-active"
                  >
                    {singer?.name}
                    {index < 2 && ","}
                  </Link>
                );
              }
            })}
          </div>
        )}
        {isSortDesc && (
          <span className="text-[14px] text-subtext font-medium line-clamp-2">
            {dataItem?.sortDescription}
          </span>
        )}
        {isRelease && (
          <span className="text-[14px] text-subtext font-semibold">
            {dataItem?.releaseDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(CategoryItem);
