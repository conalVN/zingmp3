import { memo } from "react";
import { useSelector } from "react-redux";

import { Category, LoadingPage } from "../components";

function SearchPlaylist() {
  const { isLoading } = useSelector((state) => state.app);
  const { playlist } = useSelector((state) => state.music);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Category
          title="Playlist/Album"
          data={playlist}
          number={playlist?.length < 50 ? playlist.length : 50}
          isTitle
          isSinger
        />
      )}
    </div>
  );
}

export default memo(SearchPlaylist);
