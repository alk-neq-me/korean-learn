import { ActionAsync } from "..";
import ListService from "../../services/list.service";

export const getListByLibraryId = (id_: number): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_LIST" });
  try {
    ListService.getListByLibraryId(dispatch, id_);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const toggleFavorite = (id_: number): ActionAsync => async (dispatch) => {
  try {
    ListService.toggleFavorite(dispatch, id_);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const getFavoriteList = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_LIST" });
  try {
    ListService.getFavoriteList(dispatch);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const searchList = (searchWord: string): ActionAsync => async (dispatch) => {
  try {
    ListService.searchList(dispatch, searchWord);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};
