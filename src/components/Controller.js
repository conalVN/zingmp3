/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

import { LoadingIcon } from "../components";
import * as actions from "../store/actions";
import * as apis from "../apis";
import icons from "../ultis/icons";
const {
  BsHeart,
  BsThreeDots,
  RxShuffle,
  BiSkipPrevious,
  BiSkipNext,
  BsPlayFill,
  BsPauseFill,
  TbRepeatOnce,
  TbRepeat,
  TbMicrophone2,
  MdOutlineScreenShare,
  HiOutlineVolumeUp,
  RiPlayListLine,
} = icons;
let intervalId;

function Controller({ isShowPlaylist, setIsShowPlaylist }) {
  const dispatch = useDispatch();
  const { currentSongId, isPlaying, playlist, isAlbum } = useSelector(
    (state) => state.music
  );
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [isSource, setIsSource] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const trackRef = useRef();
  const thumbRef = useRef();
  const volumeThumbRef = useRef();
  const volumeTrackRef = useRef();

  useEffect(() => {
    const fetchDataSong = async () => {
      setIsSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(currentSongId), // call api get detail current song
        apis.apiGetAudio(currentSongId), // call api get audio current song
      ]);
      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
        dispatch(actions.setCurrSongData(res1?.data?.data));
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2?.data?.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        setDuration(0);
        toast.warn(res2?.data?.msg);
      }
      setIsSource(true);
    };
    fetchDataSong();
  }, [currentSongId]);

  // change audio
  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    audio.currentTime = 0;
    if (isPlaying && songInfo) {
      audio.play();
      intervalId = setInterval(() => {
        let precent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - precent}%`;
        setDuration(Math.round(audio.currentTime));
      }, 1000);
    }
  }, [audio]);

  // handle end song
  useEffect(() => {
    const handleEndSong = () => {
      if (isAlbum) {
        if (isShuffle && repeatMode === 1) {
          handleRepeatOne();
        } else if (isShuffle || (isShuffle && repeatMode === 2)) {
          handleShuffe();
        } else {
          handleNext();
        }
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEndSong);
    return () => {
      audio.removeEventListener("ended", handleEndSong);
    };
  }, [audio, isShuffle, repeatMode]);

  const handleToggePlay = () => {
    if (isPlaying) {
      intervalId && clearInterval(intervalId);
      audio.pause();
      dispatch(actions.play(false));
    } else {
      dispatch(actions.play(true));
      intervalId = setInterval(() => {
        let precent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - precent}%`;
        setDuration(Math.round(audio.currentTime));
      }, 1000);
      audio.play();
    }
  };

  const handleNext = () => {
    if (playlist) {
      let currSongIndex;
      if (isShuffle && repeatMode === 1) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 1) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        handleShuffe();
      } else {
        playlist?.forEach((item, index) => {
          if (item?.encodeId === currentSongId) currSongIndex = index + 1;
        });
        dispatch(actions.setCurrSongId(playlist[currSongIndex].encodeId));
        dispatch(actions.play(true));
      }
    }
  };

  const handlePrevious = () => {
    if (playlist) {
      let currSongIndex;
      if (isShuffle && repeatMode === 1) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 1) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        handleShuffe();
      } else {
        playlist?.forEach((item, index) => {
          if (item?.encodeId === currentSongId) currSongIndex = index - 1;
        });
        dispatch(actions.setCurrSongId(playlist[currSongIndex].encodeId));
        dispatch(actions.play(true));
      }
    }
  };

  const handleShuffe = () => {
    let randomIndex = Math.floor(Math.random() * playlist?.length - 1);
    dispatch(actions.setCurrSongId(playlist[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => audio.play();

  const handleProgress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setDuration(Math.round((percent * songInfo.duration) / 100));
  };

  const handleVolume = (e) => {
    const Pos = volumeTrackRef.current.getBoundingClientRect();
    const vol = Math.round(((e.clientX - Pos.left) * 100) / Pos.width) / 100;
    audio.volume = vol;
    volumeThumbRef.current.style.cssText = `right: ${100 - vol * 100}%`;
  };

  return (
    <>
      {songInfo && (
        <div className="flex items-center justify-between h-full px-5">
          <div className="w-[30%] flex items-center justify-start pr-4">
            <img
              src={songInfo?.thumbnail}
              alt={songInfo?.name}
              className="block w-[64px] h-[64px] mr-[10px] rounded-md object-cover"
            />
            <div className="flex-1 flex flex-col justify-center mr-[10px]">
              <p className="text-[14px] text-white font-semibold line-clamp-1">
                {songInfo?.title}
              </p>
              <span className="text-[12px] line-clamp-1">
                {songInfo?.artistsNames}
              </span>
            </div>
            <div className="flex gap-4 ml-[10px]">
              <BsHeart />
              <BsThreeDots />
            </div>
          </div>
          <div className="w-[40%] flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <span
                className={`cursor-pointer ${isShuffle && "text-purple-700"}`}
                onClick={() => setIsShuffle((prev) => !prev)}
              >
                <RxShuffle size={18} />
              </span>
              <span
                className={isAlbum ? "cursor-pointer" : ""}
                onClick={handlePrevious}
              >
                <BiSkipPrevious size={34} />
              </span>
              <span
                className="flex justify-center items-center pl-[1px] w-[40px] h-[40px] rounded-full border"
                onClick={handleToggePlay}
              >
                {!isSource ? (
                  <LoadingIcon />
                ) : !isPlaying ? (
                  <BsPlayFill size={40} />
                ) : (
                  <BsPauseFill size={36} />
                )}
              </span>
              <span
                className={isAlbum ? "cursor-pointer" : ""}
                onClick={handleNext}
              >
                <BiSkipNext size={36} color={!isAlbum ? "text-gray-100" : ""} />
              </span>
              <span
                className={`cursor-pointer ${repeatMode && "text-purple-700"}`}
                onClick={() =>
                  setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))
                }
              >
                {repeatMode === 1 ? (
                  <TbRepeatOnce size={20} />
                ) : (
                  <TbRepeat size={20} />
                )}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 w-full">
              <span className="text-[12px] font-semibold">
                {moment.unix(duration).format("mm:ss")}
              </span>
              <div
                className="relative w-4/5 h-1 hover:h-2 bg-[#ffffff4d] rounded-lg overflow-hidden cursor-pointer"
                onClick={handleProgress}
                ref={trackRef}
              >
                <div
                  className="absolute top-0 left-0 bottom-0 bg-white rounded-lg"
                  ref={thumbRef}
                ></div>
              </div>
              <span className="text-[12px] font-semibold">
                {moment.unix(songInfo?.duration).format("mm:ss")}
              </span>
            </div>
          </div>
          <div className="w-[30%] flex items-center justify-end gap-3">
            <div className="flex items-center justify-end gap-3 w-full">
              <span className="">
                <TbMicrophone2 />
              </span>
              <span className="">
                <MdOutlineScreenShare />
              </span>
              <div className="flex items-center gap-2">
                <span className="">
                  <HiOutlineVolumeUp />
                </span>
                <div
                  className="w-[100px] h-1 relative rounded-lg bg-line overflow-hidden cursor-pointer"
                  ref={volumeTrackRef}
                  onClick={handleVolume}
                >
                  <div
                    className={`absolute left-0 bottom-0 top-0 right-0 bg-white`}
                    ref={volumeThumbRef}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className={`ml-[12px] p-2 rounded-md cursor-pointer ${
                isShowPlaylist ? "bg-active" : "bg-alpha"
              }`}
              onClick={() => setIsShowPlaylist((prev) => !prev)}
            >
              <RiPlayListLine />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Controller);
