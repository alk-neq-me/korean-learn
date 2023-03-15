import { ActionAsync } from "..";
import QuizService from "../../services/quiz.service";
import { QueryService } from "../../services/type";
import { ListState, UnpackType } from "../type";

export const fetchQuiz = (query: QueryService<UnpackType<ListState, "rows">[0]>): ActionAsync  => async (dispatch) => {
	try {
		await QuizService.fetchQuestion(dispatch, query);
	} catch (err) {
		let errMassage = "unknoen error";
		if (err instanceof Error) errMassage = err.message;
		// dispatch({ type: "FETCH_ERROR_LIST", payload: errMassage });
	};
};
