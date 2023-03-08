import { ActionAsync, ActionTypeEnum } from "..";
import ListService from "../../services/list.service";

export const getListByLibraryId = (id_: number): ActionAsync => async (dispatch) => {
  dispatch({ type: ActionTypeEnum.REQUEST_LIST });
  try {
    ListService.getListByLibraryId(dispatch, id_);
  } catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_LIBRARY, payload: errMassage });
  };
};
