import { ActionAsync, ActionTypeEnum } from "..";
import LibraryService from "../../services/library.service";
import { QueryService } from "../../services/type";
import { Library } from "../type";

export const getLibraries = (query: QueryService<Library>): ActionAsync => async (dispatch) => {
	dispatch({ type: ActionTypeEnum.REQUEST_LIBRARY });
	try {
		LibraryService.getLibrariesService(dispatch, query);
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: ActionTypeEnum.FETCH_ERROR_LIBRARY, payload: errMassage });
	};
};
