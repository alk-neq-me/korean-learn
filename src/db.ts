import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const dbFile = "sqlite.db";

export async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
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


/*
export const toggleFavService = (id_: number, dispatch: Dispatch) => {
	console.log(id_)
	openDatabase()
		.then((db) => {
			db.transaction(tx => {
				tx.executeSql(
					`
					UPDATE list
					SET fav = ((fav | 1) - (fav & 1))
					WHERE id = ?
					`,
					[id_],
				)
			});
		})
		.catch((err) => {
			let errMessage = "unknown error";
			if (err instanceof Error) errMessage = err.message;
		});
};
*/
