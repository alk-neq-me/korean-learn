import { Dispatch } from "../context";
import { ListState, UnpackType } from "../context/type";
import createQueryFilter from "../utilits/create-query-filter";
import { serviceQuery } from "./service-query";
import { QueryService } from "./type";

export default class QuizService {
	static async fetchQuestion(dispatch: Dispatch, query_: QueryService<UnpackType<ListState, "rows">[0]>) {
		const { filter } = query_;
		const [query, args] = createQueryFilter(`SELECT library.section as library_name, list.* FROM library JOIN list ON list.library_id = library.id`, filter, "filter", "ORDER BY RANDOM() LIMIT 4");
		
		serviceQuery(query, args, (result) => {
			// dispatch({ type: "SUCCESS_LIST", payload: result.rows._array });
			console.log(result.rows._array);
		});
	};
};
