import { BackHandler } from "react-native";
import { ActionTypeEnum, SetState, State } from ".";
import { cleanService, fetchLibraryService, fetchListService } from "../db";

export const fetchLibrary = () => async (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	fetchLibraryService(dispatch);
};

export const fetchList = (id_: number) => async (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	fetchListService(id_, dispatch);
};

export const toggleFav = (id_: string) => async (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	dispatch({ type: ActionTypeEnum.TOGGLE_FAV_LIST, payload: id_ })
};

export const exitApp = () => async (_dipatch: SetState, _state: State) => {
	BackHandler.exitApp();
};

export const allClean = () => async () => {
	cleanService();
};
