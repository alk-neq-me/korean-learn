import { createContext, useContext, useReducer } from "react";
import { Library, List } from "./type";

export type State = {
	loading: boolean;
	error?: string;
	list: Array<List>;
	library: Array<Library>;
};

export enum ActionTypeEnum {
	REQUEST = "REQUEST",
	SUCCESS_LIBRARY = "SUCCESS_LIBRARY",
	SUCCESS_LIST = "FETCH_LIST",
	FETCH_ERROR = "FETCH_ERROR",

	TOGGLE_FAV_LIST = "TOGGLE_FAV_LIST",
};

type Action = 
	| { type: ActionTypeEnum; }
	| { type: ActionTypeEnum; payload: string|Library[]|List[]; };

export type SetState = (action: Action) => void;
	
type Dispatch = <T extends AnyFunc>(fn: T) => void;

type StateContextType = {
	state: State,
	dispatch: Dispatch,
};

type Props = {
	children: React.ReactNode;
};

type AnyFunc = (...arg: any[]) => any;


const initialState: State = {
	loading: false,
	list: [],
	library: [],
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionTypeEnum.REQUEST:
			return { ...state, loading: true };
		case ActionTypeEnum.SUCCESS_LIBRARY:
			return {
				...state,
				loading: false,
				error: undefined,
				library: ("payload" in action)
					? action.payload as Library[]
					: state.library
			};
		case ActionTypeEnum.SUCCESS_LIST:
			return {
				...state,
				loading: false,
				error: undefined,
				list: ("payload" in action)
					? action.payload as List[]
					: state.list
			};
		case ActionTypeEnum.TOGGLE_FAV_LIST:
			return { 
				...state,
				loading: false,
				error: undefined,
			};
	
		case ActionTypeEnum.FETCH_ERROR:
			return {
				...state,
				loading: false,
				error: ("payload" in action)
					? action.payload as string
					: "unknown error"
			};

		default:
			const _unreachable: never = action.type;
			console.error({ _unreachable });
			return state;
	};
};

const StateContext = createContext<StateContextType|undefined>(undefined);

export const StateContextProvider = (props: Props) => {
	const { children } = props;
	const [state, stateDispatch] = useReducer(reducer, initialState);
	
	const dispatch = <T extends AnyFunc>(fn: T) => {
		fn(stateDispatch, state);
	};
	
	const context = {state, dispatch};
	
	return <StateContext.Provider value={context}>
		{children}
	</StateContext.Provider>
};

export const useStateContext = () => {
	const context = useContext(StateContext);
	
	if (!context) throw new Error("Please Provide with StateContextProvider");
	
	return context;
};
