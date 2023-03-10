import { ActionAsync } from "..";
import MusicListService from "../../services/music-list.service";

export const getMusicList = (): ActionAsync => async (dispatch) => {
	dispatch({ type: "REQUEST_MUSIC_LIST" });
	try {
		MusicListService.getMusicList(dispatch);
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_MUSIC_LIST", payload: errMassage });
	};
};
