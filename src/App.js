import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import path from "./ultis/path";
import * as actions from "./store/actions";
import { apiGetChart } from "./apis";
import { SearchAll, SearchSongs, SearchPlaylist } from "./components";
import {
  Layout,
  Personal,
  Home,
  Album,
  ZingChart,
  Radio,
  Follow,
  Singer,
  WeekRank,
  Search,
  RankNewSong,
} from "./page/public";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);

  // call api get data
  useEffect(() => {
    dispatch(actions.loading(true));
    dispatch(actions.getHome());
    const fetch = async () => {
      const res = await apiGetChart();
      if (res?.data.err === 0) setWeekChart(res?.data?.data?.weekChart);
    };
    fetch();
    dispatch(actions.loading(false));
  }, []);

  // auto scroll top
  useEffect(() => {
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    window.addEventListener("popstate", scrollToTop);
    return () => {
      window.removeEventListener("popstate", scrollToTop);
    };
  }, [location]);

  return (
    <>
      <Routes>
        <Route path={path.LAYOUT} element={<Layout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ALBUM__TITLE_ID} element={<Album />} />
          <Route path={path.PLAYLIST__TITLE_ID} element={<Album />} />
          <Route path={path.ZING_CHART} element={<ZingChart />} />
          <Route path={path.RADIO} element={<Radio />} />
          <Route path={path.FOLLOW} element={<Follow />} />
          <Route path={path.PROFILTE_SINGER} element={<Singer />} />
          <Route
            path={path.WEEKRANK__TITLE_ID}
            element={
              <WeekRank weekChart={weekChart && Object.values(weekChart)} />
            }
          />
          <Route path={path.SEARCH} element={<Search />}>
            <Route path={path.ALL} element={<SearchAll />} />
            <Route path={path.SONGS} element={<SearchSongs />} />
            <Route path={path.STAR} element={<SearchPlaylist />} />
          </Route>
          <Route path={path.RANK_NEW_SONG} element={<RankNewSong />} />
          <Route path={path.MV} element={<Radio />} />
          <Route path={path.CATEGORIES} element={<Radio />} />
          <Route path={path.TOP100} element={<Radio />} />

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
