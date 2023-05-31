import { memo, useState } from "react";
import { Link } from "react-router-dom";

function BannerRank({ data }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      to={data?.link?.split(".")[0]}
      key={data?.link}
      className="overflow-hidden rounded-md"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={data?.cover}
        alt="banner"
        className={`w-full object-cover rounded-md transition duration-500 ease-linear ${
          isHover ? "scale-110" : "scale-100"
        }`}
      />
    </Link>
  );
}

export default memo(BannerRank);
