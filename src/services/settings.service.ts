import { openDatabase } from "../db";
import * as FileSystem from 'expo-file-system';

export async function cleanService(): Promise<void> {
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
