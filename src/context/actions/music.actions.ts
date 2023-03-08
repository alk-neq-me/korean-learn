import { ActionAsync, ActionTypeEnum } from "..";
import { Music } from "../type";

export const initMusic = (music: Music): ActionAsync => async (dispatch) => {
	dispatch({ type: ActionTypeEnum.REQUEST_SELECTED_MUSIC });
	try {
		dispatch({ type: ActionTypeEnum.SUCCESS_SELECTED_MUSIC, payload: music });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_SELECTED_MUSIC, payload: errMassage });
	};
};

export const readyMusic = (): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: ActionTypeEnum.READY_SELECTED_MUSIC });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_SELECTED_MUSIC, payload: errMassage });
	};
};
