import { ActionAsync } from "..";
import LibraryService from "../../services/library.service";
import { QueryService } from "../../services/type";
import { LibraryState, UnpackType } from "../type";

export const getLibraries = (query: QueryService<UnpackType<LibraryState, "rows">[0]>): ActionAsync => async (dispatch) => {
	dispatch({ type: "REQUEST_LIBRARY" });
	try {
		await LibraryService.getLibrariesService(dispatch, query);
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		dispatch({ type: "FETCH_ERROR_LIBRARY", payload: errMassage });
	};
};
