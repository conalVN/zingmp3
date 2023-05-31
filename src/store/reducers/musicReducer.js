import actionTypes from "../actions/actionTypes";

const initState = {
  isPlaying: false,
  isAlbum: false,
  currentSongId: null,
  currentSongData: null,
  currentAlbumId: null,
  playlist: null,
  recentSongs: [],
  searchData: {},
  keyword: "",
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURR_SONGID:
      return {
        ...state,
        currentSongId: action.sid || null,
      };
    case actionTypes.SET_CURR_SONG_DATA:
      return {
        ...state,
        currentSongData: action.data || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        isAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        playlist: action.playlist || null,
      };
    case actionTypes.SET_CURR_ALBUMID:
      return {
        ...state,
        currentAlbumId: action.pid || null,
      };
    case actionTypes.SET_RECENT:
      let songs = state.recentSongs;
      if (action.data) {
        if (songs?.some((i) => i.encodeId === action.data.encodeId)) {
          songs = songs.filter((x) => x.encodeId !== action.data.encodeId);
        }
        if (songs.length > 19) {
          songs = songs.filter((x, i, arr) => i !== arr.length - 1);
        }
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || null,
        keyword: action.keyword || "",
      };
    default:
      return state;
  }
};

export default musicReducer;
