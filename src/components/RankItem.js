import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../store/actions";
import icons from "../ultis/icons";
const { BsPlayFill } = icons;

function RankItem({ data, i, c }) {
  const dispatch = useDispatch();
  const { chart } = useSelector((state) => state.app);
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`flex justify-start items-center ${
        c ? "px-2 py-1 gap-2" : "px-[15px] py-[10px]"
      } bg-alpha hover:bg-alpha-2 w-full rounded-md`}
      key={data?.encodeId}
    >
      {i && (
        <div
          className={`text-3xl font-robo font-extrabold w-10 text-center text-number ${
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
        </div>
      )}
      <div
        className="flex-1 flex items-center gap-2"
        onMouseMove={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`relative rounded-md ${
            c ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
          }`}
          onClick={() => {
            dispatch(actions.setCurrSongId(data?.encodeId));
            dispatch(actions.play(true));
          }}
        >
          <img
            src={data?.thumbnailM}
            alt={data?.title}
            className="block w-full object-cover rounded-md"
          />
          {isHover && (
            <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <BsPlayFill size={32} />
            </span>
          )}
        </div>
        <span className="flex flex-col">
          <span className="text-[14px] text-white font-semibold">
            {data?.title}
          </span>
          <span className="text-[12px]">{data?.artistsNames}</span>
        </span>
      </div>
      <div className={`font-bold text-white ${c ? "text-xs" : ""}`}>
        {Math.round((data?.score * 100) / chart?.totalScore)}%
      </div>
    </div>
  );
}

export default memo(RankItem);
