import { memo, useRef } from "react";
import { useSelector } from "react-redux";

import { Song } from "../components";

function ListSong() {
  const { playlist } = useSelector((state) => state.music);
  const refCurSong = useRef();

  return (
    <div className="">
      {playlist?.map((item) => {
        return (
          <Song
            data={item}
            isAlbum
            key={item?.encodeId}
            refCurSong={refCurSong}
          />
        );
      })}
    </div>
  );
}

export default memo(ListSong);
