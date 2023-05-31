import { memo } from "react";

function SongItem({ data, active, lg }) {
  return (
    <div
      className={`flex items-center gap-2 w-full ${
        lg ? "p-[10px] bg-alpha" : "p-1"
      } rounded-md hover:bg-light cursor-pointer ${
        active && "bg-active hover:bg-active"
      }`}
      onClick={(e) => {}}
    >
      <img
        src={data?.thumbnailM}
        alt={data?.title}
        className={`block ${
          lg ? "w-[84px] h-[84px]" : "w-10 h-10"
        } object-cover rounded-md`}
        onClick={() => {}}
      />
      <div className="flex flex-col text-[12px]">
        <span>Bài hát</span>
        <span className="text-[14px] text-white font-semibold line-clamp-1">
          {data?.title}
        </span>
        <span className="line-clamp-1">{data?.artistsNames}</span>
      </div>
    </div>
  );
}

export default memo(SongItem);
