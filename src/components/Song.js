import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as actions from "../store/actions";
import icons from "../ultis/icons";
const { CgMusic, BsPlayFill } = icons;

function Song({ data, isHideNode, i, isAlbum, refCurSong }) {
  const { currentSongId } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const handlePlaySong = () => {
    dispatch(actions.setCurrSongId(data?.encodeId));
    dispatch(actions.play(true));
    dispatch(actions.playAlbum(true));
    dispatch(actions.setRecent(data));
  };
  return (
    <div
      className={`flex items-center justify-between p-[10px] text-[12px] text-subtext font-semibold border-b border-line hover:bg-alpha ${
        currentSongId === data.encodeId ? "bg-alpha" : ""
      }`}
      key={data?.encodeId}
      ref={refCurSong}
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex-[1_1_50%] flex items-center gap-2">
        {!isHideNode && (
          <span className="">
            <CgMusic />
          </span>
        )}
        {isHideNode && (
          <span
            className={`text-3xl w-10 text-center text-inherit ${
              i === 1
                ? "textShadow-1"
                : i === 2
                ? "textShadow-2"
                : i === 3
                ? "textShadow-3"
                : "textShadow-default"
            }`}
          >
            {i}
          </span>
        )}
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10" onClick={handlePlaySong}>
            <img
              src={data?.thumbnailM}
              alt={data?.alias}
              className="w-full object-cover rounded-md"
            />
            {isHover && (
              <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <BsPlayFill size={28} color="white" />
              </span>
            )}
          </div>
          <p className="flex flex-col">
            <span className="text-[14px] line-clamp-1 text-white">
              {data?.title?.length > 35
                ? `${data?.title?.slice(0, 35)}...`
                : data?.title}
            </span>
            <span className="text-[12px] line-clamp-1">
              {data?.artistsNames}
            </span>
          </p>
        </div>
      </div>
      {isAlbum && (
        <div className="flex-[1_1_40%] text-[12px] line-clamp-1 mr-6">
          {data?.album?.title}
        </div>
      )}
      <div className="flex-none">
        {moment.utc(data?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
}

export default memo(Song);
