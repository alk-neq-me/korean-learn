import { openDatabase } from "../db";
import * as FileSystem from 'expo-file-system';
import { Dispatch } from "../context";
import { serviceQuery } from "./service-query";

export default class SettingsService {
  static async cleanAll(_dispatch: Dispatch) {
    const db = await openDatabase();
    try {
      db.closeAsync();
      db.deleteAsync();

      await FileSystem.deleteAsync(FileSystem.documentDirectory + "SQLite");
    } catch (err) {
      console.error(err)
    }
    console.log("deleted all");
  };

  static async initApp(dispatch: Dispatch) {
    serviceQuery("UPDATE settings SET initial_app = 0 WHERE id = 1", [], (_result) => {
      dispatch({ type: "INITIAL_APP_SETTINGS" });
      // console.log("ini", _result)
    });
  };

  static async unInitApp(dispatch: Dispatch) {
    serviceQuery("UPDATE settings SET initial_app = 1 WHERE id = 1", [], (_result) => {
    });
  };
};
