import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  Header,
  SidebarLeft,
  SidebarRight,
  LoadingPage,
  Controller,
} from "../../components";

function Layout() {
  const { currentSongId, currentSongData } = useSelector(
    (state) => state.music
  );
  const { data } = useSelector((state) => state.app);
  const [isShow, setIsShow] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);

  return (
    <div className="relative flex w-full h-screen overflow-hidden text-primary">
      <div className="flex-none w-nav h-full bg-sideLeft">
        <SidebarLeft />
      </div>
      {data ? (
        <div
          className="relative flex-auto h-full bg-content overflow-y-auto scrollbar-hide"
          onScroll={(e) =>
            e.target.scrollTop > 20 ? setIsShow(true) : setIsShow(false)
          }
        >
          <Header isShow={isShow} />
          <div className={`my-[70px] h-screen`}>
            <Outlet />
            {currentSongId && <div className="h-control"></div>}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
      {isShowPlaylist && <SidebarRight />}
      {currentSongId && (
        <div className="fixed z-50 bottom-0 left-0 right-0 h-control bg-control">
          <Controller
            isShowPlaylist={isShowPlaylist}
            setIsShowPlaylist={setIsShowPlaylist}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Layout);
