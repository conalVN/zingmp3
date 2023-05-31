import { memo } from "react";
import { ListSong, LoadingPage } from "../components";
import { useSelector } from "react-redux";

function SearchSongs() {
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div className="">
      <h3 className="text-xl text-white font-bold mb-[10px]">Bài Hát</h3>
      {isLoading ? <LoadingPage /> : <ListSong />}
    </div>
  );
}

export default memo(SearchSongs);
