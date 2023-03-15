import { BackHandler } from "react-native";
import { ActionAsync } from "..";
import SettingsService from "../../services/settings.service";

export const initialApp = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_SETTINGS" });
  try {
    // await SettingsService.initApp(dispatch);
    dispatch({ type: "INITIAL_APP_SETTINGS" });
  } catch (err) {
    let errMeassage = "unknown error";
    if (err instanceof Error) errMeassage = err.message;
    dispatch({ type: "FETCH_ERROR_SETTINGS", payload: errMeassage });
  }
};

export const unInitialApp = (): ActionAsync => async (dispatch) => {
  dispatch({ type: "REQUEST_SETTINGS" });
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
