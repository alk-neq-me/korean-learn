import { ActionAsync } from "..";
import { MusicState, UnpackType } from "../type";

export const initMusic = (music: UnpackType<MusicState, "music">): ActionAsync => async (dispatch) => {
	dispatch({ type: "REQUEST_SELECTED_MUSIC" });
	try {
		dispatch({ type: "SUCCESS_SELECTED_MUSIC", payload: music });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};

export const readyMusic = (): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: "READY_SELECTED_MUSIC" });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};

export const playMusic = (): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: "PLAY_SELECTED_MUSIC" });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};

export const pauseMusic = (): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: "PAUSE_SELECTED_MUSIC" });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};

export const togglePlayMusic = (): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: "TOGGLE_PLAY_MUSIC" });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};

export const errorMusic = (error: string): ActionAsync => async (dispatch) => {
	try {
		dispatch({ type: "LOAD_ERROR_SELECTED_MUSIC", payload: error });
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_SELECTED_MUSIC", payload: errMassage });
	};
};
