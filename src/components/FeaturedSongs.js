import { memo } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import * as actions from "../store/actions";
import icons from "../ultis/icons";
const { SlArrowRight } = icons;

function FeaturedSongs({ data, title }) {
  const dispatch = useDispatch();
  return (
    <div className="mt-7">
      <div className="flex justify-between items-center">
        <h3 className="mb-5 text-white font-bold">{data?.title || title}</h3>
        <span className="flex items-center gap-1 text-[14px] text-subtext font-semibold">
          <span>TẤT CẢ</span>
          <SlArrowRight />
        </span>
      </div>
      <div className="flex justify-between flex-wrap">
        {data
          ?.filter((x, i) => i < 6)
          ?.map((item) => {
            return (
              <div
                className="flex items-center w-[48%] p-[10px] text-[12px] text-subtext font-semibold rounded-md border-b border-[#393142] hover:bg-line"
                key={item?.encodeId}
                onClick={(e) => {
                  if (e.detail === 2) {
                    dispatch(actions.setCurrSongId(item?.encodeId));
                    dispatch(actions.play(true));
                    dispatch(actions.playAlbum(true));
                    dispatch(actions.setRecent(item));
                  }
                }}
              >
                <img
                  src={item?.thumbnailM}
                  alt={item?.title}
                  className="w-10 h-10 mr-2 object-cover rounded-md"
                  onClick={() => {
                    dispatch(actions.setCurrSongId(data?.encodeId));
                    dispatch(actions.play(true));
                    dispatch(actions.playAlbum(true));
                    dispatch(actions.setRecent(data));
                  }}
                />
                <span className="flex flex-col flex-1">
                  <span className="text-white text-[14px] line-clamp-1">
                    {item?.title}
                  </span>
                  <span className="line-clamp-1">{item?.artistsNames}</span>
                </span>
                <span>{moment.utc(item?.duration * 1000).format("mm:ss")}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(FeaturedSongs);
