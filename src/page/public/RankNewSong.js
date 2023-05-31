import { memo } from "react";

import { RankSong } from "../../components";
import newRelease from "../../source/new-release-bg.jpg";
import { useSelector } from "react-redux";

function RankNewSong() {
  const { rankNewRelease } = useSelector((state) => state.app);
  return (
    <div className="w-full h-full mt-[-70px]">
      <img src={newRelease} alt="background" className="w-full h-auto" />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-[#170f23] to-[#170f23] opacity-90"></div>
      <div className="absolute top-[100px] left-0 bottom-0 right-0 h-full px-[59px]">
        <h1 className="text-4xl text-white font-bold">
          {rankNewRelease?.title}
        </h1>
        <div className="h-auto mt-8 overflow-y-auto scrollbar-hide">
          <RankSong
            data={rankNewRelease?.items}
            number={rankNewRelease?.items?.length}
            isAlbum
          />
        </div>
      </div>
    </div>
  );
}

export default memo(RankNewSong);
