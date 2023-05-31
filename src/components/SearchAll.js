/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CategoryItem,
  SongItem,
  FeaturedSongs,
  ListArtist,
  LoadingPage,
} from "../components";
import { formatFollow } from "../ultis/constant";
import icons from "../ultis/icons";
const { RxShuffle, SlArrowRight } = icons;

function SearchAll() {
  const { isLoading } = useSelector((state) => state.app);
  const { searchData } = useSelector((state) => state.music);
  const [isHover, setIsHover] = useState(false);

  return isLoading ? (
    <LoadingPage />
  ) : (
    searchData && (
      <>
        <div className="mt-7">
          <h3 className="mb-5 text-white font-bold">Nổi Bật</h3>
          <div className="flex justify-between gap-4">
            <div
              className="flex-1 flex items-center p-[10px] rounded-md gap-2 bg-alpha"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className="relative">
                <img
                  className="rounded-full w-[84px] h-[84px]"
                  src={
                    (searchData?.artists &&
                      searchData?.artists[0]?.thumbnail) ||
                    searchData?.top?.thumbnail
                  }
                  alt=""
                />
                {isHover && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-layer-30 rounded-full flex items-center justify-center">
                    <RxShuffle size={20} />
                  </div>
                )}
              </div>
              <div className="flex flex-col text-[12px]">
                <span>Nghệ sĩ</span>
                <Link className="text-[14px] text-white font-semibold">
                  {searchData?.artists && searchData?.artists[0]?.name}
                </Link>
                <span>
                  {formatFollow(
                    searchData?.artists && searchData?.artists[0]?.totalFollow
                  )}
                </span>
              </div>
            </div>
            {searchData?.songs
              ?.filter((x, i) => i < 2)
              ?.map((item) => {
                return (
                  <div className="flex-1" key={item?.encodeId}>
                    <SongItem data={item} lg />
                  </div>
                );
              })}
          </div>
        </div>
        <FeaturedSongs
          data={searchData?.songs?.filter((x, i) => i < 6)}
          title="Bài Hát"
        />
        <div className="mt-7">
          <div className="flex justify-between items-center">
            <h3 className="mb-5 text-white font-bold">Playlist/Album</h3>
            <span className="flex items-center gap-1 text-[14px] text-subtext font-semibold">
              <span>TẤT CẢ</span>
              <SlArrowRight />
            </span>
          </div>
          <div className="flex justify-between flex-wrap">
            {searchData?.playlists
              ?.filter((x, i) => i < 5)
              ?.map((item) => {
                return (
                  <CategoryItem
                    key={item?.encodeId}
                    dataItem={item}
                    isTitle
                    isSinger
                  />
                );
              })}
          </div>
        </div>
        <ListArtist
          data={searchData?.artists?.filter((x, i) => i < 5)}
          title="Nghệ sĩ/OA"
        />
      </>
    )
  );
}

export default memo(SearchAll);
