import { memo } from "react";

import { Artist } from "../components";
import icons from "../ultis/icons";
const { SlArrowRight } = icons;

function ListArtist({ data, title }) {
  return (
    <div className="mt-7">
      <div className="flex justify-between items-center">
        <h3 className="mb-5 text-white font-bold">{title}</h3>
        <span className="flex items-center gap-1 text-[14px] text-subtext font-semibold">
          <span>TẤT CẢ</span>
          <SlArrowRight />
        </span>
      </div>
      <div className="flex justify-start w-full">
        {data?.map((item) => {
          return <Artist data={item} key={item?.id} />;
        })}
      </div>
    </div>
  );
}

export default memo(ListArtist);
