import { ActionTypeEnum, Dispatch } from "../context";
import { List } from "../context/type";
import createQueryFilter from "../utilits/createQueryFilter";
import { serviceQuery } from "./use-query";

export default class ListService {
	static async getListByLibraryId(dispatch: Dispatch, id_: number): Promise<void> {
		const [query, queryArgs] = createQueryFilter<Partial<List>>(
			`
				SELECT list.*, library.section as library_name FROM list
				JOIN library
				ON library.id = list.library_id
			`, { library_id: id_ }
		);
	
		serviceQuery(query, queryArgs, (result) => {
			dispatch({ type: ActionTypeEnum.SUCCESS_LIST, payload: result.rows._array });
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
				dispatch({ type: ActionTypeEnum.TOGGLE_FAV_LIST, payload: id_ });
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
			dispatch({ type: ActionTypeEnum.SUCCESS_LIST, payload: result.rows._array });
		});
	};
};
