import { BackHandler } from "react-native";
import { ActionAsync } from "..";
import SettingsService from "../../services/settings.service";
import { SettingsState, UnpackType } from "../type";

export const initialApp = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_SETTINGS" });
  try {
    await SettingsService.initApp(dispatch);
  } catch (err) {
    let errMeassage = "unknown error";
    if (err instanceof Error) errMeassage = err.message;
    dispatch({ type: "FETCH_ERROR_SETTINGS", payload: errMeassage });
  }
};

export const unInitialApp = (): ActionAsync => async (dispatch) => {
  try {
    await SettingsService.unInitApp(dispatch);
  } catch (err) {
    let errMeassage = "unknown error";
    if (err instanceof Error) errMeassage = err.message;
    dispatch({ type: "FETCH_ERROR_SETTINGS", payload: errMeassage });
  }
};

export const exitApp = () => async () => {
  BackHandler.exitApp();
};

export const allClean = (): ActionAsync => async (dispatch) => {
  await SettingsService.cleanAll(dispatch);
};

export const initSettings = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_SETTINGS" });
  try {
    await SettingsService.initSettings(dispatch);
  } catch (err) {
    let errMeassage = "unknown error";
    if (err instanceof Error) errMeassage = err.message;
    dispatch({ type: "FETCH_ERROR_SETTINGS", payload: errMeassage });
  }
};


export const updateSettings = (payload: Partial<UnpackType<SettingsState, "setting">>): ActionAsync => async (dispatch, state) => {
  dispatch({ type: "REQUEST_SETTINGS" });
  try {
    dispatch({ type: "UPDATE_SETTINGS", payload });
    await SettingsService.updateSettings({
      ...state?.settings.setting,
      ...payload
    }, dispatch);
  } catch (err) {
    let errMeassage = "unknown error";
    if (err instanceof Error) errMeassage = err.message;
    dispatch({ type: "FETCH_ERROR_SETTINGS", payload: errMeassage });
  };
};
