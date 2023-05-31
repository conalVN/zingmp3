import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGetArtist } from "../../apis";
import { formatNumber } from "../../ultis/constant";
import { FeaturedSongs, Category, ListArtist } from "../../components";
import icons from "../../ultis/icons";
const { SlUserFollow } = icons;

function Singer() {
  const { singer } = useParams();
  const [artist, setArtist] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtist(res?.data?.data);
      }
    };
    singer && fetch();
  }, [singer]);

  return (
    artist && (
      <div className="mt-[-70px]">
        <div ref={ref} className="relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-gradient-to-b from-[#bdbdbd] via-transparent to-[#bdbdbd]"></div>
          <div className="absolute left-[59px] bottom-[20px]">
            <h1 className="text-6xl mb-5 text-white font-bold">
              {artist?.name}
            </h1>
            <div className="flex items-center gap-10 text-white text-[14px]">
              <span className="font-semibold">
                {formatNumber(artist?.follow.toString())} người quan tâm
              </span>
              <span className="flex items-center gap-1 py-1 px-6 rounded-full border bg-[hsla(0,0%,100%,.1)]">
                <SlUserFollow />
                <span className="">QUAN TÂM</span>
              </span>
            </div>
          </div>
          <img
            src={artist?.cover}
            alt={artist?.realname}
            className="block w-full h-[450px] object-fill"
          />
        </div>
        <div className="px-[59px]">
          <FeaturedSongs
            data={
              artist?.sections?.find((item) => item.sectionId === "aSongs")
                ?.items
            }
            title="Bài Hát Nổi Bật"
          />
          <Category
            data={
              artist?.sections?.find((item) => item.sectionId === "aSingle")
                ?.items
            }
            title={
              artist?.sections?.find((item) => item.sectionId === "aSingle")
                ?.title
            }
            isTitle
            isRelease
          />
          <Category
            data={
              artist?.sections?.find((item) => item.sectionId === "aPlaylist")
                ?.items
            }
            title={
              artist?.sections?.find((item) => item.sectionId === "aPlaylist")
                ?.title
            }
            isTitle
            isSinger
          />
          <ListArtist
            data={
              artist?.sections?.find((i) => i.sectionId === "aReArtist")?.items
            }
            title={
              artist?.sections?.find((i) => i.sectionId === "aReArtist")?.title
            }
          />
          <div className="">
            <h3 className="text-[20px] text-white font-bold mb-5">
              Về {artist?.name}
            </h3>
            <div className="flex justify-start gap-4">
              <div className="w-[40%] h-[330px] overflow-hidden rounded-md">
                <img
                  src={artist?.thumbnailM}
                  alt={artist?.name}
                  className="w-full rounded-lg object-fill"
                />
              </div>
              <div className="w-[40%]">
                <p
                  dangerouslySetInnerHTML={{ __html: artist?.biography }}
                  className="text-[14px] text-subtext font-semibold line-clamp-7"
                ></p>
                <span className="text-[14px] uppercase cursor-pointer">
                  Xem thêm
                </span>
                <div className="flex flex-col mt-4">
                  <span className="text-[20px] text-white font-bold">
                    {formatNumber(artist?.follow.toString())}
                  </span>
                  <span className="text-[14px] font-semibold text-subtext">
                    Người quan tâm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Singer);
