import * as apis from "../../apis";
import actionsTypes from "./actionTypes";

export const getHome = () => async (dispatch) => {
  try {
    const res = await apis.getHome();
    if (res?.data?.err === 0) {
      dispatch({
        type: actionsTypes.GET_HOME,
        homeData: res?.data?.data?.items,
      });
    } else {
      dispatch({
        type: actionsTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_HOME,
      homeData: null,
    });
  }
};

export const login = (flag) => ({
  type: actionsTypes.LOGIN,
  flag,
});
