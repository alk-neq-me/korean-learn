import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useReducer } from "react";
import { BackHandler } from "react-native";
import { List } from "./type";


type State = {
	loading: boolean;
	list: Array<List>;
	fav: Array<List>;
};

enum ActionTypeEnum {
	REQUEST = "REQUEST_LISTA",
	
	SUCCESS_LIST = "FETCH_LIST",
	ADD_LIST = "ADD_LIST",
	REMOVE_LIST = "REMOVE_LIST",
	CLEAN_LIST = "CLEAN_LIST",
	
	TOGGLE_FAV_LIST = "TOGGLE_FAV_LIST",
};

type Action = 
	| { type: ActionTypeEnum; }
	| { type: ActionTypeEnum; payload: string|State|List; };

type SetState = (action: Action) => void;
	
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
	fav: []
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionTypeEnum.REQUEST:
			return { ...state, loading: true };
		case ActionTypeEnum.SUCCESS_LIST:
			return { 
				...state,
				...("payload" in action) 
					? (!Array.isArray(action.payload))
						? { ...(action.payload as State) }
						: state
					: state,
				loading: false,
			};
		case ActionTypeEnum.ADD_LIST:
			return { 
				...state,
				loading: false,
				list: ("payload" in action)
					? (typeof action.payload !== "string")
						? [ ...state.list, action.payload as List ]
						: state.list
					: state.list
			};
		case ActionTypeEnum.TOGGLE_FAV_LIST:
			return { 
				...state,
				loading: false,
				fav: ("payload" in action)
					? (state.list.find((list: List) => list.id === action.payload))
						? state.list.filter((list: List) => list.fav).concat(state.list.find((list: List) => list.id === action.payload))
						: state.list.filter((list: List) => list.fav)
					: state.list.filter((list: List) => list.fav),
				list: ("payload" in action)
					? state.list.map(
						(list: List) => list.id === action.payload
							? { ...list, fav: !list.fav }
							: list)
					: state.list,
			};
		case ActionTypeEnum.REMOVE_LIST:
			return {
				...state,
				loading: false,
				list: ("payload" in action)
					? state.list.filter((list: List) => list.id !== action.payload)
					: state.list,
				fav: ("payload" in action)
					? state.fav.filter((list: List) => list.id !== action.payload)
					: state.fav,
			};
		case ActionTypeEnum.CLEAN_LIST:
			return initialState

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


// Actions
export const fetchList = () => (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	AsyncStorage.getItem("application-state").then(value => {
		if (value) dispatch({ type: ActionTypeEnum.SUCCESS_LIST, payload: JSON.parse(value) });
	});
};

export const addList = (data: List) => (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	dispatch({ type: ActionTypeEnum.ADD_LIST, payload: data });
};

export const toggleFav = (id_: string) => (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	dispatch({ type: ActionTypeEnum.TOGGLE_FAV_LIST, payload: id_ })
};

export const removeList = (id_: string) => (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	dispatch({ type: ActionTypeEnum.REMOVE_LIST, payload: id_ });
};

export const allClean = () => (dispatch: SetState) => {
	dispatch({ type: ActionTypeEnum.REQUEST });
	dispatch({ type: ActionTypeEnum.CLEAN_LIST });
};

export const exitApp = () => (_dipatch: SetState, state: State) => {
	AsyncStorage.setItem("application-state", JSON.stringify(state));
	BackHandler.exitApp();
};
