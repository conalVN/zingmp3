import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { CategoryItem } from "../components";
import icons from "../ultis/icons";
const { SlArrowRight } = icons;

function Category({
  title,
  isTitle,
  data,
  isSinger,
  isSortDesc,
  isRelease,
  number = 5,
}) {
  const navigate = useNavigate();
  return (
    <section className="mt-12">
      <div className="flex justify-between items-center">
        <h3 className="mb-5 text-[20px] font-bold">{title}</h3>
        {data?.items?.length > 5 && (
          <p
            className="flex items-center gap-2 text-second text-[12px] font-bold"
            onClick={() => navigate()}
          >
            <span className="uppercase">TẤT CẢ</span>
            <SlArrowRight />
          </p>
        )}
      </div>
      <div className="flex items-start flex-wrap gap-y-4 mx-[-14px]">
        {data?.slice(0, number)?.map((item) => {
          return (
            <CategoryItem
              key={item?.encodeId}
              dataItem={item}
              isSinger={isSinger}
              isTitle={isTitle}
              isSortDesc={isSortDesc}
              isRelease={isRelease}
            />
          );
        })}
      </div>
    </section>
  );
}

export default memo(Category);
