/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as apis from "../../apis";
import * as actions from "../../store/actions";
import { formatLike } from "../../ultis/constant";
import {
  LoadingAudio,
  ListSong,
  LoadingPage,
  Button,
  ListArtist,
} from "../../components";
import icons from "../../ultis/icons";
import { BsPauseFill } from "react-icons/bs";
const { BsDot, BsPlayFill, FaPlay, TbArrowsSort } = icons;

function Album() {
  const { isPlaying, isAlbum, playlist, currentSongId } = useSelector(
    (state) => state.music
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dataPlayList, setDataPlaylist] = useState({});
  const refList = useRef();
  // const [listArtist, setListArtist] = useState([])

  // react done => render UI
  useLayoutEffect(() => {
    dispatch(actions.setCurrAlbumId(id));
    const fetchPlaylist = async () => {
      dispatch(actions.loading(true));
      const res = await apis.apiGetDetailPlaylist(id);
      dispatch(actions.loading(false));
      if (res?.data?.err === 0) {
        setDataPlaylist(res?.data?.data);
        dispatch(actions.setPlaylist(res?.data?.data?.song?.items));
      }
    };
    fetchPlaylist();
  }, [id]);

  // scroll into view
  useLayoutEffect(() => {}, [currentSongId]);

  const handlePlayRandomSong = () => {
    const randomSong = Math.round(Math.random() * playlist?.length - 1);
    dispatch(actions.setCurrSongId(playlist[randomSong]?.encodeId));
    dispatch(actions.play(true));
  };
  const handlePauseSong = () => {
    dispatch(actions.play(false));
  };

  return (
    <>
      {!dataPlayList?.thumbnailM ? (
        <LoadingPage z="30" />
      ) : (
        <>
          <div className="flex gap-8 px-[59px] h-full w-full mt-5 overflow-hidden">
            <div className="flex-none w-1/4 flex flex-col items-center gap-2">
              <div className="relative w-full overflow-hidden">
                <img
                  src={dataPlayList?.thumbnailM}
                  alt="thumbnail"
                  className={`object-contain shadow-md ${
                    isPlaying && isAlbum
                      ? "rounded-full animate-rotate"
                      : "rounded-md animate-rotate-end"
                  }`}
                />
                <span
                  className={`absolute top-0 left-0 right-0 bottom-0 text-white hover:bg-layer-30 flex items-center justify-center ${
                    isPlaying && "rounded-full"
                  }`}
                >
                  <span className="p-2 border border-white rounded-full">
                    {isPlaying && isAlbum ? (
                      <LoadingAudio />
                    ) : (
                      <FaPlay size={40} />
                    )}
                  </span>
                </span>
              </div>
              <h3 className="text-[20px] text-center font-bold text-white">
                {dataPlayList?.title}
              </h3>
              <span className="flex flex-col gap-1 items-center text-[12px] text-subtext font-semibold">
                <span className="">
                  Cập nhật:{" "}
                  {moment
                    .unix(dataPlayList?.contentLastUpdate)
                    .format("DD/MM/YYYY")}
                </span>
                <span className="">
                  <NavLink>{dataPlayList?.artistsNames}</NavLink>
                </span>
                <span className="">{formatLike(dataPlayList?.like)}</span>
              </span>
              {!isPlaying ? (
                <Button
                  title="Phát ngẫu nhiên"
                  iconF={<BsPlayFill size={26} />}
                  styles="uppercase text-sm px-4 py-1"
                  onClick={handlePlayRandomSong}
                />
              ) : (
                <Button
                  title={"Tạm dừng"}
                  iconF={<BsPauseFill />}
                  styles="uppercase text-sm px-4 py-1"
                  onClick={handlePauseSong}
                />
              )}
            </div>
            <div
              className="flex-auto overflow-y-auto scrollbar-hide"
              ref={refList}
            >
              <p className="mb-[10px] text-[14px] font-semibold">
                <span className="text-primary">Lời tựa </span>
                <span className="text-white">
                  {dataPlayList?.sortDescription}
                </span>
              </p>
              <div className="flex items-center justify-between p-[10px] text-[12px] text-primary font-semibold">
                <div className="flex-[1_1_50%] flex items-center gap-2">
                  <span className="">
                    <TbArrowsSort />
                  </span>
                  <span>BÀI HÁT</span>
                </div>
                <div className="flex-[1_1_40%]">ALBUM</div>
                <div className="flex-none">THỜI GIAN</div>
              </div>
              <ListSong />
              <div className="flex items-center text-[14px] text-subtext font-semibold p-[10px]">
                <span>{dataPlayList?.song?.total} bài hát</span>
                <BsDot />
                <span>
                  {moment
                    .utc(dataPlayList?.song?.totalDuration * 1000)
                    .format("hh:mm:ss")}
                </span>
              </div>
            </div>
          </div>
          {/* <ListArtist data={listArtist} title="Nghệ sĩ tham gia"/> */}
        </>
      )}
    </>
  );
}

export default memo(Album);
