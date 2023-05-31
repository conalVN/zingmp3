import actionTypes from "../actions/actionTypes";

const initState = {
  isLoading: false,
  isLogin: false,
  data: null,
  banner: null,
  newRelease: null,
  chill: null,
  power: null,
  hotArtist: null,
  top100: null,
  hotAlbum: null,
  weekChart: null,
  rankItem: null,
  rankNewRelease: null,
  chart: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        data: action.homeData,
        banner:
          action?.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        chill:
          action?.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          null,
        power:
          action?.homeData?.find(
            (item) => item.sectionId === "hEditorTheme2"
          ) || null,
        hotArtist:
          action?.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          null,
        hotAlbum:
          action?.homeData?.find((item) => item.sectionId === "hAlbum") || null,
        top100:
          action?.homeData?.find((item) => item.sectionId === "h100") || null,
        weekChart:
          action?.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        newRelease:
          action?.homeData?.find(
            (item) => item.sectionType === "new-release"
          ) || null,
        rankItem:
          action?.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
        rankNewRelease:
          action?.homeData?.find((item) => item.sectionId === "hNewrelease") ||
          null,
        chart:
          action?.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
