import { memo } from "react";

import { Song } from "../components";

function RankSong({ data, number, isAlbum }) {
  return (
    <>
      {data &&
        data
          ?.filter((x, i) => i < number)
          ?.map((item, index) => {
            return (
              <Song
                key={item?.encodeId}
                data={item}
                i={index + 1}
                isHideNode
                isAlbum={isAlbum}
              />
            );
          })}
    </>
  );
}

export default memo(RankSong);
