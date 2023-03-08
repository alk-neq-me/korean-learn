import { ActionAsync, ActionTypeEnum } from "..";
import ListService from "../../services/list.service";

export const getListByLibraryId = (id_: number): ActionAsync => async (dispatch) => {
  dispatch({ type: ActionTypeEnum.REQUEST_LIST });
  try {
    ListService.getListByLibraryId(dispatch, id_);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_LIST, payload: errMassage });
  };
};

export const toggleFavorite = (id_: number): ActionAsync => async (dispatch) => {
  try {
    ListService.toggleFavorite(dispatch, id_);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_LIST, payload: errMassage });
  };
};

export const getFavoriteList = (): ActionAsync => async (dispatch) => {
  dispatch({ type: ActionTypeEnum.REQUEST_LIST });
  try {
    ListService.getFavoriteList(dispatch);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_LIST, payload: errMassage });
  };
};
