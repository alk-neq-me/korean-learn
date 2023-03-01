import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { ActionTypeEnum, SetState } from './context';
import { Asset } from 'expo-asset';
import { List } from './context/type';

const dbFile = "sqlite.db";

async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
	/// Create if not exists SQLite in System Directory
	if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
		await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
	}
	/// Copy database.db if not exists to System Directory
	if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory+`SQLite/${dbFile}`)).exists) {
		await FileSystem.downloadAsync(
			Asset.fromModule(require(`../assets/${dbFile}`)).uri,
			FileSystem.documentDirectory + `SQLite/${dbFile}`
		);
	} else SQLite.openDatabase(dbFile).closeAsync()

	return SQLite.openDatabase(dbFile, "1.0", "korea leanguage learning application", undefined, (db) => {
		db.exec([{
			sql: `
				PRAGMA foreign_keys = ON;
				PRAGMA journal_mode = WAL;
			`,
			args: []
		}],
		false,
		(err, _result) => {
			if (err) console.error(err)
		});
	});
};

export async function cleanService(): Promise<void> {
	try {
		openDatabase().then((db) => {
			db.closeAsync()
			db.deleteAsync()
		})
		await FileSystem.deleteAsync(FileSystem.documentDirectory + "SQLite");
	} catch (err) {
		console.log(err)
	}
	console.log("deleted all");
};


export function fetchLibraryService(dispatch: SetState): void {
	openDatabase()
		.then((db) => {
			db.exec(
				[{
					sql: "SELECT * FROM library",
					args: []
				}],
				false,
				(_, result) => {
					if (result) {
						if ("rows" in result[0]) {
							dispatch({ type: ActionTypeEnum.SUCCESS_LIBRARY, payload: result[0].rows as List[] })
						};
						if ("error" in result[0]) {
							console.error(result[0].error)
						};
					}
				}
			);
		})
		.catch((err) => {
			let errMessage = "unknown error";
			if (err instanceof Error) errMessage = err.message;
			dispatch({ type: ActionTypeEnum.FETCH_ERROR, payload: errMessage });
		});
};

export const fetchListService = (id_: number, dispatch: SetState) => {
	openDatabase()
		.then((db) => {
			db.transaction(tx => {
				tx.executeSql(
					`
					SELECT * FROM list l
					WHERE l.library_id = ?
					`,
					[id_],
					(_, result) => dispatch({ type: ActionTypeEnum.SUCCESS_LIST, payload: result.rows._array as List[] })
				)
			});
		})
		.catch((err) => {
			let errMessage = "unknown error";
			if (err instanceof Error) errMessage = err.message;
			dispatch({ type: ActionTypeEnum.FETCH_ERROR, payload: errMessage });
		});
};
