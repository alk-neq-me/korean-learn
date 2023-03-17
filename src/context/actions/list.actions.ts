import { ActionAsync } from "..";
import ListService from "../../services/list.service";
import { ListState, UnpackType } from "../type";

export const getListByLibraryId = (id_: number): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_LIST" });
  try {
    await ListService.getListByLibraryId(dispatch, id_);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const toggleFavorite = (id_: number): ActionAsync => async (dispatch) => {
  try {
    await ListService.toggleFavorite(dispatch, id_);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const getFavoriteList = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_LIST" });
  try {
    await ListService.getFavoriteList(dispatch);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const searchList = (searchWord: string): ActionAsync => async (dispatch) => {
  try {
    await ListService.searchList(dispatch, searchWord);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const createAudio = (list: UnpackType<ListState, "rows">[0], uri: string | undefined): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_LIST" });
  try {
    await ListService.createAudioList(dispatch, list, uri);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};

export const deleteAllRecords = (): ActionAsync => async (dispatch, state) => {
  dispatch({ type: "REQUEST_LIST" });
  const list = state?.list.rows.map(row => row.record);
  try {
    await ListService.clearRecordFiles(dispatch, list);
  } catch (err) {
    let errMassage = "unknoen error";
    if (err instanceof Error) errMassage = err.message;
    dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
  };
};
