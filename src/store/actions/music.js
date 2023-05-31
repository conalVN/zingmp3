import actionTypes from "./actionTypes";
import * as apis from "../../apis";
import * as actions from "../actions";

export const setCurrSongId = (sid) => ({
  type: actionTypes.SET_CURR_SONGID,
  sid,
});

export const setCurrSongData = (data) => ({
  type: actionTypes.SET_CURR_SONG_DATA,
  data,
});

export const setCurrAlbumId = (pid) => ({
  type: actionTypes.SET_CURR_ALBUMID,
  pid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (playlist) => ({
  type: actionTypes.PLAYLIST,
  playlist,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

export const setRecent = (data) => ({
  type: actionTypes.SET_RECENT,
  data,
});

export const search = (keyword) => async (dispatch) => {
  try {
    dispatch(actions.loading(true));
    const res = await apis.apiSearch(keyword);
    if (res?.data?.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: res?.data?.data,
        keyword,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
    dispatch(actions.loading(false));
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};

export const searchSongs = (sid) => async (dispatch) => {
  try {
    const res = await apis.apiGetArtistSongs(sid);
    if (res?.data?.err === 0) {
      dispatch({
        type: actionTypes.PLAYLIST,
        playlist: res?.data?.data?.items,
      });
    } else {
      dispatch({
        type: actionTypes.PLAYLIST,
        playlist: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PLAYLIST,
      playlist: null,
    });
  }
};
