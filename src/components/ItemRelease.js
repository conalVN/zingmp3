import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import * as actions from "../store/actions";
import icons from "../ultis/icons";
const { BsPlayFill } = icons;

function ItemRelease({ data }) {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="w-[30%] flex items-center gap-2 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer"
      key={data?.encodeId}
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="relative w-[60px] h-[60px]"
        onClick={() => {
          dispatch(actions.setCurrSongId(data?.encodeId));
          dispatch(actions.play(true));
          dispatch(actions.setRecent(data));
        }}
      >
        <img
          src={data?.thumbnailM}
          alt={data?.title}
          className="w-full rounded-md object-cover"
        />
        {isHover && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
            <BsPlayFill size={28} color="white" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] text-white font-bold line-clamp-1">
          {data?.title}
        </span>
        <span className="text-[12px] text-subtext font-semibold line-clamp-1">
          {data?.artistsNames}
        </span>
        <span className="text-[12px] text-subtext font-semibold">
          {moment(data?.releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  );
}

export default memo(ItemRelease);
