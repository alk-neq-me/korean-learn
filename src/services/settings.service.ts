import { openDatabase } from "../db";
import * as FileSystem from 'expo-file-system';
import { Dispatch } from "../context";
import { serviceQuery } from "./service-query";
import { SettingsState, UnpackType } from "../context/type";

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
    serviceQuery("UPDATE settings SET initial_app = false WHERE id = 1", [], (_result) => {
      dispatch({ type: "INITIAL_APP_SETTINGS" });
    });
  };

  static async unInitApp(_: Dispatch) {
    serviceQuery("UPDATE settings SET initial_app = true WHERE id = 1", [], (_result) => {
    });
  };

  static async initSettings(dispatch: Dispatch) {
    serviceQuery("SELECT * FROM settings", [], (result) => {
      if (result.rows._array.length) {
        dispatch({ type: "SUCCESS_SETTINGS", payload: result.rows._array[0] });
      }
    });
  };

  static async updateSettings(payload: Partial<UnpackType<SettingsState, "setting">>, _dispatch: Dispatch) {
    const is_show_romaji = (typeof payload.is_show_romaji === "undefined" ? 0 : Boolean(payload.is_show_romaji));
    serviceQuery(
      `
        UPDATE settings
        SET 
          theme = ?,
          schedule = ?,
          native_text_color = ?,
          font_size = ?,
          is_show_romaji = ?
      `,
      [payload.theme, payload.schedule, payload.native_text_color, payload.font_size, is_show_romaji],
      (result) => {
        console.log(result.rows)
      }
    );
  };
};
