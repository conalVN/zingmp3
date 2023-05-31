import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { apiGetDetailPlaylist } from "../apis";
import { SongItem } from "../components";
import icons from "../ultis/icons";
const { BsTrash } = icons;

function SidebarRight() {
  const { currentSongData, currentAlbumId, isPlaying, recentSongs } =
    useSelector((state) => state.music);
  const [isActive, setIsActive] = useState(0);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await apiGetDetailPlaylist(currentAlbumId);
      if (res?.data?.err === 0) setPlaylist(res?.data?.data?.song?.items);
    };
    if (currentAlbumId && isPlaying) fetchDetail();
  }, [currentAlbumId, isPlaying]);

  return (
    <div className="absolute z-40 w-[330px] top-0 right-0 bottom-0 flex flex-col bg-sideRight text-xs">
      <div className="h-header py-[14px] px-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-light p-[3px] rounded-full">
          <span
            className={`py-[5px] px-2 rounded-full cursor-pointer ${
              isActive === 0 && "text-white bg-[hsla(0,0%,100%,0.3)]"
            }`}
            onClick={() => setIsActive(0)}
          >
            Danh sách phát
          </span>
          <span
            className={`py-[5px] px-2 rounded-full cursor-pointer ${
              isActive === 1 && "text-white bg-[hsla(0,0%,100%,0.3)]"
            }`}
            onClick={() => setIsActive(1)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="bg-light p-2 rounded-full cursor-pointer">
          <BsTrash />
        </span>
      </div>
      {isActive === 1 ? (
        <div className="flex flex-col gap-2 px-2 overflow-y-auto scrollbar-hide">
          {recentSongs && (
            <div className="flex flex-col mb-[90px]">
              {recentSongs?.map((data) => (
                <SongItem data={data} key={data?.encodeId} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-2 overflow-y-auto scrollbar-hide">
          <SongItem data={currentSongData} active />
          <div className="">
            <div className="flex flex-col justify-between my-2">
              <span className="text-white text-[16px] font-bold">
                Tiếp theo
              </span>
              <p className="text-[14px] font-semibold line-clamp-1">
                Từ playlist{" "}
                <Link className="text-active ">
                  {currentSongData?.album?.title}
                </Link>
              </p>
            </div>
            {playlist && (
              <div className="flex flex-col mb-[90px]">
                {playlist?.map((data) => (
                  <SongItem data={data} key={data?.encodeId} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SidebarRight);
