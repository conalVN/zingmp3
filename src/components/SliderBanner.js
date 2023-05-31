import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import * as actions from "../store/actions";

function SliderBanner() {
  const { banner } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      // song banner
      dispatch(actions.setCurrSongId(item?.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(false));
    } else if (item?.type === 4) {
      // playlist banner
      navigate(item?.link?.split(".")[0]);
    } else {
      dispatch(actions.setPlaylist(false));
    }
  };
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="slider-banner"
    >
      {banner?.map((item) => {
        return (
          <SwiperSlide
            key={item?.encodeId}
            onClick={() => handleClickBanner(item)}
          >
            <NavLink>
              <img
                src={item?.banner}
                alt={item?.link}
                className="w-full rounded-md"
              />
            </NavLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default memo(SliderBanner);
