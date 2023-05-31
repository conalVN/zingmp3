/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ItemRelease } from "../components";
import icons from "../ultis/icons";
const { SlArrowRight } = icons;

function NewRelease() {
  const { newRelease } = useSelector((state) => state.app);
  const [type, setType] = useState(0);
  const [data, setData] = useState(newRelease?.items?.all);

  useEffect(() => {
    +type === 0
      ? setData(newRelease?.items?.all)
      : +type === 1
      ? setData(newRelease?.items?.vPop)
      : setData(newRelease?.items?.others);
  }, [type]);

  return (
    <div className="mt-5">
      <h3 className="mb-5 text-[20px] font-bold">{newRelease?.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-[12px] font-semibold">
          <button
            className={`outline-none border border-[#2f2739] px-[24px] py-[4px] rounded-full ${
              type === 0 && "bg-active"
            }`}
            onClick={() => setType(0)}
          >
            TẤT CẢ
          </button>
          <button
            className={`outline-none border border-[#2f2739] px-[24px] py-[4px] rounded-full ${
              type === 1 && "bg-active"
            }`}
            onClick={() => setType(1)}
          >
            VIỆT NAM
          </button>
          <button
            className={`outline-none border border-[#2f2739] px-[24px] py-[4px] rounded-full ${
              type === 2 && "bg-active"
            }`}
            onClick={() => setType(2)}
          >
            QUỐC TẾ
          </button>
        </div>
        <span className="flex items-center gap-2 text-[12px] font-bold text-subtext">
          TẤT CẢ
          <SlArrowRight />
        </span>
      </div>
      <div className="flex flex-wrap justify-between mt-4">
        {data
          ?.filter((item, index) => index <= 11)
          ?.map((item) => {
            return <ItemRelease data={item} key={item?.encodeId} />;
          })}
      </div>
    </div>
  );
}

export default memo(NewRelease);
