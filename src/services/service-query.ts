import { SQLResultSet } from "expo-sqlite";
import { openDatabase } from "../db";

export function serviceQuery(
  query: string,
  args: (string | number | boolean | null | undefined)[],
  callback: (result: SQLResultSet) => void,
): void {
  const queryArgs = args
    .filter((arg): arg is (string | number | boolean | null) => !!arg)
    .map(arg => typeof arg === "boolean" ? Number(arg) : arg);

  openDatabase()
    .then(db => {
      db.transaction(tx => {
        tx.executeSql(
          query, queryArgs,
          (_, result) => {
            callback(result);
          },
          (_, err) => {
            console.error(err);
            return false;
          },
        );
      });
    })
    .catch(err => {
      throw err;
    });
};


