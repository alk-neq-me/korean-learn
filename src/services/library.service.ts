import { Dispatch } from "../context";
import { LibraryState, UnpackType } from "../context/type";
import createQueryFilter from "../utilits/create-query-filter";
import { serviceQuery } from "./service-query";
import { QueryService } from "./type";


export default class LibraryService {
	static async getLibrariesService(dispatch: Dispatch, query_: QueryService<UnpackType<LibraryState, "rows">[0]>): Promise<void> {
		const { filter } = query_;
		const [query, args] = createQueryFilter("SELECT * FROM library", filter);
	
		serviceQuery(query, args, (result) => {
			dispatch({ type: "SUCCESS_LIBRARY", payload: result.rows._array });
		});
	};
};
