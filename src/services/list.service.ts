import { Dispatch } from "../context";
import * as FileSystem from 'expo-file-system';
import { ListState, UnpackType } from "../context/type";
import createQueryFilter from "../utilits/create-query-filter";
import { serviceQuery } from "./service-query";

export default class ListService {
  static async getListByLibraryId(dispatch: Dispatch, id_: number): Promise<void> {
    const [query, queryArgs] = createQueryFilter<Partial<UnpackType<ListState, "rows">[0]>>(
      `
				SELECT list.*, library.section as library_name FROM list
				JOIN library
				ON library.id = list.library_id
			`, { library_id: id_ }
    );

    serviceQuery(query, queryArgs, (result) => {
      dispatch({ type: "SUCCESS_LIST", payload: result.rows._array });
    });
  };

  static async toggleFavorite(dispatch: Dispatch, id_: number): Promise<void> {
    serviceQuery(
      `
				UPDATE list
				SET fav = NOT fav
				WHERE id = ?
			`,
      [id_],
      (_result) => {
        dispatch({ type: "TOGGLE_FAV_LIST", payload: id_ });
      }
    );
  };

  static async getFavoriteList(dispatch: Dispatch): Promise<void> {
    const query = `
			SELECT list.*, library.section as library_name FROM list
			JOIN library
			ON library.id = list.library_id
			WHERE fav = 1
		`;

    serviceQuery(query, [], (result) => {
      dispatch({ type: "SUCCESS_LIST", payload: result.rows._array });
    });
  };

  static async searchList(dispatch: Dispatch, searchWord: string): Promise<void> {
    const [query, queryArgs] = createQueryFilter<Partial<UnpackType<ListState, "rows">[0]>>(
      `
				SELECT list.*, library.section as library_name FROM list
				JOIN library
				ON library.id = list.library_id
			`, {
      romaji: searchWord,
      korea: searchWord,
      mean: searchWord
    }, "search"
    );

    serviceQuery(query, queryArgs, (result) => {
      dispatch({ type: "SUCCESS_LIST", payload: result.rows._array });
    });
  };

  static async createAudioList(dispatch: Dispatch, list: UnpackType<ListState, "rows">[0], uri: string | undefined): Promise<void> {
    serviceQuery("UPDATE list SET record = ? WHERE id = ?", [uri, list.id], (_result) => {
      dispatch({ type: "SET_AUDIO_LIST", payload: { ...list, record: uri } });
    });
  };

  static async clearRecordFiles(dispatch: Dispatch, list: (string | undefined)[] | undefined) {
    if (!list) return;
    dispatch({ type: "CLEAR_ALL_RECORDS_LIST" });
    serviceQuery("UPDATE list SET record = null", [], (_) => { })
    for (const i of list) {
      if (i) await FileSystem.deleteAsync(i);
    };
  };
};
