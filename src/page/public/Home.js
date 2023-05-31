import { memo } from "react";
import { useSelector } from "react-redux";

import {
  SliderBanner,
  Category,
  NewRelease,
  Analysis,
  BannerRank,
} from "../../components";

function Home() {
  const { chill, power, hotArtist, hotAlbum, top100, weekChart } = useSelector(
    (state) => state.app
  );
  return (
    <div className="px-[60px] pb-[90px]">
      <SliderBanner />
      <NewRelease />
      <Category title={chill?.title} data={chill?.items} isSortDesc />
      <Category title={power?.title} data={power?.items} isSortDesc />
      <Category title={hotArtist?.title} data={hotArtist?.items} isSortDesc />
      <Analysis />
      <div className="flex justify-between items-center mt-12 gap-6">
        {weekChart?.map((item) => {
          return <BannerRank data={item} key={item?.country} />;
        })}
      </div>
      <Category title={top100?.title} data={top100?.items} isTitle isSinger />
      <Category
        title={hotAlbum?.title}
        data={hotAlbum?.items}
        isTitle
        isSinger
      />
    </div>
  );
}

export default memo(Home);
